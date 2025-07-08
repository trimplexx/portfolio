"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "framer-motion";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

type ImageProps = {
  id: string;
  url: string;
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

  const slides = images.map((image) => ({
    src: image.url,
    alt: `${title} - ${mainImagePlaceholder}`,
  }));

  return (
    <>
      <div className="space-y-4">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full aspect-video bg-black rounded-lg border border-border overflow-hidden cursor-pointer"
          onClick={() => openLightbox(currentIndex)}
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].url}
              alt={`${title} - ${mainImagePlaceholder}`}
              fill
              className="object-contain"
              priority
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
              style={{
                objectFit: "contain",
                backgroundColor: "black",
              }}
            />
          </div>
        </motion.div>

        {images.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {images.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-full aspect-square rounded-md border-2 overflow-hidden cursor-pointer transition-all duration-200 ${
                  currentIndex === index
                    ? "border-primary"
                    : "border-transparent hover:border-primary/50"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${title} - ${thumbnailPlaceholder} ${index + 1}`}
                  fill
                  className="object-cover"
                  quality={80}
                  sizes="(max-width: 768px) 25vw, (max-width: 1024px) 20vw, 10vw"
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
            <div className="flex items-center justify-center w-full h-full bg-black">
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt || `${title} - ${mainImagePlaceholder}`}
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};
