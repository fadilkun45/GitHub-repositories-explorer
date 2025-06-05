import { vi, test, expect } from "vitest";
import GeneralsApis from "../services/generals.api";
import type { userInterface } from "../interface/userInterface";

vi.mock("../services/generals.api", () => ({
  default: {
    getUsersList: vi.fn(() =>
      Promise.resolve({
        items: [{ id: 1, login: "fadilkun45" }]
      })
    )
  }
}));

test("getUsersList returns user fadilkun45", async () => {
  const res = await GeneralsApis.getUsersList("?q=fadilkun45&page=1");
  expect(res.items).toBeDefined();
  expect(res.items.some((user: userInterface) => user.login === "fadilkun45")).toBe(true);
});
