import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Timeline from "@/components/shared/Timeline";
import { Card } from "@/components/ui/card";

const modernEraEvents = [
  {
    date: "1947-1972",
    title: "Post-Liberation Integration",
    body: "Following the 1947 liberation, the region underwent significant administrative and political restructuring. Efforts were made to integrate local governance with national frameworks while preserving regional autonomy.",
  },
  {
    date: "1978-1982",
    title: "Karakoram Highway Completion",
    body: "The completion of the Karakoram Highway (KKH) marked a transformational moment, connecting Gilgit-Baltistan with the rest of Pakistan and opening new avenues for trade, tourism, and cultural exchange.",
  },
  {
    date: "1990s-2000s",
    title: "Educational Development",
    body: "Major investments in education led to the establishment of numerous schools, colleges, and the Karakoram International University. Literacy rates improved significantly, empowering new generations.",
  },
  {
    date: "2009",
    title: "Gilgit-Baltistan Empowerment Order",
    body: "The 2009 order granted greater political autonomy, establishing a legislative assembly and expanded governance structures, marking a significant step toward self-governance.",
  },
  {
    date: "2010-Present",
    title: "Tourism and Economic Growth",
    body: "With improved infrastructure and connectivity, Gilgit-Baltistan has become a major tourism destination. Adventure tourism, mountaineering, and cultural tourism have brought economic opportunities and global recognition.",
  }
];

const Modern = () => {
  return (
    <div>
      <Hero
        title="Modern Era"
        subtitle="Progress, Development, and the Path Forward"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
      />

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h2 className="text-center text-primary mb-6">A Region Transformed</h2>
              <p className="text-foreground leading-relaxed mb-4">
                The modern era has witnessed remarkable transformation in Gilgit-Baltistan. From isolated mountain valleys 
                with limited connectivity, the region has evolved into a vibrant hub of culture, tourism, and development.
              </p>
              <p className="text-foreground leading-relaxed">
                Infrastructure development, particularly the Karakoram Highway, has connected communities, facilitated trade, 
                and opened the region to the world. Educational institutions have flourished, healthcare has improved, and 
                new economic opportunities have emerged. Yet, amidst this progress, the people of Gilgit-Baltistan continue 
                to cherish and preserve their rich cultural heritage and traditions.
              </p>
            </Card>

            <Timeline events={modernEraEvents} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Modern;
