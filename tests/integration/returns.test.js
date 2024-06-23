const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
const request = require("supertest");
describe("/apis/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  beforeEach(async () => {
    server = require("../../index");
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: "test1",
        phone: "1234567890",
      },
      movie: {
        _id: movieId,
        title: "movie title",
        dailyRentalRate: 2,
      },
      dateOut: new Date(),
      dateReturned: new Date(),
    });
    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    await Rental.deleteMany();
  });

  it("should return 401 if client is not logged in!", async () => {
    const res = await request(server)
      .post("/api/returns")
      .send({ customerId, movieId });
    expect(res.status).toBe(401);
  });
  it("should return 400 if customerID is not provided!", async () => {
    const token = new User().generateAuthToken();
    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ movieId });
    expect(res.status).toBe(400);
  });
  it("should return 400 if movieID is not provided!", async () => {
    const token = new User().generateAuthToken();
    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId });
    expect(res.status).toBe(400);
  });
});
