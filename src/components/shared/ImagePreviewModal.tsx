import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string | null;
  caption?: string;
}

const ImagePreviewModal = ({ isOpen, onClose, imageSrc, caption }: ImagePreviewModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!imageSrc) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full flex flex-col items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full flex flex-col justify-center items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="absolute -top-12 right-0 text-white hover:bg-white/20 hover:text-white z-10 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
                
                <div className="relative rounded-lg overflow-hidden shadow-2xl bg-black/40">
                  <img
                    src={imageSrc}
                    alt={caption || "Preview"}
                    className="max-w-full max-h-[85vh] object-contain"
                  />
                  {caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 backdrop-blur-md border-t border-white/10">
                      <p className="text-white text-center text-sm md:text-base font-medium">{caption}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;
