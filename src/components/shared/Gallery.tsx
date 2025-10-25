import { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryProps {
  items: GalleryItem[];
}

const Gallery = ({ items }: GalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${item.alt}`}
            className="aspect-[4/3] overflow-hidden rounded-lg bg-muted cursor-pointer group focus:ring-2 focus:ring-ring focus:outline-none"
          >
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Modal
        isOpen={selectedIndex !== null}
        onClose={closeLightbox}
        title={selectedIndex !== null ? items[selectedIndex].caption : undefined}
      >
        {selectedIndex !== null && (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={items[selectedIndex].src}
                alt={items[selectedIndex].alt}
                className="w-full h-auto rounded-lg"
              />

              {/* Navigation Arrows */}
              {items.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={goToPrevious}
                    aria-label="Previous image"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={goToNext}
                    aria-label="Next image"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
            </div>

            {items[selectedIndex].caption && (
              <p className="text-center text-muted-foreground">
                {items[selectedIndex].caption}
              </p>
            )}

            <div className="text-center text-sm text-muted-foreground">
              {selectedIndex + 1} / {items.length}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Gallery;
