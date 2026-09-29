# Brief: Implement `cartTotal`

Implement the `cartTotal(items, options)` function for this plain JavaScript ES module project.

## Files in scope

The implementation assistant may edit only:

- `src/cart.js` for the production implementation.
- `test/cart.test.js` for tests that specify the required behavior.

Do not edit `README.md`, `RULES.md`, `package.json`, CI configuration, or submission documents for this task.

## Contract

- `items` is an array of objects shaped like `{ name, price, qty }`.
- `options` is an object shaped like `{ vatRate, freeShipFrom, shipFee }`.
- `subtotal` is the sum of `price * qty` for every item.
- VAT is `vatRate * subtotal`.
- Shipping is `0` when `subtotal >= freeShipFrom`; otherwise shipping is `shipFee`.
- Return `subtotal + VAT + shipping` as a number rounded to the nearest whole dong.
- An empty cart returns `0` with no VAT and no shipping.
- A negative `price` must throw `RangeError`.
- A `qty` that is not a positive integer must throw `RangeError`.
- The worked example in `README.md` must return the number `467400`.

## Constraints

- Add no dependencies.
- Preserve the existing exported function name and ES module format.
- Tests must assert the specification and must not assert private implementation details.
- Each test should fail for one behavior reason.

## Verification

Run `npm run lint` and `npm test` after the implementation. Read the diff before running the commands.
