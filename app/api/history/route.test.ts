import { GET, POST } from "./route";
import { it, describe, expect } from "@jest/globals";
import jest from "jest";

jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data) => new Response(JSON.stringify(data), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        })),
    },
}));

describe("API /api/history", () => {
    it("devrait appeler GET et retourner une réponse", async () => {
        const res = await GET();
        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json).toEqual([]);
    });

    it("devrait appeler POST et stocker une opération", async () => {
        const requestBody = JSON.stringify({ a: 1, b: 2, operator: "+", result: 3 });

        const mockRequest = new Request("http://localhost/api/history", {
            method: "POST",
            body: requestBody,
            headers: { "Content-Type": "application/json" }
        });

        // Tester avec fetch au lieu de NextRequest
        const res = await POST(mockRequest);

        expect(res.status).toBe(200);
        const json = await res.json();
        expect(json.success).toBe(true);
        expect(json.data.length).toBe(1);
    });
});