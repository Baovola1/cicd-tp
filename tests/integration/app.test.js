const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return Hello world", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello world!");
  });

  describe("with query parameter ?name=John", () => {
    it("should return 'Hello world! From John'", async () => {
      const res = await request(app).get("/hello?name=John");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world! From John");
    });
  });

  describe("with empty name ?name=", () => {
    it("should return 'Hello world!'", async () => {
      const res = await request(app).get("/hello?name=");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world!");
    });
  });

  describe("with special characters", () => {
    it("should handle ?name=José", async () => {
      const res = await request(app).get("/hello?name=José");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world! From José");
    });

    it("should handle ?name= (empty)", async () => {
      const res = await request(app).get("/hello?name=");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world!");
    });
  });

  describe("with invalid route", () => {
    it("should return 404 Not Found", async () => {
      const res = await request(app).get("/invalid-route");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("with POST method", () => {
    it("should return 405 Method Not Allowed", async () => {
      const res = await request(app).post("/hello");
      expect(res.statusCode).toBe(405);
    });
  });

  describe("response headers", () => {
    it("should have correct Content-Type header", async () => {
      const res = await request(app).get("/hello?name=John");
      expect(res.headers["content-type"]).toMatch(/text\/html|text\/plain/);
    });
  });
});
