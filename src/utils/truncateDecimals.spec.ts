import { truncateDecimals } from "./truncateDecimals";

describe("truncateDecimals", () => {
  it("test", () => {
    expect(truncateDecimals(1.25, 1)).toBe(1.2);
    expect(truncateDecimals(1.250000001, 5)).toBe(1.25);
    expect(truncateDecimals(-1.250000001, 5)).toBe(-1.25);
    expect(truncateDecimals(1.2345e2, 1)).toBe(123.4);
    expect(truncateDecimals(1.2345e-1, 1)).toBe(0.1);
  });
});
