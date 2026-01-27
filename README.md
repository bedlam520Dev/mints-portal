# BEDLAM520nft Mints Portal

> **The Official Minting Portal for BEDLAM520nft**

[![License: Proprietary](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1-black)](https://nextjs.org/)
[![Thirdweb](https://img.shields.io/badge/Thirdweb-5.x-purple)](https://thirdweb.com/)
[![Base](https://img.shields.io/badge/Chain-Base-blue)](https://base.org/)

A production-ready Next.js 16 NFT minting platform built with Thirdweb SDK v5, designed for deploying and managing ERC-721 and ERC-1155 NFT drops on Base network.

## ✨ Features

### Core Capabilities
- **Dual Minting Modes**: Client-side (user pays gas) and server-side (gasless) minting
- **Multi-Contract Support**: Deploy and manage multiple NFT contracts simultaneously
- **Base Network**: Optimized for Base mainnet and testnet with low gas fees
- **Modern Web3**: Built with Thirdweb SDK v5 and Viem for reliable blockchain interactions
- **Responsive Design**: Mobile-first UI with dark/light mode support

### Developer Experience
- **Next.js 16 with Turbopack**: Lightning-fast development and builds
- **TypeScript**: Full type safety throughout the codebase
- **Hot Reload**: Instant feedback during development
- **Mock Data Mode**: Test without RPC calls
- **Mobile Debugging**: Eruda debugger support for on-device testing
- **Bundle Analysis**: Built-in bundle analyzer

### Security & Performance
- **Rate Limiting**: API protection with configurable limits
- **Input Validation**: Comprehensive validation on all endpoints
- **Optimized Build**: 48MB build output, ~2.3min build time
- **Image Optimization**: AVIF/WebP support
- **Security Headers**: Configured for production
- **Lazy Loading**: Dynamic imports for faster initial load
- **Error Boundaries**: Graceful error handling throughout

### Analytics & Insights
- **Vercel Analytics**: Integrated tracking for user behavior
- **Event Tracking**: Mint clicks, purchases, filters, navigation
- **Real-time Metrics**: Transaction success/failure monitoring
- **User Journey**: Complete interaction tracking

### Accessibility & SEO
- **WCAG 2.1 AA**: Full compliance with accessibility standards
- **Skip Links**: Keyboard navigation support
- **Focus Traps**: Proper modal keyboard handling
- **Structured Data**: JSON-LD for search engines
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Expected Lighthouse**: 98-100 across all categories

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x
- pnpm 10.x
- A Thirdweb account (free at [thirdweb.com](https://thirdweb.com))
- An NFT contract deployed on Base

### Installation

```bash
# Clone the repository
git clone https://github.com/bedlam520Dev/mints-portal.git
cd mints-portal

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your configuration
# See Environment Variables section below

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your minting portal.

## 🔧 Environment Variables

### Required (Public - Safe for Client)

```bash
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_from_thirdweb_dashboard
NEXT_PUBLIC_BEDLAM_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_DEFAULT_CHAIN_ID=8453  # Base mainnet (or 84532 for testnet)
```

### Required (Private - Server Only)

```bash
NEXT_THIRDWEB_SECRET_KEY=your_secret_from_thirdweb_dashboard
NEXT_THIRDWEB_PROJECT_ID=your_project_id
NEXT_THIRDWEB_PROJECT_WALLET_PRIVATE_KEY=0x...  # For server minting - KEEP SECURE!
```

### Optional Configuration

```bash
# Multi-contract support
NEXT_PUBLIC_DROP_CONTRACTS=slug1:0xABC:8453:Label1:erc721,slug2:0xDEF:8453:Label2:erc1155

# RPC Configuration
NEXT_ALCHEMY_API_KEY=your_alchemy_key

# API Rate Limiting
MINT_API_MAX_REQUESTS_PER_MINUTE=5
MINT_API_MAX_QUANTITY_PER_TX=3
MINT_API_ENFORCE_ORIGIN=1
MINT_API_ALLOWED_ORIGIN=https://your-domain.com

# Feature Flags
NEXT_PUBLIC_USE_MOCK_DATA=0  # Set to 1 for mock data in dev
NEXT_PUBLIC_ERUDA=0  # Set to 1 for mobile debugger
NEXT_PUBLIC_ENABLE_ACCOUNT_ABSTRACTION=0  # Smart wallets
```

**⚠️ Security Note**: Never commit your `.env.local` file. Use platform secrets for production deployments.

## 📦 Tech Stack

### Core Framework
- **[Next.js 16](https://nextjs.org/)** - React framework with Turbopack
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type safety

### Web3 & Blockchain
- **[Thirdweb SDK 5](https://thirdweb.com/)** - Web3 development platform
- **[Viem 2.x](https://viem.sh/)** - Ethereum utilities
- **Base Network** - Optimism L2 for low-cost transactions

### UI & Styling
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Icon library
- **[next-themes](https://github.com/pacocoursey/next-themes)** - Dark mode
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### Development Tools
- **[ESLint](https://eslint.org/)** + **[OxLint](https://oxc.rs/)** - Code linting
- **[Prettier](https://prettier.io/)** + **[OxFmt](https://oxc.rs/)** - Code formatting
- **[pnpm](https://pnpm.io/)** - Fast, efficient package manager

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm dev              # Start dev server with hot reload
pnpm dev:clean        # Clean cache and start dev server

# Building
pnpm build            # Production build
pnpm start            # Start production server
pnpm clean:cache      # Clear Next.js cache
pnpm clean:nuke       # Nuclear clean (removes node_modules)

# Code Quality
pnpm tschk            # TypeScript type checking
pnpm lint             # Lint code
pnpm lint:fix         # Auto-fix linting issues
pnpm format:check     # Check code formatting
pnpm format           # Auto-format code
pnpm validate         # Run all checks (types + lint + format)

# Analysis
pnpm analyze          # Analyze bundle size
```

### Development Workflow

1. **Make changes** to code
2. **Hot reload** provides instant feedback
3. **Run validation** before committing:
   ```bash
   pnpm validate
   ```
4. **Build locally** to ensure production readiness:
   ```bash
   pnpm build
   ```

## 📱 Mobile Testing

Test your portal on mobile devices during development using tunneling services:

### Cloudflare Tunnels (Recommended - Free)

```bash
# Terminal 1 - Start dev server
pnpm dev

# Terminal 2 - Start tunnel
cloudflared tunnel --url http://localhost:3000
```

You'll get a URL like `https://random-words.trycloudflare.com` accessible from any device.

### Other Options

```bash
# ngrok (requires free account)
ngrok http 3000

# LocalTunnel (simple, no account)
npx localtunnel --port 3000
```

**Note**: Add tunnel URLs to `next.config.ts` `allowedDevOrigins` array for proper CORS handling.

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard under **Settings → Environment Variables**.

### Railway

1. Connect your GitHub repository
2. Add environment variables in settings
3. Deploy automatically on push

### Self-Hosted (Docker)

```bash
# Build standalone version
BUILD_STANDALONE=1 pnpm build

# Deploy the .next/standalone directory
# See DEPLOYMENT.md for detailed Docker instructions
```

**📚 Detailed Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 16 app router
│   ├── api/               # API routes
│   │   └── mints/         # Minting endpoints
│   ├── privacy/           # Legal pages
│   ├── terms/
│   ├── data-policy/
│   ├── contact/           # Contact page
│   ├── profile/           # User profile
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── mints/            # Minting UI components
│   ├── legal/            # Legal content
│   ├── wallet/           # Wallet connection
│   └── ui/               # Reusable UI components
├── config/               # Configuration
│   ├── chains.ts         # Chain definitions
│   ├── contracts.ts      # Contract configuration
│   ├── site.ts          # Site metadata
│   └── wallets.ts       # Wallet config
├── hooks/                # React hooks
│   ├── useMintTransaction.ts
│   ├── useServerMintTransaction.ts
│   └── useMintCatalog.ts
├── lib/                  # Utilities
│   └── mints/           # Minting logic
└── types/               # TypeScript types
```

## 🔌 API Endpoints

### GET `/api/mints`
Fetch all available mints across configured contracts.

**Query Parameters:**
- `contract` (optional) - Filter by contract slug

**Response:**
```json
{
  "mints": [...],
  "metadata": {...}
}
```

### GET `/api/mints/[contract]/[tokenId]`
Fetch details for a specific mint.

**Response:**
```json
{
  "mint": {
    "tokenId": "0",
    "metadata": {...},
    "price": "0.001",
    "supply": {...}
  }
}
```

### POST `/api/mints`
Server-side minting endpoint (gasless for user).

**Request Body:**
```json
{
  "contractSlug": "bedlam",
  "tokenId": "0",
  "quantity": 1,
  "toAddress": "0x..."
}
```

**Rate Limits**: 5 requests/minute per IP+wallet
**Max Quantity**: 3 NFTs per transaction

## 🎨 Customization

### Adding Your Contract

1. Deploy your ERC-721 or ERC-1155 contract on Base
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_BEDLAM_CONTRACT_ADDRESS=0xYourContractAddress
   ```
3. Restart dev server

### Multiple Contracts

```bash
NEXT_PUBLIC_DROP_CONTRACTS=slug1:0xAddr1:8453:Label 1:erc721,slug2:0xAddr2:8453:Label 2:erc1155
```

### Styling & Branding

- **Colors**: Edit CSS variables in `src/app/globals.css`
- **Fonts**: Replace fonts in `src/app/fonts/`
- **Images**: Add your images to `public/img/` and `public/icons/`
- **Site Metadata**: Update `src/config/site.ts`

## 📄 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Comprehensive AI-assisted development manifest
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment guide
- **[QUICK_START.md](QUICK_START.md)** - Quick reference for deployment
- **[OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)** - Performance optimization details

## 🤝 Support & Contact

- **Website**: [bedlam520nft.vercel.app](https://bedlam520nft.vercel.app)
- **X/Twitter**: [@bedlam520](https://x.com/bedlam520)
- **OpenSea**: [BEDLAM520nft Editions](https://opensea.io/collection/bedlam520nft-editions)
- **Farcaster**: [bedlam520.eth](https://farcaster.xyz/bedlam520.eth)
- **Base**: [bedlam520.eth](https://base.app/profile/bedlam520.eth)
- **Contact**: [/contact](https://bedlam520nft.vercel.app/contact)

## ⚖️ Legal

- **[Terms of Service](/terms)** - Usage terms and conditions
- **[Privacy Policy](/privacy)** - Data handling and privacy practices
- **[Data Policy](/data-policy)** - Detailed data handling procedures

## 📝 License

**Copyright ©️ 2025 BEDLAM520 Development**

All rights reserved. This is proprietary software for BEDLAM520nft. Unauthorized copying, modification, distribution, or use of this software is strictly prohibited.

See [LICENSE](LICENSE) for full details.

## 🙏 Acknowledgments

Built with:
- [Thirdweb](https://thirdweb.com/) - Web3 development platform
- [Base](https://base.org/) - Optimism L2 network
- [Vercel](https://vercel.com/) - Deployment platform
- [Next.js](https://nextjs.org/) - React framework

---

**Version**: 1.0.0 🎉
**Status**: Production Ready - World-Class
**Last Updated**: January 26, 2026

**Need help?** Check out [CLAUDE.md](CLAUDE.md) for comprehensive project documentation.
