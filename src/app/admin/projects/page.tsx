import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { Breadcrumbs } from "@/components/admin/Breadcrumbs";

export default function ProjectsPage() {
  const breadcrumbItems = [
    { label: "Panel Admina", href: "/admin/projekty" },
    { label: "Projekty" },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-serif">
          Zarządzanie Projektami
        </h1>
        <Button asChild>
          <Link href="/admin/projekty/dodawanie">
            <PlusCircle className="mr-2 h-5 w-5" />
            Dodaj nowy projekt
          </Link>
        </Button>
      </div>
      <ProjectsTable />
    </>
  );
}
