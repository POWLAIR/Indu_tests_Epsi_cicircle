"use client";

import { useState } from "react";


export default function Calculator() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [operator, setOperator] = useState("+");
    const [result, setResult] = useState<number | string>("");
    const [history, setHistory] = useState<{ a: number; b: number; operator: string; result: number | string }[]>([]);

    async function calculate() {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        if (isNaN(numA) || isNaN(numB)) {
            setResult("Veuillez entrer des nombres valides");
            return;
        }
        let operationResult: number | string = 0;
        switch (operator) {
            case '+': operationResult = numA + numB; break;
            case '-': operationResult = numA - numB; break;
            case '*': operationResult = numA * numB; break;
            case '/': {
                if (numB === 0) {
                    setResult("Error : Division par zéro");
                    return;
                }
                operationResult = numA / numB;
                break;
            };
            default: setResult("Opérateur non supporté");
        }

        setResult(operationResult);

        // Envoyer l'opération à l'API
        await fetch("/api/history", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ a: numA, b: numB, operator, result: operationResult }),
        });

        // Mettre à jour l'historique
        fetch("/api/history")
            .then(res => res.json())
            .then(data => setHistory(data));
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