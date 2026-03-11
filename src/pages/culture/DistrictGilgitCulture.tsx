import { motion } from "framer-motion";
import PageHeroSlider from "@/components/shared/PageHeroSlider";
import { Card } from "@/components/ui/card";
import ImageSlider from "@/components/shared/ImageSlider";

const DistrictGilgitCulture = () => {
  const cultureImg = (name: string) => new URL(`../../assets/img/culture/${name}`, import.meta.url).href;
  const districtImg = (name: string) => new URL(`../../assets/img/district/${name}`, import.meta.url).href;

  const heritageAttractions = [
    {
      title: "Kargah Buddha",
      images: [districtImg("bhudda1.jpg"), districtImg("bhudda2.jpg"), districtImg("bhudda3.jpg")],
      description:
        "Kargah Buddha is a magnificent, approximately 50-foot-high Buddha statue carved into a rock face at Kargah Nalla, dating back to the 7th century AD. It stands as a testament to the region's rich Buddhist heritage.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Danyore Suspension Bridge",
      images: [districtImg("danyoreBridge1.jpg"), districtImg("danyoreBridge2.jpg"), districtImg("danyoreBridge3.jpg")],
      description:
        "The historic Danyore Suspension Bridge connects Gilgit city with the valley of Danyore. It is one of the oldest and most iconic bridges in the region, offering stunning views of the Gilgit River.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Victory Monument (Yadgar-e-Shuhada)",
      images: [districtImg("yadgar1.webp"), districtImg("yadgar2.webp")],
      description:
        "The Victory Monument, also known as Yadgar-e-Shuhada, commemorates the heroes of the Liberation War of 1947. It is a symbol of bravery and sacrifice for the people of Gilgit-Baltistan.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "Ancient Buddhist Stupa Site",
      images: [districtImg("stupa1.jpg"), districtImg("stupa2.webp"), districtImg("stupa3.jpg")],
      description:
        "The region is dotted with remnants of ancient Buddhist presence, including stupa ruins and rock inscriptions that offer insights into the Silk Route's cultural significance.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  const cultureItems = [
    {
      title: "Shaap Festival",
      description:
        "Shaap is a traditional festival celebrated by Shina-speaking people. In this festival, groups of youth wearing masks visit houses for greetings and, in return, accept gifts from the residents.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
      images: [
        cultureImg("shaap1.webp"),
        cultureImg("shaap2.webp"),
        cultureImg("shaap3.jpg"),
      ],
    },
    {
      title: "Gilgiti Attire and Traditional Dance",
      description:
        "The traditional Gilgiti attire includes the woolen cap (Shanti Khoi) and long coat (Chogha). The region is also famous for its vibrant traditional dances performed during festivals and social gatherings.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
      images: [
        cultureImg("atire1.webp"),
        cultureImg("atire2.jpg"),
        cultureImg("atire3.webp"),
      ],
    },
    {
      title: "Traditional Gastronomy",
      description:
        "The cuisine of Gilgit is rich and varied, including traditional dishes like Goli, Dawdo (noodle soup), and various meat-based preparations that reflect the high-altitude lifestyle.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
      images: [
        cultureImg("dowdo1.jpg"),
        cultureImg("dowdo2.jpg"),
        cultureImg("dowdo3.jpg"),
      ],
    },
  ];

  const floraFaunaItems = [
    {
      title: "Orchards of Gilgit",
      images: [
        cultureImg("apricots1.jpg"),
        cultureImg("apricots2.jpeg"),
        cultureImg("apricots3.jpeg"),
      ],
      description:
        "Gilgit is renowned for its fertile valleys and high-quality fruits, particularly Apricots, Cherries, and White Mulberries, which are staples of the local economy.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
    {
      title: "The Majestic Markhor",
      images: [
        cultureImg("markhor1.jpeg"),
        cultureImg("markhor2.jpeg"),
        cultureImg("markhor3.jpeg"),
      ],
      description:
        "The Markhor, Pakistan's national animal, can be spotted in the rugged mountains surrounding Gilgit, especially during the winter months in Jutial and Kargah Nullah.\n\nThis site represents the rich cultural and historical heritage of Gilgit-Baltistan.",
    },
  ];

  const heroSlides = [
    { image: heritageAttractions[0].images[0], label: heritageAttractions[0].title },
    { image: heritageAttractions[1].images[0], label: heritageAttractions[1].title },
    { image: cultureItems[0].images[0], label: cultureItems[0].title },
    { image: cultureItems[1].images[0], label: cultureItems[1].title },
    { image: floraFaunaItems[0].images[0], label: floraFaunaItems[0].title },
  ];

  return (
    <div>
      <PageHeroSlider
        title="District Gilgit — Culture & Tradition"
        subtitle="Explore the historic capital of Gilgit-Baltistan, a hub of ancient Buddhist heritage, vibrant Shina traditions, and the majestic Karakoram landscapes."
        slides={heroSlides}
      />

      {/* Heritage and Attractions Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Heritage and Attractions</h2>
            <p className="text-muted-foreground mt-2">Ancient sites and historic landmarks of Gilgit</p>
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
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Tradition Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Culture & Tradition</h2>
            <p className="text-muted-foreground mt-2">Festivals, foods, and traditional attire</p>
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
                    <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{item.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flora and Fauna Section */}
      <section className="py-16 px-4 bg-background">
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

export default DistrictGilgitCulture;



