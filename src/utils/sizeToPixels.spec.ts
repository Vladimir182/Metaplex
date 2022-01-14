import { sizeToPixels } from "./sizeToPixels";

describe("sizeToPixels", () => {
  it("test", () => {
    expect(sizeToPixels(3)).toBe("3px");
    expect(sizeToPixels("3px")).toBe("3px");
    expect(sizeToPixels(42)).toBe("42px");
  });
});
