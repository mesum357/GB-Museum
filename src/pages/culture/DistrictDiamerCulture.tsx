import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictDiamerCulture = () => {
  const img = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;

  const heroParagraph = `Diamer District is home to some of the most spectacular natural wonders in Gilgit-Baltistan, including the mighty Nanga Parbat, the world's 9th highest peak. The region boasts over 35,000 ancient inscriptions and rock carvings, a testament to its rich historical significance along ancient trade routes. The district is known for its indigenous Dardic communities, traditional way of life, and stunning landscapes ranging from Fairy Meadows to Babusar Pass.`;

  const heritageAttractions = [
    {
      title: "Stupa Carvings and Inscriptions, Shatial",
      images: [img("shatial1.jpg"), img("shatial2.jpg"), img("shatial3.webp")],
      description:
        "More than 35000 inscriptions and carvings are available in Diamer. Famous ancient Shatial Stupa stands out as a highlight of this area.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Remains of Buddhist Monastery Phugush, Darel",
      images: [img("stupa1.jpeg"), img("stupa2.jpg"), img("stupa3.jfif")],
      description:
        "Ancient Buddhist Monastery at Phugush, Darel date back to 4th century AD.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Water Storage Pits, Chilas",
      images: [img("dam1.jfif"), img("dam2.png"), img("dam3.jfif")],
      description:
        "Water storage pits locally known as Butt Wang or Butt Bang are found in most of the areas around Chilas and Goharabad.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Chilas Fort",
      images: [img("fort1.jfif"), img("fort2.jfif"), img("fort3.jfif")],
      description:
        "Chilas Fort was constructed in 1893-94 by Britishers to protect supply lines from Babusar. Presently, the Fort is being used as Police Lines Headquarter (Hilal Shaheed Camp).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Assistant Political Agent House, Babusar",
      images: [img("assistan1.jfif")],
      description:
        "Summer House of British Assistant Political Agent was constructed at Babusar in 1890 AD.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Fairy Meadows, Raikot",
      images: [img("fairy1.jfif"), img("fairy2.jpg"), img("fairy3.jpg")],
      description:
        "Fairy Meadows is a popular camping site and starting point for treks to Nanga Parbat Base Camp.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Nanga Parbat, Raikot",
      images: [img("nanga1.jpg"), img("nanga2.jfif"), img("nanga3.webp")],
      description:
        "Nanga Parbat (8126 meters) also known as Killer Mountain is world's 9th Highest Mountain.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Babusar Pass, Chilas",
      images: [img("babusar1.jpg"), img("babusar2.jpg"), img("babusar3.jfif")],
      description:
        "Babusar is a strategic pass (4170 meters) that links GB (Chilas) with KPK (Kaghan).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Khanbari Valley and Pasture",
      images: [img("khanbari1.jfif"), img("khanbari2.jpg")],
      description:
        "Khanbari Valley is famous for cedar and pine trees alongwith lush green meadows & pastures.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Dogo Shar Waterfall, Tangir",
      images: [img("shar1.jpg"), img("shar2.jpg"), img("shar3.jpg")],
      description:
        "Tangir Valley is home to indigenous communities, primarily the Dardic People. The Valley is known for Juniper trees.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  const cultureItems = [
    {
      title: "Traditional Attire, Chilas",
      images: [img("chilasatire1.jpg")],
      description:
        "The region's most distinctive winter attire includes the Woolen shawl known as 'Xanari' and woolen cap called 'Khoi'.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Saag with Makai ki Roti",
      images: [img("saag1.jfif"), img("saag2.avif")],
      description:
        "The cuisine of Diamer is influenced by its agricultural lifestyle that include grains, barley, and maize, along with dairy products such as yogurt and cheese.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  const floraFaunaItems = [
    {
      title: "Chilgoza",
      images: [img("chilgoza1.jpg"), img("chilgoza2.webp")],
      description:
        "Chilgoza locally known as Garoli is abundantly found in Diamer District.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Monal",
      images: [img("monal1.jfif"), img("monal2.jfif")],
      description:
        "Monal, the national bird of Gilgit-Baltistan is found in Diamer Valley.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  return (
    <div>
      <Hero
        title="District Diamer — Culture & Tradition"
        subtitle={heroParagraph}
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
      />

      {/* Heritage and Attractions */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Heritage and Attractions</h2>
            <p className="text-muted-foreground mt-2">Historic sites and natural wonders of Diamer</p>
          </motion.div>

          <div className="space-y-8">
            {heritageAttractions.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="max-w-6xl mx-auto"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  {item.images.length > 0 && (
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <ImageSlider images={item.images} alt={item.title} className="w-full h-full" />
                    </div>
                  )}
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Traditions */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Culture & Traditions</h2>
            <p className="text-muted-foreground mt-2">Traditional attire and cuisine of Diamer</p>
          </motion.div>

          <div className="space-y-8">
            {cultureItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="max-w-6xl mx-auto"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  {item.images.length > 0 && (
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <ImageSlider images={item.images} alt={item.title} className="w-full h-full" />
                    </div>
                  )}
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flora & Fauna */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Flora & Fauna</h2>
            <p className="text-muted-foreground mt-2">Wildlife and natural produce of Diamer</p>
          </motion.div>

          <div className="space-y-8">
            {floraFaunaItems.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="max-w-6xl mx-auto"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  {item.images.length > 0 && (
                    <div className="aspect-[16/10] overflow-hidden bg-muted">
                      <ImageSlider images={item.images} alt={item.title} className="w-full h-full" />
                    </div>
                  )}
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
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

export default DistrictDiamerCulture;

