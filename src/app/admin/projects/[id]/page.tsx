import { ProjectForm } from "@/components/admin/ProjectForm";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";

export const metadata: Metadata = {
  title: "Edytuj Projekt | Panel Admina",
  description: "Formularz edycji projektu w portfolio.",
};

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params: paramsPromise,
}: EditProjectPageProps) {
  const { id } = await paramsPromise;

  const project = await prisma.project.findUnique({
    where: { id: id },
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
    notFound();
  }

  const breadcrumbItems = [
    { label: "Panel Admina", href: "/admin/projekty" },
    { label: "Projekty", href: "/admin/projekty" },
    { label: `Edytuj: ${project.title_pl}` },
  ];

  const fixedProject = project
    ? {
        ...project,
        demoUrl: project.demoUrl === null ? undefined : project.demoUrl,
        githubUrl: project.githubUrl === null ? undefined : project.githubUrl,
      }
    : undefined;

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold font-serif mb-6">Edytuj Projekt</h1>
      <ProjectForm project={fixedProject} />
    </>
  );
}
