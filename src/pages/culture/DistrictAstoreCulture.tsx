import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictAstoreCulture = () => {
  const img = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;

  const heroParagraph = `Astore District, nestled in the majestic Karakoram and Himalayan ranges, is known for its stunning natural beauty, rich cultural heritage, and historical significance. The district has been a strategic gateway connecting Gilgit with Srinagar through the historic Burzil Pass. Home to the iconic Astore Markhor, Pakistan's national animal, and renowned for its traditional wooden architecture and delicious cuisine.`;

  const heritageAttractions = [
    {
      title: "Ranjeet Singh Hut, Rattu",
      images: [],
      description:
        "Ranjeet Singh popularly known as 'Sher-e-Punjab' was the first Maharaja and ruler of Sikh Empire from 1801 - 1839 AD. The Hut was constructed by Dogra forces in 19th century AD.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Partab Bridge, Bunji",
      images: [img("partab1.jpg"), img("partab2.jpg"), img("partab3.jfif")],
      description:
        "Partab Bridge constructed in 1893 AD. Bridge is named after Maharaja of Jammu and Kashmir Partab Singh (1885 - 1925 AD). The Bridge was burnt down during the Liberation War of 1947 and was restored in 2012.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Burzil Pass",
      images: [img("burzil1.webp"), img("burzil2.jpg"), img("burzil3.webp")],
      description:
        "Burzil Pass is situated at an elevation of 4100 meters. This pass has historically connected Srinagar with Astore and Gilgit. It remains open from May to September.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Home of NLI, Bunji",
      images: [img("homenli1.webp"), img("homenli2.jpg"), img("homenli3.jpg")],
      description:
        "Bunji was regarded as strategic point on the road from Srinagar to Gilgit. It remained Garrison for Dogra and British Forces. Presently it is home to Northern Light Infantry.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Minimarg, Astore",
      images: [img("minimarg1.jpg"), img("minimarg2.jpg"), img("minimarg3.jpg")],
      description:
        "Minimarg is located on the historic trade route of Gilgit and Srinagar. The valley is named after a British officer's wife (Mini). She was famous amongst locals for her kindness.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Rainbow Lake, Domel",
      images: [img("domel1.jpg"), img("domel2.jpg"), img("domel3.jpg")],
      description:
        "Domel is located at confluence of Neru and Gujran Nullah. The valley is famous for crystal clear water of Rainbow Lake.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Crystal Lake, Domel",
      images: [img("crystal1.jpg"), img("crystal2.jpg"), img("crystal3.jpg")],
      description:
        "Crystal Lake is a natural fresh water alpine lake located in Domel Valley.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Rama Valley, Astore",
      images: [img("rama1.jpg"), img("rama2.jpg"), img("rama3.jpg")],
      description:
        "Rama Valley is famous for lush green meadows and breathtaking mountain views. Rama Polo festival takes place every year in July.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Parishing Valley",
      images: [img("parishing1.jpg"), img("parishing2.webp"), img("parishing3.jpg")],
      description:
        "Parishing Valley is renowned for its Natural Lake, which is shaped like the word Allah.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  const cultureItems = [
    {
      title: "GOLI Mul served with Desi Ghee",
      images: [img("goli1.jpg"), img("goli2.jpg"), img("goli3.jpg")],
      description:
        "Traditional dishes include Goli, Mul, Dodo and Chuppati.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Traditional Wooden House",
      images: [img("woodhouse1.webp"), img("woodhouse2.webp"), img("woodhouse3.webp")],
      description:
        "Traditional wooden houses locally known as Gosh.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  const floraFaunaItems = [
    {
      title: "Astore Markhor",
      images: [img("astoremarkhor1.jpg"), img("astoremarkhor2.jpg"), img("astoremarkhor3.jpg")],
      description:
        "Astore Markhor is the 'National Animal of Pakistan', mostly sited in Rattu and Parishing valleys.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Black Cumin (Zeera)",
      images: [img("blackcumin1.jpg"), img("blackcumin2.webp"), img("blackcumin3.webp")],
      description:
        "Rattu Valley in Astore is famous for production of finest quality of Black Cumin (Zeera).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  return (
    <div>
      <Hero
        title="District Astore — Culture & Tradition"
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
            <p className="text-muted-foreground mt-2">Historic sites and natural wonders of Astore</p>
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
            <p className="text-muted-foreground mt-2">Traditional foods and architecture of Astore</p>
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
            <p className="text-muted-foreground mt-2">Wildlife and natural produce of Astore</p>
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

export default DistrictAstoreCulture;

