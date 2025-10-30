import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Download, Share2, Heart, Calendar, MapPin, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GalleryItem } from "@/data/gallery";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: GalleryItem | null;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalItems?: number;
}

const GalleryModal = ({ 
  isOpen, 
  onClose, 
  item, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext, 
  currentIndex, 
  totalItems 
}: GalleryModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === "ArrowRight" && hasNext && onNext) {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, hasPrevious, hasNext, onPrevious, onNext]);

  if (!item) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = item.src;
    link.download = `${item.title.replace(/\s+/g, '_')}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: item.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="relative bg-background rounded-lg shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
            >
              {/* Header */}
              <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-center justify-between z-10">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold truncate">{item.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <Badge variant="outline">
                      {item.type === 'video' ? 'Video' : 'Image'}
                    </Badge>
                    {item.year && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{item.year}</span>
                      </div>
                    )}
                    {item.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {currentIndex !== undefined && totalItems && (
                    <span className="text-sm text-muted-foreground">
                      {currentIndex + 1} / {totalItems}
                    </span>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    aria-label="Close modal"
                    className="hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col lg:flex-row max-h-[calc(95vh-80px)]">
                {/* Media Section */}
                <div className="flex-1 p-6 flex items-center justify-center bg-muted/20">
                  <div className="relative max-w-full max-h-full">
                    {item.type === 'image' ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="relative">
                        <video
                          src={item.src}
                          controls
                          autoPlay={isPlaying}
                          muted={isMuted}
                          className="max-w-full max-h-[60vh] rounded-lg shadow-lg"
                          poster={item.src}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Section */}
                <div className="w-full lg:w-80 border-l border-border bg-muted/10 p-6 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <Separator />

                    {/* Tags */}
                    <div>
                      <h3 className="font-semibold mb-2">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Metadata */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Details</h3>
                      <div className="space-y-2 text-sm">
                        {item.photographer && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Photographer:</span>
                            <span>{item.photographer}</span>
                          </div>
                        )}
                        {item.year && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Year:</span>
                            <span>{item.year}</span>
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Location:</span>
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Actions */}
                    <div className="space-y-3">
                      <h3 className="font-semibold">Actions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownload}
                          className="w-full"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleShare}
                          className="w-full"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsLiked(!isLiked)}
                          className={`w-full ${isLiked ? 'text-red-500' : ''}`}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                          {isLiked ? 'Liked' : 'Like'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              {(hasPrevious || hasNext) && (
                <>
                  {hasPrevious && onPrevious && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={onPrevious}
                      aria-label="Previous item"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-lg"
                    >
                      <X className="h-5 w-5 rotate-90" />
                    </Button>
                  )}
                  {hasNext && onNext && (
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={onNext}
                      aria-label="Next item"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-lg"
                    >
                      <X className="h-5 w-5 -rotate-90" />
                    </Button>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;
