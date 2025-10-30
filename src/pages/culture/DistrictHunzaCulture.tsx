import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictHunzaCulture = () => {
  const img = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;

  const heroParagraph = `Hunza District is encircled by the majestic peaks of the Karakoram Range.The valley has been called the gateway to China due to its stratigic location on the ancient Silk Route (Present KKH). Historically, it remained a princely state, ruled by Mirs of Hunza till 1974, who wielded a considerable influence over the region and played pivotal role in its governance. First known signs of civilization in Hunza Valley date back to 8th century AD.`;

  const heritageAttractions = [
    {
      title: "Haldeikish Sacred Rocks, Ganish",
      images: [img("ganish1.jpg"), img("ganish2.jpg"), img("ganish3.jpg")],
      description:
        "Haldeikish Sacred Rocks of Hunza found along Hunza River (8th century AD).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Baltit Fort, Hunza",
      images: [img("baltit1.jpg"), img("baltit2.jpg"), img("baltit3.jpg")],
      description:
        "Baltit Fort was the home to Mirs of Hunza. Earlier section of fort was built in 13th century AD and later it was built in 16th Century AD.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Altit Fort",
      images: [img("altit1.jpg"), img("altit2.jpg"), img("altit3.jpg")],
      description:
        "Altit Fort was home to the Mir’s of Hunza. The fort was constructed in 1540 AD and later restored in 2007.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Baba Ghundi Ziarat (BG Ziarat),Chapursan",
      images: [img("ghundi1.jpg"), img("ghundi2.jpg"), img("ghundi3.jpg")],
      description:
        "Baba Ghundi Ziarat, a shrine to a Sufi Saint Muhammad Baqar who migrated to Chapursan Valley in 16th century AD from Afghanistan.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Kalamdarchi Fort famously known as KD Fort",
      images: [img("kalamdarchi1.jpg"), img("kalamdarchi2.jpg"), img("kalamdarchi3.jpg")],
      description:
        "KD Fort was built during the British Regime in 1932 - 33 to check the progress of intruders from China.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Mir Jamal Khan (1945-1974 A.D)",
      images: [img("jamal1.jpg"), img("jamal2.jpg"), img("jamal3.jpg")],
      description:
        "Mir Jamal Khan declared the accession of Hunza State with Pakistan in Oct 1947. He was awarded with Hilal-e-Pakistan and Hilal-e-Jurat by the Government of Pakistan.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Attabad Lake, Hunza",
      images: [img("attabad1.jpg"), img("attabad2.webp"), img("attabad3.jpg")],
      description:
        "Attabad Lake, famously known as the \"Bride of Hunza''. It was created as a result of landslide that blocked the Hunza River on January 4th, 2010.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Lady Finger Peak, Hunza",
      images: [img("ladyfinger1.jpg"), img("ladyfinger2.jpg"), img("ladyfinger3.jpg")],
      description:
        "Lady Finger Peak (5500 meters) is a prominent spike like peak, famous for its challenging rock climbing face.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Old Silk Route - Hunza",
      images: [img("oldsilkroute1.jpg"), img("oldsilkroute2.jpg"), img("oldsilkroute3.jpg")],
      description:
        "The Silk route was a collection of routes. Route along Hunza connects this region with Central Asia\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Sost Dry Port, Khunjerab",
      images: [img("sost1.jpg"), img("sost2.jpg"), img("sost3.jpg")],
      description:
        "Sost Dry port is a major transit point for trade between Pakistan and China.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Khunjerab Pass - Gateway to China",
      images: [],
      description:
        "Khunjerab Pass, serves as a strategic mountain pass, located at an altitude of 4706 meters, bridging the border between Pakistan and China\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Hussaini Hanging Bridge, Hunza",
      images: [img("hussaini1.jpg"), img("hussaini2.jpg"), img("hussaini3.png")],
      description:
        "Hussaini Bridge known as the most dangerous bridge of Gilgit Baltistan. It connects Hussaini Village to Zar Abad Village\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Passu Cones, Hunza",
      images: [img("passu1.jpg"), img("passu2.jpg"), img("passu3.jpg")],
      description:
        "Passu Cones or Passu Cathedrals (6106 meters) locally know as Tupopdan meaning Sun Swallowing Mountains\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Batura Glacier, Hunza",
      images: [img("batura1.jpg"), img("batura2.jpg"), img("batura3.webp")],
      description:
        "Batura Glacier (55 km) is the 7th largest Glacier outside the Polar Region\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Ultar Glacier, Hunza",
      images: [img("ultar1.jpg"), img("ultar2.png"), img("ultar3.jpg")],
      description:
        "Ultar Glacier (6 km) is located at Karimabad, Hunza. It is also famous for Ultar meadows trek.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  return (
    <div>
      <Hero
        title="District Hunza — Culture & Tradition"
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
            <p className="text-muted-foreground mt-2">Historic sites and cultural landmarks of Hunza</p>
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

      {/* Culture & Traditions */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Culture & Traditions</h2>
            <p className="text-muted-foreground mt-2">Festivals and foods of Hunza</p>
          </motion.div>

          {(() => {
            const items = [
              {
                title: "Ginani Festival, Hunza",
                images: [img("ganani1.jpg"), img("ganani2.jpg"), img("ganani3.jpg")],
                description:
                  "Hunza Valley hosts annual festivals, like Ginani on 11 July and Nauroz on 21 March\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
              },
              {
                title: "Traditional method of making dry Apricots",
                images: [img("apricotsoup1.webp"), img("apricotsoup2.jpg"), img("apricotsoup3.webp")],
                description:
                  "Hunza is famous for dry Apricots, Apples and Cherries.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
              },
              {
                title: "Ice Hockey during winter sports Festival, Hunza",
                images: [img("icehockey1.jpg"), img("icehockey2.jpg"), img("icehockey3.jpg")],
                description:
                  "Hunza is pioneer to Winter sports festival like Ice hockey.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
              },
            ];

            return (
              <div className="space-y-8">
                {items.map((item, idx) => (
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
            );
          })()}
        </div>
      </section>
    </div>
  );
};

export default DistrictHunzaCulture;


