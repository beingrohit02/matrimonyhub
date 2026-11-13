# MatrimonyHub - Quick Start Guide 
## 🚀 MatrimonyHub - Quick Start Guide

### Prerequisites Checklist
- [ ] Node.js 20+ installed (node --version)
- [ ] PostgreSQL 14+ running locally or cloud (Neon, Railway, Supabase)
- [ ] Git installed
- [ ] pnpm recommended (npm install -g pnpm) or use npm

---

### 1. Clone & Install (30 seconds)
`ash
cd R:\GITHUB\matrimony
pnpm install
# or: npm install
`

---

### 2. Configure Environment (1 minute)
`ash
cp .env.example .env
`

**Edit .env with your values:**

Required:
- DATABASE_URL="postgresql://user:password@localhost:5432/matrimony"
- NEXTAUTH_SECRET="generate with: openssl rand -base64 32"
- NEXTAUTH_URL="http://localhost:3000"

Optional (add later):
- Email (SMTP)
- AWS S3 (photo uploads)
- Google/GitHub OAuth

---

### 3. Initialize Database (30 seconds)
`ash
pnpm db:generate
pnpm db:push
pnpm db:seed
`

Expected: Admin created (admin@matrimony.com), Demo user created (demo@matrimony.com)

---

### 4. Start Development Server
`ash
pnpm dev
`
Open http://localhost:3000

---

### 5. Test Credentials
- Admin: admin@matrimony.com / admin123
- Demo: demo@matrimony.com / user123

---

### Docker Alternative
`ash
docker-compose up -d
docker-compose exec app pnpm db:push
docker-compose exec app pnpm db:seed
`

---

### Common Commands
| Command | Purpose |
|---------|---------|
| pnpm dev | Start dev server |
| pnpm db:studio | Open Prisma Studio |
| pnpm db:push | Push schema changes |
| pnpm db:seed | Re-seed demo data |
| pnpm build | Production build |
| pnpm lint | Check code style |

---

### Troubleshooting
- DATABASE_URL error → Check .env has correct PostgreSQL URL
- NEXTAUTH_SECRET error → Generate: openssl rand -base64 32
- Port 3000 in use → Change port or kill process
- Prisma client not found → Run pnpm db:generate
- Tables don't exist → Run pnpm db:push
- Module not found → Delete node_modules, run pnpm install

---

### Next Steps
1. Customize branding in tailwind.config.ts
2. Add OAuth in .env and src/lib/auth.ts
3. Set up email (SMTP)
4. Configure S3 for photo uploads
5. Deploy to Vercel + Railway/Neon
