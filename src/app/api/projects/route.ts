import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { deleteBlob } from "@/lib/azure-storage";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        title_pl: true,
        title_en: true,
        summary_pl: true,
        summary_en: true,
        category: {
          select: {
            name: true,
          },
        },
        technologies: {
          select: {
            technology: {
              select: {
                name: true,
              },
            },
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title_pl,
      title_en,
      summary_pl,
      summary_en,
      description_pl,
      description_en,
      demoUrl,
      githubUrl,
      categoryId,
      imageUrls,
      technologyIds,
    } = body;

    if (
      !title_pl ||
      !title_en ||
      !summary_pl ||
      !summary_en ||
      !description_pl ||
      !description_en ||
      !categoryId
    ) {
      return NextResponse.json(
        { message: "Brak wszystkich wymaganych pól." },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title_pl,
        title_en,
        summary_pl,
        summary_en,
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
        technologies: {
          create:
            technologyIds?.map((techId: string) => ({
              technology: {
                connect: {
                  id: techId,
                },
              },
            })) || [],
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

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Brak ID projektu." },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Nie znaleziono projektu." },
        { status: 404 }
      );
    }

    if (project.images && project.images.length > 0) {
      const deletePromises = project.images.map((image: { url: string }) =>
        deleteBlob(image.url)
      );
      await Promise.all(deletePromises);
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Projekt został pomyślnie usunięty." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd podczas usuwania projektu:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera podczas usuwania projektu." },
      { status: 500 }
    );
  }
}
