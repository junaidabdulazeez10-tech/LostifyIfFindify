import request from "supertest";
import app from "../app.js";
import User from "../models/user.js";
import { connectTestDB, clearTestDB, closeTestDB } from "./setup.js";

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(closeTestDB);

describe("Auth routes", () => {
  test("signup creates a new user", async () => {
    const response = await request(app)
      .post("/signup")
      .field("username", "junaid")
      .field("email", "junaid@test.com")
      .field("password", "password123")
      .attach("profilePicture", Buffer.from("fake image"), "profile.jpg");

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBe("junaid");

    const user = await User.findOne({ email: "junaid@test.com" });
    expect(user).not.toBeNull();
    expect(user.password).not.toBe("password123");
  });

  test("signup fails without profile picture", async () => {
    const response = await request(app)
      .post("/signup")
      .field("username", "junaid")
      .field("email", "junaid@test.com")
      .field("password", "password123");

    expect(response.statusCode).toBe(400);
  });

  test("login works with correct credentials", async () => {
    await request(app)
      .post("/signup")
      .field("username", "junaid")
      .field("email", "junaid@test.com")
      .field("password", "password123")
      .attach("profilePicture", Buffer.from("fake image"), "profile.jpg");

    const response = await request(app).post("/login").send({
      email: "junaid@test.com",
      password: "password123",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBe("junaid");
  });

  test("login fails with wrong password", async () => {
    await request(app)
      .post("/signup")
      .field("username", "junaid")
      .field("email", "junaid@test.com")
      .field("password", "password123")
      .attach("profilePicture", Buffer.from("fake image"), "profile.jpg");

    const response = await request(app).post("/login").send({
      email: "junaid@test.com",
      password: "wrongpassword",
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Invalid Credentials :/");
  });
});