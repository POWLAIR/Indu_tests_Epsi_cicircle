import { render, screen, fireEvent } from "@testing-library/react";
import Calculator from "./calculator";
import { test, expect, jest, beforeEach } from "@jest/globals";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([])
    })
  ) as jest.Mock;
});

test("Addition fonctionne correctement", async () => {
  render(<Calculator />);
  const inputA = screen.getByPlaceholderText("Nombre A");
  const inputB = screen.getByPlaceholderText("Nombre B");
  const button = screen.getByText("Calculer");
  
  fireEvent.change(inputA, { target: { value: "5" } });
  fireEvent.change(inputB, { target: { value: "3" } });
  fireEvent.click(button);
  
  const result = await screen.findByText(/Résultat : 8/);
  expect(result).toBeInTheDocument();
});

test("Soustraction fonctionne correctement", () => {
    render(<Calculator />);
    const inputA = screen.getByPlaceholderText("Nombre A");
    const inputB = screen.getByPlaceholderText("Nombre B");
    const select = screen.getByRole("combobox");
    const button = screen.getByText("Calculer");
    const result = screen.getByText(/Résultat/i);
    fireEvent.change(inputA, { target: { value: "5" } });
    fireEvent.change(inputB, { target: { value: "3" } });
    fireEvent.change(select, { target: { value: "-" } });
    fireEvent.click(button);
    expect(result).toHaveTextContent("2");
});

test("Multiplication fonctionne correctement", () => {
    render(<Calculator />);
    const inputA = screen.getByPlaceholderText("Nombre A");
    const inputB = screen.getByPlaceholderText("Nombre B");
    const select = screen.getByRole("combobox");
    const button = screen.getByText("Calculer");
    const result = screen.getByText(/Résultat/i);
    fireEvent.change(inputA, { target: { value: "5" } });
    fireEvent.change(inputB, { target: { value: "3" } });
    fireEvent.change(select, { target: { value: "*" } });
    fireEvent.click(button);
    expect(result).toHaveTextContent("15");
});

test("Division fonctionne correctement", () => {
    render(<Calculator />);
    const inputA = screen.getByPlaceholderText("Nombre A");
    const inputB = screen.getByPlaceholderText("Nombre B");
    const select = screen.getByRole("combobox");
    const button = screen.getByText("Calculer");
    const result = screen.getByText(/Résultat/i);
    fireEvent.change(inputA, { target: { value: "6" } });
    fireEvent.change(inputB, { target: { value: "3" } });
    fireEvent.change(select, { target: { value: "/" } });
    fireEvent.click(button);
    expect(result).toHaveTextContent("2");
});

test("Division par 0 renvoie bien 'Error : Division par zéro' fonctionne correctement", () => {
    render(<Calculator />);
    const inputA = screen.getByPlaceholderText("Nombre A");
    const inputB = screen.getByPlaceholderText("Nombre B");
    const select = screen.getByRole("combobox");
    const button = screen.getByText("Calculer");
    const result = screen.getByText(/Résultat/i);
    fireEvent.change(inputA, { target: { value: "6" } });
    fireEvent.change(inputB, { target: { value: "0" } });
    fireEvent.change(select, { target: { value: "/" } });
    fireEvent.click(button);
    expect(result).toHaveTextContent("Error : Division par zéro");
});
