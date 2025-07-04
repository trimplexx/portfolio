import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="w-full max-w-2xl text-center mb-10">
        <p className="text-xl md:text-2xl font-semibold text-yellow-500 dark:text-fiord-600 rounded-lg p-3">
          {t("workInProgress")}
        </p>
      </div>
    </main>
  );
}
