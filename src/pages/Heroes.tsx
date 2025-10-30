import { motion } from "framer-motion";
import { Award, Users, Calendar } from "lucide-react";
import HeroSlider from "@/components/shared/HeroSlider";
import HeroCard from "@/components/shared/HeroCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { heroes } from "@/data/heroes";

const Heroes = () => {

  return (
    <div>
      <HeroSlider heroes={heroes} />

      {/* Heroes Grid Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2>Our Heroes</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              These exceptional individuals left an indelible mark on Gilgit-Baltistan through their 
              courage, vision, and unwavering dedication to their people.
            </p>
          </motion.div>

          <div className="space-y-8">
            {heroes.map((hero, idx) => (
              <HeroCard
                key={hero.id}
                hero={hero}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Titles and Pictures Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Honorary Titles & Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The distinguished titles and recognition bestowed upon our heroes for their extraordinary contributions to Gilgit-Baltistan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroes.map((hero, idx) => (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  {/* Hero Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={hero.thumbnail}
                      alt={hero.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Title Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="font-bold text-lg leading-tight mb-1">
                        {hero.name}
                      </h3>
                      <p className="text-sm text-white/90 font-medium">
                        {hero.title}
                      </p>
              </div>
            </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {hero.category.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {hero.lifespan}
                      </span>
            </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {hero.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Award className="w-3 h-3" />
                      <span>Key Achievements: {hero.achievements.length}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
                ))}
              </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">{heroes.length}</div>
                  <div className="text-sm text-muted-foreground">Total Heroes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(heroes.map(h => h.category)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Categories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {heroes.reduce((acc, hero) => acc + hero.achievements.length, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Achievements</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round(heroes.reduce((acc, hero) => {
                      const [birth, death] = hero.lifespan.split(' - ').map(y => parseInt(y));
                      return acc + (death - birth);
                    }, 0) / heroes.length)}
                  </div>
                  <div className="text-sm text-muted-foreground">Avg. Lifespan</div>
                </div>
              </div>
            </Card>
          </motion.div>
          </div>
      </section>

    </div>
  );
};

export default Heroes;
