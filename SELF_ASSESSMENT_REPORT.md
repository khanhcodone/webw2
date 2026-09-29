# Self-Assessment Report

| Criterion               | Points claimed | Evidence                                                                                                                                                                                                                                                                                                    |
| ----------------------- | -------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. `cartTotal` behavior |          30/30 | `src/cart.js`. The worked example returns the number `467400`. Free shipping at the threshold and paid shipping just below it; empty cart returns `0`; negative or `NaN` price, non-integer quantity and zero quantity throw `RangeError`.                                                                  |
| 2. Tests                |          20/20 | `test/cart.test.js`, 11 tests, each with one failure reason. `npm test`: 11/11 pass, 0 fail. Six written by Copilot; five added after review (see `AI-LOG.md`).                                                                                                                                             |
| 3. Harness              |          19/20 | `RULES.md` (stack, commands, `never` rules, contract). `npm test` and `npm run lint` in `package.json`. `.github/workflows/ci.yml`: green on push, CI #1 `cc4f182`, CI #2 `6540ca1`. (https://github.com/khanhcodone/webw2/actions). This commit's own CI run has not completed yet at the time of writing. |
| 4. Brief                |          15/15 | `BRIEF.md`: files in scope (`src/cart.js`, `test/cart.test.js`), contract, error cases, no dependencies, verification.                                                                                                                                                                                      |
| 5. `AI-LOG.md`          |          13/15 | Three dated entries (Copilot, Claude review and first push, Claude NaN fix) with accepted and rejected suggestions, the `CLAUDE.md` mistake fixed in `6540ca1`, and verification.                                                                                                                           |
| **Total**               |     **97/100** |                                                                                                                                                                                                                                                                                                             |

## What I did not manage

- **Lint is not a full linter.** `npm run lint` is `node --check` plus a small
  hand-written script, because the assignment forbids dependencies (no ESLint
  or Prettier). I deduct 1 point on criterion 3.
- **The log was partly written after the fact.** It was reconstructed from my
  notes and the commit history, not written step by step. I deduct 2 points on
  criterion 5.
- **Edge cases outside the spec:** `NaN`/`Infinity` in `vatRate`,
  `freeShipFrom` or `shipFee`; a non-empty cart with subtotal 0 still pays
  shipping.
- **`CLAUDE.md` was pushed by mistake** in `cc4f182` and removed in `6540ca1`;
  it remains in the history.
