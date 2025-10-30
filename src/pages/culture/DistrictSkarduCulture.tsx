import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictSkarduCulture = () => {
  const img = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;

  const heritageAttractions = [
    {
      title: "Manthal Buddha Rock, Manthal Village",
      images: [img("manthal1.jpg"), img("manthal2.jpg"), img("manthal3.jpg")],
      description:
        "Manthal Buddha Rock is a large granite rock with a sculpture of Budhas, which date back to the 10th century AD\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Last Maqpon King - Raja Ahmed Shah (1800 - 1840 AD)",
      images: [img("maqpon1.jpg"), img("maqpon2.png"), img("maqpon3.jpg")],
      description:
        "Skardu came under control of the local Maqpon Dynasty during century AD. The Maqpon Dynasty 12th ruled Baltistan for around 650 years.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Kharpocho Fort, Skardu City",
      images: [img("kharpocho1.webp"), img("kharpocho2.jpg"), img("kharpocho3.webp")],
      description:
        "Kharpocho Fort was built by King Ali Sher Anchan in 16th century AD. Kharpocho Fort was raised to the ground by Dogra Forces in 1840.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Mindoq Khar Palace, Skardu City",
      images: [img("mindoq1.webp"), img("mindoq2.jpg"), img("mindoq3.jpg")],
      description:
        "Mindoq Khar Palace (meaning Flower Palace) was built by Queen Gul Khatoon during 1610 AD near Khorpocho Fort. The palace was destroyed during the invasion of Skardu in 1840 by Zorawar Singh\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Goat Skin Raft",
      images: [img("goat1.jpg"), img("goat2.jpg"), img("goat3.jpg")],
      description:
        "Traditional Goat Skin Raft used for crossing Indus river in Skardu , 1911\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Traditional Stone Pots",
      images: [img("stone1.jpg"), img("stone2.jpg"), img("stone3.jpg")],
      description:
        "",
    },
    {
      title: "Chunda Valley",
      images: [img("chunda1.jpg"), img("chunda2.webp"), img("chunda3.jpg")],
      description:
        "Chunda Valley is also know as the mini Switzerland of Skardu, famous for its spring blossom.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Soq Valley, Upper Kachura",
      images: [img("soq1.jpg"), img("soq2.webp"), img("soq3.jpg")],
      description:
        "Soq Valley is the most scenic valley in Skardu also know as the hidden paradise.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Deosai Plateau (Land of Giants)",
      images: [img("deosai1.jpg"), img("deosai2.jpg"), img("deosai3.jpg")],
      description:
        "Deosai National Park (4100 meters) is the second highest Alpine Plateau. It also serves as a home to the edangered Himalayan Brown Bear.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Katpana Desert, Gamba",
      images: [img("katpana1.jpg"), img("katpana2.jpg"), img("katpana3.jpg")],
      description:
        "Katpana Desert located at 2226 meters, is one of the highest desert in the world. During winters it transforms into a frosty landscape.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Nansoq Village (Organic Village), Skardu City",
      images: [img("nansoq1.webp"), img("nansoq2.jpg"), img("nansoq3.png")],
      description:
        "Nansoq is the organic Village located behind the Kharpocho Fort. This village has also been visited by British Royal Family.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Basho Valley",
      images: [img("basho1.webp"), img("basho2.jpeg"), img("basho3.png")],
      description:
        "Basho Valley is famous for lush green meadows and Basho Glacier.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Upper Kachura Lake",
      images: [img("kachura1.jpg"), img("kachura2.jpg"), img("kachura3.jpg")],
      description:
        "Skardu is famous for beautiful lakes which includes Satpara, Upper Kachura and Lower Kachura Lakes.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Muhammad Ali Sadpara",
      images: [img("sadpara1.jpg"), img("sadpara2.png"), img("sadpara3.jpg")],
      description:
        "Muhammad Ali Sadpara was a high altitude mountaineer. He completed the first winter ascent of Nanga Parbat in 2016. Sadpara successfully climbed a total of eight eight-thousanders. He died while ascending K2 Mountain on 18 Feb 2021.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  const heroParagraph = `District Skardu is located at the confluence of\nIndus and Shiger rivers. Skardu is primarily\ninhabited by Balti people, with influences from\nTibetan Buddhist and Islamic traditions.\nMaqpon Ruler, Bo kha established the city of\nSkardu as his capital in 1500 AD. First known\nsigns of civilization in Skardu region date back\nto 4th century AD (Tibetan Empire).`;

  return (
    <div>
      <Hero
        title="District Skardu — Culture & Tradition"
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
            <p className="text-muted-foreground mt-2">Historic sites and cultural landmarks of Skardu</p>
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

      {/* Culture & Tradition */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Culture & Tradition</h2>
            <p className="text-muted-foreground mt-2">Festivals and foods of Skardu</p>
          </motion.div>

          {(() => {
            const items = [
              {
                title: "Mayfang Festival",
                images: [img("mayfang1.webp"), img("mayfang2.webp"), img("mayfang3.jpg")],
                description:
                  "Mayfang is an ancient festival, which is celebrated by local people to commemorate the longest night of the year (21 Dec)\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
              },
              {
                title: "Prapu, Marzan",
                images: [
                  // Also include alternate spellings if present
                  img("prapo1.jpg"),
                  img("prapo2.jpg"),
                  img("prapo3.jpg"),
                  // prapo2 and prapo3 will load when added
                ],
                description:
                  "Traditional food includes Prapu (Noodle dish thickened with Almond flour) and Marzan (Barley flour).\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
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

      {/* Flora and Fauna */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Flora and Fauna</h2>
            <p className="text-muted-foreground mt-2">Natural bounty and wildlife of Skardu</p>
          </motion.div>

          {(() => {
            const flora = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;
            const items = [
              {
                title: "Apples",
                images: [flora("apples1.webp"), flora("apples2.jpg")],
                description:
                  "Skardu is famous for variety of fruits including Apples, Apricots and Pears\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
              },
              {
                title: "Himalayan Brown Bear",
                images: [flora("himalyanbear1.jpg"), flora("himalyanbear2.jpg")],
                description:
                  "Deosai National Park is home to the rare Himaliyan Brown Bear\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
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

export default DistrictSkarduCulture;


