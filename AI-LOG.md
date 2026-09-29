# AI-LOG

## 2026-09-28 - IA#1 cartTotal

**Tool:** GitHub Copilot in VS Code.

**Asked for:** Read the assignment rubric and starter repository, plan the work, then complete the `cartTotal` assignment in the required order: harness, brief, implementation/test loop, log and self-assessment.

**Produced:**

- Recorded the starter baseline: `npm test` failed because `src/cart.js` still threw `Error: not implemented`.
- Added `RULES.md` with the Node.js stack, commands, project workflow and `never` rules.
- Added the dependency-free `npm run lint` syntax gate and `.github/workflows/ci.yml` to run lint and tests on pushes and pull requests.
- Added `BRIEF.md` with the allowed files, cart contract, error cases and no-dependencies constraint.
- Implemented `cartTotal` in `src/cart.js`.
- Extended `test/cart.test.js` with tests for the worked example, empty cart, free-shipping threshold, negative price, invalid quantity and rounding.
- Added `SELF_ASSESSMENT_REPORT.md` and this log.

**Changed and kept:**

- Kept the existing ES module format and exported function name.
- Kept the built-in Node test runner and added no packages.
- Used `Math.round` so the result is a number rounded to whole dong.
- Validated negative prices and non-positive/non-integer quantities with `RangeError`.

**Rejected or not used:**

- Did not add ESLint or any other dependency because the brief requires no dependencies.
- Did not change the README, starter API, or unrelated worktree.
- Did not add validation rules for unspecified option fields or item names.
- Did not create a zip file, as requested.

**Written by hand:**

- The rules, brief, AI log and self-assessment are project documents written from the rubric and repository contract.
- The test names and assertions were written to express the specification rather than private implementation details.

**Verification:**

- `npm run lint` passed.
- `npm test` passed: 6 tests, 6 passes, 0 failures.
- Editor diagnostics reported no errors.
