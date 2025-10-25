import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import { Building2, Landmark, Users, Mountain } from "lucide-react";

const DistrictGilgit = () => {
  const historicPlaces = [
    {
      title: "Kargah Buddha",
      description: "A magnificent 7th-century rock carving of Buddha, standing 50 feet tall, carved into the cliff face. This archaeological marvel attracts scholars and tourists from around the world.",
      icon: Landmark,
      image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=600&h=400&fit=crop"
    },
    {
      title: "Gilgit Fort",
      description: "Historic fort dating back several centuries, serving as a strategic military and administrative center. The fort's architecture reflects the region's rich history of governance.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop"
    },
    {
      title: "Ancient Buddhist Stupas",
      description: "Remnants of Buddhist civilization that flourished in the region from the 3rd to 8th centuries CE, showcasing intricate stone carvings and architectural brilliance.",
      icon: Mountain,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
    }
  ];

  const culturalTraditions = [
    {
      title: "Traditional Festivals",
      description: "Gilgit hosts numerous festivals throughout the year, including the famous Silk Route Festival and Navroz celebrations, featuring traditional music, dance, and sports.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=600&h=400&fit=crop"
    },
    {
      title: "Local Crafts",
      description: "Artisans continue centuries-old traditions of woodcarving, metalwork, and textile weaving. The region is renowned for its intricate embroidery and hand-woven carpets.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
    }
  ];

  return (
    <div>
      <Hero
        title="District Gilgit"
        subtitle="The Historic Heart of Gilgit-Baltistan"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
      />

      {/* Historic Places Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Historic Places & Monuments</h2>
            <p className="text-muted-foreground mt-2">
              Discover the ancient treasures that tell the story of our region
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {historicPlaces.map((place, idx) => (
              <motion.div
                key={place.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <place.icon className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-lg">{place.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Traditions Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-secondary">Culture & Traditions</h2>
            <p className="text-muted-foreground mt-2">
              Living heritage that continues to thrive in modern times
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalTraditions.map((tradition, idx) => (
              <motion.div
                key={tradition.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={tradition.image}
                      alt={tradition.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <tradition.icon className="h-5 w-5 text-accent" />
                      </div>
                      <h3 className="text-lg">{tradition.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tradition.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DistrictGilgit;
