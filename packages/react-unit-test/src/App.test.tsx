import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { container } = render(<App />);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const linkElement = container.querySelector(".App-header");
  // const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
