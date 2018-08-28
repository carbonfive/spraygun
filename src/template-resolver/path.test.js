const resolve = require("./path");
const path = require("path");

describe("resolve", () => {
  describe("for a directory", () => {
    it("returns the path", () => {
      const dir = path.resolve(".");
      expect(resolve(dir)).toEqual(dir);
    });
  });

  describe("for a file", () => {
    it("throws an error", () => {
      expect(() => resolve(__filename)).toThrow(/Not a directory/i);
    });
  });

  describe("for non-existent path", () => {
    it("throws an error", () => {
      expect(() => resolve("./does-not-exist")).toThrow(/Not a directory/i);
    });
  });
});
