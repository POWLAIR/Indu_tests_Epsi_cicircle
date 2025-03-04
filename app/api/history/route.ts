// app/api/history/route.ts

import { NextRequest, NextResponse } from "next/server";

let history: { a: number; b: number; operator: string; result: number | string }[] = [];

export async function GET() {
    return new NextResponse(JSON.stringify(history), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        history.push(body);
        return new Response(JSON.stringify({ success: true, status: 200, data: history }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Invalid request" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
}

