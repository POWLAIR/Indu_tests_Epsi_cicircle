/**
 * @jest-environment jsdom
 */
import { describe, it, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./counter";
import '@testing-library/jest-dom';

describe('Counter Component', () => {
  beforeEach(() => {
    render(<Counter />);
  });

  it("affiche initialement 0", () => {
    const heading = screen.getByTestId("count-display");
    expect(heading).toHaveTextContent("0");
  });

  it("incrémente correctement le compteur", () => {
    const incrementButton = screen.getByLabelText("Incrémenter");
    fireEvent.click(incrementButton);
    expect(screen.getByTestId("count-display")).toHaveTextContent("1");
  });

  it("décrémente correctement le compteur", () => {
    const decrementButton = screen.getByLabelText("Décrémenter");
    fireEvent.click(decrementButton);
    expect(screen.getByTestId("count-display")).toHaveTextContent("-1");
  });

  it("réinitialise correctement le compteur", () => {
    // D'abord incrémenter plusieurs fois
    const incrementButton = screen.getByLabelText("Incrémenter");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    
    // Vérifier que le compteur a bien été incrémenté
    expect(screen.getByTestId("count-display")).toHaveTextContent("2");
    
    // Réinitialiser
    const resetButton = screen.getByLabelText("Réinitialiser");
    fireEvent.click(resetButton);
    
    // Vérifier que le compteur est revenu à 0
    expect(screen.getByTestId("count-display")).toHaveTextContent("0");
  });

  it("permet des opérations multiples", () => {
    const incrementButton = screen.getByLabelText("Incrémenter");
    const decrementButton = screen.getByLabelText("Décrémenter");
    
    // Séquence d'opérations
    fireEvent.click(incrementButton); // 1
    fireEvent.click(incrementButton); // 2
    fireEvent.click(decrementButton); // 1
    fireEvent.click(incrementButton); // 2
    
    expect(screen.getByTestId("count-display")).toHaveTextContent("2");
  });
});
