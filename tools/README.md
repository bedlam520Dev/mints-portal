# Project Tools

## Lucide Animated Upgrade Tool

Automatically upgrades all `lucide-react` icons in your project to their animated `@lucide-animated` versions.

### Features

- 🔍 **Auto-detects** all Lucide icons used in your project
- 📦 **Installs** the corresponding `@lucide-animated` packages
- ✏️ **Updates** all imports automatically
- 🎯 **Smart replacement** - preserves aliases and handles multiple icons per file
- 🔒 **Safe** - dry-run mode to preview changes before applying

### Usage

#### Preview Changes (Dry Run)

```bash
pnpm upgrade:icons:dry
```

This will:

- Scan your project for Lucide icons
- Show which icons were found
- Show which files would be updated
- **NOT** make any changes or install packages

#### Apply Changes

```bash
pnpm upgrade:icons
```

This will:

- Scan your project
- Install all `@lucide-animated` packages
- Update all imports
- Apply changes to files

### Example

**Before:**

```tsx
import { ChevronDown, Menu, X } from 'lucide-react';

export function MyComponent() {
  return (
    <>
      <Menu className="h-6 w-6" />
      <ChevronDown />
      <X />
    </>
  );
}
```

**After:**

```tsx
import ChevronDown from '@lucide-animated/chevron-down';
import Menu from '@lucide-animated/menu';
import X from '@lucide-animated/x';

export function MyComponent() {
  return (
    <>
      <Menu className="h-6 w-6" />
      <ChevronDown />
      <X />
    </>
  );
}
```

### CLI Options

```bash
node tools/upgrade-to-lucide-animated.mjs [options]

Options:
  --dry-run        Preview changes without applying them
  --skip-install   Update imports only, don't install packages
```

### What It Does

1. **Scans** all `.ts` and `.tsx` files in `src/`
2. **Extracts** icon names from `lucide-react` imports
3. **Converts** PascalCase names to kebab-case package names
   - `ChevronDown` → `chevron-down`
   - `ArrowBigUp` → `arrow-big-up`
4. **Installs** packages via `pnpm add @lucide-animated/{icon-name}`
5. **Updates** imports:
   - From: `import { Icon } from 'lucide-react'`
   - To: `import Icon from '@lucide-animated/icon-name'`

### Edge Cases Handled

✅ **Multiple icons per file**

```tsx
// Before
import { ChevronDown, Menu, X } from 'lucide-react';

// After - each gets its own import
import ChevronDown from '@lucide-animated/chevron-down';
import Menu from '@lucide-animated/menu';
import X from '@lucide-animated/x';
```

✅ **Icon aliases**

```tsx
// Before
import { ChevronDown as ChevDown } from 'lucide-react';

// After - preserves the alias
import ChevronDown from '@lucide-animated/chevron-down';
// Usage in component still uses ChevDown
```

✅ **Mixed imports** (some icons, some types)

```tsx
// Before
import { ChevronDown, LucideProps } from 'lucide-react';

// After - types stay, icons move
import type { LucideProps } from 'lucide-react';
import ChevronDown from '@lucide-animated/chevron-down';
```

✅ **Large batches** - Installs in batches of 10 to avoid command line length limits

### Common Scenarios

#### Scenario 1: First Time Upgrade

```bash
# Preview what will happen
pnpm upgrade:icons:dry

# Review the output, then apply
pnpm upgrade:icons
```

#### Scenario 2: Already Installed Packages

```bash
# Just update the imports, skip installation
node tools/upgrade-to-lucide-animated.mjs --skip-install
```

#### Scenario 3: Selective Upgrade

The script upgrades ALL icons. If you only want to upgrade specific icons, manually edit the imports or modify the script.

### Troubleshooting

#### "No icons found"

- Make sure you're importing from `'lucide-react'` (not `"lucide-react"` or other variants)
- Check that files are in the `src/` directory
- Icons must be in named imports: `import { Icon } from 'lucide-react'`

#### "Installation failed"

- Check your internet connection
- Verify pnpm is working: `pnpm --version`
- Some icons might not exist in `@lucide-animated` - check their docs

#### "Import errors after upgrade"

- Run `pnpm install` to ensure all packages are installed
- Check the console output for which packages were installed
- Verify the icon name is correct (case-sensitive)

### Technical Details

**Icon Name Conversion:**

```javascript
ChevronDown    → chevron-down
ArrowBigUp     → arrow-big-up
XCircle        → x-circle
Menu           → menu
```

**Package Installation:**

```bash
@lucide-animated/chevron-down
@lucide-animated/arrow-big-up
@lucide-animated/x-circle
@lucide-animated/menu
```

**Import Format:**

```typescript
// Old
import { IconName } from 'lucide-react';

// New
import IconName from '@lucide-animated/icon-name';
```

### Performance

- **Scans**: ~100 files in < 1 second
- **Installs**: Depends on number of icons (batched for efficiency)
- **Updates**: Instant file updates

### Safety

- ✅ Creates backups via git (commit before running)
- ✅ Dry-run mode to preview changes
- ✅ Non-destructive (doesn't delete files)
- ✅ Atomic updates (all or nothing per file)

### Recommendations

1. **Commit your changes** before running
2. **Run dry-run first** to preview
3. **Test your app** after upgrading
4. **Check for import errors** in your IDE

---

## Other Tools

### dev.mjs

Custom dev server wrapper with additional logging and cleanup.

**Usage:**

```bash
pnpm dev        # Normal dev server
pnpm dev:clean  # Clean .next cache first
```

---

**Last Updated**: January 3, 2026
