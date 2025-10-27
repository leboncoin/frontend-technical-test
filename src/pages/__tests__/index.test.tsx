import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import App from "../index";

// Mock Next.js router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock the API hooks
jest.mock("../../hooks/api", () => ({
  useConversations: () => ({
    conversations: [],
    loading: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

// Mock the Header component to show title
jest.mock("../../components/Header", () => {
  return function MockHeader({ title }: { title?: string }) {
    return (
      <div>
        <h1>{title}</h1>
      </div>
    );
  };
});

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

describe("App", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: mockPush,
      pathname: "/",
      query: {},
      asPath: "/",
      route: "/",
    } as any);
  });

  it("should render conversations page correctly", () => {
    render(<App />);
    expect(screen.getByText("Conversations")).toBeInTheDocument();
    expect(screen.getByText("No conversations yet")).toBeInTheDocument();
  });
});
