import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Calculator from './calculator';
import '@testing-library/jest-dom';

// Mock fetch globalement
global.fetch = jest.fn();

describe('Calculator', () => {
    beforeEach(() => {
        // Réinitialiser les mocks avant chaque test
        (global.fetch as jest.Mock).mockClear();
        // Mock par défaut pour l'API history
        (global.fetch as jest.Mock).mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve([])
            })
        );
    });

    test('effectue une addition correctement', async () => {
        render(<Calculator />);
        
        // Remplir les champs
        fireEvent.change(screen.getByPlaceholderText('Nombre A'), { target: { value: '5' } });
        fireEvent.change(screen.getByPlaceholderText('Nombre B'), { target: { value: '3' } });
        
        // Cliquer sur calculer
        fireEvent.click(screen.getByText('Calculer'));
        
        // Vérifier le résultat
        await waitFor(() => {
            expect(screen.getByText('Résultat : 8')).toBeInTheDocument();
        });
    });

    test('affiche une erreur pour la division par zéro', async () => {
        render(<Calculator />);
        
        // Sélectionner l'opération de division
        fireEvent.change(screen.getByRole('combobox'), { target: { value: '/' } });
        
        // Remplir les champs
        fireEvent.change(screen.getByPlaceholderText('Nombre A'), { target: { value: '10' } });
        fireEvent.change(screen.getByPlaceholderText('Nombre B'), { target: { value: '0' } });
        
        // Cliquer sur calculer
        fireEvent.click(screen.getByText('Calculer'));
        
        // Vérifier le message d'erreur
        await waitFor(() => {
            expect(screen.getByText('Résultat : Error : Division par zéro')).toBeInTheDocument();
        });
    });

    test('appelle l\'API avec les bonnes données', async () => {
        render(<Calculator />);
        
        // Remplir les champs
        fireEvent.change(screen.getByPlaceholderText('Nombre A'), { target: { value: '4' } });
        fireEvent.change(screen.getByPlaceholderText('Nombre B'), { target: { value: '2' } });
        
        // Cliquer sur calculer
        fireEvent.click(screen.getByText('Calculer'));
        
        // Vérifier l'appel à l'API
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith('/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ a: 4, b: 2, operator: '+', result: 6 })
            });
        });
    });
});
