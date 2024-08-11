import React from "react";
import { render, renderHook, screen } from "@testing-library/react";
import App from "./App";
import useCounter from "./useCounter";
import { act } from "react-dom/test-utils";

test("renders learn react link", () => {
  const { container } = render(<App />);
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const linkElement = container.querySelector(".App-header");
  // const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
test("useCounter", async () => {
  const utils = renderHook(() => useCounter(0));
  const [count, increment, decrement] = utils.result.current;
  act(() => {
    increment(2);
  });
  expect(utils.result.current[0]).toBe(2);

  act(() => {
    decrement(3);
  });
  expect(utils.result.current[0]).toBe(-1);

  utils.unmount();
});
