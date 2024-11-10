import { NextResponse , NextRequest } from "next/server";
import { connectDb } from "../../database/connect";

export async function POST(req : NextRequest,res : NextResponse) {

    let connection = null;

    try {
        connection = await connectDb();
    } catch (err : any) {
        throw new Error(err);
    }
    
    const data = await req.json();
    const { username , email , password } = data;
    const query = `INSERT INTO users (username, email, password, id) VALUES (? , ? , ?, 'id')`;
    connection.query(query,[username,email,password]);
    return NextResponse.json({message : "success"})
}