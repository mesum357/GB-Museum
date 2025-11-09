import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictGhizerCulture = () => {
  const img = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;

  const heroParagraph = `Ghizer is the largest district of Gilgit Baltistan in
terms of area with its border linked with Chitral,
Upper Hunza and Afghanistan. The area
contributes maximum number of
representation in Pakistan
Army from Gilgit Baltistan. District is Known as
Valley of Martyrs (Wadi-e-Shuhada). Traces of
early civilization in Yaseen Valley date back to
2000 BC (Bronze age)`;

  const heritageAttractions = [
    {
      title: "Megalithic Graves",
      images: [img("megalithics1.jpg"), img("megalithics2.jpg"), img("megalithics3.jpg")],
      description:
        "Megalithic Graves dates back to 2000 BC at Yasin Valley.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Yasin Fort",
      images: [img("yasinfort1.jpg"), img("yasinfort2.jpg"), img("yasinfort3.jpg")],
      description:
        "Yasin Fort was built in 1600 AD by ruler of Khushwaqt Dynasty, Raja Shah Khushwaqt\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Gupis Fort, Gupis",
      images: [img("gupisfort1.jpg"), img("gupisfort2.jpg"), img("gupisfort3.jpg")],
      description:
        "Gupis Fort, constructed by British Forces in 1894, served as the stagging camp for troops travelling from Chitral to Gilgit\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Phander Valley",
      images: [img("phander1.jpg"), img("phander2.jpg"), img("phander3.jpg")],
      description:
        "Phandar Valley is renowned for its enchanting landscapes, pristine lakes, and lush green meadows\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Kalti Lake, Gupis",
      images: [img("kaltilake1.jpg"), img("kaltilake2.jpg"), img("kaltilake3.jpg")],
      description:
        "Khalti Lake serves as a vital source of fresh water. It came into existence after a massive landslide blocked river Ghizer in 1980s. Khalti is famous for winter sports.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Ishkomen Valley",
      images: [img("ishkomen1.jpg"), img("ishkomen2.jpg"), img("ishkomen3.jpg")],
      description:
        "Ghizer District comprises of Punial, Ishkomen, Yasin and Gupis Valleys.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Khukush Lake",
      images: [img("khukush1.jpg"), img("khukush2.jpg"), img("khukush3.jpg")],
      description:
        "Ghizer is known as Land of Lakes having major habitat of Trout fish. Bathrait, Khukush, Phander and Kurambar Lakes are some of the famous Lakes.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Mausoleum Havildar Lalik Jan (Shaheed), Darkut",
      images: [img("lalikjan1.jpg"), img("lalikjan2.jpg"), img("lalikjan3.jpg")],
      description:
        "Yasin Valley houses Mausoleum of Havildar Lalik Jan Shaheed (Nishan-e-Haider).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Darkut Pass",
      images: [img("darkut1.jpg"), img("darkut2.jpg"), img("darkut3.jpg")],
      description:
        "Darkut Pass located at an elevation of 4703 meters, connects Chitral and Ghizer.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Shandur Polo Ground",
      images: [img("shandur1.webp"), img("shandur2.webp"), img("shandur3.jpg")],
      description:
        "Ghizer Valley is home to world's heighest polo ground, Shandur.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Trout fish",
      images: [img("trout1.jpg"), img("trout2.jpg"), img("trout3.jpg")],
      description:
        "Trout fish, abundantly found in Ghizar Valley.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  return (
    <div>
      <Hero
        title="District Ghizer — Culture & Tradition"
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
            <p className="text-muted-foreground mt-2">Historic sites and cultural landmarks of Ghizer</p>
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

export default DistrictGhizerCulture;

