import { vi, it, describe, expect } from "vitest";
import FirebaseIface from "../src/firebaseIface";

vi.mock("firebase/analytics", () => ({
  getAnalytics: vi.fn()
}));

describe("firebaseStoreTest", () => {
  const firebaseIface = new FirebaseIface();

  it("adds a story", async () => {
    await expect(firebaseIface.addStory()).resolves.not.toThrowError();
  });

  it("gets stories", async () => {
    const stories = await firebaseIface.getStories();
    expect(stories).toBeDefined();
  });
});
