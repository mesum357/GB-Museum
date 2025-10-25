import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Gallery from "@/components/shared/Gallery";
import { Card } from "@/components/ui/card";

const Home = () => {
  const scrollToContent = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  const galleryItems = [
    {
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      alt: "Karakoram Mountain Range",
      caption: "The majestic Karakoram mountains that define our region"
    },
    {
      src: "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&h=600&fit=crop",
      alt: "Ancient Rock Carvings",
      caption: "Buddhist rock carvings from the 7th century"
    },
    {
      src: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=600&fit=crop",
      alt: "Traditional Architecture",
      caption: "Historic fort architecture of Gilgit-Baltistan"
    },
    {
      src: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop",
      alt: "Cultural Festival",
      caption: "Annual Shandur Polo Festival celebrations"
    },
    {
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      alt: "Local Craftsmanship",
      caption: "Traditional handicrafts and textiles"
    },
    {
      src: "https://images.unsplash.com/photo-1583483425010-c566431a7710?w=800&h=600&fit=crop",
      alt: "Mountain Village",
      caption: "Historic village settlements in the valleys"
    }
  ];

  return (
    <div>
      <Hero
        title="Welcome to GB Museum"
        subtitle="Preserving the Rich Heritage and Culture of Gilgit-Baltistan"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
        cta={{
          text: "Explore Our Collections",
          onClick: scrollToContent
        }}
      />

      {/* Mission Section */}
      <section id="mission" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <h2 className="text-primary">Our Mission</h2>
                  <p className="text-lg leading-relaxed">
                    The GB Museum serves as a guardian of Gilgit-Baltistan's extraordinary cultural heritage. 
                    We are dedicated to preserving, documenting, and showcasing the rich history, traditions, 
                    and stories of our people for current and future generations.
                  </p>
                  <p className="text-muted-foreground">
                    Through our collections and programs, we celebrate the heroes, artisans, and everyday people 
                    whose contributions have shaped this remarkable region at the crossroads of civilizations.
                  </p>
                </div>
                <div className="w-full md:w-64 flex-shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop"
                    alt="Museum Director"
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                  <p className="text-center mt-3 text-sm text-muted-foreground">
                    Dr. Ahmed Khan, Director
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2>Our Team</h2>
            <p className="text-muted-foreground mt-2">
              Dedicated curators and researchers preserving our heritage
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Fatima Ali", role: "Chief Curator", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
              { name: "Ibrahim Shah", role: "Head of Research", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop" },
              { name: "Ayesha Khan", role: "Conservation Specialist", img: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop" }
            ].map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="overflow-hidden text-center hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Museum Photo Gallery */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2>Heritage Gallery</h2>
            <p className="text-muted-foreground mt-2">
              A glimpse into the visual treasures of Gilgit-Baltistan
            </p>
          </motion.div>

          <Gallery items={galleryItems} />
        </div>
      </section>
    </div>
  );
};

export default Home;
