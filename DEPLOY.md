# Deploy Dirty Dawgz to Vercel (step-by-step)

Your site is a Next.js app. The easiest way to go live is **GitHub + Vercel**. Follow these steps in order.

---

## Part 1: Put your code on GitHub

### 1. Create a GitHub account (if you don’t have one)
- Go to [github.com](https://github.com) and sign up.

### 2. Create a new repository on GitHub
- Click the **+** (top right) → **New repository**.
- **Repository name:** e.g. `dirtydawgz-website` (whatever you like).
- Leave it **empty** (no README, no .gitignore).
- Click **Create repository**.

### 3. Open Terminal on your Mac
- Open the **Terminal** app (or use the terminal inside Cursor/VS Code).

### 4. Go to your project folder
```bash
cd "/Users/koryhershock/Desktop/DirtyDawgz V2"
```

### 5. Turn this folder into a Git repo (if it isn’t already)
```bash
git init
```

### 6. Add all your files
```bash
git add .
```

### 7. Make the first “save” (commit)
```bash
git commit -m "Initial commit - Dirty Dawgz site"
```

### 8. Connect to GitHub and push
- On the GitHub page for your new repo you’ll see something like:
  - **“…or push an existing repository from the command line”**
- Copy the **first** set of commands. It will look like this (your URL will be different):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

- Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your real GitHub username and repo name.
- Run those three commands in Terminal. When it asks for login, use your GitHub username and a **Personal Access Token** (not your normal password — see below if you need to create one).

**Creating a Personal Access Token (for git push):**
- GitHub → your profile (top right) → **Settings** → **Developer settings** (left) → **Personal access tokens** → **Tokens (classic)** → **Generate new token**.
- Give it a name, choose an expiry, check **repo**.
- Generate, then **copy the token** and paste it when Terminal asks for your password (username = your GitHub username, password = the token).

---

## Part 2: Deploy on Vercel

### 1. Go to Vercel
- Open [vercel.com](https://vercel.com) and sign in with **GitHub** (e.g. “Continue with GitHub”).

### 2. Import your project
- Click **Add New…** → **Project**.
- You should see your GitHub repo (e.g. `dirtydawgz-website`). Click **Import** next to it.

### 3. Project settings
- **Framework Preset:** should already be **Next.js**. Leave it.
- **Root Directory:** leave as **./** (or blank).
- Click **Deploy**. Wait a couple of minutes.

### 4. Add your environment variables (important)
Your quote form and email need the same env vars you have in `.env.local`. Vercel doesn’t see that file, so you add them in the dashboard:

- In your Vercel project, go to **Settings** → **Environment Variables**.
- Add each variable **one by one** (name + value), for **Production** (and optionally Preview):

| Name           | Value (you fill this in)        |
|----------------|----------------------------------|
| `SMTP_HOST`    | (e.g. smtp.gmail.com)           |
| `SMTP_PORT`    | (e.g. 465)                     |
| `SMTP_USER`    | (your sending email)           |
| `SMTP_PASS`    | (your app password)           |
| `QUOTE_TO_EMAIL`   | info@dirtydawgzovencleaning.com |
| `QUOTE_FROM_EMAIL` | (e.g. Dirty Dawgz Oven Cleaning LLC &lt;info@...&gt;) |

Use the **exact same values** you have in `.env.local`. Don’t commit or paste `.env.local` anywhere public.

### 5. Redeploy so env vars are used
- After saving the env vars, go to **Deployments**.
- Click the **⋯** on the latest deployment → **Redeploy** (so the new env vars are picked up).

---

## You’re live

- Vercel will give you a URL like: `https://dirtydawgz-website.vercel.app` (or whatever your project name is).
- You can add a **custom domain** later under **Settings → Domains** (e.g. `dirtydawgzovencleaning.com`).

---

## Updating the site later

1. Edit your code locally.
2. In Terminal (in your project folder):
   ```bash
   git add .
   git commit -m "Describe what you changed"
   git push
   ```
3. Vercel will automatically build and deploy the new version (usually within 1–2 minutes).

---

## Quick checklist

- [ ] GitHub account + new repo created  
- [ ] `git init`, `git add .`, `git commit`, `git remote`, `git push` done  
- [ ] Vercel account (signed in with GitHub)  
- [ ] Project imported from GitHub and first deploy finished  
- [ ] All env vars added in Vercel (Settings → Environment Variables)  
- [ ] One redeploy after adding env vars  
- [ ] Test “Request a Quote” on the live URL to confirm email works  

If any step fails, note the exact error message (or a screenshot) and we can fix it step by step.
