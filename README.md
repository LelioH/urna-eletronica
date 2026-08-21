# Electronic Ballot Box

A small React simulation of a Brazilian electronic voting machine, built as an interactive front-end exercise.

The interface recreates the physical rhythm of voting: enter a number on the keypad, inspect the candidate details, correct the vote, cast a blank vote, or confirm it with the green button. The UI is intentionally presented in Portuguese to match the real-world device it references.

## What is inside

- A responsive ballot-box layout that works on desktop and mobile screens
- Numeric keypad with braille labels and direct keyboard entry
- Candidate preview after five digits are entered
- Blank vote, correction, confirmation, and invalid-vote states
- Confirmation sound and automatic reset after a completed vote
- A focused component structure built with React and TypeScript

## Try the demo flow

The current demonstration is configured for the candidate shown on screen:

1. Enter `12000` using the keypad or the numbered fields. Direct entry accepts only digits; use Tab, arrow keys, Home/End, and Backspace to navigate and edit. Outside a text field, `0`–`9` enter digits, `B` starts a blank vote, `Backspace`/`Escape`/`R` corrects it, and `Enter`/`C` confirms it.
2. Review the candidate information.
3. Press `CONFIRMA` to complete the vote.

Entering any other five-digit number displays an invalid-vote state and disables `CONFIRMA`; use `CORRIGE` to alter the vote. `BRANCO` opens a blank-vote review; press `CONFIRMA` to cast it or `CORRIGE` to return to entry.

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- ESLint
- Prettier

## Responsive strategy

The interface follows Tailwind's mobile-first model. Its base styles target compact screens, including 320 px wide viewports. The named `tablet:` breakpoint starts at `48rem` (768 px) and uses a wider layout without the logo or excess control spacing. The complete arrangement is reserved for `desktop:` at `80rem` (1280 px). We use explicit minimum-width names rather than inverse `max-*` variants so the breakpoint intent is visible in each component.

## Braille notation

The keypad shows isolated numeric symbols according to the Brazilian Portuguese Braille convention: the number sign followed by the first-series cell. The table in `src/domain/braille.ts` was checked against the Brazilian Ministry of Education's _Grafia Braille para a Língua Portuguesa_. A qualified braille reviewer should also approve any tactile or production hardware implementation.

## Getting started

### Prerequisites

- Node.js 24.19.0 (LTS)
- npm

If you use nvm, run `nvm use` in the project directory to select the version declared in `.nvmrc`.

### Install and run

```bash
npm install
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

### Production build

```bash
npm run build
npm run preview
```

### Lint the project

```bash
npm run lint
```

### Formatting and optional local hooks

```bash
npm run format
npm run format:check
```

The local pre-commit hook is optional. To enable it for your clone, run:

```bash
npm run hooks:install
```

It runs Prettier and ESLint only on staged files. Hooks are not installed automatically and can
be skipped locally; `format:check`, lint, type checking, tests, build, and audit in CI remain the
source of truth.

### Test the project

```bash
npm test
```

Reducer tests cover voting-state transitions. Interface tests use Testing Library to exercise the visible keypad and action controls, including recognized candidates, invalid votes, and blank-vote review.

Run type checking and coverage with:

```bash
npm run typecheck
npm run test:coverage
```

### End-to-end tests

Install the browser engines once, then run the critical voting flows locally:

```bash
npm run test:e2e:install
npm run test:e2e
```

The Playwright suite runs the recognized-candidate, invalid-vote, and blank-vote flows in Chromium, Firefox, and WebKit. The same browser matrix runs in GitHub Actions after lint, unit/interface tests, and the production build.

Pull requests also run `npm ci`, lint, typecheck, coverage, build, and `npm audit`. GitHub Pages deployment is restricted to pushes to `main` and starts only after the quality and browser-matrix jobs succeed.

`axe-core` runs in component tests and in every supported browser against the entry, candidate-review, invalid-vote, and blank-vote screens. Component tests skip only color-contrast because JSDOM cannot calculate rendered colors; browser tests include it.

### Public-demo diagnostics and privacy

The demo sends no telemetry or error report to third parties. Its only diagnostic event is a fixed
development-only code for confirmation-audio failure. It cannot include a vote number, candidate,
vote state, identifier, or other user-provided value.

Before enabling an external monitoring provider, define its retention, access controls, IP-address
handling, and a privacy review. Keep the fixed-event boundary in `src/observability/publicDemoError.ts`;
do not add vote data or browser identifiers to reports.

### Security headers and GitHub Pages

The current deployment uses GitHub Pages. It [does not let this repository set custom HTTP response
headers](https://github.com/orgs/community/discussions/54257), so the following production policy
cannot be enforced there. Do not add a `_headers` file or pretend that a meta tag configures these
headers: GitHub Pages will serve it as a static file.

When moving the public demo behind a host or reverse proxy that controls response headers, configure
this baseline before enabling the deployment:

```http
Content-Security-Policy: default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
```

[`frame-ancestors`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
is intentionally part of the HTTP CSP, not an HTML meta tag. The page includes
`<meta name="referrer" content="no-referrer">` as a browser fallback, but the HTTP header remains
the deployment requirement. Keep every script, stylesheet, image, font, media file, and future error
reporting endpoint same-origin. Adding a CDN, analytics SDK, tag manager, or other third-party script
requires a security and privacy review plus a deliberate CSP change.

### Manual accessibility review

Automated checks complement, but do not replace, this review before release:

1. Use Tab and Shift+Tab to verify a visible focus indicator and the expected order: number fields, keypad, then action buttons.
2. At 200% browser zoom, check 320 px, 768 px, 1024 px, and a wide desktop viewport for clipping, overlap, or hidden controls.
3. Use only the keyboard to enter a recognized number, make a blank vote, correct an invalid vote, and confirm a valid or blank vote.
4. With NVDA and Firefox or VoiceOver and Safari, verify that the polite live region announces new digits, candidate discovery, invalid-vote guidance, blank-vote review, and confirmation once each.

## Project structure

```text
src/
├── App.tsx                 # Voting-machine composition
├── components/
│   ├── ActionPanel.tsx     # Blank, correction, and confirmation controls
│   ├── BlankVote.tsx       # Blank-vote review screen
│   ├── InvalidVote.tsx     # Invalid-vote message
│   ├── Keypad.tsx          # Numeric keypad
│   ├── VoteResult.tsx      # Completed vote result
│   ├── VoteReview.tsx      # Entry and candidate-review screens
│   └── VotingScreen.tsx    # Display composition
├── domain/election.ts      # Election data and types
├── hooks/useVotingMachine.ts # State, timers, audio, and event handlers
├── voteMachine.ts          # State-transition reducer
├── assets/                 # Candidate and project images
├── index.css               # Tailwind entry point
└── styles/tokens.css       # Typography and semantic design tokens
```

## Note

This is an educational UI simulation, not a voting system. It has no ballot storage, authentication, backend, or connection to an official election process.

## Governance

- [License](LICENSE): MIT for code, configuration, and documentation; media and visual assets are excluded.
- [Asset rights register](ASSET-LICENSES.md): asset provenance and permission requirements.
- [Contribution guide](CONTRIBUTING.md): local workflow, quality gates, and privacy rules.
- [Architecture decisions](docs/adr): short records of voting-flow, privacy, and hosting decisions.

Changes to the voting flow require a Code Owner review. The repository administrator must enable
branch protection for `main` with required pull-request approval, required status checks, and
**Require review from Code Owners**; the tracked [CODEOWNERS](.github/CODEOWNERS) file defines the
protected paths. Issue and pull-request templates capture the required flow, accessibility, privacy,
and test review.
