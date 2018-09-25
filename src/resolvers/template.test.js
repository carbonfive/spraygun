const resolve = require("./template");

jest.mock("./repository", () => {
  return jest.fn();
});

describe("resolve", () => {
  describe("for a recognized alias", () => {
    it("delegates to the repository resolver", () => {
      const repositoryResolve = require("./repository");
      repositoryResolve.mockReturnValue("/path/to/resolved/repo");

      const path = resolve("react");

      expect(path).toEqual("/path/to/resolved/repo");
      expect(repositoryResolve).toHaveBeenCalledWith(
        "https://github.com/carbonfive/spraygun-react.git"
      );
    });
  });

  describe("for an unrecognized alias", () => {
    it("throws an error", () => {
      expect(() => resolve("foo")).toThrow();
    });
  });
});

describe("aliases", () => {
  it("exports an array of alias names", () => {
    expect(resolve.aliases).toEqual(["express", "react", "react-ts"]);
  });
});
