import { truncateInMiddle } from "./truncateInMiddle";

describe("truncateInMiddle", () => {
  it("test", () => {
    expect(truncateInMiddle("123456789", 0)).toBe("123456789");
    expect(truncateInMiddle("123456789", 1)).toBe("1...9");
    expect(truncateInMiddle("123456789", 2)).toBe("12...89");
    expect(truncateInMiddle("123456789", 3)).toBe("123...789");
    expect(truncateInMiddle("123456789", 4)).toBe("123456789");

    expect(truncateInMiddle("123456789")).toBe("123456789");
    expect(truncateInMiddle("1234567890987654321")).toBe("1234...4321");
  });
});
