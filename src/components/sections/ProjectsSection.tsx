"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ProjectsSectionSkeleton } from "../skeletons/ProjectsSectionSkeleton";
import Link from "next/link";

type Project = {
  id: string;
  title_pl: string;
  title_en: string;
  summary_pl: string;
  summary_en: string;
  githubUrl?: string | null;
  demoUrl?: string | null;
  technologies: { technology: { name: string } }[];
};

export const ProjectsSection = () => {
  const locale = useLocale();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Nie udało się pobrać projektów");
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (isLoading) {
    return <ProjectsSectionSkeleton />;
  }

  if (error) {
    return <p className="text-red-500 text-center py-8">{error}</p>;
  }

  return (
    <motion.section
      id="projects"
      className="py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      variants={containerVariants}
    >
      <h2 className="text-3xl md:text-4xl font-bold font-serif text-center mb-12">
        Projekty
      </h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="bg-muted/50 border border-border rounded-lg p-6 text-left flex flex-col shadow-lg h-full transform hover:scale-[1.02] transition-transform duration-300"
            variants={cardVariants}
          >
            <Link href={`/${project.id}`} as={`/${locale}/${project.id}`}>
              <h3 className="text-xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                {locale === "pl" ? project.title_pl : project.title_en}
              </h3>
            </Link>
            <p className="text-muted-foreground mb-4 flex-grow">
              {locale === "pl" ? project.summary_pl : project.summary_en}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map(({ technology }) => (
                <span
                  key={technology.name}
                  className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full"
                >
                  {technology.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-auto">
              {project.demoUrl && (
                <Button asChild variant="outline">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
