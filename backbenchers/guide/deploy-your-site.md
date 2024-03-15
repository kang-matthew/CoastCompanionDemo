---
sidebar_position: 6
---

# Deployment

:::danger
When you deploy changes with the deployment script, you are deploying the current state of your local project. This process does not affect any branches on GitHub (origin) directly. Instead, it pushes the built site to the ``gh-pages`` branch. Make sure to follow the sync work before deploying to ensure all changes, including the 'small changes' made directly on GitHub on the main branch, are deployed.
:::

The reason why we should use the script to deploy to the ``gh-pages`` branch instead of referencing the build directory in the ``main`` branch to GitHub pages is because we can leave main as pre-deployment staging.
 
## Sync Work

Make sure you are pulling and pushing and resolving any conflicts **before** you proceed. You should do this for the ``main`` branch, as we will probably push all changes to there.

## Build your site

Build your site **for production**:

```bash
cd backbenchers
npm run build
```

The static files are generated in the `build` folder.

## Deployment Script

```bash
USE_SSH=true npm run deploy
```