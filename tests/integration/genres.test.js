const request = require("supertest");
const mongoose = require("mongoose");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
let server;

describe("/api/genres", () => {
  beforeEach(async () => {
    process.env.PORT = 3003; // 设置测试端口为 3001
    server = require("../../index");
  });

  afterEach(async () => {
    await server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.deleteMany({}); // 清空数据库
      await Genre.insertMany([
        { name: "Action" },
        { name: "Horror" },
        { name: "Comedy" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(3);
      expect(res.body.some((g) => g.name === "Action")).toBeTruthy();
      expect(res.body.some((g) => g.name === "Horror")).toBeTruthy();
      expect(res.body.some((g) => g.name === "Comedy")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/genres/1");

      expect(res.status).toBe(404);
    });

    it("should return 404 if no genre with the given id exists", async () => {
      const id = new mongoose.Types.ObjectId();
      const res = await request(server).get("/api/genres/" + id);

      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.
    let token;
    let name;
    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "genre1";
    });

    it("should return a 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return a 401 if genre is less than 5 characters", async () => {
      name = "1234";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return a 401 if genre is more than 50 characters", async () => {
      name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });
    it("should save the genre if it is valid", async () => {
      await exec();
      const genre = await Genre.find({ name: "genre1" });
      expect(genre).not.toBeNull();
    });
    it("should return the genre if it is valid", async () => {
      name = "genre1";
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "genre1");
    });
  });
});
