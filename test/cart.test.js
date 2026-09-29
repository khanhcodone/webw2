import { test } from "node:test";
import assert from "node:assert/strict";
import { cartTotal } from "../src/cart.js";

test("the example from the slides", () => {
   const items = [
      { name: "Áo thun", price: 180000, qty: 2 },
      { name: "Sổ tay", price: 45000, qty: 1 },
   ];
   const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };
   assert.equal(cartTotal(items, options), 467400);
});

test("an empty cart returns zero", () => {
   const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };

   assert.equal(cartTotal([], options), 0);
});

test("the free-shipping threshold includes the threshold amount", () => {
   const items = [{ name: "Product", price: 500000, qty: 1 }];
   const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 };

   assert.equal(cartTotal(items, options), 500000);
});

test("a negative price throws RangeError", () => {
   const items = [{ name: "Product", price: -1, qty: 1 }];
   const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 };

   assert.throws(() => cartTotal(items, options), RangeError);
});

test("a non-integer quantity throws RangeError", () => {
   const items = [{ name: "Product", price: 100, qty: 1.5 }];
   const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 };

   assert.throws(() => cartTotal(items, options), RangeError);
});

test("the result is rounded to a whole number", () => {
   const items = [{ name: "Product", price: 100, qty: 1 }];
   const options = { vatRate: 0.005, freeShipFrom: 500000, shipFee: 0 };

   assert.equal(cartTotal(items, options), 101);
});

test("just below the threshold still pays shipping", () => {
   const items = [{ name: "Product", price: 499999, qty: 1 }];
   const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 };
   assert.equal(cartTotal(items, options), 529999);
});

test("the threshold is checked on subtotal, not on the total with VAT", () => {
   // subtotal 480000 < 500000, but 480000 * 1.08 = 518400 >= 500000
   const items = [{ name: "Product", price: 480000, qty: 1 }];
   const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 };
   assert.equal(cartTotal(items, options), 548400);
});

test("a zero quantity throws RangeError", () => {
   const items = [{ name: "Product", price: 100, qty: 0 }];
   const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 };
   assert.throws(() => cartTotal(items, options), RangeError);
});

test("the result is a number", () => {
   const items = [{ name: "Product", price: 100, qty: 1 }];
   const options = { vatRate: 0, freeShipFrom: 500000, shipFee: 0 };
   assert.equal(typeof cartTotal(items, options), "number");
});
