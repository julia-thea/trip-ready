# Trip Ready

Built because I'm tired of forgetting chargers. Generates smart packing lists from 50+ templates, weather data & your past trips.

Trip Ready generates personalized packing lists based on destination weather, trip type, and duration. Never forget essentials again.

## Features

- Weather-based packing recommendations
- Trip type templates (business, adventure, beach, city)
- Customizable item lists with categories
- Collaborative packing with shared lists
- Save and reuse lists across trips

## Tech Stack

**Frontend & API:** Next.js 16, React 19, TypeScript  
**Styling:** Tailwind CSS  
**Database:** PostgreSQL, Prisma (coming soon)  
**Testing:** Jest, React Testing Library  
**CI/CD:** GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/julia-thea/trip-ready.git
cd trip-ready
npm install
```

### Running Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm test`      | Run tests                |

## Project Structure

```
trip-ready/
├── app/                  # Next.js App Router
│   ├── api/             # API routes
│   ├── components/      # Shared components
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   ├── create-list/     # List builder
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Landing page
├── public/              # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## License

MIT

[![CI](https://github.com/julia-thea/trip-ready/actions/workflows/ci.yml/badge.svg)](https://github.com/julia-thea/trip-ready/actions/workflows/ci.yml)
