import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictGilgit = () => {
  const placeImg = (name: string) => new URL(`../assets/img/district/${name}`, import.meta.url).href;
  const historicPlaces = [
    {
      title: "Kargah Buddha",
      images: [placeImg("bhudda1.jpg"), placeImg("bhudda2.jpg"), placeImg("bhudda3.jpg")],
      description: "Ancient Buddhist rock carving at Kargah Nalla near Gilgit.",
    },
    {
      title: "Danyore Suspension Bridge",
      images: [placeImg("danyoreBridge1.jpg"), placeImg("danyoreBridge2.jpg"), placeImg("danyoreBridge3.jpg")],
      description: "Historic wooden suspension bridge connecting Gilgit and Danyore.",
    },
    {
      title: "Chinese Graveyard (Memorial)",
      images: [placeImg("chinese1.jpg"), placeImg("chinese2.jpg"), placeImg("chinese3.jpg")],
      description: "Memorial of Chinese workers who built the Karakoram Highway.",
    },
    {
      title: "Victory Monument (Yadgar-e-Shuhada)",
      images: [placeImg("yadgar1.webp"), placeImg("yadgar2.webp")],
      description: "Monument commemorating the liberation of Gilgit-Baltistan.",
    },
    {
      title: "Buddhist Stupa Site",
      images: [placeImg("stupa1.jpg"), placeImg("stupa2.webp"), placeImg("stupa3.jpg")],
      description: "Remnants of ancient Buddhist presence in the region.",
    },
    {
      title: "Rock Carvings",
      images: [placeImg("carving1.jpg"), placeImg("carving2.jpg"), placeImg("carving3.jpg")],
      description: "Prehistoric petroglyphs scattered around the Gilgit area.",
    },
    {
      title: "Junction Point (Gilgit, Hunza, Naltar)",
      images: [placeImg("junction1.webp"), placeImg("junction2.jpg"), placeImg("junction3.jpg")],
      description: "Scenic confluence point towards major valleys.",
    },
    {
      title: "Wahab Sahib Ziarat",
      images: [placeImg("wahab1.jpg"), placeImg("wahab2.jpg"), placeImg("wahab3.jpg")],
      description: "Local religious and historical site near Gilgit.",
    },
    {
      title: "Babar Mosque",
      images: [placeImg("bab1.jpg"), placeImg("bab2.jpg"), placeImg("bab3.jpg")],
      description: "Historic mosque and local landmark.",
    },
    {
      title: "Gilgit Bridge",
      images: [placeImg("bridge1.jpeg"), placeImg("bridge2.jpg"), placeImg("bridge3.jpg")],
      description: "Main bridge over the Gilgit River, a city icon.",
    },
    {
      title: "Old Political Agent House",
      images: [placeImg("agent1.jpg"), placeImg("agent2.jpg"), placeImg("agent3.jpg")],
      description: "Colonial-era administrative building with heritage value.",
    },
    {
      title: "Jawari Tower",
      images: [placeImg("jawari1.jpg"), placeImg("jawari2.png"), placeImg("jawari3.jpg")],
      description: "Historic watchtower structure near Gilgit.",
    },
    {
      title: "Gohar Abad Area",
      images: [placeImg("gohar1.webp"), placeImg("gohar2.jpg")],
      description: "Valley area with cultural and historical relevance.",
    },
    {
      title: "Shikar Fort Site",
      images: [placeImg("shikar1.jpg"), placeImg("shikar2.jpg"), placeImg("shikar3.jpg")],
      description: "Remnants and location associated with local fort history.",
    },
    {
      title: "Agor Tham",
      images: [placeImg("agortham1.jpg"), placeImg("agortham2.jpg")],
      description: "Historic rock/peak spot with local folklore.",
    },
    {
      title: "Shir-e-Bala Area",
      images: [placeImg("shir1.jpg"), placeImg("shir2.jpg")],
      description: "Historic neighborhood with traditional settlements.",
    },
    {
      title: "Gilgit Airport (Historic Photos)",
      images: [placeImg("airport1.jpg"), placeImg("airport2.jpg"), placeImg("airport3.jpg")],
      description: "Archival views of the airport area in earlier decades.",
    },
  ];

  return (
    <div>
      <Hero
        title="District Gilgit"
        subtitle="The Historic Heart of Gilgit-Baltistan"
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
      />

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Historic Places</h2>
            <p className="text-muted-foreground mt-2">Explore landmarks and sites across District Gilgit.</p>
          </motion.div>

          <div className="space-y-8">
            {historicPlaces.map((place, idx) => (
              <motion.div
                key={place.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="max-w-6xl mx-auto"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <ImageSlider images={place.images} alt={place.title} className="w-full h-full" />
                  </div>
                  <div className="p-8 space-y-2">
                    <h3 className="text-2xl font-bold">{place.title}</h3>
                    {place.description && (
                      <p className="text-base text-muted-foreground leading-relaxed">{place.description}</p>
                    )}
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

