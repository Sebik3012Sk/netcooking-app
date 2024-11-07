// UPDATE `recipes` SET `recipe_name`='[value-1]',`recipe_id`='[value-2]',`recipe_text`='[value-3]',`materials`='[value-4]',`photo`='[value-5]',`likes`='[value-6]' WHERE 1
import { NextRequest , NextResponse } from "next/server";
import { connectDb } from "../../database/connect";

export async function GET() {
    const connection = await connectDb();
    return NextResponse.json(await connection.execute("SELECT * FROM recipes"));
}