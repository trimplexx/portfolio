import { Briefcase, GraduationCap } from "lucide-react";
import { ReactElement } from "react";

export type TimelineEvent = {
  date: string;
  endDate: string;
  titleKey: string;
  descriptionKey: string;
  icon: ReactElement;
  type: "education" | "work";
};

export const events: TimelineEvent[] = [
  {
    date: "2020-09-01",
    endDate: "2024-02-01",
    titleKey: "studiesStartTitle",
    descriptionKey: "studiesStartDesc",
    icon: <GraduationCap />,
    type: "education",
  },
  {
    date: "2023-06-01",
    endDate: "2023-06-30",
    titleKey: "internshipTitle",
    descriptionKey: "internshipDesc",
    icon: <Briefcase />,
    type: "work",
  },
  {
    date: "2024-02-01",
    endDate: "today",
    titleKey: "mastersStartTitle",
    descriptionKey: "mastersStartDesc",
    icon: <GraduationCap />,
    type: "education",
  },
  {
    date: "2024-07-01",
    endDate: "2025-02-01",
    titleKey: "waskoTitle",
    descriptionKey: "waskoDesc",
    icon: <Briefcase />,
    type: "work",
  },
];
