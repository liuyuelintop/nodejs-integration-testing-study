const request = require("supertest");
const { User } = require("../../models/user");
let server;

describe("/api/users", () => {
  beforeEach(() => {
    process.env.PORT = 3001; // 设置测试端口为 3001
    server = require("../../index");
  });
  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });

  describe("POST /", () => {
    it("should return 400 if user already registered", async () => {
      const user = {
        name: "user1",
        email: "user1@example.com",
        password: "password",
      };
      await request(server).post("/api/users").send(user);
      const res = await request(server).post("/api/users").send(user);

      expect(res.status).toBe(400);
      expect(res.text).toContain("User already registered.");
    });

    it("should return 200 if user is registered successfully", async () => {
      const user = {
        name: "user2",
        email: "user2@example.com",
        password: "password",
      };
      const res = await request(server).post("/api/users").send(user);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "user2");
      expect(res.body).toHaveProperty("email", "user2@example.com");
    });
  });
});
