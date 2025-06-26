import { type NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type RouteParams = {
  id: string;
};

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) => {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
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
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) => {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title_pl, title_en, description_pl, description_en, demoUrl, githubUrl, categoryId } = body;

    const updatedProject = await prisma.project.update({
      where: { id },
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
};