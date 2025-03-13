import { NextResponse } from "next/server";
import { GET, POST } from "./route";
import { jest, describe, it, expect, beforeEach } from "@jest/globals";

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any) => new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  }
}));

describe("History API", () => {
  beforeEach(() => {
    // Réinitialiser l'historique entre chaque test
    jest.clearAllMocks();
  });

  it("GET should return empty history initially", async () => {
    const response = await GET();
    const data = await response.json();
    expect(data).toEqual([]);
  });

  it("POST should add operation to history", async () => {
    const operation = { a: 2, b: 3, operator: "+", result: 5 };
    const request = new Request("http://localhost:3000/api/history", {
      method: "POST",
      body: JSON.stringify(operation)
    });

    const response = await POST(request);
    const data = await response.json();
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(1);
    expect(data.data[0]).toEqual(operation);
  });
});