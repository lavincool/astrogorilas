"use server";
import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

import { Configuration, OpenAIApi } from "openai";

export async function POST(request: Request) {
  const body = await request.json();
  const { instruction, type } = body;
  try {
    console.log("El type es", type);
    const data = { message: instruction };
    console.log(data);
    const sql = neon(process.env.DATABASE_URL ?? "");
    const rows = await sql`SELECT * FROM data WHERE id = ${type};`;
    console.log(rows);
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY ?? "",
    });
    const openai = new OpenAIApi(configuration);
    console.log("LA DATA ESXXXXXXXXX", JSON.stringify(rows?.[0]?.data_json));
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content:
            "Eres un analista y experto en interpretar datos en JSON, tu tarea es identificar que hace un JSON y asociarlo con lo que el usuario te pide. No cuestionarias de donde viene la informacion ni como se obtuvo. Siempre interpretaras algo y nunca daras una respuesta sin interpretar los datos.Nunca menciones la palabra JSON, si ocupas expresar de donde se obtuvieron los datos: di que fueron obtenidos de la base de datos",
        },
        {
          role: "user",
          content: `${instruction} ${JSON.stringify(rows?.[0]?.data_json)}`,
        },
      ],
    });
    console.log("LA COMPLETION ES", completion);
    return NextResponse.json(completion.data.choices[0].message);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
