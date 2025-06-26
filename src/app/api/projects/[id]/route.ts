import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * GET /api/projects/[id] - Pobiera jeden projekt ze wszystkimi szczegółami
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const project = await prisma.project.findUnique({
      where: { id: params.id },
      include: {
        images: true,
        category: true,
      },
    });

    if (!project) {
      return NextResponse.json({ message: "Nie znaleziono projektu" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Błąd podczas pobierania projektu:", error);
    return NextResponse.json({ message: "Wystąpił błąd serwera." }, { status: 500 });
  }
}

/**
 * PUT /api/projects/[id] - Edytuje istniejący projekt
 */
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title_pl, title_en, description_pl, description_en, demoUrl, githubUrl, categoryId } = body;

    const updatedProject = await prisma.project.update({
      where: { id: params.id },
      data: {
        title_pl,
        title_en,
        description_pl,
        description_en,
        demoUrl,
        githubUrl,
        categoryId,
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error("Błąd podczas aktualizacji projektu:", error);
    return NextResponse.json({ message: "Wystąpił błąd serwera." }, { status: 500 });
  }
}