import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Image as ImageIcon, MapPin, Calendar, User, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GalleryItem } from "@/data/gallery";

interface GalleryCardProps {
  item: GalleryItem;
  onOpenModal: (item: GalleryItem) => void;
  index: number;
}

const GalleryCard = ({ item, onOpenModal, index }: GalleryCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="overflow-hidden bg-background hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:shadow-primary/20">
        {/* Image/Video Container */}
        <div 
          className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer"
          onClick={() => onOpenModal(item)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
          )}
          
          {/* Image/Video */}
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="relative w-full h-full">
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              {/* Video Overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <motion.div
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                </motion.div>
              </div>
            </div>
          )}

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick Info Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 20 
            }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 text-white"
          >
            <div className="flex items-center gap-2 mb-2">
              {item.type === 'video' ? (
                <Play className="w-4 h-4" />
              ) : (
                <ImageIcon className="w-4 h-4" />
              )}
              <span className="text-sm font-medium capitalize">{item.type}</span>
            </div>
            <h3 className="font-semibold text-lg leading-tight mb-1 line-clamp-2">
              {item.title}
            </h3>
            <div className="flex items-center gap-4 text-xs text-white/80">
              {item.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.year}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{item.location}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* View Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0.8 
            }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4"
          >
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-foreground shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(item);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </motion.div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Title and Type */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <Badge variant="outline" className="flex-shrink-0">
              {item.type === 'video' ? (
                <Play className="w-3 h-3 mr-1" />
              ) : (
                <ImageIcon className="w-3 h-3 mr-1" />
              )}
              {item.type}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{item.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-4">
              {item.year && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{item.year}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate max-w-24">{item.location}</span>
                </div>
              )}
            </div>
            {item.photographer && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className="truncate max-w-20">{item.photographer}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default GalleryCard;
