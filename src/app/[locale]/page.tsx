import { AboutSection } from "@/components/sections/AboutSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { TechStackSection } from "@/components/sections/TechStackSection";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <TechStackSection />
        <ProjectsSection />
      </main>
    </>
  );
}
