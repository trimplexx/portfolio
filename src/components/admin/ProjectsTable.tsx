"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ProjectsTableSkeleton } from "../skeletons/ProjectsTableSkeleton";
import { Edit, Trash2 } from "lucide-react";

interface Project {
  id: string;
  title_pl: string;
  category: {
    name: string;
  };
}

export const ProjectsTable = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) {
          throw new Error("Nie udało się pobrać projektów");
        }
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Wystąpił nieznany błąd");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId: string) => {
    if (
      !confirm(
        "Czy na pewno chcesz usunąć ten projekt? Tej operacji nie można cofnąć."
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/projects?id=${projectId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Nie udało się usunąć projektu.");
      }

      setProjects((currentProjects) =>
        currentProjects.filter((p) => p.id !== projectId)
      );
      alert("Projekt został usunięty.");
    } catch (err) {
      alert(
        err instanceof Error ? err.message : "Wystąpił błąd podczas usuwania."
      );
    }
  };

  if (isLoading) {
    return <ProjectsTableSkeleton />;
  }

  if (error) {
    return <p className="text-red-500 text-center py-8">{error}</p>;
  }

  return (
    <div className="bg-muted/30 border border-border shadow-md rounded-lg overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-muted/50">
          <tr>
            <th className="p-4 font-semibold">Tytuł Projektu</th>
            <th className="p-4 font-semibold">Kategoria</th>
            <th className="p-4 font-semibold text-right">Akcje</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-muted/50 transition-colors"
            >
              <td className="p-4 font-semibold">{project.title_pl}</td>
              <td className="p-4 text-muted-foreground">
                {project.category.name}
              </td>
              <td className="p-4 text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/projekty/${project.id}`)}
                >
                  <Edit className="mr-2 h-4 w-4" /> Edytuj
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProject(project.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Usuń
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
