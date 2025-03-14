import { add } from "./add";
import { test, expect } from "@jest/globals";

test("Test functions that import server-only", () => {
  expect(add(1, 2)).toBe(3);
});
