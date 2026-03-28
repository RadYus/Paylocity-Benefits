# Paylocity-Benefits

Repository for Paylocity bug and automation challenges

**Auth & running tests**

- **Auth file**: Store secrets in `playwright/.auth` (already gitignored). Commit the template: [playwright/.auth.example](playwright/.auth.example).
- **Env vars**: You can instead set `BENEFITS_USERNAME` and `BENEFITS_PASSWORD` in your environment.
- **Run a single spec** (PowerShell):

```powershell
npx playwright test automation/fe/feTests.spec.js -c playwright.config.js
```

- **Set credentials (PowerShell)**:

```powershell
# $env:BENEFITS_USERNAME="your-username"
# $env:BENEFITS_PASSWORD="your-password"
npx playwright test automation/fe/feTests.spec.js -c playwright.config.js
```

- **If you accidentally committed `playwright/.auth`**: remove it from git and rotate credentials:

```bash
git rm --cached playwright/.auth
git commit -m "remove committed auth file"
```

If you want, I can also add a short note in the repo contributing guide describing how to create `playwright/.auth` from the example.
