"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Tag, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { IconGitHub } from "@/components/icons/IconGitHub";
import { ProjectGallery } from "./ProjectGallery";

type ProjectData = {
  id: string;
  title_pl: string;
  title_en: string;
  description_pl: string;
  description_en: string;
  demoUrl: string | null;
  githubUrl: string | null;
  category: { name: string };
  images: { id: string; url: string }[];
  technologies: { technology: { name: string } }[];
};

export function ProjectPageContent({
  projectData,
}: {
  projectData: ProjectData;
}) {
  const locale = useLocale();
  const t = useTranslations("ProjectPage");

  const title = locale === "pl" ? projectData.title_pl : projectData.title_en;
  const description =
    locale === "pl" ? projectData.description_pl : projectData.description_en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.main
      className="container mx-auto px-4 py-16 md:py-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <p className="text-primary font-semibold mb-2">
          {projectData.category.name}
        </p>
        <h1 className="text-4xl md:text-5xl font-bold font-serif">{title}</h1>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-12">
        <ProjectGallery
          images={projectData.images}
          title={title}
          mainImagePlaceholder={t("mainImagePlaceholder")}
          thumbnailPlaceholder={t("thumbnailPlaceholder")}
        />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid md:grid-cols-12 gap-12"
      >
        <div className="md:col-span-8">
          <h2 className="text-2xl font-bold font-serif mb-4">
            {t("aboutProjectTitle")}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {description}
            </ReactMarkdown>
          </div>
        </div>
        <div className="md:col-span-4">
          <div className="bg-muted/50 border border-border rounded-lg p-6 sticky top-24">
            <h3 className="text-xl font-bold font-serif mb-4">
              {t("techStackTitle")}
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {projectData.technologies.map(({ technology }) => (
                <span
                  key={technology.name}
                  className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                >
                  <Tag size={12} /> {technology.name}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {projectData.demoUrl && (
                <Button asChild>
                  <a
                    href={projectData.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    {t("liveDemoButton")}
                  </a>
                </Button>
              )}
              {projectData.githubUrl && (
                <Button asChild variant="outline">
                  <a
                    href={projectData.githubUrl}
                    className="flex items-center justify-center w-full"
                  >
                    <IconGitHub />
                    <span className="ml-2">{t("githubButton")}</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
