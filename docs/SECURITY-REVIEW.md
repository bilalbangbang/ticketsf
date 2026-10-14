# Dependency review

Reviewed 14 October 2026 UTC.

- Next.js 15.5.27 and React/React DOM 19.3.0 were already installed in the active local project.
- The original production audit reported PostCSS advisories through Next.js. A scoped override now uses PostCSS 8.5.30. The production build passes with this version.
- `npm audit --omit=dev` reports **zero known vulnerabilities** after the override.
- The full audit reports **five high-severity development-package entries caused by one advisory**, GHSA-vfj7-8cjw-p6xm. Dependency chain: eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces.
- The registry's latest braces is 3.0.3, which remains affected. npm proposes a major downgrade of the Next lint configuration; that was not applied. The linter runs against repository files and does not process website visitors' input. This does not remove the advisory or establish that all developer inputs are safe.
- ESLint 9 is retained for compatibility with Next 15's official lint configuration; the registry marks it unsupported. Updating the framework/lint stack is a maintenance follow-up.

Advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
PostCSS: https://github.com/postcss/postcss/security/advisories/GHSA-fxqj-rqcc-2cmp

No credentials or raw citation records are needed or included. The production app uses checked-in aggregates, not a live API request. `.gitignore` excludes environment files, dependencies, build directories, logs, and Vercel metadata. Audit results are time-specific, not a guarantee of complete security.
