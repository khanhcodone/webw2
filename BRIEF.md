# Brief: Implement `cartTotal`

Implement `cartTotal(items, options)` in this plain JavaScript ES module project
(Node.js 24). This brief covers only the implementation and its tests; the
rules file, lint script and CI are set up separately and are out of scope.

## Files in scope

The assistant may edit only:

- `src/cart.js`: the production implementation.
- `test/cart.test.js`: tests that specify the required behavior.

Do not edit `README.md`, `RULES.md`, `package.json`, `scripts/`, `.github/`,
or any submission document (`AI-LOG.md`, `SELF_ASSESSMENT_REPORT.md`).

## Contract

- `items` is an array of `{ name, price, qty }`.
- `options` is `{ vatRate, freeShipFrom, shipFee }`.
- `subtotal` is the sum of `price * qty` over all items.
- VAT is `vatRate * subtotal`.
- Shipping is `0` when `subtotal >= freeShipFrom`, otherwise `shipFee`.
  The threshold is compared with the subtotal before VAT.
- Return `subtotal + VAT + shipping` as a `number` rounded to the nearest whole
  dong (never a string, so no bare `toFixed`).
- An empty cart returns `0`: no VAT, no shipping.
- The worked example in `README.md` must return the number `467400`.

## Error cases

- A negative `price`, or a `price` that is `NaN` or `Infinity`, throws `RangeError`.
- A `qty` that is not a positive integer (`0`, negative, `1.5`) throws `RangeError`.
- Do not mutate `items` or `options`.

## Constraints

- No dependencies, runtime or dev. Only `node:test` and `node:assert/strict`.
- Keep the exported function name and the ES module format.
- Tests assert the specification, not private implementation details, and
  each test can fail for one reason only.

## Verification

Run `npm run lint` and `npm test`, then read the diff before committing.
Both must pass locally and in CI.
