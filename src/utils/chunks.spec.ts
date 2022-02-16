import { chunks } from "./chunks";

describe("chunks", () => {
  it("covers successful cases", () => {
    expect(chunks([1, 2, 3], 1)).toStrictEqual([[1], [2], [3]]);
    expect(chunks([1, 2, 3], 2)).toStrictEqual([[1, 2], [3]]);
    expect(chunks([1, 2, 3], 3)).toStrictEqual([[1, 2, 3]]);
    expect(chunks([1], 3)).toStrictEqual([[1]]);
  });

  it("covers float as length", () => {
    expect(chunks([1, 2, 3], 2.5)).toStrictEqual([[1, 2], [3]]);
  });

  it("chunk size can't be smaller than 1", () => {
    try {
      expect(chunks([1], -3)).toThrow("Chunk size can't be smaller than 1");
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Chunk size can't be smaller than 1");
      }
    }
  });
});
