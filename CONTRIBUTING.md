# Contributing

Thanks for improving this educational voting-machine simulation. It is not an election system and
must never collect, store, transmit, or infer vote preference.

## Local setup

Use the Node version declared in `.nvmrc`, then install the locked dependency graph:

```bash
nvm use
npm ci
```

Run the checks before opening a pull request:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run build
npm audit
```

The optional pre-commit hook formats and lints only staged files. Enable it for your clone with
`npm run hooks:install`; it never replaces the CI checks.

## Voting-flow changes

A flow change alters the reducer states or events, candidate lookup, confirmation, correction,
keyboard actions, live announcements, or the controls that expose those actions. For every flow
change:

1. Update the reducer and interface tests by behavior, and update the Playwright flow when relevant.
2. Review keyboard, focus, live-region, invalid-vote, blank-vote, finalizing, and completed behavior.
3. Add or amend an ADR when the state model, privacy boundary, accessibility contract, or hosting
   decision changes.
4. Request a Code Owner review. Do not merge before the required approval and CI checks pass.

Repository administrators must enforce this by protecting `main`, requiring pull requests, one
approval, required status checks, and **Require review from Code Owners**. `CODEOWNERS` alone
requests a review; branch protection makes it mandatory.

## Assets and privacy

Do not add an image, logo, font, audio file, CDN resource, analytics SDK, or monitoring provider
without a documented license or authorization and the necessary privacy review. Register each asset
in [ASSET-LICENSES.md](ASSET-LICENSES.md). Never place a vote number, candidate, party, vote state,
browser identifier, or user-provided value in logs, analytics, errors, tests, issue reports, or pull
requests.

## Pull requests and issues

Use the supplied templates. Keep each pull request focused, explain observable behavior, and include
the commands you ran. Report security issues privately through the repository security-advisory
channel when it is enabled; otherwise contact a maintainer privately rather than opening a public
issue.
