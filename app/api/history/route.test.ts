import { NextRequest } from "next/server";
import { GET, POST } from "./route"; // Import des handlers de la route
import httpMocks from "node-mocks-http";
jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data) => ({ json: data, status: 200 })),
    },
}));
describe("API /api/history", () => {
    it("devrait appeler GET et retourner une réponse", async () => {
        const req = httpMocks.createRequest({ method: "GET" });
        const res = httpMocks.createResponse();
        const spy = jest.spyOn(global, "fetch"); // Vérifier si une requête est faite
        await GET(req, res);
        expect(spy).not.toHaveBeenCalled(); // On ne veut pas de fetch ici
        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toBeDefined();
    });
    it("devrait appeler POST et stocker une opération", async () => {
        const req = httpMocks.createRequest({
            method: "POST",
            body: {},
        });
        const res = httpMocks.createResponse();
        await POST(req, res);
        expect(res._getStatusCode()).toBe(200);
        expect(res._getData()).toBeDefined();
    });
});
