import { combineRoute, extractName, route, variable } from "./route";

function typeCheck<T extends string>(t: T): boolean {
  return !!t;
}

describe("route", () => {
  it("combineRoute", () => {
    const route = combineRoute("/test", ":test1");
    expect(route()).toBe("/test/:test1");
    expect(route("hey")).toBe("/test/hey");

    // typechecks
    expect(typeCheck<"/test/:test1">(route())).toBeTruthy();
    expect(typeCheck<`/test/${string}`>(route("test"))).toBeTruthy();
  });

  it("extractName", () => {
    const name = extractName("/admin", "/admin/settings");
    expect(name).toBe("settings");
    // typechecks
    expect(typeCheck<"settings">(name)).toBeTruthy();
  });

  it("route", () => {
    const path = route(variable(":storeId"), "store", "admin", variable(":id"));
    expect(typeCheck<"/:storeId/store/admin/:id">(path.path)).toBeTruthy();

    const formedPath = path({
      ":storeId": "test",
      ":id": 1,
    });
    expect(formedPath).toBe("/test/store/admin/1");
    expect(
      typeCheck<`/${string}/store/admin/${string}`>(formedPath)
    ).toBeTruthy();
  });
});
