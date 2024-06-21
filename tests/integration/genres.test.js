const request = require("supertest");
// const mongoose = require("mongoose");
const { Genre } = require("../../models/genre");
let server;

describe("/api/genres", () => {
  beforeEach(async () => {
    process.env.PORT = 3001; // 设置测试端口为 3001
    server = require("../../index");
  });

  afterEach(async () => {
    await server.close();
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
});
