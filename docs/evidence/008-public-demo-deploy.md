# Evidence: 008 Public Demo Deploy

## Summary

Public demo deployment for `apps/web` is verified.

Branch:

```text
feature/008-public-demo-deploy
```

Recorded commit:

```text
8c8179c
```

Public demo URL:

```text
https://agent-flight-recorder-mantle.vercel.app
```

Deployment URL:

```text
https://agent-flight-recorder-mantle-424p4snjl-adragon0707s-projects.vercel.app
```

Vercel project:

```text
agent-flight-recorder-mantle
```

## Commands

```bash
corepack pnpm progress
corepack pnpm --filter @afr/web build
vercel deploy --prod --yes
vercel project protection disable agent-flight-recorder-mantle --sso
Invoke-WebRequest -UseBasicParsing https://agent-flight-recorder-mantle.vercel.app
corepack pnpm verify:all
```

## Results

- `corepack pnpm progress`: current task was `008-public-demo-deploy` before deployment.
- `corepack pnpm --filter @afr/web build`: passed locally.
- First Vercel attempt from `apps/web` failed because Vercel used `npm install` and did not resolve the pnpm workspace correctly.
- Root Vercel project `agent-flight-recorder-mantle` was created and linked.
- `vercel.json` now points Vercel's Next builder at `apps/web/package.json`, while installing from the pnpm workspace root.
- Vercel deployment reached `READY`.
- SSO deployment protection was disabled for this project so the demo is publicly accessible to judges.
- Public URL verification returned HTTP 200.
- Response content contains `Agent Flight Recorder`.
- Response content contains `Mantle`.

HTTP verification:

```text
https://agent-flight-recorder-mantle.vercel.app StatusCode=200 Length=11090 ContainsAFR=True ContainsMantle=True
```

## Files Changed

- `vercel.json`
- `.gitignore`
- `apps/web/.gitignore`
- `README.md`
- `docs/evidence/008-public-demo-deploy.md`
- `docs/environments.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/prd.md`
- `docs/project-acceptance.md`
- `specs/008-public-demo-deploy.md`
- `specs/009-submission-package.md`
- `specs/status.json`
- `specs/task-board.md`

## Docs Synced

- README includes the public demo URL, deployed contract address, deploy transaction, sample anchor transaction, and Mantle Explorer links.
- Architecture records verified spec `008-public-demo-deploy`.
- Project Acceptance marks Public Demo Deploy as verified.
- Environments records the Vercel project and public URL.
- Handoff points the next worker to `009-submission-package`.

## Known Limits

- No demo video has been created yet.
- DoraHacks BUIDL page has not been submitted or published.
- No new wallet transaction, contract redeploy, backend, database, or account system was added in this task.

## Next Task

```text
009-submission-package
```
