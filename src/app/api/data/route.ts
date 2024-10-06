import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { instruction } = body;

  try {
    const data = { message: instruction };
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
