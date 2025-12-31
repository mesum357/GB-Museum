import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Gallery from "@/components/shared/Gallery";
import { Card } from "@/components/ui/card";
import salahudungImg from "@/assets/img/salahudung.jpeg";

const Home = () => {
  const scrollToContent = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

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
                    src={salahudungImg}
                    alt="R. Lt Col Sallah-ud-Din"
                    className="rounded-lg shadow-lg w-full h-80 object-cover object-top"
                  />
                  <p className="text-center mt-3 text-sm text-muted-foreground">
                    R. Lt Col Sallah-ud-Din, Head of Museum Team
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Museum Tour Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Museum Tour</h2>
            <p className="text-muted-foreground mt-2">
              Explore the galleries and exhibitions of GB Museum
            </p>
          </motion.div>

          <Gallery items={[
            {
              src: "/assets/img/museum-tour/IMG_0067.JPG",
              alt: "GB Museum Entrance",
              caption: "Main entrance of the GB Museum"
            },
            {
              src: "/assets/img/museum-tour/IMG_0066.JPG",
              alt: "GB Museum and Library Complex",
              caption: "GB Museum and Library Complex - A gift from FCNA to people of GB"
            },
            {
              src: "/assets/img/museum-tour/IMG_E0048.JPG",
              alt: "Wildlife Gallery",
              caption: "Wildlife exhibit featuring native species with stunning mountain backdrop"
            },
            {
              src: "/assets/img/museum-tour/IMG_E0047.JPG",
              alt: "Brown Bear Exhibit",
              caption: "Himalayan Brown Bear on display"
            },
            {
              src: "/assets/img/museum-tour/IMG_0051.JPG",
              alt: "Mountain Wildlife Collection",
              caption: "Markhor, Ibex, and Snow Leopard exhibits"
            },
            {
              src: "/assets/img/museum-tour/IMG_0041.JPG",
              alt: "Our Heroes Exhibit",
              caption: "Honoring the brave heroes of Gilgit-Baltistan"
            },
            {
              src: "/assets/img/museum-tour/IMG_0038.JPG",
              alt: "Historical Figures Gallery",
              caption: "Major Raja Babar Khan, Colonel Mirza Hassan, and Colonel Ihsan Ali"
            },
            {
              src: "/assets/img/museum-tour/IMG_0037.JPG",
              alt: "GB History Display",
              caption: "Historical photographs and scenic landscapes of GB"
            },
            {
              src: "/assets/img/museum-tour/IMG_0035.JPG",
              alt: "Our Pride Exhibition",
              caption: "Pride of Gilgit-Baltistan - Heritage and History"
            },
            {
              src: "/assets/img/museum-tour/IMG_0070.JPG",
              alt: "Ancient Rock Art",
              caption: "Petroglyphs and ancient rock carvings on display"
            },
            {
              src: "/assets/img/museum-tour/IMG_0017.JPG",
              alt: "Ancient Artifacts Collection",
              caption: "Buddhist monastery remains, bronze jewelry, and charm covers"
            },
            {
              src: "/assets/img/museum-tour/IMG_0016.JPG",
              alt: "Museum Gallery",
              caption: "Cultural artifacts and historical displays"
            },
            {
              src: "/assets/img/museum-tour/IMG_0015.JPG",
              alt: "Museum Collection",
              caption: "Curated collections showcasing GB heritage"
            }
          ]} />
        </div>
      </section>

    </div>
  );
};

export default Home;
