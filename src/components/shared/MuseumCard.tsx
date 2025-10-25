import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface MuseumCardProps {
  title: string;
  excerpt: string;
  thumbnail: string;
  onOpen: () => void;
}

const MuseumCard = ({ title, excerpt, thumbnail, onOpen }: MuseumCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details about ${title}`}
        className="overflow-hidden cursor-pointer group focus:ring-2 focus:ring-ring focus:outline-none"
      >
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6 space-y-2">
          <h3 className="group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {excerpt}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default MuseumCard;
