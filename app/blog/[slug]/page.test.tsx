/**
 * @jest-environment jsdom
 */
import { it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Page from "./page";

it("App Router: Works with dynamic route segments", () => {
  render(<Page params={{ slug: "Test" }} />);
  expect(screen.getByRole("heading")).toHaveTextContent("Slug: Test");
});
