# AI-LOG

## 2026-09-28 - First pass with GitHub Copilot

**Tool:** GitHub Copilot in VS Code.

**Asked for:** Read the rubric and starter repository, plan the work, then
complete `cartTotal` in this order: harness, brief, implementation/test loop,
log and self-assessment.

**Produced:**

- Baseline: `npm test` failed because `src/cart.js` still threw
  `Error: not implemented`.
- `RULES.md`, `BRIEF.md`, a `node --check` lint script and
  `.github/workflows/ci.yml`.
- `cartTotal` in `src/cart.js`.
- Six tests in `test/cart.test.js`: worked example, empty cart, threshold,
  negative price, non-integer quantity, rounding.
- First versions of `SELF_ASSESSMENT_REPORT.md` and this log.

**Kept:** the ES module format and exported name, the built-in Node test
runner, `Math.round` for whole-dong results, `RangeError` for a negative price
and a non-positive or non-integer quantity.

**Rejected:** ESLint or any dependency (the brief forbids them); changes to
`README.md` or the starter API; validation of unspecified option fields.

**Verification:** `npm run lint` and `npm test` (6/6) passed on my machine.
Copilot only ran them locally; nothing was pushed that day.

## 2026-09-29 (afternoon) - Re-test, extra tests, review, first push

**Tools:** Claude (chat) for suggestions; Claude Code for a full review.

**What I did:**

- Re-ran the tests myself and found no problem in the first pass.
- Claude (chat) reviewed my six tests and pointed out gaps — it did not write
  test code itself, only described the missing cases. I wrote the four new
  tests by hand in `test/cart.test.js`, as a precaution against edge cases the
  first pass had not covered:
   - `just below the threshold still pays shipping` (499999 -> 529999)
   - `the threshold is checked on subtotal, not on the total with VAT`
     (480000 at 8% VAT -> 548400)
   - `a zero quantity throws RangeError`
   - `the result is a number` (partly redundant, since `assert.equal` from
     `node:assert/strict` already fails on a string; kept to make the intent
     explicit)
- Lint was only `node --check`, so Claude Code wrote `scripts/lint.js`
  directly during its review (tabs, trailing whitespace, `console.*` in
  `src/`, non-`node:` imports, Node built-ins only). I read it, ran
  `npm run lint`, and kept it as written.
- Prettier as a devDependency was suggested and **rejected**: no dependencies.
- CI: changed Node 20 to 24 to match my machine; removed the duplicate
  `pull_request` trigger.
- Asked Claude Code to review the whole repository and write a `CLAUDE.md`
  summary for future sessions. No changes to `src/cart.js` or
  `test/cart.test.js` came out of that review — it only produced `CLAUDE.md`.
- Pushed to GitHub myself and checked the Actions tab.

**Commit `cc4f182`** ("Implement cartTotal with tests, harness and CI"): CI #1
green. It also contained `CLAUDE.md` by mistake.

**Mistake and fix:** `CLAUDE.md` is a local assistant note and not part of the
deliverable. Commit `6540ca1` ("Remove CLAUDE.md from repository") removes it
and changes nothing else. CI #2 green. It is now in `.gitignore`.

## 2026-09-29 (evening) - NaN price, and the rules file catches up

**Tool:** Claude (chat) for the NaN review; the `RULES.md` rewrite itself is
by hand, no AI, based on what the day's gates and reviews actually caught.
Not pushed yet — these changes, together with this log entry, are going into
the next commit.

**NaN price — suggested and decided:**

- `price = NaN` slipped through (`NaN < 0` is false) and the function
  returned `NaN`. **Accepted:** added `!Number.isFinite(item.price)` to the
  price check and a test `a NaN price throws RangeError`, written by hand
  after the review. The suite is now 11 tests: 6 from the first pass, 4
  added as precaution after Claude's review of edge cases, and this last
  one from the final review.
- `BRIEF.md` and `RULES.md` updated to list the non-finite price as a
  `RangeError` case.

**Changed in `RULES.md`:**

- Replaced the flat `Stack`/`Workflow`/`Never` list with `Stack`, `Commands`,
  `Workflow`, `Never`, and a `Contract (summary)` section, so a stranger can
  see the exact commands and the current behaviour contract without opening
  `BRIEF.md`.
- `Commands`: documents `npm test`, and `npm run lint` now that it runs both
  `node --check` and `scripts/lint.js` — reflects the harness as it actually
  stands after this evening's changes, not the `node --check`-only gate from
  the first pass.
- `Never mutate items or options` — added as a precaution, not from an
  actual bug: the six tests from the first pass ran clean with no mutation
  problem.
- `Never return a string (no toFixed without converting back to a number)` —
  also a precaution, not from an incident: the first pass already used
  `Math.round` and the six original tests passed without hitting this.
- `Never commit local assistant notes such as CLAUDE.md` — added directly
  from the `CLAUDE.md` incident: committed by mistake in `cc4f182`, removed
  in `6540ca1`.
- `Never edit files outside src/, test/, scripts/, .github/, package.json and
the docs` — made explicit after noticing the brief never listed which
  files were in scope beyond `src/cart.js` and its test.
- `Contract (summary)`: added the non-finite-price `RangeError` case,
  following the NaN fix above.

This is the rule "every failure the gates catch becomes a line in the rules
file" from the session 2 slides — one new `Never` line comes from an actual
incident (`CLAUDE.md`), the other two are precautions written before any
matching bug occurred.

**Written by hand (overall):** Copilot wrote the first version of the code,
tests, `RULES.md`, `BRIEF.md`, the lint script skeleton and CI config on
2026-09-28. Claude (chat) reviewed the tests and the code twice on
2026-09-29 and described the missing edge cases and the NaN bug, but did
not write code or test files itself — I wrote all four precaution tests,
the NaN check, the NaN test, and this `RULES.md` revision by hand. Claude
Code reviewed the repository, wrote `scripts/lint.js` directly, and wrote
`CLAUDE.md`. I applied every accepted suggestion myself, ran
`npm run lint` and `npm test` after each change, and removed `CLAUDE.md`
before committing this round of changes. I read every changed line and can
explain it.

**Verification:**

- `npm run lint`: `lint: no problems found`.
- `npm test`: 11 tests, 11 pass, 0 fail.
- GitHub Actions on `main`: CI #1 (`cc4f182`) green, CI #2 (`6540ca1`) green.
  and CI #3 (0f18a27) green.
- CI #3 covers the final round of changes: the NaN price validation, the 11th test, and the RULES.md revision. This final log update was made after CI #3 completed successfully.
  Runs: https://github.com/khanhcodone/webw2/actions
