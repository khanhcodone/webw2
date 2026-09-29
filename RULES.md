# Project Rules

## Stack

- Plain JavaScript ES modules (`"type": "module"`) on Node.js 24.
- Tests: Node's built-in runner (`node:test`, `node:assert/strict`) only.
- No runtime or dev dependencies.

## Commands

- `npm test` runs the test suite (`node --test`).
- `npm run lint` runs `node --check` on the source and test files, then
  `scripts/lint.js`, which reports tabs, trailing whitespace, a missing final
  newline, `console.*` calls in `src/`, and imports other than `node:`
  built-ins and relative paths.
- CI (`.github/workflows/ci.yml`) runs both commands on every push.

## Workflow

1. Read `README.md` and `BRIEF.md` before changing behavior.
2. Keep implementation changes in `src/cart.js` and behavior tests in
   `test/cart.test.js` unless the brief names another file.
3. Run `npm run lint` and `npm test`, then read the diff before committing.

## Never

- Never add a package or dependency for this assignment.
- Never remove or weaken a test to make the suite pass.
- Never change behavior that is not stated in the brief.
- Never return a string (no `toFixed` without converting back to a number).
- Never mutate `items` or `options`.
- Never edit files outside `src/`, `test/`, `scripts/`, `.github/`,
  `package.json` and the docs.
- Never commit local assistant notes such as `CLAUDE.md`.

## Contract (summary)

`cartTotal(items, { vatRate, freeShipFrom, shipFee })` returns a rounded
integer `number`.

- Empty cart → `0` (no VAT, no shipping).
- `subtotal >= freeShipFrom` → shipping is `0`. The threshold is checked on
  the subtotal, before VAT.
- Negative or non-finite (`NaN`, `Infinity`) price, or qty that is not a
  positive integer → `RangeError`.
