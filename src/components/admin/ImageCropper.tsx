/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import ReactCrop, {
  type Crop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Button } from "@/components/ui/Button";

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: Blob) => void;
  onClose: () => void;
  aspect?: number;
}

export const ImageCropper = ({
  imageSrc,
  onCropComplete,
  onClose,
  aspect = 16 / 9,
}: ImageCropperProps) => {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setImageError(false);
  }, [imageSrc]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const { width, height } = img;

    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, aspect, width, height),
      width,
      height
    );

    setCrop(initialCrop);
    setIsLoaded(true);
  }

  function onImageError() {
    setImageError(true);
    setIsLoaded(false);
  }

  const handleCrop = () => {
    if (!crop || !imgRef.current) return;

    const canvas = document.createElement("canvas");
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;

    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      imgRef.current,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob(
      (blob) => {
        if (blob) onCropComplete(blob);
      },
      "image/jpeg",
      0.95
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg p-6 w-full max-w-4xl max-h-[90vh] flex flex-col">
        <h3 className="text-xl font-bold mb-4">Przytnij zdjęcie</h3>

        <div className="flex-1 overflow-auto mb-4 flex justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-lg">
          {!isLoaded && !imageError && (
            <div className="w-full h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Ładowanie zdjęcia...</p>
            </div>
          )}

          {imageError && (
            <div className="w-full h-64 flex items-center justify-center">
              <p className="text-red-500">Błąd podczas ładowania zdjęcia</p>
            </div>
          )}

          {!imageError && (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              aspect={aspect}
              className={`${isLoaded ? "block" : "hidden"} overflow-hidden`}
            >
              <img
                ref={imgRef}
                src={imageSrc}
                onLoad={onImageLoad}
                onError={onImageError}
                alt="Do przycięcia"
                style={{
                  maxWidth: "100%",
                  maxHeight: "70vh",
                  display: isLoaded ? "block" : "none",
                }}
              />
            </ReactCrop>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="ghost" onClick={onClose}>
            Anuluj
          </Button>
          <Button
            type="button"
            onClick={handleCrop}
            disabled={!isLoaded || imageError}
          >
            Zapisz i przytnij
          </Button>
        </div>
      </div>
    </div>
  );
};
