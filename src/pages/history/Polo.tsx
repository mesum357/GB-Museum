import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Timeline from "@/components/shared/Timeline";
import { Card } from "@/components/ui/card";
import { poloHistory } from "@/data/history";

const Polo = () => {
  return (
    <div>
      <Hero
        title="Polo: The Game of Kings"
        subtitle="Centuries of Tradition on the World's Highest Polo Ground"
        image="https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1920&h=1080&fit=crop"
      />

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h2 className="text-center text-primary mb-6">A Living Tradition</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Polo in Gilgit-Baltistan is far more than a sport—it's a living connection to our ancestral heritage. 
                Known locally as the "game of kings," polo has been played in these mountain valleys for over two millennia, 
                with roots stretching back to ancient Persia and Central Asia.
              </p>
              <p className="text-foreground leading-relaxed">
                The Shandur Polo Ground, perched at 12,200 feet above sea level, hosts the world's highest polo tournament 
                annually. Here, teams from Gilgit and Chitral compete in a thrilling spectacle that draws thousands of spectators 
                and preserves centuries-old traditions of horsemanship, strategy, and community pride.
              </p>
            </Card>

            <Timeline events={poloHistory} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Polo;
