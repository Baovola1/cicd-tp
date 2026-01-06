const axios = require("axios");
const app = require("../../src/server");
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe("E2E GET /hello", () => {
  it("responds with Hello world", async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world!");
  });

  it("should handle multiple sequential requests with different names", async () => {
    const names = ["Alice", "Bob", "Charlie", "Diana"];

    for (const name of names) {
      const res = await axios.get(`${baseURL}/hello`, {
        params: { name }
      });
      expect(res.status).toBe(200);
      expect(res.data).toBe(`Hello world! From ${name}`);
    }
  });

  it("should handle concurrent requests", async () => {
    const names = ["Eve", "Frank", "Grace", "Heidi", "Ivan"];
    const requests = names.map(name =>
      axios.get(`${baseURL}/hello`, { params: { name } })
    );

    const responses = await Promise.all(requests);

    responses.forEach((res, index) => {
      expect(res.status).toBe(200);
      expect(res.data).toBe(`Hello world! From ${names[index]}`);
    });
  });

  it("should confirm server is running and responsive", async () => {
    const res = await axios.get(`${baseURL}/hello`, {
      params: { name: "Test" },
      timeout: 1000
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Test");
  });

  it("should handle very long names (1000+ characters)", async () => {
    const longName = "A".repeat(1000);
    const res = await axios.get(`${baseURL}/hello`, {
      params: { name: longName }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe(`Hello world! From ${longName}`);
  });

  it("should recover from 404 error and handle valid request", async () => {
    try {
      await axios.get(`${baseURL}/nonexistent`);
    } catch (error) {
      expect(error.response.status).toBe(404);
    }

    const res = await axios.get(`${baseURL}/hello`, {
      params: { name: "Recovery" }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe("Hello world! From Recovery");
  });
});