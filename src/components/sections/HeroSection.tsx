"use client";
import { useTranslations } from "next-intl";
import { IconGitHub } from "@/components/icons/IconGitHub";
import { IconLinkedIn } from "@/components/icons/IconLinkedIn";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const t = useTranslations("HomePage");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.section
      id="hero"
      className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-16 text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        variants={itemVariants}
        className="mb-4 font-serif text-4xl font-bold md:text-6xl"
      >
        {t("heroTitle")}
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="mb-8 text-lg text-muted-foreground md:text-xl"
      >
        {t("heroSubtitle")}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-6 sm:flex-row"
      >
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground">
          <button
            onClick={scrollToProjects}
            className="font-medium transition-colors hover:text-primary"
          >
            {t("heroCtaProjects")}
          </button>
          <a
            href="/CV - Łukasz Krawczyk.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-primary"
          >
            {t("heroCtaCv")}
          </a>
        </div>

        <div className="hidden h-6 w-px bg-border sm:block" />

        <div className="flex items-center space-x-6">
          <IconGitHub className="text-muted-foreground transition-colors hover:text-primary" />
          <IconLinkedIn className="text-muted-foreground transition-colors hover:text-primary" />
        </div>
      </motion.div>
    </motion.section>
  );
};
