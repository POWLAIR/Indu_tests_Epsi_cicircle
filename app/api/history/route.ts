// app/api/history/route.ts

import { NextRequest, NextResponse } from "next/server";

let history: { a: number; b: number; operator: string; result: number | string }[] = [];

export async function GET() {
    return NextResponse.json(history);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { a, b, operator, result } = body;

        if (typeof a !== "number" || typeof b !== "number" || typeof result !== "number" && typeof result !== "string") {
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }

        history.push({ a, b, operator, result });
        return NextResponse.json({ success: true, status: 200, data: history });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

