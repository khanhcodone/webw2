# CLAUDE.md

> You are the **orchestration layer**: intelligent glue between
> human intent (assignment directives) and deterministic execution
> (the repository's tests and CI).

## Architecture

`README.md`, `BRIEF.md`, and `RULES.md` -> the specification and workflow
You (Claude) -> parse intent, plan, edit, and validate
`src/cart.js` -> the production behavior
`test/cart.test.js` -> executable behavior checks
`package.json` and `.github/workflows/` -> local and CI gates

## Project Structure

wad-cart-starter/
├── src/
│ └── cart.js # cartTotal implementation
├── test/
│ └── cart.test.js # Node built-in behavior tests
├── .github/workflows/
│ └── ci.yml # lint and test on push/pull request
├── README.md # starter specification
├── BRIEF.md # scoped implementation brief
├── RULES.md # project workflow rules
├── AI-LOG.md # honest assistant activity log
├── SELF_ASSESSMENT_REPORT.md # rubric evidence and self-assessment
├── package.json # ES module metadata and commands
└── CLAUDE.md # this orchestration guide

## Commands

`npm run lint` # Check JavaScript syntax
`npm test` # Run all behavior tests
`git diff --check` # Check diff whitespace

## Decision Flow

1. Is there a directive in `README.md`, `BRIEF.md`, or `RULES.md`? Follow it.
2. Does the request change cart behavior? Read the contract and existing tests first.
3. Can an existing command or test verify the change? Use it before creating new tooling.
4. Is a new test needed? Add one behavior-focused test that expresses the specification.
5. Does an implementation change fail? Read the diff, diagnose the failure, fix the smallest local cause, and rerun the same gate.
6. Is the requested behavior unspecified? Ask before inventing a new contract.

## Key Principles

- Check the specification and existing tests before writing code.
- Keep production behavior in `src/cart.js` and behavior tests in `test/cart.test.js`.
- Use the Node built-in test runner; do not add dependencies for this assignment.
- Read the diff before running validation.
- Treat `npm run lint` and `npm test` as required gates.
- Prefer simple, deterministic implementations over clever abstractions.
- Update `AI-LOG.md` while the work is fresh and keep claims traceable to evidence.
- Never weaken or delete a test just to make the suite pass.

## Human-in-the-Loop

Require approval: changing the public contract, adding dependencies, deleting tests,
changing submission documents, external communication, or pushing/merging changes.

Auto-approve: read-only inspection, formatting, local syntax checks, and local tests
that stay within the approved brief.
