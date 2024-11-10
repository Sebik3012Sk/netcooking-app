import { NextRequest , NextResponse } from "next/server";
import { connectDb } from "../../database/connect";

export async function POST(req : NextRequest,res : NextResponse) {
    const connection = await connectDb();
    const data = await req.json();
    const { recipe_name , recipe_text , materials , photo , likes } = data;
    const query = `INSERT INTO recipes (recipe_name, recipe_id, recipe_text, materials, photo, likes) VALUES ('${recipe_name}', 'recipe_id', '${recipe_text}', '${materials}', '${photo}', ${likes})`;
    connection.query(query);
    return NextResponse.json({message : "success data send"})
} 