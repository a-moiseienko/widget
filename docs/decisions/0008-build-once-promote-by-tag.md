# 0008. Build once, promote by tag, Node 26

Status: Accepted (2026-11-22)

## Context

The team wants every push to `master` to reach dev and production to follow a reviewed release.

## Decision

- Pull requests run `npm ci`, the type check, the lint, and the build.
- A push to `master` runs the same steps, stores `dist/` as an artifact named with the commit SHA, and deploys it to the `dev` environment.
- A tag matching `v*` rebuilds from the tagged commit and publishes to the `production` environment after a reviewer approves. The job fails when the commit is not on `master`.
- Pin Node 26 in `.nvmrc` and in the workflow.
- Commit `package-lock.json` so `npm ci` installs the same versions every time.

## Consequences

- Production builds from the tagged source. The result matches the dev artifact only if the build is reproducible, so the lockfile and the pinned Node version matter.
- The publish steps were placeholders until a static host was picked; see [0009](0009-host-provider.md).
- Developers need Node 26 locally to match CI.
