import { vi, it, describe, expect } from "vitest";
import FirebaseIface from "../src/firebaseIface";

vi.mock("firebase/analytics", () => ({
  getAnalytics: vi.fn()
}));

describe("firebaseStoreTest", () => {
  const firebaseIface = new FirebaseIface();

  it("gets the users", async () => {
    await firebaseIface.addUser();
    const users = await firebaseIface.getUsers();
    console.log({ users });
    expect(users).toBeDefined();
  });
});
