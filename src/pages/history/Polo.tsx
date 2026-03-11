import { motion } from "framer-motion";
import PageHeroSlider from "@/components/shared/PageHeroSlider";

const sections = [
  {
    title: "Ancient Origins",
    texts: [
      "Polo is one of the oldest team sport which originated from Persia and subsequently spread eastwards to present day Gilgit-Baltistan. It is a Balti word, meaning “Ball”.",
      "The progenitor of Polo and its variants existed from 600 BC to 1st century AD. First recorded Polo tournament was played between Turkomans and Persians in 600 BC.",
      "Initially, Polo was a training game for cavalry units, often played by royal guards and military elites. The game spread from Persia to Indian Subcontinent, China and Japan. Out of 100 member countries in International Polo Federation, presently it is being played in 16 countries.",
    ],
    images: ["/assets/img/polo/polo2.png", "/assets/img/polo/polo3.png"]
  },
  {
    title: "The Free Style 'Balti Loshor'",
    texts: [
      "Polo in Gilgit-Baltistan and Chitral has a unique style that distinguishes it from international form of the game. The free style Polo, known as \"Balti Loshor\" is played with fewer rules and regulations as compared to international Polo. It is characterized by its fast-pace and aggressive nature.",
      "In Gilgit-Baltistan, it is believed to have an ancient origins with local traditions dating back several centuries. It is considered the original home of game in its most rugged and untamed form.",
      "The rugged terrain and abundance of the horses in the region made it an ideal place for the sport to flourish."
    ],
    images: ["/assets/img/polo/polo4.png", "/assets/img/polo/polo5.png"]
  },
  {
    title: "Culture and Diplomacy",
    texts: [
      "Historically, the game was played and flourished by the ruling elites of various princely states of the regions including Hunza, Nagar, Gilgit and Chitral. It served as a recreational activity, demonstration of horsemen ship and marshal prowess.",
      "Polo matches in Gilgit-Baltistan were not just a sport but also a way to resolve the disputes and conflicts between different communities. The matches were often organized as friendly competitions serving as a platform to socialize. Polo has become an important cultural symbol of Gilgit-Baltistan and continues to be cherished by the local community."
    ],
    images: ["/assets/img/polo/polo6.png", "/assets/img/polo/polo7.png"]
  },
  {
    title: "Mughal and British Eras",
    texts: [
      "Polo was introduced in Indian Subcontinent by muslim conquerors and flourished rapidly under the Mughal Empire. The game was played by the emperors, often with pomp and ceremony.",
      "In 19th century, British also played a significant role in development of Polo and introduced it as a means of recreation and training of soldiers. They established first Polo Club in Silchar, Asam in 1859."
    ],
    images: ["/assets/img/polo/polo8.png"]
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Polo = () => {
  return (
    <div>
      <PageHeroSlider
        title="HISTORY OF POLO"
        subtitle="“The Game of Kings and King of Games”"
        slides={[
          { image: "/assets/img/polo/polo1.png", label: "History of Polo" }
        ]}
      />

      <div className="bg-background py-16 px-4">
        <div className="container mx-auto max-w-6xl space-y-24">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className={`flex flex-col gap-12 items-center ${
                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Text */}
              <div className="lg:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-primary mb-4 border-b-2 border-primary/20 pb-2 inline-block">
                  {section.title}
                </h2>
                <div className="space-y-4">
                  {section.texts.map((text, tIdx) => (
                    <p key={tIdx} className="text-foreground/80 leading-relaxed text-lg">
                      {text}
                    </p>
                  ))}
                </div>
              </div>

              {/* Images */}
              <div className="lg:w-1/2 w-full">
                <div className={`grid gap-4 ${section.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {section.images.map((img, imgIdx) => (
                    <motion.div
                      key={imgIdx}
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden rounded-2xl shadow-lg border border-border/40"
                    >
                      <img
                        src={img}
                        alt={"Polo " + section.title}
                        className="w-full h-full object-cover min-h-[250px]"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Polo;
