"use client";

import { useState, useEffect, FormEvent } from "react";

interface Category {
  id: string;
  name: string;
}

export default function AddProjectPage() {
  const [titlePl, setTitlePl] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [descriptionPl, setDescriptionPl] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [demoUrl] = useState("");
  const [githubUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const imageUrls: string[] = [];
    if (files) {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          setError("Błąd podczas uploadu jednego ze zdjęć.");
          setIsLoading(false);
          return;
        }
        const data = await res.json();
        imageUrls.push(data.url);
      }
    }

    const projectData = {
      title_pl: titlePl,
      title_en: titleEn,
      description_pl: descriptionPl,
      description_en: descriptionEn,
      demoUrl,
      githubUrl,
      categoryId: selectedCategory,
      imageUrls,
    };

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    setIsLoading(false);

    if (res.ok) {
      alert("Projekt dodany pomyślnie!");
    } else {
      const data = await res.json();
      setError(data.message || "Nie udało się dodać projektu.");
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dodaj Nowy Projekt</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Tytuł (PL)</label>
          <input
            type="text"
            value={titlePl}
            onChange={(e) => setTitlePl(e.target.value)}
            required
            className="w-full p-2 border rounded bg-gray-800"
          />
        </div>
        <div>
          <label>Tytuł (EN)</label>
          <input
            type="text"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            required
            className="w-full p-2 border rounded bg-gray-800"
          />
        </div>
        <div>
          <label>Opis (PL)</label>
          <textarea
            value={descriptionPl}
            onChange={(e) => setDescriptionPl(e.target.value)}
            required
            className="w-full p-2 border rounded bg-gray-800"
          ></textarea>
        </div>
        <div>
          <label>Opis (EN)</label>
          <textarea
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            required
            className="w-full p-2 border rounded bg-gray-800"
          ></textarea>
        </div>
        <div>
          <label>Kategoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded bg-gray-800"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Zdjęcia</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full p-2"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-500"
        >
          {isLoading ? "Dodawanie..." : "Dodaj Projekt"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </main>
  );
}
