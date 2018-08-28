const resolve = require("./alias");

jest.mock("./git", () => {
  return jest.fn();
});

describe("resolve", () => {
  describe("for a recognized alias", () => {
    it("delegates to the git resolver", () => {
      const gitResolve = require("./git");
      gitResolve.mockReturnValue("/path/to/resolved/repo");

      const path = resolve("react");

      expect(path).toEqual("/path/to/resolved/repo");
      expect(gitResolve).toHaveBeenCalledWith(
        "git@github.com:carbonfive/spraygun-react.git"
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
    expect(resolve.aliases).toEqual(["express", "react"]);
  });
});
