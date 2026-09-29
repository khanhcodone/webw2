# Project Rules

## Stack

- Use plain JavaScript ES modules on Node.js.
- Use Node's built-in test runner with `npm test`.
- Use the dependency-free syntax gate with `npm run lint`.

## Workflow

1. Read `README.md` and `BRIEF.md` before changing behavior.
2. Keep implementation changes in `src/cart.js` and behavior tests in `test/cart.test.js` unless the brief names another file.
3. Read the diff before running the tests.
4. Run `npm run lint` and `npm test` after each implementation change.

## Never

- Never add a package or dependency for this assignment.
- Never remove or weaken a test to make the suite pass.
- Never change behavior that is not stated in the brief.
