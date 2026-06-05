import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, test, expect, beforeEach } from "vitest";
import axios from "axios";
import App from "./App";

vi.mock("axios");

beforeEach(() => {
  localStorage.clear();

  axios.get.mockResolvedValue({
    data: {
      posts: [
        {
          _id: "1",
          username: "junaid",
          profilePicture: "profile.jpg",
          condition: "lost",
          title: "Lost Wallet",
          category: "Wallet",
          location: "Berlin",
          date: "2026-06-04",
          description: "Black wallet",
          image: "wallet.jpg",
          comments: []
        },
      ],
    },
  });
});

describe("App", () => {
  test("fetches posts from the backend", async () => {
    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/posts");
    });
  });

  test("renders a post from the API", async () => {
    render(<App />);

    expect(await screen.findByText(/Lost Wallet/i)).toBeInTheDocument();
  });

  test("loads saved token from localStorage", async () => {
    localStorage.setItem("token", "fake-token");

    render(<App />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(localStorage.getItem("token")).toBe("fake-token");
  });
});