import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { nome, email, telefone, mensagem } = data;

    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 }
      );
    }

    const queryText =
      "INSERT INTO usuarios (nome, email, telefone, mensagem) VALUES ($1, $2, $3, $4)";
    await pool.query(queryText, [nome, email, telefone || "", mensagem]);

    return NextResponse.json(
      { message: "Dados enviados com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    return NextResponse.json(
      { error: "Erro ao processar os dados." },
      { status: 500 }
    );
  }
}
