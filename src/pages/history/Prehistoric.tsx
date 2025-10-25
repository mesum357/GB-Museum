import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Timeline from "@/components/shared/Timeline";
import { Card } from "@/components/ui/card";

const prehistoricEvents = [
  {
    date: "50,000 - 10,000 BCE",
    title: "Early Human Settlement",
    body: "Archaeological evidence suggests that the valleys of Gilgit-Baltistan were inhabited by early human communities during the Stone Age. Rock shelters and primitive tools have been discovered in various locations.",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"]
  },
  {
    date: "5000 - 1500 BCE",
    title: "Rock Art and Petroglyphs",
    body: "The region is home to thousands of ancient petroglyphs and rock carvings depicting animals, hunting scenes, and religious symbols. These carvings provide invaluable insights into the beliefs and daily lives of prehistoric communities.",
  },
  {
    date: "1500 BCE - 500 BCE",
    title: "Bronze Age Cultures",
    body: "Evidence of Bronze Age settlements indicates the development of more complex societies. Metal tools and weapons from this period have been discovered, showing technological advancement and trade connections.",
  },
  {
    date: "500 BCE - 1st Century CE",
    title: "Early Buddhist Influence",
    body: "As Buddhism spread from India, it began to influence the region. Early Buddhist communities established monasteries and created rock carvings, marking the beginning of a rich Buddhist heritage that would flourish for centuries.",
  }
];

const Prehistoric = () => {
  return (
    <div>
      <Hero
        title="Prehistoric Era"
        subtitle="Ancient Roots: The Dawn of Civilization in Gilgit-Baltistan"
        image="https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1920&h=1080&fit=crop"
      />

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h2 className="text-center text-secondary mb-6">Echoes from the Stone Age</h2>
              <p className="text-foreground leading-relaxed mb-4">
                Long before recorded history, the valleys and mountains of Gilgit-Baltistan were home to human communities 
                who left their mark on the landscape through rock carvings, stone tools, and ancient settlements. These 
                prehistoric inhabitants navigated the challenging mountain terrain, developed survival strategies, and 
                created art that has endured for millennia.
              </p>
              <p className="text-foreground leading-relaxed">
                The thousands of petroglyphs scattered across the region represent one of the world's largest concentrations 
                of rock art. These ancient images—depicting ibex, snow leopards, hunters, and shamanic symbols—offer a 
                window into the spiritual and daily lives of our earliest ancestors. They remind us that this land has been 
                a cradle of human culture and creativity for tens of thousands of years.
              </p>
            </Card>

            <Timeline events={prehistoricEvents} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Prehistoric;
