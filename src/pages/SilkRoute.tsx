import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Timeline from "@/components/shared/Timeline";
import { Card } from "@/components/ui/card";
import { silkRouteHistory } from "@/data/history";

const SilkRoute = () => {
  return (
    <div>
      <Hero
        title="The Ancient Silk Route"
        subtitle="Where East Meets West: A Journey Through Time and Trade"
        image="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1920&h=1080&fit=crop"
      />

      {/* Introduction Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="text-center text-primary">A Crossroads of Civilizations</h2>
            <p className="text-muted-foreground text-center mb-8">
              For over two millennia, Gilgit-Baltistan has served as a vital link on the legendary Silk Route
            </p>
            
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <p className="text-foreground leading-relaxed mb-4">
                The Silk Route wasn't merely a trade corridor—it was a conduit for ideas, religions, art, 
                and technology. Gilgit-Baltistan's strategic location at the convergence of major trade routes 
                made it a melting pot of cultures, where merchants, monks, and scholars from China, Persia, 
                Central Asia, and the Indian subcontinent met and exchanged goods and knowledge.
              </p>
              <p className="text-foreground leading-relaxed">
                Caravans laden with Chinese silk, Indian spices, Central Asian horses, and Persian carpets 
                traversed these treacherous mountain passes. Buddhist pilgrims journeyed here to study sacred 
                texts, leaving behind magnificent rock carvings and monasteries that still dot our landscape today.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-secondary">Historical Timeline</h2>
            <p className="text-muted-foreground mt-2">
              Key moments in the Silk Route's evolution through Gilgit-Baltistan
            </p>
          </motion.div>

          <Timeline events={silkRouteHistory} />
        </div>
      </section>

      {/* Cultural Exchange Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-accent">Cultural Exchange & Legacy</h2>
            <p className="text-muted-foreground mt-2">
              The lasting impact of centuries of cross-cultural interaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Languages & Scripts",
                description: "The region became home to multiple languages and writing systems. Ancient inscriptions in Brahmi, Tibetan, Chinese, and Persian scripts testify to this linguistic diversity.",
                image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400&h=300&fit=crop"
              },
              {
                title: "Artistic Traditions",
                description: "Local art forms absorbed influences from Gandharan, Persian, Chinese, and Central Asian traditions, creating unique hybrid styles visible in rock carvings and handicrafts.",
                image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
              },
              {
                title: "Religious Synthesis",
                description: "Buddhism, Islam, and indigenous beliefs coexisted and influenced each other, leaving behind a rich tapestry of religious monuments and practices.",
                image: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400&h=300&fit=crop"
              }
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
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

export default SilkRoute;
