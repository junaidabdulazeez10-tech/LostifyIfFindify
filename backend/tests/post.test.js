import request from "supertest";
import app from "../app.js";
import Post from "../models/post.js";
import { connectTestDB, clearTestDB, closeTestDB } from "./setup.js";

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(closeTestDB);

async function createUserAndToken() {
  const response = await request(app)
    .post("/signup")
    .field("username", "junaid")
    .field("email", "junaid@test.com")
    .field("password", "password123")
    .attach("profilePicture", Buffer.from("fake image"), "profile.jpg");

  return response.body.token;
}

describe("Post routes", () => {
  test("GET /posts returns posts array", async () => {
    const response = await request(app).get("/posts");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.posts)).toBe(true);
  });

  test("POST /post creates a post when authenticated", async () => {
    const token = await createUserAndToken();

    const response = await request(app)
      .post("/post")
      .set("Authorization", `Bearer ${token}`)
      .field("username", "junaid")
      .field("profilePicture", "http://localhost:5000/uploads/profile.jpg")
      .field("condition", "lost")
      .field("title", "Lost Keys")
      .field("category", "Keys")
      .field("location", "Berlin")
      .field("date", "2026-06-04")
      .field("description", "I lost my keys near the station.")
      .attach("image", Buffer.from("fake image"), "keys.jpg");

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Post Created :)");

    const posts = await Post.find();
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("Lost Keys");
  });

  test("POST /post fails without token", async () => {
    const response = await request(app)
      .post("/post")
      .field("username", "junaid")
      .field("condition", "lost")
      .field("title", "Lost Keys")
      .field("category", "Keys")
      .field("location", "Berlin")
      .field("date", "2026-06-04")
      .field("description", "I lost my keys.")
      .attach("image", Buffer.from("fake image"), "keys.jpg");

    expect(response.statusCode).toBe(401);
  });

  test("DELETE /post/:id deletes a post when authenticated", async () => {
    const token = await createUserAndToken();

    const post = await Post.create({
      username: "junaid",
      profilePicture: "http://localhost:5000/uploads/profile.jpg",
      condition: "lost",
      title: "Lost Bag",
      category: "Bags",
      location: "Berlin",
      date: new Date(),
      description: "Black backpack",
      image: "http://localhost:5000/uploads/bag.jpg",
    });

    const response = await request(app)
      .delete(`/post/${post._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Post deleted successfully :)");

    const deletedPost = await Post.findById(post._id);
    expect(deletedPost).toBeNull();
  });
});