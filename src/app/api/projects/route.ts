import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Obsługuje zapytania GET do pobierania wszystkich projektów.
 */
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title_pl: true,
        title_en: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Błąd podczas pobierania projektów:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}

/**
 * Obsługuje zapytania POST do tworzenia nowego projektu.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title_pl, title_en, description_pl, description_en, demoUrl, githubUrl, categoryId, imageUrls } = body;

    if (!title_pl || !title_en || !description_pl || !description_en || !categoryId) {
      return NextResponse.json({ message: "Brak wszystkich wymaganych pól (tytuł, opis, kategoria)." }, { status: 400 });
    }

    const newProject = await prisma.project.create({
      data: {
        title_pl,
        title_en,
        description_pl,
        description_en,
        demoUrl,
        githubUrl,
        category: {
          connect: { id: categoryId },
        },
        images: {
          create: imageUrls?.map((url: string) => ({ url })) || [],
        },
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Błąd podczas tworzenia projektu:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}