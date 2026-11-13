# MatrimonyHub - Modern Matrimonial Platform

A full-stack matrimonial platform built with Next.js 14, PostgreSQL, Prisma, and NextAuth.js. Features include user registration, profile management, advanced partner search, real-time messaging, interest system, and admin panel.

## ?? Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 (Credentials + OAuth)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Forms**: React Hook Form + Zod validation
- **Real-time**: Socket.io (ready for chat/notifications)
- **Deployment**: Docker, Vercel, Railway/Neon

## ? Features

### User Features
- ?? Secure authentication (email/password + OAuth)
- ?? Comprehensive profile setup (basic info, education, career, family, lifestyle)
- ?? Advanced partner search with 20+ filters
- ?? Interest system (send/accept/decline)
- ?? Real-time messaging
- ?? Notifications
- ??? Privacy controls
- ?? Fully responsive design

### Admin Features
- ?? Dashboard with analytics
- ?? User management
- ?? Report moderation
- ?? Content management (static pages)
- ?? Site settings
- ?? System monitoring

## ?? Prerequisites

- Node.js 20+
- PostgreSQL 14+
- pnpm (recommended) or npm

## ??? Installation

### Local Development

1. **Clone and install dependencies**
```bash
cd matrimony
npm install
```

2. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Set up database**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate

# Seed database with demo data
npm run db:seed
```

4. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

### Docker Development

```bash
# Start all services
docker-compose up -d

# Run migrations
docker-compose exec app npx prisma migrate deploy

# Seed database
docker-compose exec app npm run db:seed
```

## ?? Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
npm run test         # Run tests
```

## ?? Project Structure

```
src/
+-- app/                    # Next.js App Router pages
¦   +-- (auth)/            # Auth routes (login, register)
¦   +-- (dashboard)/       # Protected user dashboard
¦   +-- admin/             # Admin panel
¦   +-- api/               # API routes
¦   +-- layout.tsx         # Root layout
¦   +-- page.tsx           # Landing page
¦   +-- globals.css        # Global styles
+-- components/
¦   +-- ui/                # shadcn/ui components
¦   +-- layout/            # Layout components (Header, Footer)
¦   +-- forms/             # Form components
+-- lib/
¦   +-- auth.ts            # NextAuth configuration
¦   +-- prisma.ts          # Prisma client
¦   +-- utils.ts           # Utility functions
¦   +-- validations.ts     # Zod schemas
+-- hooks/                 # Custom React hooks
+-- types/                 # TypeScript types
```

## ?? Default Credentials

After seeding:
- **Admin**: admin@matrimony.com / admin123
- **Demo User**: demo@matrimony.com / user123

## ?? Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker Production

```bash
# Build image
docker build -t matrimonyhub .

# Run with docker-compose (production)
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Database Providers
- **Neon** (serverless PostgreSQL)
- **Railway** (managed PostgreSQL)
- **Supabase** (PostgreSQL + auth)
- **PlanetScale** (MySQL - requires schema changes)

## ?? Security Features

- Password hashing with bcrypt (12 rounds)
- JWT-based sessions with httpOnly cookies
- CSRF protection
- Rate limiting ready
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (React)

## ?? Testing

```bash
npm run test          # Run unit tests
npm run test:ui       # Run tests with UI
```

## ?? License

MIT License - feel free to use for personal or commercial projects.

## ?? Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## ?? Support

For issues and feature requests, please open a GitHub issue.
