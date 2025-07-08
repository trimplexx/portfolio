"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const events = [
  {
    date: "2020-09-01",
    endDate: "2024-02-1",
    titleKey: "studiesStartTitle",
    descriptionKey: "studiesStartDesc",
    icon: <GraduationCap />,
    type: "education" as const,
  },
  {
    date: "2023-06-01",
    endDate: "2023-06-30",
    titleKey: "internshipTitle",
    descriptionKey: "internshipDesc",
    icon: <Briefcase />,
    type: "work" as const,
  },
  {
    date: "2024-02-01",
    endDate: "today",
    titleKey: "mastersStartTitle",
    descriptionKey: "mastersStartDesc",
    icon: <GraduationCap />,
    type: "education" as const,
  },
  {
    date: "2024-07-01",
    endDate: "2025-02-1",
    titleKey: "waskoTitle",
    descriptionKey: "waskoDesc",
    icon: <Briefcase />,
    type: "work" as const,
  },
];

const formatDuration = (months: number, t: (key: string) => string) => {
  if (months < 1) months = 1;
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  const result = [];
  if (years > 0) {
    result.push(`${years} ${years > 1 ? t("years") : t("year")}`);
  }
  if (remainingMonths > 0) {
    result.push(
      `${remainingMonths} ${remainingMonths > 1 ? t("months") : t("month")}`
    );
  }
  return result.join(", ");
};

const getMonthDiff = (startDate: Date, endDate: Date) => {
  let months;
  months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();
  return months <= 0 ? 0 : months;
};

const EventCard = ({
  event,
  t,
  isLeft,
}: {
  event: (typeof events)[0];
  t: (key: string) => string;
  isLeft: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const startDate = new Date(event.date);
  const endDate =
    event.endDate === "today" ? new Date() : new Date(event.endDate);
  const durationInMonths = getMonthDiff(startDate, endDate);
  const durationText = formatDuration(durationInMonths, t);

  const variants = {
    hidden: { opacity: 0, x: isLeft ? -100 : 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const typeClasses = {
    education: "border-blue-500/50 bg-blue-500/10",
    work: "border-green-500/50 bg-green-500/10",
  };
  const iconClasses = {
    education: "text-blue-500",
    work: "text-green-500",
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`mb-8 flex justify-between items-center w-full ${
        isLeft ? "flex-row-reverse" : ""
      }`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-background shadow-xl w-12 h-12 rounded-full">
        <h1
          className={`mx-auto font-semibold text-lg ${iconClasses[event.type]}`}
        >
          {event.icon}
        </h1>
      </div>
      <div
        className={`order-1 ${
          typeClasses[event.type]
        } rounded-lg shadow-xl w-5/12 px-6 py-4 border relative`}
      >
        <h3 className="mb-2 font-bold text-lg">{t(event.titleKey)}</h3>
        <p className="text-sm leading-snug tracking-wide text-muted-foreground">
          {startDate.toLocaleDateString(t("locale"), {
            year: "numeric",
            month: "long",
          })}
        </p>
        <p className="text-sm mt-2">{t(event.descriptionKey)}</p>

        {durationText && (
          <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-md">
            <Calendar size={14} />
            <span>{durationText}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const TimelineSection = () => {
  const t = useTranslations("Timeline");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="timeline" className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold font-serif text-center mb-20">
        {t("title")}
      </h2>
      <div
        ref={ref}
        className="relative container mx-auto px-6 flex flex-col space-y-4"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute z-0 w-2 bg-primary/20 rounded-full h-full left-1/2 -ml-1"
          style={{ transformOrigin: "top" }}
        ></motion.div>
        {events.map((event, index) => (
          <EventCard key={index} event={event} t={t} isLeft={index % 2 === 1} />
        ))}
        <div className="mb-8 flex justify-between items-center w-full">
          <div className="order-1 w-5/12"></div>
          <div className="z-20 flex items-center order-1 bg-primary text-primary-foreground shadow-xl w-24 h-8 rounded-full">
            <p className="mx-auto font-semibold text-sm">{t("today")}</p>
          </div>
          <div className="order-1 w-5/12"></div>
        </div>
      </div>
    </section>
  );
};
