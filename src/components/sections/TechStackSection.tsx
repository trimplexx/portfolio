"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { technologies } from "@/lib/technologies";

export const TechStackSection = () => {
  const t = useTranslations("TechStack");

  const sectionVariants = {
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
    <motion.section
      id="tech-stack"
      className="py-20"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold font-serif text-center mb-12">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(technologies).map(([category, techs]) => (
          <motion.div
            key={category}
            variants={itemVariants}
            className="bg-muted/30 p-6 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              {t(category)}
            </h3>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4">
              {techs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center justify-center gap-2 text-center"
                >
                  <div className="h-10 w-10 text-muted-foreground fill-current">
                    {tech.icon}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};
