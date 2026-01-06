const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  describe("when name is not provided", () => {
    it("returns the hello world message with no name (null)", () => {
      expect(getGreeting(null)).toBe("Hello world!");
    });

    it("returns the hello world message with no name (undefined)", () => {
      expect(getGreeting(undefined)).toBe("Hello world!");
    });

    it("returns the hello world message with no name (empty string)", () => {
      expect(getGreeting("")).toBe("Hello world!");
    });

    it("returns the hello world message with no name (spaces)", () => {
      expect(getGreeting("   ")).toBe("Hello world!");
    });
  });

  describe("when name is provided", () => {
    it("returns the hello world message with a name (John)", () => {
      expect(getGreeting("John")).toBe("Hello world! From John");
    });

    it("returns the hello world message with a name (spaces around John)", () => {
      expect(getGreeting("  John  ")).toBe("Hello world! From John");
    });

    it("returns the hello world message with a name (number 42)", () => {
      expect(getGreeting(42)).toBe("Hello world! From 42");
    });

    it("returns the hello world message with a name (special characters José)", () => {
      expect(getGreeting("José")).toBe("Hello world! From José");
    });

    it("returns the hello world message with a name (emoji )", () => {
      expect(getGreeting("")).toBe("Hello world! From ");
    });

    it("returns the hello world message with a name (very long string)", () => {
      const longString = "a".repeat(1000);
      expect(getGreeting(longString)).toBe(`Hello world! From ${longString}`);
    });
  });
});
