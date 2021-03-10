import { render, screen } from "@testing-library/react"
import App from "../pages"

describe("App", () => {
  it("should render correctly App", () => {
    render(<App />)
    expect(
      screen.getByRole("heading", { name: "Welcome to Next.js!" })
    ).toBeInTheDocument()
  })
})