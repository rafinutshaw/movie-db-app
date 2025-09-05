import { render, screen } from "@testing-library/react";
import WishList from "../pages/WishList/WishList";
import { vi } from "vitest";
import * as authStore from "../store/useAuthStore";
import { BrowserRouter } from "react-router-dom";
import * as wishlistUsecase from "../usecases/wishlistUsecase";

vi.mock("../hooks/useWishList", () => ({
  useWishList: () => ({
    items: [{ id: 1, title: "Wish Movie", poster_path: null }],
    remove: vi.fn(),
    error: null,
    loading: false,
  }),
}));

vi.spyOn(wishlistUsecase, "fetchTMDBWishList").mockResolvedValue({
  items: [{ id: 1, title: "Wish Movie", poster_path: null }],
  error: null,
});

vi.mock("../store/useAuthStore", async () => {
  const actual = await vi.importActual<typeof authStore>(
    "../store/useAuthStore"
  );
  return {
    ...actual,
    useAuthStore: vi.fn(() => ({
      isLoggedIn: true,
      user: { id: "1", name: "Test User" },
    })),
  };
});
describe("WishList page", () => {
  let useAuthStoreSpy: ReturnType<typeof vi.spyOn>;

  afterEach(() => {
    if (useAuthStoreSpy) {
      useAuthStoreSpy.mockRestore();
    }
    vi.clearAllMocks();
  });

  it("shows wishlist items when logged in", () => {
    useAuthStoreSpy = vi.spyOn(authStore, "useAuthStore").mockReturnValue({
      isLoggedIn: true,
      user: { id: "1", name: "Test User" },
    });
    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );
    expect(screen.getByText(/Wish Movie/i)).toBeInTheDocument();
  });

  it("shows login prompt when not logged in", () => {
    useAuthStoreSpy = vi.spyOn(authStore, "useAuthStore").mockReturnValue({
      isLoggedIn: false,
      user: null,
    });
    render(
      <BrowserRouter>
        <WishList />
      </BrowserRouter>
    );
    expect(screen.getByText(/login here/i)).toBeInTheDocument();
  });
});
