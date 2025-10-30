import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictNagarCulture = () => {
  const img = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;

  const heroParagraph = `District Nagar lies on the left bank of Hunza river.
Valley reveals precious gems like Ruby, Topaz,
Aquamarine, Emerald, and Quartz. Nagar is also
home to famous mountains like Rakaposhi,
Golden Peak and Disteghil Sir. Valley remained
under autonomous rule till 1889, thereafter it
becamecolonial princely state under Maharajas
of Jammuand Kashmir. First known signs of
civilization in Nagar Valley date back to 8th
century AD.`;

  const heritageAttractions = [
    {
      title: "Baba Kamal Mosque, Nagar Khas",
      images: [img("babakamal1.jpg"), img("babakamal2.jpg"), img("babakamal3.jpg")],
      description:
        "First Mosque (1715 AD) in Nagar built by Babu Kamal when local population converted to Islam.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Tomb of Syed Shah Wali",
      images: [img("shahwali1.jpg"), img("shahwali2.jpg"), img("shahwali3.jpg")],
      description:
        "Tomb of Syed Shah Wali (1878 AD) located at Ghulmet Nagar.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Last Mir of Nagar State, Mir Shaukat Ali Khan (1940 - 2003)",
      images: [img("mirshoukat1.jpg"), img("mirshoukat2.jpg"), img("mirshoukat3.jpg")],
      description:
        "The last Mir of Nagar ‘Shoukat Ali’ who was a signatory to the ‘Letter of Accession’ that was signed between him, Mir of Hunza and Quaid-i-Azam on December 7, 1947. He was warded Hilal-e-Pakistan.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Rakaposhi Mountain “Mother of Mist”",
      images: [img("rakaposhi1.jpg"), img("rakaposhi2.jpg"), img("rakaposhi3.jpg")],
      description:
        "Situated in the Karakoram Range, Rakaposhi is the 27th highest mountain, with an elevation of 7788 meters. Rakaposhi means ‘Mother of Mist’\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Spantik (Golden Peak)",
      images: [img("pantic1.jpg"), img("pantic2.jpg"), img("pantic3.jpg")],
      description:
        "Spantik also known as Golden Peak (7027 meters) located at Hopar Valley. The peak is famous for its exceptionally challenging route, referred as Golden Pillar.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Hopar Glacier",
      images: [img("hopar1.jpg"), img("hopar2.jpg"), img("hopar3.jpg")],
      description:
        "Hoper Glacier (6 km long) also known as Bualta Glacier located at Hopar valley.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Barpo Glacier, Nagar",
      images: [img("barpo1.jpg"), img("barpo2.jpg"), img("barpo3.jpg")],
      description:
        "Barpo Glacier (3.5 km long) is located in Hoper Valley.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Hispar Glacier",
      images: [img("hispar1.jpg"), img("hispar2.jpg"), img("hispar3.jpg")],
      description:
        "Hispar Glacier (49 Kms) together with the Biafo creates one of the world’s longest glacier routes (130 Kms) connecting Nagar with Baltistan. Highest point is Hispar Pass (5151 meters).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Rakaposhi View Point",
      images: [img("viewpoint1.jpg"), img("viewpoint2.jpg"), img("viewpoint3.jpg")],
      description:
        "Rakaposhi view point provides clear view of Rakaposhi Mountain and is famous for adventure sports.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Diran Peak",
      images: [img("diran1.jpg"), img("diran2.jpg"), img("diran3.jpg")],
      description:
        "Diran Peak (7266 meters) is famous for its pyramid shape\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Hoper Valley, Nagar",
      images: [img("hoparvalley1.jpg"), img("hoparvalley2.jpg"), img("hoparvalley3.jpg")],
      description:
        "Hoper Valley is home to Spantik Peak, Hoper and Barpo Glaciers\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Rush Lake, Nagar",
      images: [img("rushlake1.jpg"), img("rushlake2.jpg"), img("rushlake3.jpg")],
      description:
        "Nestled within the mountains, Rush Lake is a high altitude Alpine Lake, located at 4700 meters.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Hapakun Valley",
      images: [img("hapakun1.jpg"), img("hapakun2.jpg"), img("hapakun3.jpg")],
      description:
        "Hapakun Valley serves as a primary base camp for expeditions to Rakaposhi Mountain.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Pissan Cricket Ground, Nagar",
      images: [img("pissan1.jpg"), img("pissan2.jpg"), img("pissan3.jpg")],
      description:
        "Pissan Cricket Ground is world’s highest Natural Cricket Ground (2590 meters).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Gem stones",
      images: [img("gem1.jpg"), img("gem2.jpg"), img("gem3.jpg")],
      description:
        "Nagar is renowned for its valuable gem stones like Aquamarine, Quartz, Topaz and Ruby\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  return (
    <div>
      <Hero
        title="District Nagar — Culture & Tradition"
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
            <p className="text-muted-foreground mt-2">Historic sites and cultural landmarks of Nagar</p>
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
                    <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
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

export default DistrictNagarCulture;


