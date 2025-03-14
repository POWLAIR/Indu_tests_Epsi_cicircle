"use client";

import { useState } from "react";

declare const fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export default function Calculator() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [operator, setOperator] = useState("+");
    const [result, setResult] = useState<number | string>("");
    const [history, setHistory] = useState<{ a: number; b: number; operator: string; result: number | string }[]>([]);

    async function calculate() {
        try {
            const numA = parseFloat(a);
            const numB = parseFloat(b);
            if (isNaN(numA) || isNaN(numB)) {
                setResult("Veuillez entrer des nombres valides");
                return;
            }
            let operationResult: number | string = 0;
            switch (operator) {
                case '+': operationResult = Number((numA + numB).toFixed(2)); break;
                case '-': operationResult = Number((numA - numB).toFixed(2)); break;
                case '*': operationResult = Number((numA * numB).toFixed(2)); break;
                case '/': {
                    if (numB === 0) {
                        setResult("Error : Division par zéro");
                        return;
                    }
                    operationResult = Number((numA / numB).toFixed(2));
                    break;
                };
                default: setResult("Opérateur non supporté");
            }

            setResult(operationResult);

            try {
                // Envoyer l'opération à l'API
                await fetch("/api/history", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ a: numA, b: numB, operator, result: operationResult }),
                });

                // Mettre à jour l'historique
                const response = await fetch("/api/history");
                const data = await response.json();
                setHistory(data);
            } catch (error) {
                console.error("Erreur lors de la communication avec l'API:", error);
            }
        } catch (error) {
            setResult("Une erreur est survenue");
            console.error("Erreur lors du calcul:", error);
        }
    }

    return (
        <div>
            <input type="text" value={a} onChange={(e) => setA(e.target.value)} placeholder="Nombre A" />
            <select value={operator} onChange={(e) => setOperator(e.target.value)}>
                <option value="+">+</option>
                <option value="-">-</option>
                <option value="*">*</option>
                <option value="/">/</option>
            </select>
            <input type="text" value={b} onChange={(e) => setB(e.target.value)
            } placeholder="Nombre B" />
            <button onClick={calculate}>Calculer</button>
            <h3>Résultat : {result}</h3>
            <h3>Historique :</h3>
            <ul>
                {history.map((entry, index) => (
                    <li key={index}>
                        {entry.a} {entry.operator} {entry.b} = {entry.result}
                    </li>
                ))}
            </ul>
        </div >
    );
}