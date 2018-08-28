const resolve = require("./git");

jest.mock("shelljs", () => {
  return {
    exec: jest.fn(),
    error: jest.fn(),
    tempdir: jest.fn().mockReturnValue("/tmp"),
    config: {
      reset: jest.fn()
    }
  };
});

jest.mock("./cache", () => {
  return jest.fn();
});

const shell = require("shelljs");
const cacheLookup = require("./cache");

describe("resolve", () => {
  describe("when name is not in URL format", () => {
    it("throws an error", () => {
      expect(() => resolve("not-a-URL")).toThrow(/Not a git URL/i);
    });
  });

  describe("when git ls-remote execution fails", () => {
    beforeEach(() => {
      shell.error.mockReturnValue(true);
    });

    afterEach(() => {
      shell.error.mockReset();
    });

    describe("and cache is not present", () => {
      const cache = {
        isPresent: jest.fn().mockReturnValue(false)
      };

      beforeEach(() => {
        cacheLookup.mockReturnValue(cache);
      });

      afterEach(() => {
        cacheLookup.mockReset();
      });

      it("throws an error", () => {
        expect(() => resolve("git:my-repository")).toThrow();
      });
    });

    describe("and cache is present", () => {
      const cache = {
        isPresent: jest.fn().mockReturnValue(true),
        location: "path/to/cache"
      };

      beforeEach(() => {
        cacheLookup.mockReturnValue(cache);
      });

      afterEach(() => {
        cacheLookup.mockReset();
      });

      it("returns the cache location", () => {
        expect(resolve("git:my-repository")).toEqual("path/to/cache");
      });
    });
  });

  describe("when git ls-remote execution succeeds", () => {
    let command;
    const cache = {
      isPresent: jest.fn().mockReturnValue(false),
      store: jest.fn(),
      location: "path/to/cache"
    };

    beforeEach(() => {
      shell.exec.mockImplementation(arg => (command = arg));
      shell.error.mockReturnValue(false);
      cacheLookup.mockReturnValue(cache);
    });

    afterEach(() => {
      shell.error.mockReset();
      cacheLookup.mockReset();
    });

    function subject() {
      return resolve("git:my-repository");
    }

    it("clones the repository into /tmp using shell.exec", () => {
      subject();
      expect(command).toMatch(
        /^git clone 'git:my-repository' \/tmp\/spraygun-\d{13}$/
      );
    });

    it("stores the cloned repository in the cache", () => {
      subject();
      const cloneDir = command.split(" ")[3];
      expect(cache.store).toHaveBeenCalledWith(cloneDir);
    });

    it("returns the cache location", () => {
      expect(subject()).toEqual("path/to/cache");
    });
  });
});
