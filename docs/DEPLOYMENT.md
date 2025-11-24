# Deployment Guide - AI Tools Finder

This guide covers the deployment process for AI Tools Finder on Vercel.

## Prerequisites

- GitHub account with repository access
- Vercel account (sign up at https://vercel.com)
- Supabase project with API keys
- Node.js 18.x or higher (for local development)

## Step 1: Environment Variables Setup

### 1.1 Create `.env.local` File

Copy the environment template and fill in your values:

```bash
cp .env.example .env.local
```

### 1.2 Required Environment Variables

**Supabase Configuration:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key (safe for client-side)
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side only, keep secret!)

**Optional (for future features):**
- `OPENAI_API_KEY` - For AI blog generation (Epic 7)
- `NEXT_PUBLIC_APP_URL` - Application base URL
- `CRON_SECRET` - For securing cron job endpoints

### 1.3 Get Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to Settings → API
4. Copy:
   - Project URL
   - anon/public key
   - service_role key (click "Reveal" if hidden)

## Step 2: Connect GitHub Repository to Vercel

### 2.1 Import Project

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### 2.2 Configure Project Settings

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)
- Node.js Version: 18.x or higher

**Root Directory:** Leave as default (root)

## Step 3: Configure Environment Variables in Vercel

### 3.1 Add Environment Variables

1. In Vercel project settings, go to **Settings → Environment Variables**
2. Add each variable for the appropriate environments:

**For Development, Preview, and Production:**
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**For Production only (optional):**
```
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
```

### 3.2 Environment-Specific Variables

- **Development**: Use local `.env.local` file
- **Preview**: Same as production (or can be different for testing)
- **Production**: Use production Supabase project credentials

## Step 4: Deploy

### 4.1 Automatic Deployments

Vercel automatically deploys:
- **Preview deployments**: Created for every pull request
- **Production deployment**: Triggered on push to `main` branch

### 4.2 Manual Deployment

1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments" tab
4. Click "Redeploy" if needed

## Step 5: Verify Deployment

### 5.1 Check Build Logs

1. Go to deployment in Vercel dashboard
2. Click on the deployment
3. Check "Build Logs" for any errors
4. Verify build completes successfully

### 5.2 Test Application

1. Visit the deployment URL
2. Test authentication (login page)
3. Test admin routes (should redirect to login if not authenticated)
4. Verify environment variables are loaded correctly

## Step 6: Custom Domain (Optional)

### 6.1 Add Domain

1. Go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (can take up to 48 hours)

## Troubleshooting

### Build Fails

**Issue:** Build fails with environment variable errors
**Solution:** 
- Verify all required environment variables are set in Vercel
- Check variable names match exactly (case-sensitive)
- Ensure no trailing spaces in values

### Environment Variables Not Loading

**Issue:** Application can't access environment variables
**Solution:**
- Variables starting with `NEXT_PUBLIC_` are exposed to client-side
- Server-side variables (without `NEXT_PUBLIC_`) are only available in API routes and server components
- Redeploy after adding new environment variables

### Preview Deployment Issues

**Issue:** Preview deployments fail or don't match production
**Solution:**
- Ensure preview environment variables are set
- Check build logs for specific errors
- Verify Node.js version matches production

### Database Connection Issues

**Issue:** Can't connect to Supabase in production
**Solution:**
- Verify Supabase project URL is correct
- Check API keys are correct
- Ensure Supabase project is active
- Check Supabase dashboard for any service issues

## Monitoring

### Vercel Analytics

- View deployment status in Vercel dashboard
- Check build logs for errors
- Monitor function execution logs

### Supabase Monitoring

- Check Supabase dashboard for database performance
- Monitor API usage and limits
- Review authentication logs

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different Supabase projects** for development and production
3. **Rotate API keys** regularly
4. **Use Vercel environment variables** instead of hardcoding secrets
5. **Enable Vercel protection** for production deployments

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

