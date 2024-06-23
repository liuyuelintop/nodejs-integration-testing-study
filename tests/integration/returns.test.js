const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
const request = require("supertest");
describe("/apis/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require("../../index");
    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

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
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });
  it("should return 400 if customerID is not provided!", async () => {
    customerId = "";
    const res = await exec();
    expect(res.status).toBe(400);
  });
  it("should return 404 if no rental found for this customer/movie", async () => {
    await Rental.deleteMany();
    const res = await exec();
    expect(res.status).toBe(404);
  });
  it("should return 400 if rental already processed", async () => {
    rental.dateReturned = new Date();
    await rental.save();
    const res = await exec();
    expect(res.status).toBe(400);
  });
});
