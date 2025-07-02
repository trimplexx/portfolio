import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="max-w-2xl">
        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
          Cześć, jestem Łukasz
        </h1>
        <h2 className="font-sans text-xl md:text-2xl text-primary mt-4">
          Full-Stack Developer
        </h2>
        <p className="text-lg text-muted-foreground mt-8">
          Tworzę nowoczesne i wydajne aplikacje internetowe od koncepcji, przez
          projekt, aż po wdrożenie na serwerze.
        </p>
        <div className="mt-10">
          <Button
            size="lg"
            className="shadow-lg transform transition-transform hover:scale-105"
          >
            Zobacz moje projekty
          </Button>
        </div>
      </div>
    </main>
  );
}
