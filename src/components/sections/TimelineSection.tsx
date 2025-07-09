"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar } from "lucide-react";
import { events } from "@/lib/events";

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      className={`relative flex w-full items-start md:w-1/2 ${
        isLeft ? "md:self-end md:flex-row-reverse" : "md:self-start"
      }`}
    >
      <div className="absolute left-5 top-0 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-background shadow-xl md:relative md:left-auto md:top-auto md:h-12 md:w-12 md:translate-x-0 md:shrink-0">
        <div className={`font-semibold text-lg ${iconClasses[event.type]}`}>
          {event.icon}
        </div>
      </div>

      <div
        className={`w-full rounded-lg border px-6 py-4 shadow-xl ml-12 md:ml-0 ${
          isLeft ? "md:mr-8" : "md:ml-8"
        } ${typeClasses[event.type]}`}
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
        className="relative container mx-auto flex flex-col items-center gap-12 px-4"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute top-0 z-0 h-full w-1 rounded-full bg-primary/20 left-5 -translate-x-1/2 md:left-1/2"
          style={{ transformOrigin: "top" }}
        />
        {events.map((event, index) => (
          <EventCard key={index} event={event} t={t} isLeft={index % 2 === 1} />
        ))}
        <div className="absolute bottom-0 z-10 h-8 left-5 -translate-x-1/2 md:left-1/2">
          <div className="flex items-center bg-primary text-primary-foreground shadow-xl w-24 h-8 rounded-full">
            <p className="mx-auto font-semibold text-sm">{t("today")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
