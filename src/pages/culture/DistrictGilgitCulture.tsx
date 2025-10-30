import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictGilgitCulture = () => {
  const cultureImg = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;
  const cultureItems = [
    {
      title: "Shaap Festival",
      description:
        "Shaap is traditional festival celebrated by Shina speaking people. In this festival group of youth wearing masks, visit houses for greetings and in return accept gifts from the residents.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
      images: [
        cultureImg("shaap1.webp"),
        cultureImg("shaap2.webp"),
        cultureImg("shaap3.jpg"),
      ],
    },
    {
      title: "Dawdo, Goli",
      description:
        "Traditional food of Gilgit includes Goli and Dawdo (soup made from Noodles).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
      images: [
        cultureImg("dowdo1.jpg"),
        cultureImg("dowdo2.jpg"),
        cultureImg("dowdo3.jpg"),
      ],
    },
    {
      title: "Gilgiti Attire and Traditional Dance",
      description:
        "Traditional woolen cap and long coat, known as Shanti khoi and Chogha are mostly worn in the region\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
      images: [
        cultureImg("atire1.webp"),
        cultureImg("atire2.jpg"),
        cultureImg("atire3.webp"),
      ],
    },
  ];

  return (
    <div>
      <Hero
        title="District Gilgit — Culture & Tradition"
        subtitle="Discover the living heritage of Gilgit"
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
            <h2 className="text-primary">Culture & Tradition</h2>
            <p className="text-muted-foreground mt-2">Festivals, foods, attire, and more</p>
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
                  <div className="aspect-[16/10] overflow-hidden bg-muted">
                    <ImageSlider images={item.images} alt={item.title} className="w-full h-full" />
                  </div>
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

      {/* Flora and Fauna Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Flora and Fauna</h2>
            <p className="text-muted-foreground mt-2">Natural bounty and wildlife of Gilgit</p>
          </motion.div>

          {(() => {
            const floraImg = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;
            const floraFaunaItems = [
              {
                title: "Apricots, Cherries and White Mulberries",
                images: [
                  floraImg("apricots1.jpg"),
                  floraImg("apricots2.jpeg"),
                  floraImg("apricots3.jpeg"),
                ],
                description:
                  "Gilgit is famous for Apricots, Cherries and White Mulberries.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
              },
              {
                title: "Markhor",
                images: [
                  floraImg("markhor1.jpeg"),
                  floraImg("markhor2.jpeg"),
                  floraImg("markhor3.jpeg"),
                ],
                description:
                  "Markhor sighting is possible during winters at Jutial and Kargah Nullah.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
              },
            ];

            return (
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
                      <div className="aspect-[16/10] overflow-hidden bg-muted">
                        <ImageSlider images={item.images} alt={item.title} className="w-full h-full" />
                      </div>
                      <div className="p-8 space-y-4">
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
};

export default DistrictGilgitCulture;


