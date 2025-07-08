// src/components/admin/ProjectForm.tsx

"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUpload } from "./ImageUpload";
import { MarkdownPreview } from "./MarkdownPreview";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import CreatableSelect from "react-select/creatable";
import { OnChangeValue } from "react-select";

// --- TYPY DANYCH ---

type PrismaImage = {
  id: string;
  url: string;
};

type SelectOption = {
  readonly label: string;
  readonly value: string;
};

type Project = {
  id: string;
  title_pl: string;
  title_en: string;
  summary_pl: string;
  summary_en: string;
  description_pl: string;
  description_en: string;
  demoUrl?: string;
  githubUrl?: string;
  categoryId: string;
  images?: PrismaImage[];
  technologies?: {
    technology: {
      id: string;
      name: string;
    };
  }[];
};

type ProjectFormProps = {
  project?: Project;
};

// --- KOMPONENT FORMULARZA ---

export const ProjectForm = ({ project }: ProjectFormProps) => {
  const router = useRouter();
  const isEditing = !!project;
  const [isMounted, setIsMounted] = useState(false);

  // --- STANY FORMULARZA ---
  const [titlePl, setTitlePl] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [summaryPl, setSummaryPl] = useState("");
  const [summaryEn, setSummaryEn] = useState("");
  const [descriptionPl, setDescriptionPl] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<PrismaImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [availableTech, setAvailableTech] = useState<SelectOption[]>([]);
  const [selectedTech, setSelectedTech] = useState<readonly SelectOption[]>([]);
  type Category = { id: string; name: string };
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [activeLang, setActiveLang] = useState<"pl" | "en">("pl");

  // --- EFEKTY (useEffect) ---

  useEffect(() => setIsMounted(true), []);

  useEffect(() => {
    if (isEditing && project) {
      setTitlePl(project.title_pl || "");
      setTitleEn(project.title_en || "");
      setSummaryPl(project.summary_pl || "");
      setSummaryEn(project.summary_en || "");
      setDescriptionPl(project.description_pl || "");
      setDescriptionEn(project.description_en || "");
      setDemoUrl(project.demoUrl || "");
      setGithubUrl(project.githubUrl || "");
      setSelectedCategory(project.categoryId || "");
      setExistingImages(project.images || []);

      const initialTech =
        project.technologies?.map((t) => ({
          label: t.technology.name,
          value: t.technology.id,
        })) || [];
      setSelectedTech(initialTech);
    }
  }, [isEditing, project]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, techRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/technologies"),
        ]);

        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
          if (!isEditing && catData.length > 0) {
            setSelectedCategory(catData[0].id);
          }
        }
        if (techRes.ok) {
          const techData = await techRes.json();
          setAvailableTech(
            techData.map((t: { id: string; name: string }) => ({
              label: t.name,
              value: t.id,
            }))
          );
        }
      } catch (err) {
        console.error("Błąd podczas pobierania danych początkowych:", err);
        setError("Nie udało się załadować danych formularza.");
      }
    };
    fetchInitialData();
  }, [isEditing]);

  // --- HANDLERY ---

  const handleRemoveImage = (imageId: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten obrazek?")) return;
    setImagesToDelete((prev) => [...prev, imageId]);
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const newImageUrls: string[] = [];
    if (files.length > 0) {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          if (!res.ok) throw new Error("Błąd podczas uploadu zdjęcia.");
          const data = await res.json();
          newImageUrls.push(data.url);
        } catch (err) {
          setError(
            err instanceof Error ? err.message : "Błąd krytyczny uploadu."
          );
          setIsLoading(false);
          return;
        }
      }
    }

    let technologyIds: string[] = [];
    if (selectedTech.length > 0) {
      const techNames = selectedTech.map((t) => t.label);
      try {
        const techRes = await fetch("/api/technologies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ names: techNames }),
        });
        if (!techRes.ok) throw new Error("Błąd przetwarzania technologii");
        const fullTechObjects = await techRes.json();
        technologyIds = fullTechObjects.map((t: { id: string }) => t.id);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Błąd krytyczny technologii."
        );
        setIsLoading(false);
        return;
      }
    }

    const projectData = {
      title_pl: titlePl,
      title_en: titleEn,
      summary_pl: summaryPl,
      summary_en: summaryEn,
      description_pl: descriptionPl,
      description_en: descriptionEn,
      demoUrl,
      githubUrl,
      categoryId: selectedCategory,
      imageUrls: newImageUrls,
      imagesToDelete: imagesToDelete,
      technologyIds: technologyIds,
    };

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `/api/projects/${project.id}` : "/api/projects";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (res.ok) {
        alert(`Projekt ${isEditing ? "zaktualizowany" : "dodany"} pomyślnie!`);
        router.push("/admin/projekty");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.message || "Nie udało się zapisać projektu.");
      }
    } catch {
      setError("Krytyczny błąd. Sprawdź połączenie.");
    } finally {
      setIsLoading(false);
    }
  };

  const currentDescription =
    activeLang === "pl" ? descriptionPl : descriptionEn;
  const setCurrentDescription =
    activeLang === "pl" ? setDescriptionPl : setDescriptionEn;

  // --- RENDEROWANIE KOMPONENTU ---

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="titlePl">Tytuł (PL)</Label>
          <Input
            id="titlePl"
            value={titlePl}
            onChange={(e) => setTitlePl(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="titleEn">Tytuł (EN)</Label>
          <Input
            id="titleEn"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="summaryPl">Krótki opis (PL)</Label>
          <Textarea
            id="summaryPl"
            value={summaryPl}
            onChange={(e) => setSummaryPl(e.target.value)}
            required
            maxLength={255}
            className="mt-2 h-24"
            placeholder={`Krótki opis projektu po polsku...`}
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {summaryPl.length} / 255
          </p>
        </div>
        <div>
          <Label htmlFor="summaryEn">Krótki opis (EN)</Label>
          <Textarea
            id="summaryEn"
            value={summaryEn}
            onChange={(e) => setSummaryEn(e.target.value)}
            required
            maxLength={255}
            className="mt-2 h-24"
            placeholder={`Short project summary in English...`}
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">
            {summaryEn.length} / 255
          </p>
        </div>
      </div>

      <div>
        <Label>Główny opis projektu</Label>
        <div className="mt-2 rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border bg-muted/30 p-2">
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant={activeTab === "write" ? "default" : "ghost"}
                onClick={() => setActiveTab("write")}
              >
                Edytuj
              </Button>
              <Button
                type="button"
                size="sm"
                variant={activeTab === "preview" ? "default" : "ghost"}
                onClick={() => setActiveTab("preview")}
              >
                Podgląd
              </Button>
            </div>
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant={activeLang === "pl" ? "secondary" : "ghost"}
                onClick={() => setActiveLang("pl")}
              >
                PL
              </Button>
              <Button
                type="button"
                size="sm"
                variant={activeLang === "en" ? "secondary" : "ghost"}
                onClick={() => setActiveLang("en")}
              >
                EN
              </Button>
            </div>
          </div>
          <div className="p-4 bg-background">
            {activeTab === "write" ? (
              <Textarea
                value={currentDescription}
                onChange={(e) => setCurrentDescription(e.target.value)}
                required
                className="min-h-[300px] w-full resize-y border-none bg-transparent p-0 focus:ring-0 focus-visible:ring-0"
                placeholder={`Wpisz główny opis projektu w języku ${activeLang.toUpperCase()}...`}
              />
            ) : (
              <MarkdownPreview content={currentDescription} />
            )}
          </div>
        </div>
      </div>

      {isEditing && existingImages.length > 0 && (
        <div>
          <Label>Istniejące Zdjęcia</Label>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((image, index) => (
              <div className="relative group aspect-video" key={image.id}>
                <Image
                  src={image.url}
                  alt="Zdjecie projektu"
                  className="rounded-md object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority={index === 0}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label>{isEditing ? "Dodaj nowe zdjęcia" : "Zdjęcia"}</Label>
        <ImageUpload files={files} setFiles={setFiles} />
      </div>

      <div>
        <Label htmlFor="technologies">Technologie</Label>
        {isMounted && (
          <div className="relative z-20">
            <CreatableSelect
              id="technologies"
              isMulti
              options={availableTech}
              value={selectedTech}
              onChange={(newValue) =>
                setSelectedTech(newValue as OnChangeValue<SelectOption, true>)
              }
              placeholder="Wybierz lub wpisz, aby dodać nowe..."
              formatCreateLabel={(inputValue) => `Dodaj "${inputValue}"`}
              className="mt-2"
              classNames={{
                control: ({ isFocused }) =>
                  `!bg-background !border ${
                    isFocused ? "!border-primary" : "!border-border"
                  } !shadow-none hover:!border-primary`,
                input: () => "!text-foreground",
                menu: () =>
                  "!bg-background !border !border-border !rounded-lg !shadow-lg",
                option: ({ isFocused, isSelected }) =>
                  `!text-foreground ${isFocused ? "!bg-muted" : ""} ${
                    isSelected ? "!bg-muted/50" : ""
                  }`,
                multiValue: () => "!bg-muted",
                multiValueLabel: () => "!text-foreground",
              }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="demoUrl">Link do Demo</Label>
          <Input
            id="demoUrl"
            value={demoUrl}
            onChange={(e) => setDemoUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div>
          <Label htmlFor="githubUrl">Link do GitHub</Label>
          <Input
            id="githubUrl"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Kategoria</Label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-4 border-t border-border pt-4">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading
            ? "Zapisywanie..."
            : isEditing
            ? "Zapisz zmiany"
            : "Dodaj Projekt"}
        </Button>
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
      </div>
    </form>
  );
};
