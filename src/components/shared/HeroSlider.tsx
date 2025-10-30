import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hero } from "@/data/heroes";

interface HeroSliderProps {
  heroes: Hero[];
}

const HeroSlider = ({ heroes }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % (heroes.length + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, heroes.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroes.length + 1) % (heroes.length + 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % (heroes.length + 1));
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

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

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Slider Container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          {/* First Slide - GB Heroes Text */}
          {currentSlide === 0 && (
            <motion.div
              key="heroes-text"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center"
            >
              <div className="text-center space-y-6 px-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                >
                  GB Heroes
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
                >
                  Honoring the brave souls who shaped our history and culture
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
                >
                  <span>Discover {heroes.length} remarkable individuals</span>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Explore their stories</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Hero Slides */}
          {heroes.map((hero, index) => {
            const slideIndex = index + 1;
            return (
              currentSlide === slideIndex && (
                <motion.div
                  key={hero.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full">
                    {/* Hero Image */}
                    <img
                      src={hero.thumbnail}
                      alt={hero.name}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <Badge 
                        className={`bg-gradient-to-r ${categoryColors[hero.category]} text-white border-0 shadow-lg text-sm px-3 py-1`}
                      >
                        {categoryLabels[hero.category]}
                      </Badge>
                    </div>

                    {/* Hero Info */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                      >
                        {hero.name}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-lg md:text-xl lg:text-2xl text-white/90 mb-3 font-medium"
                      >
                        {hero.title}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-sm md:text-base text-white/80"
                      >
                        {hero.lifespan}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={goToPrevious}
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={togglePlayPause}
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          onClick={goToNext}
          className="bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        {Array.from({ length: heroes.length + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
        {currentSlide + 1} / {heroes.length + 1}
      </div>
    </div>
  );
};

export default HeroSlider;
