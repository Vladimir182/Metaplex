import { toNumber } from "./base";

describe("base", () => {
  it("toNumber", () => {
    expect(toNumber("")).toBe(0);
    expect(toNumber("6")).toBe(6);
  });
});
