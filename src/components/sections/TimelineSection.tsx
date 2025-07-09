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
    hidden: { opacity: 0, x: isLeft ? "-100%" : "100%" },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const mobileVariants = {
    hidden: { opacity: 0, x: "100%" },
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
    <div ref={ref} className="flex md:justify-between items-center w-full">
      <div
        className={`hidden md:block md:w-5/12 ${
          !isLeft ? "order-1" : "order-3"
        }`}
      ></div>

      <div className="z-20 flex items-center order-2 bg-background shadow-xl w-12 h-12 rounded-full">
        <h1
          className={`mx-auto font-semibold text-lg ${iconClasses[event.type]}`}
        >
          {event.icon}
        </h1>
      </div>

      <motion.div
        variants={
          typeof window !== "undefined" && window.innerWidth < 768
            ? mobileVariants
            : variants
        }
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className={`order-3 md:w-5/12 w-full ml-4 md:ml-0 ${
          typeClasses[event.type]
        } rounded-lg shadow-xl px-6 py-4 border ${
          isLeft ? "md:order-1" : "md:order-3"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
          <h3 className="font-bold text-lg mb-1 sm:mb-0">
            {t(event.titleKey)}
          </h3>
          {durationText && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded-md whitespace-nowrap">
              <Calendar size={14} />
              <span>{durationText}</span>
            </div>
          )}
        </div>

        <p className="text-sm leading-snug tracking-wide text-muted-foreground">
          {startDate.toLocaleDateString(t("locale"), {
            year: "numeric",
            month: "long",
          })}
        </p>
        <p className="text-sm mt-2">{t(event.descriptionKey)}</p>
      </motion.div>
    </div>
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
        className="relative container mx-auto px-6 flex flex-col gap-8"
      >
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isInView ? 1 : 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute z-0 w-2 bg-primary/20 rounded-full h-full left-[35px] -ml-1 md:left-1/2"
          style={{ transformOrigin: "top" }}
        ></motion.div>

        {events.map((event, index) => (
          <EventCard key={index} event={event} t={t} isLeft={index % 2 === 1} />
        ))}

        <div
          className="flex justify-center items-center w-full"
          style={{ paddingLeft: "60px" }}
        >
          <div className="relative md:left-[-27px] z-20 flex items-center bg-primary text-primary-foreground shadow-xl w-24 h-8 rounded-full">
            <p className="mx-auto font-semibold text-sm">{t("today")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
