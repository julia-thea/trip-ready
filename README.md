# Trip Ready

Built because I'm tired of forgetting chargers. Generates smart packing lists from 50+ templates, weather data &amp; your past trips. Next.js · TypeScript · Express · PostgreSQL · Docker

**Smart packing lists for every journey.**

Trip Ready generates personalized packing lists based on destination weather, trip type, and duration. Collaborate with travel companions, save preferences, and never forget essentials.

🔗 **Live Demo:** [https://trip-ready-api.vercel.app](https://trip-ready-api.vercel.app)
📹 **Video Walkthrough:**

## ✨ Features

- 🌍 Weather-based packing recommendations
- ✈️ Trip type templates (business, adventure, beach, city)
- 📝 Customizable item lists with categories
- 👥 Collaborative packing with shared lists
- 📊 Trip statistics and packing history
- 🔐 Secure authentication with OAuth
- 💳 Premium features via Stripe

## 🛠️ Tech Stack

**Frontend:** Next.js 14, React, Redux, TypeScript, Tailwind CSS, Material-UI  
**Design:** Figma  
**Backend:** Express, Node.js, Prisma, PostgreSQL  
**Infrastructure:** Docker, AWS (ECS, RDS, S3, Secrets Manager, CloudWatch), Redis, BullMQ  
**Testing:** Jest, Playwright  
**DevOps:** GitHub Actions, Vercel, AWS Elastic Beanstalk/ECS

## 📸 Screenshots

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/julia-thea/trip-ready.git
cd trip-ready
```

2. Install dependencies:
```bash
npm install
```

### Running Locally

**Frontend (Next.js):**
```bash
cd apps/web
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000)

**Backend (Express API):**
```bash
cd apps/api
npm run dev
```
API runs on [http://localhost:8000](http://localhost:8000)

Test the health endpoint:
```bash
curl http://localhost:8000/health
```

## 🧪 Testing

Run tests for the frontend:
```bash
cd apps/web
npm test
```

Run tests for the API:
```bash
cd apps/api
npm test
```

Run linter:
```bash
npm run lint
```

## 📝 License

MIT

[![CI](https://github.com/julia-thea/trip-ready/actions/workflows/ci.yml/badge.svg)](https://github.com/julia-thea/trip-ready/actions/workflows/ci.yml)