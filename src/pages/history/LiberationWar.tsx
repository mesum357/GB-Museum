import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Timeline from "@/components/shared/Timeline";
import { Card } from "@/components/ui/card";
import { liberationWarHistory } from "@/data/history";

const LiberationWar = () => {
  return (
    <div>
      <Hero
        title="The Liberation War of 1947"
        subtitle="Courage, Sacrifice, and the Birth of Freedom"
        image="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1920&h=1080&fit=crop"
      />

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h2 className="text-center text-secondary mb-6">A Defining Moment in History</h2>
              <p className="text-foreground leading-relaxed mb-4">
                The liberation war of 1947 stands as one of the most pivotal chapters in the history of Gilgit-Baltistan. 
                Led by courageous local forces and the Gilgit Scouts under Colonel Hassan Khan, the people of the region 
                rose against oppressive rule to claim their right to self-determination.
              </p>
              <p className="text-foreground leading-relaxed">
                This movement was not merely a military campaign—it was a collective expression of the people's aspirations 
                for freedom, dignity, and the right to chart their own destiny. The sacrifices made during this period 
                continue to inspire and shape the identity of Gilgit-Baltistan today.
              </p>
            </Card>

            <Timeline events={liberationWarHistory} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LiberationWar;
