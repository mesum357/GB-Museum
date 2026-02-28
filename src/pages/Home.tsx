import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Gallery from "@/components/shared/Gallery";
import { Card } from "@/components/ui/card";
import salahudungImg from "@/assets/img/salahudung.jpeg";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";

const introImages = [
  {
    src: "/assets/img/heroes/shahhero.webp",
    title: "Heroes of GB",
    subtitle: "Honoring Our Legacy"
  },
  {
    src: "/assets/img/heroes/ishanhero.jpg",
    title: "Legacy of Bravery",
    subtitle: "Colonel Ihsan Ali"
  },
  {
    src: "/assets/img/heroes/mirzahero.jpg",
    title: "Liberation Leaders",
    subtitle: "Colonel Mirza Hassan Khan"
  },
  {
    src: "/assets/img/heroes/baburhero.jpg",
    title: "Our Pride",
    subtitle: "Major Raja Babar Khan"
  },
  {
    src: "/assets/img/polo2.jpg",
    title: "Heritage of Polo",
    subtitle: "The Sport of Kings"
  },
  {
    src: "/assets/img/district/stupa1.jpg",
    title: "District Astore",
    subtitle: "Land of Majestic Peaks"
  },
  {
    src: "/assets/img/district/shikar1.jpg",
    title: "District Diamer",
    subtitle: "The Gateway to GB"
  },
  {
    src: "/assets/img/district/jawari1.jpg",
    title: "District Ghizer",
    subtitle: "The Land of Lakes"
  },
  {
    src: "/assets/img/district/danyoreBridge1.jpg",
    title: "District Gilgit",
    subtitle: "The Heart of Gilgit-Baltistan"
  },
  {
    src: "/assets/img/district/bridge2.jpg",
    title: "District Hunza",
    subtitle: "Valley of Immortals"
  },
  {
    src: "/assets/img/district/agortham1.jpg",
    title: "District Nagar",
    subtitle: "Home of the Rakaposhi"
  },
  {
    src: "/assets/img/district/carving1.jpg",
    title: "District Shigar",
    subtitle: "The Fort on the Rock"
  },
  {
    src: "/assets/img/district/airport1.jpg",
    title: "District Skardu",
    subtitle: "Capital of Baltistan"
  },
  {
    src: "/assets/img/silkroad2.jpg",
    title: "The Silk Route",
    subtitle: "Ancient Trade Networks"
  },
  {
    src: "/assets/img/silkroad3.webp",
    title: "Karakoram Highway",
    subtitle: "The Modern Silk Road"
  },
  {
    src: "/assets/img/museum-tour/IMG_0067.JPG",
    title: "GB Museum",
    subtitle: "Discovering Our Heritage"
  },
  {
    src: "/assets/img/museum-tour/IMG_E0048.JPG",
    title: "Wildlife Gallery",
    subtitle: "Flora and Fauna of GB"
  },
  {
    src: "/assets/img/museum-tour/IMG_0051.JPG",
    title: "Mountain Life",
    subtitle: "Unique Wildlife Collections"
  },
  {
    src: "/assets/img/museum-tour/IMG_0070.JPG",
    title: "Ancient Rock Art",
    subtitle: "Echoes from the Stone Age"
  }
];

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

      {/* Introduction Section */}
      <section className="py-16 bg-muted/30 overflow-hidden">
        <div className="container mx-auto flex flex-col items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 max-w-4xl"
          >
            <h2 className="text-primary text-3xl md:text-4xl font-bold mb-4">
              Explore the Rich Tapestry of Gilgit-Baltistan’s Past
            </h2>
            <p className="text-xl text-muted-foreground">
              Step into a world of heritage, culture, and history preserved in the heart of the mountains.
            </p>
          </motion.div>
        </div>

        <div className="w-full mb-12 relative">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {introImages.map((item, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 basis-[85%] md:basis-[70%] lg:basis-[60%]">
                  <div className="relative w-full h-[75vh] md:h-[90vh] rounded-3xl overflow-hidden shadow-2xl group cursor-grab active:cursor-grabbing">
                    {/* Background Image */}
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Lighting Transition Overlay */}
                    <motion.div
                      initial={{ opacity: 0, x: "-100%" }}
                      whileInView={{ opacity: [0, 0.5, 0], x: ["-100%", "100%"] }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
                    />

                    {/* Overlay Gradient (Like Hero Slider) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

                    {/* Info Overlays */}
                    <div className="absolute bottom-8 left-8 right-8 text-white z-30 transition-transform duration-500 group-hover:-translate-y-2">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-2xl md:text-4xl font-bold mb-2 tracking-tight drop-shadow-lg"
                      >
                        {item.title}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-lg md:text-xl text-white/90 font-medium drop-shadow-md"
                      >
                        {item.subtitle}
                      </motion.p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="w-full flex justify-center mt-8 px-4">
              <CarouselDots />
            </div>
          </Carousel>
        </div>

        <div className="container mx-auto flex flex-col items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mt-4"
          >
            <h3 className="text-secondary text-lg md:text-xl font-semibold uppercase tracking-wider leading-relaxed">
              THE GALLERY OF GILGIT-BALTISTAN’S HISTORY<br />
              A TIMELESS JOURNEY THROUGH THE CULTURE, PEOPLE, AND STORIES THAT SHAPED THE ROOF OF THE WORLD
            </h3>
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
                    R. Lt Col Salah-ud-Din Nasir, Team Leader
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
