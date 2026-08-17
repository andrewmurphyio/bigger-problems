# Slidev on GitHub Pages (2026)

**Date:** 2026-08-17  
**Scope:** This deck, built with Slidev 52.16.0. Only official Slidev and GitHub sources are used.

## Recommendation

Deploy Slidev's generated `dist/` as a GitHub Pages artifact with the official Pages actions. In **Settings → Pages → Build and deployment**, select **GitHub Actions**, not “Deploy from a branch.” Slidev explicitly recommends this pattern, and GitHub documents the same artifact/deploy flow.  
<https://sli.dev/guide/hosting#github-pages>  
<https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#publishing-with-a-custom-github-actions-workflow>

For this repository, use the project-site base:

```text
/if-you-thought-the-speed-of-writing-code-was-your-problem-you-have-bigger-problems/
```

The existing `dist/index.html` contains root-absolute `/assets/...` URLs, so that existing build is not suitable at `https://USER.github.io/REPO/`. Rebuild with `--base`; Slidev requires a sub-route base to begin **and end** with `/`.  
<https://sli.dev/guide/hosting#base-path>

The repository has no configured Git remote, so `USER` cannot be determined locally.

## Recommended Actions pattern

As of this date, the current official major releases are checkout v7, setup-node v7, configure-pages v6, upload-pages-artifact v5, and deploy-pages v5.  
<https://api.github.com/repos/actions/checkout/releases/latest>  
<https://api.github.com/repos/actions/setup-node/releases/latest>  
<https://api.github.com/repos/actions/configure-pages/releases/latest>  
<https://api.github.com/repos/actions/upload-pages-artifact/releases/latest>  
<https://api.github.com/repos/actions/deploy-pages/releases/latest>

```yaml
name: Deploy Slidev to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: lts/*
          cache: npm
      - run: npm ci
      - run: npm run build -- --base "/${{ github.event.repository.name }}/"
      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

GitHub requires `pages: write`, `id-token: write`, a `github-pages` environment, and a deploy job that depends on the build artifact.  
<https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages#deploying-github-pages-artifacts>

## Correct base and URLs

GitHub distinguishes a root user/organization site from a project site:  
<https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#types-of-github-pages-sites>

| Deployment | Build base | Slideshow | Presenter | Overview |
|---|---|---|---|---|
| Project Pages | `/REPO/` | `https://USER.github.io/REPO/` | `https://USER.github.io/REPO/presenter` | `https://USER.github.io/REPO/overview` |
| User/org Pages repo (`USER.github.io`) | `/` | `https://USER.github.io/` | `https://USER.github.io/presenter` | `https://USER.github.io/overview` |
| Custom domain attached directly to this deck at its root | `/` | `https://slides.example.com/` | `https://slides.example.com/presenter` | `https://slides.example.com/overview` |

If an account-level custom domain still serves project sites beneath `/REPO/`, retain `/REPO/`; GitHub documents that inherited project sites remain at `CUSTOM-DOMAIN/REPO`.  
<https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages#using-a-custom-domain-across-multiple-repositories>

Slidev documents `/presenter` and `/overview` as the presenter and full overview routes.  
<https://sli.dev/guide/ui#presenter-mode>  
<https://sli.dev/guide/ui#slide-overview>

## Presenter synchronization: what works

**Same browser/device: yes.** Open the slideshow and presenter view in two tabs/windows from the same deployed site. Slidev states that navigation in presenter mode automatically makes all other opened pages follow it. A static Slidev build is a hostable SPA, so no local development server is needed for this same-browser use.  
<https://sli.dev/guide/ui#presenter-mode>  
<https://sli.dev/guide/hosting#build-as-a-spa>

**Separate devices: no live synchronization from GitHub Pages alone.** GitHub Pages hosts static files; Slidev's documented cross-device “remote access” is enabled by running the Slidev server with `--remote` (optionally a tunnel/password). A viewer opening the Pages URL on another device can view and navigate independently, but it will not follow the presenter on the first device.  
<https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages>  
<https://sli.dev/features/remote-access>  
<https://sli.dev/builtin/cli#slidev-entry>

The `--remote=password` protection applies to the live Slidev server, not to a static Pages artifact.  
<https://sli.dev/features/remote-access#password-protection>

## Caveats

- **Notes are public by default.** A normal static build includes speaker notes; presenter and overview UIs expose them. Use `--without-notes` to exclude them, but then the hosted presenter cannot show those notes.  
  <https://sli.dev/guide/hosting#remove-speaker-notes>  
  <https://sli.dev/guide/ui#presenter-layouts>  
  <https://sli.dev/guide/ui#slide-overview>
- **Presenter access is not private on public Pages.** Anyone who knows the URL can open `/presenter` or `/overview`; use a protected/live deployment if notes must remain confidential. GitHub Pages site visibility depends on account/repository plan and configuration.  
  <https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#who-can-use-this-feature>
- **SPA deep links need care.** Opening the root and entering Presenter/Overview through Slidev works client-side. A direct load or refresh of `/presenter` or `/overview` can return a Pages 404 because those are SPA routes, not directories. GitHub Pages supports a custom root `404.html`; if direct deep links are required, test a post-build `dist/index.html` → `dist/404.html` fallback before upload.  
  <https://sli.dev/guide/hosting#build-as-a-spa>  
  <https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site>
- Keep the base's leading/trailing slashes and test the deployed project URL, presenter, overview, refresh behavior, fonts, and assets after the first deployment.  
  <https://sli.dev/guide/hosting#base-path>
