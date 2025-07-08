import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        images: true,
        category: true,
        technologies: {
          include: {
            technology: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Nie znaleziono projektu" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Błąd podczas pobierania projektu:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
      imagesToDelete,
      technologyIds,
    } = body;

    const transactionResult = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        if (imagesToDelete && imagesToDelete.length > 0) {
          await tx.projectImage.deleteMany({
            where: {
              id: {
                in: imagesToDelete,
              },
            },
          });
        }

        if (imageUrls && imageUrls.length > 0) {
          await tx.projectImage.createMany({
            data: imageUrls.map((url: string) => ({
              url,
              projectId: id,
            })),
          });
        }
        await tx.technologiesOnProjects.deleteMany({
          where: { projectId: id },
        });

        if (technologyIds && technologyIds.length > 0) {
          await tx.technologiesOnProjects.createMany({
            data: technologyIds.map((techId: string) => ({
              projectId: id,
              technologyId: techId,
            })),
          });
        }

        const updatedProject = await tx.project.update({
          where: { id },
          data: {
            title_pl,
            title_en,
            summary_pl,
            summary_en,
            description_pl,
            description_en,
            demoUrl,
            githubUrl,
            categoryId,
          },
        });

        return updatedProject;
      }
    );

    return NextResponse.json(transactionResult);
  } catch (error) {
    console.error("Błąd podczas aktualizacji projektu:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd serwera." },
      { status: 500 }
    );
  }
}
