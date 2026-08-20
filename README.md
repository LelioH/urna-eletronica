# Electronic Ballot Box

A small React simulation of a Brazilian electronic voting machine, built as an interactive front-end exercise.

The interface recreates the physical rhythm of voting: enter a number on the keypad, inspect the candidate details, correct the vote, cast a blank vote, or confirm it with the green button. The UI is intentionally presented in Portuguese to match the real-world device it references.

## What is inside

- A responsive ballot-box layout that works on desktop and mobile screens
- Numeric keypad with braille labels
- Candidate preview after five digits are entered
- Blank vote, correction, confirmation, and invalid-vote states
- Confirmation sound and automatic reset after a completed vote
- A focused component structure built with React and TypeScript

## Try the demo flow

The current demonstration is configured for the candidate shown on screen:

1. Enter `12000` using the keypad.
2. Review the candidate information.
3. Press `CONFIRMA` to complete the vote.

Entering any other five-digit number displays an invalid-vote state and disables `CONFIRMA`; use `CORRIGE` to alter the vote. `BRANCO` opens a blank-vote review; press `CONFIRMA` to cast it or `CORRIGE` to return to entry.

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- ESLint

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

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

## Project structure

```text
src/
├── App.tsx                 # Voting machine state and main screen
├── components/
│   ├── ActionButtons.tsx   # Blank, correction, and confirmation actions
│   ├── DialerButton.tsx    # Numeric keypad buttons
│   ├── EndVote.tsx         # Completed-vote screen
│   ├── IsentVote.tsx       # Blank-vote screen
│   └── WrongVote.tsx       # Invalid-vote screen
├── assets/                 # Candidate and project images
├── App.css
└── index.css
```

## Note

This is an educational UI simulation, not a voting system. It has no ballot storage, authentication, backend, or connection to an official election process.
