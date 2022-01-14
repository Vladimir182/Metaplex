import { throttle } from "./throttle";

describe("throttle", () => {
  it("test", async () => {
    const fn = jest.fn(() => 1);

    const trigger = throttle<void>(fn, 30);
    trigger();
    expect(fn.mock.calls.length).toBe(1);
    trigger();
    expect(fn.mock.calls.length).toBe(1);
    trigger();
    expect(fn.mock.calls.length).toBe(1);
    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(fn.mock.calls.length).toBe(2);
  });
});
