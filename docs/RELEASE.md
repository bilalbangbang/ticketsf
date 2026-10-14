# Release plan

Status: GitHub source published; Vercel deployment in preparation.

## Intended public contents

Source code, three aggregate CSVs, saved aggregate source responses, cleaned analysis notebook, documentation, bunny artwork, and the existing personal About story. No raw citation rows, plate numbers, tokens, environment files, or local filesystem paths are intended for publication.

## GitHub

Approved repository: `bilalbangbang/ticketsf`. Public release was explicitly approved by the owner. Confirm rights to publish the supplied bunny artwork and choose a license if others should be allowed to reuse the code. No code license has been selected automatically.

After approval, initialize a local repository if needed, review staged files, make an initial commit, create the repository under the confirmed owner, and push `main`. GitHub Actions runs lint, types, data tests, production build, and a production dependency audit.

## Vercel

After approval, import the confirmed GitHub repository into the user's Vercel account. Choose Next.js, repository root, Node.js 24, install command `npm ci`, and build command `npm run build`. Keep Output Directory at its Next.js default. No custom environment variables are needed. Keep Vercel system environment variables enabled so social previews use the actual production domain.

Deployment creates a public website. Confirm the generated URL, then test all four views, refresh/hash navigation, mobile menu, category selection, chart selections, search, sort, and CSV export against the deployed version. Only then add the actual live and GitHub URLs to README and the LinkedIn draft. Do not describe a local preview as a public launch.

## Known maintenance item

One unpatched braces advisory is reported through five development-only lint packages. Production dependency audit is clean. Details are in SECURITY-REVIEW.md.

Deployment configuration references: https://vercel.com/docs/functions/runtimes/node-js/node-js-versions and https://vercel.com/docs/environment-variables/system-environment-variables
