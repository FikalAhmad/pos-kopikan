import { render, screen } from "@/test.utils";
import Dashboard from "../page";

describe("Dashboar", () => {
  test("renders dashboard ordered items", () => {
    render(<Dashboard />);
    expect(screen.getByText(/Ordered Items/i)).toBeInTheDocument();
  });

  test("renders dashboard overall statistics", () => {
    render(<Dashboard />);
    expect(screen.getByText(/Overall/i)).toBeInTheDocument();
  });
});
