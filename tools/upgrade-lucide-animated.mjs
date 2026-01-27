#!/usr/bin/env node

/**
 * Automated Lucide → Lucide Animated Upgrade Script
 *
 * This script:
 * 1. Scans all .tsx/.ts files for lucide-react imports
 * 2. Extracts icon names being used
 * 3. Installs @lucide-animated/{icon-name} packages
 * 4. Updates all imports from lucide-react to @lucide-animated/icon-name
 * 5. Updates component usage to match animated API
 *
 * Usage:
 *   node tools/upgrade-to-lucide-animated.mjs
 *
 * Options:
 *   --dry-run     Show what would be changed without making changes
 *   --skip-install Don't install packages, just update imports
 */

import { execSync } from 'child_process';
import { join } from 'path';

import { readdir, readFile, writeFile } from 'fs/promises';

// Parse CLI args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const SKIP_INSTALL = args.includes('--skip-install');

// Config
const SRC_DIR = 'src';
const EXTENSIONS = ['.tsx', '.ts'];

// Track icons found and files to modify
const iconsFound = new Set();
const filesToUpdate = new Map(); // filepath → { oldContent, newContent, icons[] }

/**
 * Convert PascalCase icon name to kebab-case package name
 * e.g., ChevronDown → chevron-down
 */
function toKebabCase(str) {
	return str
		.replace(/([a-z])([A-Z])/g, '$1-$2')
		.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
		.toLowerCase();
}

/**
 * Recursively find all .tsx/.ts files
 */
async function findFiles(dir, fileList = []) {
	const files = await readdir(dir, { withFileTypes: true });

	for (const file of files) {
		const filePath = join(dir, file.name);

		if (file.isDirectory()) {
			// Skip node_modules, .next, etc.
			if (!['node_modules', '.next', '.git', 'dist', 'build'].includes(file.name)) {
				await findFiles(filePath, fileList);
			}
		} else if (EXTENSIONS.some((ext) => file.name.endsWith(ext))) {
			fileList.push(filePath);
		}
	}

	return fileList;
}

/**
 * Extract Lucide icons from a file
 * Matches patterns like:
 *   import { ChevronDown, Menu } from 'lucide-react';
 *   import { ChevronDown as ChevDown } from 'lucide-react';
 */
function extractLucideIcons(content) {
	const icons = [];

	// Match: import { IconName, IconName2 } from 'lucide-react'
	const importRegex = /import\s+\{([^}]+)\}\s+from\s+['"]lucide-react['"]/g;
	let match;

	while ((match = importRegex.exec(content)) !== null) {
		const importList = match[1];

		// Split by comma and extract icon names (handle aliases)
		const items = importList.split(',').map((s) => s.trim());

		for (const item of items) {
			// Handle "IconName as Alias" or just "IconName"
			const iconMatch = item.match(/^(\w+)(?:\s+as\s+\w+)?$/);
			if (iconMatch) {
				const iconName = iconMatch[1];
				// Skip common non-icon imports
				if (!['LucideProps', 'LucideIcon', 'Icon'].includes(iconName)) {
					icons.push(iconName);
				}
			}
		}
	}

	return icons;
}

/**
 * Transform file content from lucide-react to @lucide-animated
 */
function transformContent(content, icons) {
	let newContent = content;

	// For each icon, replace the import
	for (const iconName of icons) {
		const kebabName = toKebabCase(iconName);

		// Pattern 1: import { IconName } from 'lucide-react'
		// Replace with: import IconName from '@lucide-animated/icon-name'
		const pattern1 = new RegExp(
			`import\\s+\\{([^}]*\\b${iconName}\\b[^}]*)\\}\\s+from\\s+['"]lucide-react['"]`,
			'g'
		);

		// Check if this icon is the only import from lucide-react
		const remainingIcons = icons.filter((i) => i !== iconName);
		const hasOtherIcons = remainingIcons.some((other) => {
			return newContent.match(new RegExp(`\\b${other}\\b`));
		});

		if (hasOtherIcons) {
			// Remove this icon from the lucide-react import
			newContent = newContent.replace(pattern1, (match, imports) => {
				const parts = imports
					.split(',')
					.map((s) => s.trim())
					.filter((s) => {
						const name = s.split(/\s+as\s+/)[0].trim();
						return name !== iconName;
					});

				if (parts.length === 0) {
					return ''; // Remove entire import
				}

				return `import { ${parts.join(', ')} } from 'lucide-react'`;
			});

			// Add individual import for animated version at top
			const firstImport = newContent.search(/^import/m);
			const importStatement = `import ${iconName} from '@lucide-animated/${kebabName}';\n`;

			if (firstImport !== -1) {
				newContent =
					newContent.slice(0, firstImport) +
					importStatement +
					newContent.slice(firstImport);
			} else {
				newContent = importStatement + newContent;
			}
		} else {
			// This is the only icon from lucide-react, replace the whole import
			newContent = newContent.replace(
				pattern1,
				`import ${iconName} from '@lucide-animated/${kebabName}'`
			);
		}
	}

	// Clean up: remove empty lucide-react imports
	newContent = newContent.replace(
		/import\s+\{\s*\}\s+from\s+['"]lucide-react['"]\s*;?\s*\n?/g,
		''
	);

	return newContent;
}

/**
 * Scan all files and extract icons
 */
async function scanProject() {
	process.stdout.write('🔍 Scanning project for Lucide icons...\n\n');

	const files = await findFiles(SRC_DIR);
	process.stdout.write(`📂 Found ${files.length} TypeScript/TSX files\n\n`);

	for (const filePath of files) {
		const content = await readFile(filePath, 'utf-8');
		const icons = extractLucideIcons(content);

		if (icons.length > 0) {
			process.stdout.write(`   ${filePath}: ${icons.join(', ')}\n`);
			icons.forEach((icon) => iconsFound.add(icon));

			const newContent = transformContent(content, icons);
			filesToUpdate.set(filePath, {
				oldContent: content,
				newContent,
				icons,
			});
		}
	}

	process.stdout.write(
		`\n✨ Found ${iconsFound.size} unique icons across ${filesToUpdate.size} files\n\n`
	);
}

/**
 * Install animated icon packages
 */
async function installAnimatedIcons() {
	if (iconsFound.size === 0) {
		process.stdout.write('ℹ️  No icons found to install\n\n');
		return;
	}

	process.stdout.write('📦 Installing @lucide-animated packages...\n\n');

	const packages = Array.from(iconsFound).map((icon) => {
		const kebab = toKebabCase(icon);
		return `@lucide-animated/${kebab}`;
	});

	process.stdout.write(`   Installing ${packages.length} packages:\n`);
	packages.forEach((pkg) => process.stdout.write(`   - ${pkg}\n`));
	process.stdout.write('\n');

	if (DRY_RUN) {
		process.stdout.write('🔸 DRY RUN: Would run:\n');
		process.stdout.write(`   pnpm add ${packages.join(' ')}\n\n`);
		return;
	}

	try {
		// Install in batches of 10 to avoid command line length issues
		const batchSize = 10;
		for (let i = 0; i < packages.length; i += batchSize) {
			const batch = packages.slice(i, i + batchSize);
			process.stdout.write(
				`   Installing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(packages.length / batchSize)}...\n`
			);
			execSync(`pnpm add ${batch.join(' ')}`, { stdio: 'inherit' });
		}
		process.stdout.write('\n✅ All packages installed\n\n');
	} catch (error) {
		process.stderr.write(`❌ Installation failed: ${error.message}\n`);
		process.exit(1);
	}
}

/**
 * Update all files with new imports
 */
async function updateFiles() {
	if (filesToUpdate.size === 0) {
		process.stdout.write('ℹ️  No files to update\n\n');
		return;
	}

	process.stdout.write('📝 Updating imports in files...\n\n');

	for (const [filePath, { newContent }] of filesToUpdate) {
		if (DRY_RUN) {
			process.stdout.write(`   Would update: ${filePath}\n`);
		} else {
			await writeFile(filePath, newContent, 'utf-8');
			process.stdout.write(`   ✓ Updated: ${filePath}\n`);
		}
	}

	process.stdout.write(
		`\n✅ ${DRY_RUN ? 'Would update' : 'Updated'} ${filesToUpdate.size} files\n\n`
	);
}

/**
 * Show summary
 */
function showSummary() {
	process.stdout.write('\n' + '='.repeat(60) + '\n');
	process.stdout.write('📊 SUMMARY\n');
	process.stdout.write('='.repeat(60) + '\n');
	process.stdout.write(`Icons found:     ${iconsFound.size}\n`);
	process.stdout.write(`Files updated:   ${filesToUpdate.size}\n`);
	process.stdout.write(
		`Mode:            ${DRY_RUN ? 'DRY RUN (no changes made)' : 'LIVE (changes applied)'}\n`
	);

	if (iconsFound.size > 0) {
		process.stdout.write('\nIcons upgraded:\n');
		Array.from(iconsFound)
			.sort()
			.forEach((icon) => {
				process.stdout.write(`  - ${icon} → @lucide-animated/${toKebabCase(icon)}\n`);
			});
	}

	process.stdout.write('\n' + '='.repeat(60) + '\n');

	if (DRY_RUN) {
		process.stdout.write('\n💡 Run without --dry-run to apply changes\n');
	} else {
		process.stdout.write('\n✨ Upgrade complete! Your icons are now animated!\n');
		process.stdout.write('\n📝 Next steps:\n');
		process.stdout.write('   1. Test your app: pnpm dev\n');
		process.stdout.write('   2. Check for any import errors\n');
		process.stdout.write('   3. Verify animations work as expected\n');
	}
	process.stdout.write('\n');
}

/**
 * Main execution
 */
async function main() {
	process.stdout.write('\n🎨 Lucide → Lucide Animated Upgrade Tool\n\n');

	if (DRY_RUN) {
		process.stdout.write('🔸 DRY RUN MODE - No changes will be made\n\n');
	}

	if (SKIP_INSTALL) {
		process.stdout.write('⏭️  Skipping package installation\n\n');
	}

	try {
		// Step 1: Scan project
		await scanProject();

		// Step 2: Install packages
		if (!SKIP_INSTALL) {
			await installAnimatedIcons();
		}

		// Step 3: Update files
		await updateFiles();

		// Step 4: Show summary
		showSummary();
	} catch (error) {
		process.stderr.write(`\n❌ Error: ${error.message}\n`);
		process.stderr.write(`${error.stack}\n`);
		process.exit(1);
	}
}

// Run it
main();
