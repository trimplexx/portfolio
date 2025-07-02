import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
          {t("greeting")}
        </h1>
        <h2 className="font-sans text-xl md:text-2xl text-primary mt-4">
          {t("title")}
        </h2>
        <p className="text-lg text-muted-foreground mt-8">{t("description")}</p>
        <div className="mt-10">
          <Button
            size="lg"
            className="shadow-lg transform transition-transform hover:scale-105"
          >
            {t("button")}
          </Button>
        </div>
      </div>
    </main>
  );
}
