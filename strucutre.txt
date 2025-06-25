ChessPunk/
├── .git/                         # Git repo config (auto-created by `git init`)
├── .gitignore                    # Ignores node_modules, .env*, etc.
├── .env.local                    # Local environment variables (never commit this)
├── next.config.js                # Next.js config (modify if needed)
├── package.json                  # Project dependencies and scripts
├── postcss.config.js            # Tailwind + PostCSS config
├── tailwind.config.js           # Tailwind config (custom themes, etc.)
├── tsconfig.json | jsconfig.json # TS or JS config
├── public/                       # Static assets (images, favicon, etc.)
│   ├── favicon.ico
│   └── images/
├── styles/
│   └── globals.css              # Tailwind CSS imports (@tailwind base/components/utilities)
├── pages/                        # Routes = File names (Next.js convention)
│   ├── _app.tsx                 # Custom app component (includes global CSS)
│   ├── index.tsx                # Home page
│   └── api/                     # Serverless API routes
│       └── hello.ts
├── components/                  # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Button.tsx
├── context/                     # React Context Providers (e.g., Auth, Theme)
│   └── WalletContext.tsx
├── lib/                         # Helper functions (API, utils, etc.)
│   └── solana.ts
├── types/                       # Custom TypeScript types
│   └── index.d.ts
├── constants/                   # Constant values (e.g., chain IDs, network URLs)
│   └── config.ts
└── README.md                    # Project description and instructions
