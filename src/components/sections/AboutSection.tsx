"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export const AboutSection = () => {
  const t = useTranslations("HomePage");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const parentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section ref={ref} id="about" className="py-20 text-left overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold font-serif text-center mb-16"
      >
        {t("aboutTitle")}
      </motion.h2>

      <div className="grid md:grid-cols-12 gap-x-12 gap-y-8 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="md:col-span-4 flex justify-center items-start"
        >
          <div className="relative w-56 h-72 md:w-64 md:h-80 shadow-lg">
            <Image
              src="/me.jpg"
              alt="Łukasz Krawczyk"
              fill
              className="rounded-lg object-cover border-4 border-border/50"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="md:col-span-8 space-y-8"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold font-serif mb-3">
              {t("aboutSubtitleStory")}
            </h3>
            <div className="text-lg text-muted-foreground space-y-4">
              <p>{t("aboutP1")}</p>
              <p>{t("aboutP2")}</p>
              <p>{t("aboutP3")}</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold font-serif mb-3">
              {t("aboutSubtitlePassions")}
            </h3>
            <p className="text-lg text-muted-foreground">{t("aboutP4")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
