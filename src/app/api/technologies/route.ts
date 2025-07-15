import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(technologies);
  } catch (error) {
    console.error("Błąd podczas pobierania technologii:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Brak autoryzacji" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { names } = body;

    if (!names || !Array.isArray(names) || names.length === 0) {
      return NextResponse.json(
        { message: "Brak nazw technologii do przetworzenia." },
        { status: 400 }
      );
    }
    const transaction = names.map((name: string) =>
      prisma.technology.upsert({
        where: { name: name.trim() },
        update: {},
        create: { name: name.trim() },
      })
    );

    await prisma.$transaction(transaction);

    const technologies = await prisma.technology.findMany({
      where: {
        name: {
          in: names.map((name: string) => name.trim()),
        },
      },
    });

    return NextResponse.json(technologies, { status: 200 });
  } catch (error) {
    console.error("Błąd podczas przetwarzania technologii:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}
