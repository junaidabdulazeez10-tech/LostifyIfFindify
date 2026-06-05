import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, test, expect, beforeEach } from "vitest";
import axios from "axios";
import Post from "./post";

vi.mock("axios");

vi.mock("../utils/utils", () => ({
  default: vi.fn(),
}));

const mockPost = {
  _id: "post123",
  username: "junaid",
  profilePicture: "profile.jpg",
  condition: "lost",
  title: "Lost Wallet",
  category: "Wallet",
  location: "Berlin",
  date: "2026-06-04",
  description: "Black leather wallet",
  image: "wallet.jpg",
  comments: [
    {
      _id: "comment1",
      user: "ahmed",
      text: "I saw this near the station",
      profilePicture: "ahmed.jpg",
    },
    {
      _id: "comment2",
      user: "sara",
      text: "Hope you find it",
      profilePicture: "sara.jpg",
    },
  ],
};

function renderPost(customProps = {}) {
  const defaultProps = {
    mode: true,
    show: false,
    posts: [mockPost],
    token: "",
    postId: "post123",
    setId: vi.fn(),
    setTitle: vi.fn(),
    setCategory: vi.fn(),
    setLocation: vi.fn(),
    setDate: vi.fn(),
    setDescription: vi.fn(),
    setCondition: vi.fn(),
    setCommentId: vi.fn(),
    getPosts: vi.fn(),
    showDescription: false,
    setShowDescription: vi.fn(),
  };

  return render(
    <MemoryRouter>
      <Post {...defaultProps} {...customProps} />
    </MemoryRouter>
  );
}

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

describe("Post component", () => {
  test("renders post details", () => {
    renderPost();

    expect(screen.getByText("@junaid")).toBeInTheDocument();
    expect(screen.getByText("lost")).toBeInTheDocument();
    expect(screen.getByText("Lost Wallet")).toBeInTheDocument();
    expect(screen.getByText("Location: Berlin")).toBeInTheDocument();
    expect(screen.getByText("Wallet")).toBeInTheDocument();
    expect(screen.getByText("Comments (2)")).toBeInTheDocument();
  });

  test("shows description when showDescription is true", () => {
    renderPost({ showDescription: true });

    expect(
      screen.getByText("Description: Black leather wallet")
    ).toBeInTheDocument();
  });

  test("does not show comment input when user is logged out", () => {
    renderPost({ token: "" });

    expect(
      screen.queryByPlaceholderText("Enter Your Text Here: ")
    ).not.toBeInTheDocument();
  });

  test("shows comment input when user is logged in", () => {
    localStorage.setItem("username", "junaid");
    localStorage.setItem("profilePicture", "profile.jpg");

    renderPost({ token: "fake-token" });

    expect(
      screen.getByPlaceholderText(/Enter Your Text Here/i)
    ).toBeInTheDocument();
  });

  test("sends a comment when logged in user types and clicks send", async () => {
    const user = userEvent.setup();
    const getPosts = vi.fn();

    localStorage.setItem("username", "junaid");
    localStorage.setItem("profilePicture", "profile.jpg");

    axios.post.mockResolvedValue({
      data: {
        message: "Comment added",
      },
    });

    renderPost({ token: "fake-token", getPosts });

    await user.type(
      screen.getByPlaceholderText(/Enter Your Text Here/i),
      "I found this"
    );

    await user.click(screen.getByText("Send"));

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:5000/post/post123/comment",
      {
        user: "junaid",
        text: "I found this",
        profilePicture: "profile.jpg",
      },
      {
        headers: {
          Authorization: "Bearer fake-token",
        },
      }
    );

    expect(getPosts).toHaveBeenCalled();
  });

  test("shows edit and delete buttons only for post owner", () => {
    localStorage.setItem("username", "junaid");

    renderPost();

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  test("hides edit and delete buttons for other users", () => {
    localStorage.setItem("username", "someoneelse");

    renderPost();

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });
});