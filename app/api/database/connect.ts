import mysql2 from "mysql2/promise";

export async function connectDb() {
    const connection = await mysql2.createConnection({
        host : process.env.DATABASE_HOST,
        database : process.env.DATABASE_NAME,
        user : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD
    })

    return connection;
}