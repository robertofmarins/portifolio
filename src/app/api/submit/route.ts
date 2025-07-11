// Importa tipos e utilitários da API do Next.js
import { NextRequest, NextResponse } from "next/server";

// Importa o Pool do 'pg' (PostgreSQL) para conectar ao banco de dados
import { Pool } from "pg";

// Cria uma instância de conexão com o banco de dados PostgreSQL
// Pegando as variáveis de ambiente definidas no `.env.local`
const pool = new Pool({
  user: process.env.DB_USER,         // Nome do usuário do banco
  host: process.env.DB_HOST,         // Endereço do host (ex: localhost ou IP do servidor)
  database: process.env.DB_NAME,     // Nome do banco de dados
  password: process.env.DB_PASSWORD, // Senha do usuário
  port: Number(process.env.DB_PORT), // Porta do banco (geralmente 5432)
});

// Define a função que será executada quando receber uma requisição POST na rota da API
export async function POST(request: NextRequest) {
  try {
    // Aguarda o corpo da requisição ser convertido para JSON
    const data = await request.json();

    // Desestrutura os dados recebidos no corpo da requisição
    const { nome, email, telefone, mensagem } = data;

    // Valida se os campos obrigatórios estão presentes (nome, email, mensagem)
    if (!nome || !email || !mensagem) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." }, // Mensagem de erro
        { status: 400 }                             // Status HTTP 400 = Bad Request
      );
    }

    // Define a query SQL com placeholders ($1, $2, $3, $4) para prevenir SQL Injection
    const queryText =
      "INSERT INTO usuarios (nome, email, telefone, mensagem) VALUES ($1, $2, $3, $4)";

    // Executa a query no banco com os dados recebidos
    await pool.query(queryText, [nome, email, telefone || "", mensagem]);

    // Retorna uma resposta de sucesso
    return NextResponse.json(
      { message: "Dados enviados com sucesso!" },
      { status: 200 }
    );
  } catch (error) {
    // Captura qualquer erro que ocorrer durante o processo
    console.error("Erro ao salvar dados:", error);

    // Retorna uma resposta de erro interno do servidor
    return NextResponse.json(
      { error: "Erro ao processar os dados." },
      { status: 500 } // Status HTTP 500 = Internal Server Error
    );
  }
}
