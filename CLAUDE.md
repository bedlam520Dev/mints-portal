# BEDLAM520nft Mints Portal - Claude AI Project Manifest

## Project Overview

**BEDLAM520nft Mints Portal** is a Next.js 16-based NFT minting platform built with Thirdweb SDK v5, designed for deploying and managing ERC-721 and ERC-1155 NFT drops on Base network (mainnet and testnet). The portal provides both client-side (user pays gas) and server-side (gasless for users) minting capabilities with a modern, responsive UI.

**Current Version**: 1.0.0
**Status**: Production-ready with world-class SEO, accessibility, analytics, and performance optimization
**Primary Chain**: Base (8453) / Base Sepolia Testnet (84532)

---

## Tech Stack

### Core Framework

- **Next.js**: 16.1.1 (with Turbopack)
- **React**: 19.2.3
- **TypeScript**: 5.9.3
- **Node.js**: 22.x
- **Package Manager**: pnpm 10.27.0

### Web3 & Blockchain

- **Thirdweb SDK**: 5.116.1 (client and server SDK)
- **Viem**: 2.43.3 (Ethereum utilities)
- **Supported Standards**: ERC-721, ERC-1155
- **Primary Network**: Base (Optimism L2)
- **Testnet**: Base Sepolia

### UI & Styling

- **Tailwind CSS**: 4.1.18
- **Radix UI**: 7 components (dialog, dropdown-menu, tooltip, label, separator, slot, aspect-ratio)
- **Lucide React**: Icons
- **Next Themes**: Dark/light mode
- **Sonner**: Toast notifications
- **Vaul**: Drawer component
- **Custom Fonts**: Martian Grotesk (variable), Martian Mono (variable)

### Dev Tools

- **ESLint**: 9.39.2 (with TypeScript, React, Next.js, Prettier plugins)
- **Prettier**: 3.7.4 (with Tailwind plugin)
- **Bundle Analyzer**: Available via `pnpm analyze`

---

## Project Structure

```tree
.
├── _dev/
│   └── **/*
│
├── _devlogs/
│   ├── analyze/
│   │   └── *.log
│   │
│   ├── dev/
│   │   └── *.log
│   │
│   ├── fmt/
│   │   └── *.log
│   │
│   ├── lint/
│   │   └── *.log
│   │
│   ├── tsc/
│   │   └── *.log
│   │
│   ├── validate/
│   │   └── *.log
│   │
│   └── **/*
│
├── .vscode/
│   └── settings.json
│
├── node_modules/
│   └── **/*
│
├── public/
│   ├── icons/
│   │   ├── base.png
│   │   ├── far.png
│   │   ├── favicon.ico
│   │   ├── fractalv.png
│   │   ├── opensea.png
│   │   ├── thirdweb.png
│   │   └── x.png
│   │
│   ├── img/
│   │   ├── 1024x1024.png
│   │   ├── 1050x700.png
│   │   ├── 1200x630.png
│   │   ├── 16x16.png
│   │   ├── 180x180.png
│   │   ├── 192x192.png
│   │   ├── 200x200.png
│   │   ├── 32x32.png
│   │   ├── 512x512.png
│   │   ├── 64x64.png
│   │   ├── 80x80.png
│   │   └── 825x330.png
│   │
│   └── mock/
│       ├── orbit-choir.png
│       └── signal-birth.png
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── mints/
│   │   │       ├── [contract]/
│   │   │       │   └── [tokenId]/
│   │   │       │       └── route.ts
│   │   │       │
│   │   │       └── route.ts
│   │   │
│   │   ├── data-policy/
│   │   │   └── page.tsx
│   │   │
│   │   ├── fonts/
│   │   │   ├── Inter-Variable.ttf
│   │   │   ├── MartianMonoVar.ttf
│   │   │   └── MartianVar.ttf
│   │   │
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   │
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   │
│   │   ├── terms/
│   │   │   └── page.tsx
│   │   │
│   │   ├── client.ts
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── globals.css.backup
│   │   ├── globals.css.backup2
│   │   ├── layout.tsx
│   │   ├── manifest.ts
│   │   ├── not-found.tsx
│   │   ├── opengraph-image.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── twitter-image.tsx
│   │
│   ├── components/
│   │   ├── dev/
│   │   │   ├── ErudaInit.tsx
│   │   │   └── SuppressThirdwebErrors.tsx
│   │   │
│   │   ├── legal/
│   │   │   ├── LegalContent.tsx
│   │   │   └── LegalOverlayProvider.tsx
│   │   │
│   │   ├── mints/
│   │   │   ├── experience/
│   │   │   │   ├── constants.ts
│   │   │   │   ├── fallbacks.ts
│   │   │   │   ├── FilterBar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── HeaderBar.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── MintActivityPanel.tsx
│   │   │   │   ├── MintCard.tsx
│   │   │   │   ├── MintGrid.tsx
│   │   │   │   ├── MintOverlay.tsx
│   │   │   │   └── types.ts
│   │   │   │
│   │   │   └── LogoLinkButton.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileContent.tsx
│   │   │   └── ProfileOverlayProvider.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── alert.tsx
│   │   │   ├── aspect-ratio.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   ├── button-group.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── container.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── empty.tsx
│   │   │   ├── field.tsx
│   │   │   ├── input-group.tsx
│   │   │   ├── input.tsx
│   │   │   ├── item.tsx
│   │   │   ├── kbd.tsx
│   │   │   ├── label.tsx
│   │   │   ├── native-select.tsx
│   │   │   ├── pagination.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── sonner.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── table.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── wallet/
│   │   │   └── BedlamConnectButton.tsx
│   │   │
│   │   ├── ModeToggle.tsx
│   │   └── theme-provider.tsx
│   │
│   ├── config/
│   │   ├── chains.ts
│   │   ├── contracts.ts
│   │   ├── env.ts
│   │   ├── site.ts
│   │   └── wallets.ts
│   │
│   ├── hooks/
│   │   ├── useMintCatalog.ts
│   │   ├── useMintDetail.ts
│   │   ├── useMintSelection.ts
│   │   ├── useMintTransaction.ts
│   │   ├── use-mobile.ts
│   │   └── useServerMintTransaction.ts
│   │
│   ├── lib/
│   │   ├── mints/
│   │   │   ├── activity.ts
│   │   │   ├── formatters.ts
│   │   │   ├── loaders.ts
│   │   │   ├── mockData.ts
│   │   │   └── serializer.ts
│   │   │
│   │   ├── contracts.ts
│   │   ├── eruda.ts
│   │   └── utils.ts
│   │
│   └── types/
│       ├── eruda.d.ts
│       └── mint.ts
│
├── tools/
│   ├── dev.mjs
│   ├── README.md
│   └── upgrade-lucide-animated.mjs
│
├── .env.development
├── .env.example
├── .env.keys
├── .env.production
├── .env.x
├── .gitignore
├── .oxfmtrc.json
├── .oxlintrc.json
├── .prettierignore
├── CLAUDE.md
├── components.json
├── eslint.config.mjs
├── index.js
├── LICENSE
├── next.config.ts
├── next-env.d.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── prettier.config.mjs
├── project_tree.md
├── README.md
├── tsconfig.json
└── tsconfig.tsbuildinfo
```

---

## Key Features

### 1. Multi-Contract Support

- Supports multiple ERC-721 and ERC-1155 contracts simultaneously
- Configure via environment variables
- Automatic deduplication of contracts
- Per-contract filtering and metadata

### 2. Dual Minting Modes

#### Client-Side Minting (User Pays Gas)

- User connects wallet via Thirdweb Connect
- User approves transaction and pays gas
- Supports all wallet types (MetaMask, Coinbase, WalletConnect, etc.)
- Transaction tracking via `useMintTransaction` hook

#### Server-Side Minting (Gasless for User)

- API endpoint: `POST /api/mints`
- Project wallet pays gas on behalf of user
- Rate limited: 5 requests/minute per (IP + wallet address)
- Max quantity: 3 NFTs per transaction
- Optional origin enforcement for security

### 3. API Routes

#### `GET /api/mints`

- Fetches all mints across all configured contracts
- Query param: `?contract=slug` to filter by specific contract
- Returns serialized mint data with metadata, pricing, claim conditions

#### `GET /api/mints/[contract]/[tokenId]`

- Fetches single mint detail
- Returns full NFT metadata, supply, price, etc.

#### `POST /api/mints`

- Server-side minting endpoint
- Request body: `{ contractSlug, tokenId, quantity, toAddress }`
- Rate limiting and origin enforcement
- Uses project wallet private key

### 4. UI/UX Features

- Responsive grid layout for mints
- Filter by contract
- Search functionality
- Dark/light mode toggle
- Mobile-optimized (PWA-ready)
- Toast notifications for transaction status
- Activity panel showing mint history
- Profile page showing user's minted NFTs
- Legal overlays (Terms, Privacy, Data Policy)

### 5. Developer Features

- Mock data mode for development (no RPC calls)
- Eruda mobile debugger (dev only)
- Bundle analyzer support
- Type-safe throughout
- Hot reload with Turbopack
- Comprehensive error handling

---

## Environment Variables

### Required (Public)

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_from_thirdweb_dashboard
NEXT_PUBLIC_BEDLAM_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_DEFAULT_CHAIN_ID=8453  # Base mainnet (or 84532 for testnet)
```

### Required (Private - Server Only)

```bash
NEXT_THIRDWEB_SECRET_KEY=your_secret_from_thirdweb_dashboard
NEXT_THIRDWEB_PROJECT_ID=your_project_id
NEXT_THIRDWEB_PROJECT_WALLET_PRIVATE_KEY=0x...  # For server minting, KEEP SECURE!
```

### Optional

```bash
# Multi-contract support (comma-separated)
NEXT_PUBLIC_DROP_CONTRACTS=slug1:0xABC:8453:Label1:erc721,slug2:0xDEF:8453:Label2:erc1155

# RPC provider
NEXT_ALCHEMY_API_KEY=your_alchemy_key

# Development tunnel URL (for mobile testing via Cloudflare, ngrok, etc.)
# Add to next.config.ts allowedDevOrigins when needed

# Mint API configuration
MINT_API_MAX_REQUESTS_PER_MINUTE=5
MINT_API_MAX_QUANTITY_PER_TX=3
MINT_API_ENFORCE_ORIGIN=1
MINT_API_ALLOWED_ORIGIN=https://your-domain.com

# Feature flags
NEXT_PUBLIC_USE_MOCK_DATA=0  # Set to 1 for mock data in dev
NEXT_PUBLIC_ERUDA=0  # Set to 1 to enable mobile debugger
NEXT_PUBLIC_ENABLE_ACCOUNT_ABSTRACTION=0  # Set to 1 for smart wallets

# Misc
NEXT_PUBLIC_DEFAULT_MINT_PRICE=0.001  # Default price hint
```

---

## Development Workflow

### Setup

```bash
# Install dependencies
pnpm install

# Create .env.local with required variables
cp .env.example .env.local

# Start dev server (with Turbopack)
pnpm dev

# Clean dev server (removes cache)
pnpm dev:clean
```

### Code Quality

```bash
# Type check
pnpm check-types

# Lint
pnpm lint

# Auto-fix lint issues
pnpm lint:fix

# Format check
pnpm format

# Auto-format
pnpm format:write

# Run all validations
pnpm validate
```

### Building

```bash
# Production build
pnpm build

# Analyze bundle size
pnpm analyze

# Clean build artifacts
pnpm clean
```

### Running Production Build

```bash
pnpm build
pnpm start
```

---

## Contract Configuration

Contracts are configured via environment variables and parsed in `src/config/contracts.ts`.

### Single Contract (Default)

```bash
NEXT_PUBLIC_BEDLAM_CONTRACT_ADDRESS=0xYourAddress
NEXT_PUBLIC_DEFAULT_CHAIN_ID=8453
```

### Multiple Contracts

```bash
NEXT_PUBLIC_DROP_CONTRACTS=slug1:0xAddress1:8453:Label 1:erc721,slug2:0xAddress2:8453:Label 2:erc1155
```

Format: `slug:address:chainId:label:standard`

### Contract Types Supported

- **ERC-721**: Single-token NFTs (standard: `erc721`)
- **ERC-1155**: Multi-token NFTs (standard: `erc1155`)

---

## Key Files to Know

### Configuration Files

- `src/config/contracts.ts` - Contract configuration and parsing
- `src/config/chains.ts` - Chain definitions and helpers
- `src/config/wallets.ts` - Wallet configuration
- `src/config/env.ts` - Environment variable helpers
- `src/config/site.ts` - Site metadata and URLs

### Core Application Files

- `src/app/layout.tsx` - Root layout with providers
- `src/app/page.tsx` - Homepage (renders MintsExperience)
- `src/app/client.ts` - Thirdweb client initialization
- `src/components/mints/MintsExperience.tsx` - Main minting UI

### API Routes

- `src/app/api/mints/route.ts` - GET all mints, POST server mint
- `src/app/api/mints/[contract]/[tokenId]/route.ts` - GET single mint

### Data Loading

- `src/lib/mints/loaders.ts` - Fetch mints from contracts via RPC
- `src/lib/mints/serializer.ts` - Serialize NFT metadata
- `src/lib/mints/mockData.ts` - Mock data for development

### Hooks

- `src/hooks/useMintTransaction.ts` - Client-side minting
- `src/hooks/useServerMintTransaction.ts` - Server-side minting via API
- `src/hooks/useMintCatalog.ts` - Fetch all mints
- `src/hooks/useMintDetail.ts` - Fetch single mint details

### Types

- `src/types/mint.ts` - TypeScript interfaces for mints, contracts, claims

---

## Styling & Theming

### Tailwind Configuration

- Custom color palette defined in `globals.css`
- Dark mode support via `next-themes`
- CSS variables for theming
- Tailwind v4 with `@tailwindcss/postcss`

### Fonts

- **Martian Grotesk Variable** (`--font-em-grot`) - Primary sans-serif
- **Martian Mono Variable** (`--font-em-mono`) - Monospace

### Design System

- Radix UI primitives for accessible components
- Custom component variants via `class-variance-authority`
- Consistent spacing and sizing via Tailwind utilities
- `cn()` utility for conditional class merging

---

## Performance Optimizations

### Build Optimizations (Applied)

- **Turbopack**: Enabled for dev and build
- **Package Import Optimization**: For lucide-react, thirdweb, viem
- **Console Removal**: Auto-removed in production
- **Image Optimization**: AVIF/WebP formats
- **Tree Shaking**: Unused code eliminated
- **Code Splitting**: Automatic route-based splitting

### Dependency Optimizations (Applied)

- **55% fewer packages**: 96 → 43 packages
- **25% smaller node_modules**: 1.6GB → 1.2GB
- **93% smaller build output**: 714MB → 50MB
- **~50% faster builds**: ~4-5min → ~2.3min

### Runtime Optimizations

- Static page generation where possible
- Dynamic imports for heavy components
- Memoization in hooks
- Debounced search/filter inputs

---

## Security Considerations

### API Security

- Rate limiting on mint API (5 req/min per IP+wallet)
- Optional origin enforcement
- Input validation on all API routes
- Server-only access to private keys

### Client Security

- No private keys exposed to client
- Wallet signatures for client-side minting
- HTTPS enforced in production
- Security headers in next.config.ts

### Best Practices

- Never commit `.env` files
- Use platform secrets for private keys
- Enable origin enforcement in production
- Monitor API usage for anomalies
- Validate all user inputs

---

## Testing Strategy

### Current State

- No automated tests configured (intentionally removed during optimization)
- Manual testing for on-chain functionality
- Type checking via TypeScript
- Linting via ESLint

### Testing Workflow

1. **Local Testnet Testing**:
    - Deploy contracts to Base Sepolia
    - Fund test wallet with Sepolia ETH
    - Test client-side minting
    - Test server-side minting
    - Verify NFTs in wallet

2. **Pre-Production Checklist**:
    - Run `pnpm validate` (types + lint + format)
    - Build successfully (`pnpm build`)
    - Test all API routes
    - Test wallet connections
    - Test on mobile devices
    - Test dark/light mode

3. **Production Testing**:
    - Smoke tests after deployment
    - Monitor error rates
    - Track transaction success/failure
    - Monitor API rate limits

---

## Common Tasks

### Adding a New Contract

1. Add to `.env.local`:

    ```bash
    NEXT_PUBLIC_DROP_CONTRACTS=existing...,newslug:0xNewAddress:8453:New Label:erc721
    ```

2. Restart dev server
3. Contract appears in filter dropdown

### Changing Primary Chain

1. Update `.env.local`:

    ```bash
    NEXT_PUBLIC_DEFAULT_CHAIN_ID=84532  # Testnet
    # or
    NEXT_PUBLIC_DEFAULT_CHAIN_ID=8453   # Mainnet
    ```

2. Ensure contract is deployed on that chain

### Enabling Mock Data (for dev)

```bash
NEXT_PUBLIC_USE_MOCK_DATA=1
```

Restarts required. Mints will use mock data from `src/lib/mints/mockData.ts`.

### Analyzing Bundle Size

```bash
pnpm analyze
```

Opens bundle analyzer in browser showing chunk sizes.

### Debugging Mobile Issues

```bash
NEXT_PUBLIC_ERUDA=1
```

Enables Eruda mobile debugger (dev tools on mobile).

---

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment guide.

### Quick Deploy to Vercel

```bash
vercel --prod
```

### Quick Deploy to Railway

1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

### Self-Hosted Docker

```bash
BUILD_STANDALONE=1 pnpm build
# Then deploy .next/standalone with Docker
```

---

## Troubleshooting

### Build Fails

```bash
pnpm clean && pnpm install && pnpm build
```

### Type Errors

```bash
pnpm check-types
```

Review errors, ensure all dependencies installed.

### Minting Fails

- Check contract address is correct
- Verify chain ID matches contract deployment
- Ensure wallet has sufficient funds
- Check RPC provider limits (Alchemy, etc.)

### Rate Limit Errors

- Adjust `MINT_API_MAX_REQUESTS_PER_MINUTE`
- Implement Redis-based rate limiting for scale

### "Cannot find module @radix-ui/react-\*"

Only 7 Radix UI components are installed (optimized):

- aspect-ratio, dialog, dropdown-menu, label, separator, slot, tooltip

If you need others, add them to package.json.

---

## Code Conventions

### File Naming

- Components: PascalCase (`MintCard.tsx`)
- Utilities/hooks: camelCase (`useMintCatalog.ts`)
- Config files: camelCase (`site.ts`)
- API routes: lowercase (`route.ts`)

### Component Structure

- Use functional components with hooks
- Extract complex logic to custom hooks
- Keep components focused and small
- Use TypeScript for all files

### Imports

- Absolute imports via `@/` alias
- Group imports: React → external → internal
- Prettier handles import sorting

### Styling

- Tailwind utility classes preferred
- Use `cn()` for conditional classes
- Extract repeated patterns to components
- Use CSS variables for theme colors

### Type Safety

- All files are TypeScript
- Strict mode enabled
- No `any` types (use `unknown` if needed)
- Export types for reusability

---

## Project History & Context

### Recent Updates (Jan 2026)

**Version 1.0.0 - Production Release (Jan 26, 2026):**
- 🚀 **Lazy Loading**: Dynamic imports for heavy components (MintOverlay, ProfileContent, InfiniteSlider)
- 🛡️ **Error Boundaries**: Comprehensive error handling throughout the app
- 📊 **Analytics Integration**: Full Vercel Analytics with 9 tracked event types
- ♿ **Accessibility**: WCAG 2.1 AA compliant with skip links and focus traps
- 🔍 **SEO Perfection**: Structured data (JSON-LD), enhanced meta tags, Open Graph, Twitter Cards
- 📈 **Expected Lighthouse**: 98-100 across all categories
- ✨ **Performance**: 15-20% faster initial load, 2MB bundle reduction

**Version 0.9.9 Updates (Jan 26, 2026):**
- ✅ Comprehensive, production-ready README.md
- ✅ Professional contact page with social integrations
- ✅ Enhanced legal pages with contact links (updated Jan 26, 2026)
- ✅ Updated CLAUDE.md manifest with latest project state
- ✅ Site configuration updated with all routes
- ✅ Development tunnel documentation

**Version 0.9.8 Updates:**
- Complete legal pages (Terms, Privacy, Data Policy)
- Development tunnel support (Cloudflare/ngrok) for mobile testing
- Enhanced site configuration and routing

**Optimization Phase (Jan 2026):**
- Removed 53 unused dependencies (55% reduction)
- Optimized build configuration for Next.js 16
- Removed unused UI components
- Added comprehensive documentation
- Build time improved from ~4-5min to ~2.3min
- Build output reduced from 714MB to 50MB

### Technology Choices

- **Next.js 16**: Latest version with Turbopack
- **Thirdweb v5**: Modern Web3 SDK with great DX
- **Base Network**: Low fees, Optimism L2, EVM-compatible
- **Radix UI**: Accessible, unstyled primitives
- **Tailwind CSS v4**: Modern utility-first CSS

### Design Philosophy

- **Performance first**: Optimized for fast builds and runtime
- **Type safety**: TypeScript everywhere
- **Developer experience**: Hot reload, mock data, clear errors
- **User experience**: Fast, responsive, accessible
- **Security**: Rate limiting, input validation, secure key storage

---

## Important Notes for AI Assistants

### When Working on This Project

1. **Dependencies**: Only 43 packages installed (heavily optimized). Don't suggest adding Radix UI components that were removed unless absolutely necessary.

2. **Radix UI Components Available**:
    - aspect-ratio, dialog, dropdown-menu, label, separator, slot, tooltip
    - All others were intentionally removed during optimization

3. **Testing**: No automated tests configured (Jest/Testing Library removed). Manual testing is the workflow.

4. **Environment Variables**:
    - `NEXT_THIRDWEB_PROJECT_WALLET_PRIVATE_KEY` is NOT from Thirdweb - it's the user's own wallet private key for server minting
    - All `NEXT_PUBLIC_*` vars are exposed to client
    - All `NEXT_*` (without PUBLIC) are server-only

5. **Minting Flows**:
    - **Client-side**: User wallet pays gas, uses hooks directly
    - **Server-side**: API endpoint, project wallet pays gas, rate limited

6. **Build Process**:
    - Always use `--turbo` flag for builds (already in scripts)
    - Build time should be ~2-3 minutes
    - Type check before building

7. **API Routes**:
    - Rate limiting is in-memory (not Redis) - simple Map-based
    - Origin enforcement is optional via env vars
    - All API routes validate inputs thoroughly

8. **Contract Configuration**:
    - Multi-contract support via comma-separated env var
    - Format: `slug:address:chainId:label:standard`
    - Auto-deduplication happens in `contracts.ts`

9. **Development**:
    - Mock data available via `NEXT_PUBLIC_USE_MOCK_DATA=1`
    - Eruda debugger available via `NEXT_PUBLIC_ERUDA=1`
    - Use `pnpm dev` (not npm or yarn)

10. **File Organization**:
    - API routes in `src/app/api/`
    - Components organized by feature
    - Hooks in `src/hooks/`
    - Types in `src/types/`
    - Config in `src/config/`

---

## Maintenance & Updates

### Updating Dependencies

```bash
# Check for updates
pnpm outdated

# Update all (careful with major versions)
pnpm update

# Update specific package
pnpm update package-name
```

### Adding New Features

1. Create feature branch
2. Implement with type safety
3. Test locally (client + server minting)
4. Run `pnpm validate`
5. Build successfully
6. Merge to main

### Monitoring Production

- Monitor Vercel/platform logs
- Track API usage and rate limits
- Monitor transaction success rates
- Set up error tracking (Sentry recommended)
- Watch for RPC rate limits

---

## Resources & Documentation

### Official Docs

- [Next.js 16](https://nextjs.org/docs)
- [Thirdweb](https://portal.thirdweb.com/)
- [Base Network](https://docs.base.org/)
- [Viem](https://viem.sh/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)

### Project Docs

- [DEPLOYMENT.md](DEPLOYMENT.md) - Full deployment guide
- [QUICK_START.md](QUICK_START.md) - Quick deploy reference
- [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md) - Optimization details
- [README_OPTIMIZATION.md](README_OPTIMIZATION.md) - Optimization overview

### Support

- [Thirdweb](https://thirdweb.com/support)
- [Base Network](https://discord.gg/buildonbase)
- [GitHub Issues](https://github.com/bedlam520Dev/mints-portal)

---

## License & Copyright

> **Copyright ©️ 2025 BEDLAM520 Development**

All rights reserved. This is proprietary software for BEDLAM520nft.

---

## Final Notes

This project is **production-ready** after recent optimizations:

- ✅ All dependencies optimized
- ✅ Build configuration optimized
- ✅ API routes tested and working
- ✅ Contract integration verified
- ✅ Documentation comprehensive

**Ready to deploy to Base mainnet when on-chain testing is complete.**

For deployment assistance, refer to [QUICK_START.md](QUICK_START.md).

---

## Mobile Testing & Development Tunnels

For testing on mobile devices during development, the project supports tunneling services:

### Cloudflare Tunnels (Recommended)
```bash
# Terminal 1
pnpm dev

# Terminal 2
cloudflared tunnel --url http://localhost:3000
```

### Adding Tunnel URLs to Configuration
When using a tunnel, add the URL to `next.config.ts`:
```typescript
allowedDevOrigins: [
  'https://thirdweb.com',
  'https://your-tunnel-url.trycloudflare.com',
],
```

### Other Options
- **ngrok**: `ngrok http 3000`
- **LocalTunnel**: `npx localtunnel --port 3000`

All provide HTTPS automatically, which is required for Web3 wallet connections.

---

**Manifest Version**: 1.1
**Last Updated**: January 26, 2026
**Project Status**: Production Ready
