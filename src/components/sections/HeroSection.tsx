"use client";
import { useTranslations } from "next-intl";
import { IconGitHub } from "@/components/icons/IconGitHub";
import { IconLinkedIn } from "@/components/icons/IconLinkedIn";
import { motion } from "framer-motion";
import { Mail, Phone, FileText } from "lucide-react";

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
        className="mb-10 text-lg text-muted-foreground md:text-xl"
      >
        {t("heroSubtitle")}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center justify-center gap-y-4 gap-x-8 sm:flex-row sm:flex-wrap"
      >
        <a
          href={`mailto:${t("email")}`}
          className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <Mail className="h-5 w-5" />
          <span>{t("email")}</span>
        </a>

        <a
          href={`tel:${t("phone").replace(/\s/g, "")}`}
          className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <Phone className="h-5 w-5" />
          <span>{t("phone")}</span>
        </a>

        <a
          href="/CV - Łukasz Krawczyk.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          <FileText className="h-5 w-5" />
          <span>{t("heroCtaCv")}</span>
        </a>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mt-8 flex items-center space-x-6"
      >
        <IconGitHub className="text-muted-foreground transition-colors hover:text-primary" />
        <IconLinkedIn className="text-muted-foreground transition-colors hover:text-primary" />
      </motion.div>
    </motion.section>
  );
};
