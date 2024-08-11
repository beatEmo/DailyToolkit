/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Toggle from "./Toggle";

test("renders learn react link", async () => {
  const { container } = render(<Toggle />);

  expect(container.querySelector("p")?.textContent).toBe("close");
  act(() => {
    fireEvent.click(container.querySelector("button")!);
  });
  await waitFor(
    () => expect(container.querySelector("p")?.textContent).toBe("open"),
    {
      timeout: 2000,
    }
  );
});
