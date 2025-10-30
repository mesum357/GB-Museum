import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Award, Users, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/data/heroes";

interface HeroCardProps {
  hero: Hero;
  index: number;
}

const categoryColors = {
  'freedom-fighter': 'from-red-500 to-orange-500',
  'military': 'from-blue-500 to-cyan-500',
  'educator': 'from-green-500 to-emerald-500',
  'cultural': 'from-purple-500 to-pink-500',
  'political': 'from-indigo-500 to-blue-500',
  'religious': 'from-amber-500 to-yellow-500'
};

const categoryLabels = {
  'freedom-fighter': 'Freedom Fighter',
  'military': 'Military Leader',
  'educator': 'Educator',
  'cultural': 'Cultural Icon',
  'political': 'Political Leader',
  'religious': 'Spiritual Leader'
};

const HeroCard = ({ hero, index }: HeroCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Card className="overflow-hidden bg-background hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:shadow-primary/20">
        {/* Hero Header with Image - Top */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
          )}
          
          {/* Hero Image */}
          <img
            src={hero.thumbnail}
            alt={hero.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <Badge 
              className={`bg-gradient-to-r ${categoryColors[hero.category]} text-white border-0 shadow-lg`}
            >
              {categoryLabels[hero.category]}
            </Badge>
          </div>

          {/* Hero Info Overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h3 className="font-bold text-3xl lg:text-4xl leading-tight mb-2">
              {hero.name}
            </h3>
            <p className="text-xl lg:text-2xl text-white/90 mb-2 font-medium">
              {hero.title}
            </p>
            <div className="flex items-center gap-3 text-base text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                <span>{hero.lifespan}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Content - Below Image */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Description */}
          <div className="space-y-3">
            <h4 className="text-xl font-semibold text-foreground">About</h4>
            <p className="text-muted-foreground leading-relaxed text-base">
              {hero.bio}
            </p>
          </div>

          {/* Gallery - Prominent and in second position */}
          {hero.images.length > 0 && (
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Users className="w-6 h-6" />
                Gallery
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hero.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${hero.name} - Image ${idx + 1}`}
                    className="w-full h-40 md:h-48 lg:h-56 object-cover object-center rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Biography - smaller and in third position */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5" />
              Biography
            </h4>
            {/* Single Biography Image - fixed 200x200 left-aligned */}
            <div className="overflow-hidden rounded-lg w-[200px] h-[200px]">
              <img
                src={hero.achievements[0]?.image || hero.thumbnail}
                alt="Biography"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <ul className="space-y-2">
              {hero.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <div className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{achievement.title}</span>
                      {achievement.year && (
                        <Badge variant="outline" className="text-[10px] px-1 py-0">
                          {achievement.year}
                        </Badge>
                      )}
                    </div>
                    {achievement.description && (
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {achievement.description}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default HeroCard;
