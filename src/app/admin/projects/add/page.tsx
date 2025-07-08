import { ProjectForm } from "@/components/admin/ProjectForm";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";

export const metadata: Metadata = {
  title: "Dodaj Nowy Projekt | Panel Admina",
  description: "Formularz dodawania nowego projektu do portfolio.",
};

export default function AddProjectPage() {
  const breadcrumbItems = [
    { label: "Panel Admina", href: "/admin/projekty" },
    { label: "Projekty", href: "/admin/projekty" },
    { label: "Dodaj nowy projekt" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <h1 className="text-3xl font-bold font-serif mb-6">Dodaj Nowy Projekt</h1>
      <ProjectForm />
    </>
  );
}
