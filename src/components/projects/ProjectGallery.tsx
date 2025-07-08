"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type ImageProps = {
  id: string;
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

interface ProjectGalleryProps {
  images: ImageProps[];
  title: string;
  mainImagePlaceholder: string;
  thumbnailPlaceholder: string;
}

export const ProjectGallery = ({
  images,
  title,
  mainImagePlaceholder,
  thumbnailPlaceholder,
}: ProjectGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const slides = useMemo(() => {
    return images.map((image) => ({
      src: image.url,
      alt: image.alt || `${title} - ${mainImagePlaceholder}`,
      width: image.width || 1920,
      height: image.height || 1080,
    }));
  }, [images, title, mainImagePlaceholder]);

  if (images.length === 0) {
    return (
      <div className="relative w-full aspect-video bg-muted/80 rounded-lg flex items-center justify-center border border-border overflow-hidden">
        <p className="text-muted-foreground">{mainImagePlaceholder}</p>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        <motion.div
          key={`main-${currentIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full aspect-video bg-black rounded-lg border border-border overflow-hidden cursor-pointer"
          onClick={() => openLightbox(currentIndex)}
        >
          <Image
            src={images[currentIndex].url}
            alt={
              images[currentIndex].alt || `${title} - ${mainImagePlaceholder}`
            }
            width={1600}
            height={900}
            quality={90}
            priority
            className="object-contain"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "black",
            }}
            unoptimized
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/image-placeholder.svg";
            }}
          />
        </motion.div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {images.map((image, index) => (
              <div
                key={`thumb-${image.id}-${index}`}
                onClick={() => setCurrentIndex(index)}
                className={`relative aspect-square rounded-md border-2 overflow-hidden cursor-pointer transition-all duration-200 ${
                  currentIndex === index
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                }`}
              >
                <Image
                  src={image.url}
                  alt={
                    image.alt ||
                    `${title} - ${thumbnailPlaceholder} ${index + 1}`
                  }
                  width={200}
                  height={200}
                  quality={85}
                  className="object-cover"
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  unoptimized
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/image-placeholder.svg";
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Zoom]}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.95)" },
        }}
        animation={{ fade: 300 }}
        render={{
          slide: ({ slide }) => (
            <div className="relative w-full h-full">
              <Image
                src={slide.src}
                alt={slide.alt || `${title} - ${mainImagePlaceholder}`}
                fill
                quality={100}
                className="object-contain"
                style={{
                  maxHeight: "90vh",
                  maxWidth: "90vw",
                }}
                unoptimized
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/image-placeholder.svg";
                }}
              />
            </div>
          ),
        }}
      />
    </>
  );
};
