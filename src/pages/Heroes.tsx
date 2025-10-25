import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import MuseumCard from "@/components/shared/MuseumCard";
import Modal from "@/components/shared/Modal";
import { heroes, Hero as HeroType } from "@/data/heroes";

const Heroes = () => {
  const [selectedHero, setSelectedHero] = useState<HeroType | null>(null);

  return (
    <div>
      <Hero
        title="Heroes of Gilgit-Baltistan"
        subtitle="Honoring the brave souls who shaped our history and culture"
        image="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1920&h=1080&fit=crop"
      />

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {heroes.map((hero, idx) => (
              <motion.div
                key={hero.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <MuseumCard
                  title={hero.name}
                  excerpt={hero.excerpt}
                  thumbnail={hero.thumbnail}
                  onOpen={() => setSelectedHero(hero)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Detail Modal */}
      <Modal
        isOpen={selectedHero !== null}
        onClose={() => setSelectedHero(null)}
        title={selectedHero?.name}
      >
        {selectedHero && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-border">
              <img
                src={selectedHero.thumbnail}
                alt={selectedHero.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{selectedHero.name}</h3>
                <p className="text-muted-foreground">{selectedHero.lifespan}</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-foreground leading-relaxed">{selectedHero.bio}</p>
            </div>

            {selectedHero.images.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {selectedHero.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedHero.name} - Image ${idx + 1}`}
                    className="rounded-lg w-full h-48 object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Heroes;
