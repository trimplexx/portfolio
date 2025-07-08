import { getLocale } from "next-intl/server";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ProjectPageContent } from "@/components/projects/ProjectPageContent";
import { Suspense } from "react";
import { ProjectPageSkeleton } from "@/components/skeletons/ProjectPageSkeleton";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params: paramsPromise,
}: Props): Promise<Metadata> {
  const { id } = await paramsPromise;
  const project = await prisma.project.findUnique({ where: { id } });
  const locale = await getLocale();

  if (!project) {
    return { title: "Projekt nieznaleziony" };
  }

  const title = locale === "pl" ? project.title_pl : project.title_en;
  const description = locale === "pl" ? project.summary_pl : project.summary_en;

  return {
    title: `${title} | Łukasz Krawczyk - Portfolio`,
    description: description,
  };
}

export default async function ProjectPage({ params: paramsPromise }: Props) {
  const { id } = await paramsPromise;
  const projectData = await prisma.project.findUnique({
    where: { id },
    include: {
      images: true,
      category: true,
      technologies: { include: { technology: true } },
    },
  });

  if (!projectData) {
    notFound();
  }

  return (
    <Suspense fallback={<ProjectPageSkeleton />}>
      <ProjectPageContent projectData={projectData} />
    </Suspense>
  );
}
