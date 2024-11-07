import { NextResponse } from "next/server";
import { connectDb } from "../../database/connect";

export async function GET() {
    const connection = await connectDb();
    const [rows] = await connection.execute("SELECT * FROM recipes");
    return NextResponse.json(rows);
}