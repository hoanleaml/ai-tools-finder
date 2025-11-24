# Vercel Setup Checklist

Checklist nhanh để verify Story 1.5 deployment setup.

---

## ✅ Pre-Deployment Checklist

- [ ] Vercel account created
- [ ] GitHub repository exists và accessible
- [ ] Supabase project created với API keys
- [ ] `.env.example` file exists với đầy đủ variables
- [ ] `vercel.json` configuration file exists
- [ ] `package.json` có build script
- [ ] `.gitignore` excludes `.env*` files

---

## ✅ Vercel Project Setup

- [ ] GitHub repository connected to Vercel
- [ ] Project name configured
- [ ] Framework preset: Next.js (auto-detected)
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Install command: `npm install`
- [ ] Node.js version: 18.x or higher

---

## ✅ Environment Variables

### Required Variables (Development, Preview, Production)

- [ ] `NEXT_PUBLIC_SUPABASE_URL` added
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` added
- [ ] `SUPABASE_SERVICE_ROLE_KEY` added

### Optional Variables

- [ ] `OPENAI_API_KEY` (if needed for Epic 7)
- [ ] `NEXT_PUBLIC_APP_URL` (production only)
- [ ] `CRON_SECRET` (production only)

### Verification

- [ ] All variables have correct values
- [ ] Variables assigned to correct environments
- [ ] No trailing spaces in values
- [ ] Keys match exactly (case-sensitive)

---

## ✅ Deployment Verification

### Production Deployment

- [ ] Initial deployment created
- [ ] Build completed successfully
- [ ] Production URL accessible
- [ ] Application loads correctly
- [ ] No build errors in logs
- [ ] Environment variables loaded correctly

### Preview Deployment

- [ ] Test PR created
- [ ] Preview deployment auto-created
- [ ] Preview URL accessible
- [ ] Preview deployment works correctly
- [ ] Environment variables loaded in preview

### Application Testing

- [ ] Homepage loads và renders correctly
- [ ] Login page accessible (`/login`)
- [ ] Admin routes protected (redirect to `/login`)
- [ ] Authentication works (login/logout)
- [ ] No console errors
- [ ] Supabase connection working

---

## ✅ Documentation

- [ ] `docs/DEPLOYMENT.md` created
- [ ] `docs/VERCEL_SETUP_GUIDE.md` created
- [ ] `docs/VERCEL_SETUP_CHECKLIST.md` created
- [ ] Story 1.5 updated với completion notes

---

## ✅ Final Verification

- [ ] All acceptance criteria met
- [ ] All tasks completed
- [ ] Deployment working in production
- [ ] Preview deployments working
- [ ] Documentation complete
- [ ] Story status updated to "done"

---

## 📝 Notes

**Manual Steps Completed:**
- [ ] Date: ___________
- [ ] Vercel Project URL: ___________
- [ ] Production URL: ___________
- [ ] Issues encountered: ___________
- [ ] Solutions applied: ___________

---

**✅ Story 1.5 Complete khi:** Tất cả items được tick và application deployed successfully!

