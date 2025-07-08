"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, UploadCloud, Crop } from "lucide-react";
import { ImageCropper } from "./ImageCropper";

interface ImageUploadProps {
  files: File[];
  setFiles: (files: File[]) => void;
}

export const ImageUpload = ({ files, setFiles }: ImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageToCrop, setImageToCrop] = useState<{
    src: string;
    index: number;
  } | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  useEffect(() => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const addFilesAndOpenCropper = useCallback(
    (newFiles: File[]) => {
      if (newFiles.length === 0) return;

      const currentFiles = files;
      const initialFilesLength = currentFiles.length;

      setFiles([...currentFiles, ...newFiles]);

      setImageToCrop({
        src: URL.createObjectURL(newFiles[0]),
        index: initialFilesLength,
      });
    },
    [files, setFiles]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFilesAndOpenCropper(Array.from(event.target.files));
    }
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleCropComplete = (
    croppedImageBlob: Blob,
    indexToUpdate: number
  ) => {
    const originalFile = files[indexToUpdate];
    const croppedFile = new File(
      [croppedImageBlob],
      `cropped_${originalFile.name || "pasted-image"}.jpeg`,
      { type: "image/jpeg" }
    );

    const updatedFiles = [...files];
    updatedFiles[indexToUpdate] = croppedFile;
    setFiles(updatedFiles);
    setImageToCrop(null);
  };

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.includes("image")) {
          const blob = items[i].getAsFile();
          if (blob) {
            const newFile = new File([blob], `pasted-image-${Date.now()}.png`, {
              type: blob.type,
            });
            addFilesAndOpenCropper([newFile]);
          }
          break;
        }
      }
    },
    [addFilesAndOpenCropper]
  );

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDraggingOver(false);
    if (event.dataTransfer.files) {
      addFilesAndOpenCropper(Array.from(event.dataTransfer.files));
    }
  };

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  return (
    <div>
      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop.src}
          onClose={() => setImageToCrop(null)}
          onCropComplete={(blob) => handleCropComplete(blob, imageToCrop.index)}
        />
      )}

      <label
        htmlFor="file-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer transition-colors
        ${
          isDraggingOver
            ? "bg-primary/20 border-primary"
            : "bg-muted/30 hover:bg-muted/50"
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground text-center">
            <span className="font-semibold">Kliknij, aby dodać zdjęcia</span>
            <br />
            lub przeciągnij i upuść, albo wklej (Ctrl+V)
          </p>
        </div>
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
      </label>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
          {previews.map((previewSrc, index) => (
            <div key={index} className="relative group aspect-video bg-black">
              <Image
                src={previewSrc}
                alt={files[index]?.name || "preview"}
                fill
                className="object-cover rounded-md"
                style={{
                  objectFit: "cover",
                }}
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => setImageToCrop({ src: previewSrc, index })}
                  className="bg-background/80 text-foreground rounded-full p-2 cursor-pointer"
                  title="Przytnij"
                >
                  <Crop size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="bg-red-500/80 text-white rounded-full p-2 cursor-pointer"
                  title="Usuń"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
