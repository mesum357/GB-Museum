import { useState } from "react";
import { motion } from "framer-motion";
import PageHeroSlider from "@/components/shared/PageHeroSlider";
import ImagePreviewModal from "@/components/shared/ImagePreviewModal";

/* ──────────────────── data ──────────────────── */

interface SubItem {
  title: string;
  description: string;
  images: string[];
}

interface HistorySection {
  heading: string;
  description?: string;
  items: SubItem[];
}

const sections: HistorySection[] = [
  {
    heading: "THE LATE STONE AGE",
    items: [
      {
        title: "Chilas Dadam Das",
        description:
          "The earliest signs of human presence in this mountainous region is seen in the ancient petroglyphs carved into rocky outcrops and boulders, suggesting a nomadic existence dating back 9000 BC. These carvings of animal and hunting scenes are found in District Diamer at Chilas, Dadam Das, Thor North and other sites in the region.",
        images: ["/assets/img/Prehistoric/chilasdas.png"],
      },
      {
        title: "Bharal, the Himalayan Blue Sheep. Chilas, Diamer",
        description:
          "In the Late Stone Age, after the retreat of the large glaciers blocking the Indus valley between Nanga Parbat and Shatial, a more humid climate covered the region with dense vegetation. This attracted wild animals into this region, followed by hunters.",
        images: ["/assets/img/Prehistoric/bluesheep.png"],
      },
      {
        title: "A Herd of Blue Sheep, Dadam Das, Diamer",
        description:
          "During the Middle Stone Age, game animals like ibexes, markhor, blue sheep and red deer were abundant. The carvings of animals with a belt-like division over their middle is characteristic of images found in South-Eastern Turkey at Gobekli Tepe, dating back to the 10th millennium BC.",
        images: ["/assets/img/Prehistoric/Bluesheep2.png"],
      },

      {
        title:
          "Rock Carvings Depicting Hunting Scene of Late Stone Age, Thor North, Diamer",
        description:
          'Around 4000 BC, animals were carved in a stylised "bi-triangular style". Such images have been found in District Diamer in at least fifty sites along the banks of the River Indus. Similar images have been found in Central Asia in the painted ceramics of Susa dating to the 4th millennium BC.',
        images: ["/assets/img/Prehistoric/rockcraving.png"],
      },
    ],
  },
  {
    heading: "CHALCOLITHIC ERA OF EARLY FARMERS",
    description:
      "6000 BC – 2000 BC After the Late Stone Age: At this point in the region's history, we see metal work in the shape of vessels and weapons, similar to what was being produced in Central Asia at this time. The Bronze Age saw metallurgy as an important new development in human civilization.",
    items: [
      {
        title: "Map of Rock Carving Sites along River Indus",
        description: "",
        images: ["/assets/img/Prehistoric/indusrock.png"],
      },
      {
        title: "Map of Heritage Sites in Gilgit Baltistan",
        description: "",
        images: ["/assets/img/Prehistoric/rockcraving2.png"],
      },
    ],
  },
  {
    heading: "THE ERA OF METALLURGY — 3100–1100 BC",
    items: [
      {
        title: "The Bronze Age",
        description:
          "At this point in the region's history, we see metal work in the shape of vessels and weapons, similar to what was being produced in Central Asia at this time. The Bronze Age saw metallurgy as an important new development in human civilization.",
        images: ["/assets/img/Prehistoric/bronze1.png"],
      },
      {
        title: "Megalithic Graves and Okunev Masks",
        description:
          "From analysis of a peat (partially carbonized vegetable tissue formed by partial decomposition of various plants in water) sequence in Yasin, Northwest of Gilgit, it is evident that since the 2nd millennium BC, animals were domesticated and bred in the pasture lands. This indicates the existence of a large sedentary population in this mountain valley. During this period, pastoral agricultural economies spread across the Karakorum, bringing new cultures to the region indicated by burials in megalithic circles similar to those in the Southern Altai (Siberia) now known as East Kazakhstan.",
        images: [
          "/assets/img/Prehistoric/bronzegrave.png",
          "/assets/img/Prehistoric/bronzegrave2.png",
        ],
      },
      {
        title: "Mask of Okunev Culture, Ziyarat, Diamer",
        description:
          'The depiction of "masks" similar to Franco-Cantabrian Cave Art and Okunev Culture in Siberia, possibly symbolizes practices to cast a spell on hunted animals, thus ensuring a source of food for early communities. Mask-like images signify a direct link to the Okunev Culture of Siberia, dated 3000–2000 B.C. Even today, hunters in areas of GB wear similar masks.',
        images: [
          "/assets/img/Prehistoric/bronzemask.png",
          "/assets/img/Prehistoric/bronzemask2.png",
          "/assets/img/Prehistoric/bronzemask3.png",
          "/assets/img/Prehistoric/brozemask4.png",
        ],
      },
      {
        title: 'The Giants or "Deo" of the Bronze Age',
        description:
          'More than seventy images of "Giant" figures with extended arms are found in GB. Most are depicted in life-size at spots high above the Indus. Details of the face are not depicted, however, hairs are depicted with snake-like wavy lines. Such depictions can also be related to the Naga-cult (Serpent worship is amongst the oldest and most widespread forms of religious practices during those times) of Kashmir. Giant images are found also along the Upper Indus from Darel Valley up to Ba Das and also in Ladakh.',
        images: [
          "/assets/img/Prehistoric/bronzedeo.png",
          "/assets/img/Prehistoric/bronzedeo2.png",
        ],
      },
      {
        title: "Late Bronze Age — The Northern Nomads",
        description:
          "Towards the end of the 2nd millennium BC, the region saw further interconnections between Central Asia and the Upper Indus valleys. Nomads and Horse-Breeders from the vast Northern steppes apparently entered this area, as attested by carvings of numerous two-wheeled chariots with spoke wheels found in Diamer Region. Similar carvings have also been found in Central Asia, Western Tien Shan, Altai, South Siberia and Mongolia. Rock art sites in Kazakhstan show more than 100 vehicles of different types. They represent the largest group of this motif dating from the Middle Bronze Age to the stage of the early nomads, around the 17th–16th century BC. This pan-steppe phenomenon seems to have anticipated the emergence of the later Scytho-Sakan world which influenced the Upper Indus Region at least since the Late Bronze Age.",
        images: [
          "/assets/img/Prehistoric/bronzenomads.png",
          "/assets/img/Prehistoric/bronzenomads2.png",
        ],
      },
    ],
  },
  {
    heading: "THE SCYTHIANS PENETRATE THE REGION — 700–160 BC",
    items: [
      {
        title: "The Early Iron Age",
        description:
          'Around 160 BC, a group of people referred to as the Pamir Saka traveled from Central Asia and the Siberian Altai to North-West India. Achaemenid (ancient Persian) inscriptions distinguish two Saka tribes living in the Central Asian steppes to the North of Amu-Darja (Oxus) and Syr-Darja two rivers in Afghanistan: the Saka Orthokorybantioi, whose typical head dress was the pointed cap, and the Saka Amyrgioi. A third, easternmost group of Pamir Saka coming from the Ili Basin, now Western Uygur Autonomous Region of Xinjiang, China, and South-Eastern Kazakhstan could have travelled to Bactria and then into North-Western India. Northern nomads carved animals in a distinct manner referred to as the Eurasian Style. Similar images have been found in Minargah Diamer.',
        images: ["/assets/img/Prehistoric/earlyironage.png"],
      },
      {
        title:
          "Representation of Scythian Art in Metal Ornaments and Horse Harnesses",
        description:
          'In the art of the early Asiatic Saka, animals are depicted with their legs ending in ring-shaped paws. These are prototypes from the Pamir and represent heraldic symbols of the different tribes. Carvings in at least four distinctive styles attributed to the different Saka Tribes that are found in sites in Diamer (GB) and Kandia (Khyber Pakhtunkhwa). The Upper Indus Region can be classified as an "additional province of animal art" introduced by an influx of a new ethnic element, the Saka, or Scythians.',
        images: [
          "/assets/img/Prehistoric/ironhourse.png",
          "/assets/img/Prehistoric/ironhourse2.png",
        ],
      },
    ],
  },
  {
    heading: "PERSIAN INFLUENCE — 1100–500 BC",
    items: [
      {
        title: "Late Iron Age",
        description:
          "The Achaemenid Empire of King Cyrus II (559–529 BC) stretched beyond the borders of Persia to the Indus. During the reign of Darius I (522–486 BC), the Eastern Provinces, Gandhara and Hindus (Sindh), were ruled by Achaemenids. Warriors, emissaries and traders arrived in the region and left their carvings on the rocks in Diamer. After the annexation of the Eastern Province, Gadara (now known as Gandhara) by the Achaemenid Empire, the control of the important pass across Babusar, leading to one of the main accesses to Central Asia, was secured for a short phase. The stylistic influence in the rock art is obvious from images of animals and Persian warriors.",
        images: ["/assets/img/Prehistoric/lateironage.png"],
      },
      {
        title: "Gandhara",
        description:
          "Gandhara was at first attached to Bactria as an administrative region and was included as an independent satrapy/province (dahyu) around 508 BC. It denotes an area of today's North Western Pakistan bordered by the rivers Kabul in the West and Indus in the East. From the sources it is not evident how far this province extended to the Indus and into the virtually inaccessible lands called Dardistan which covers the mountain region East of the Kunar River and the region today known as Diamer. Achaemenid Persian influence reached the Upper Indus around the late 6th century BC and can be seen in a group of carvings in Thalpan, Diamer. These images are closely matched in execution to Persian reliefs and seals.",
        images: ["/assets/img/Prehistoric/ghandara.png"],
      },
    ],
  },
  {
    heading:
      "THE GREAT KUSHANA AND THE BEGINNING OF WRITTEN LANGUAGE — 100–500 AD",
    items: [
      {
        title: "Late Iron Age",
        description:
          "The Great Kushana Kingdom in North-West Pakistan commenced in the first decades of the 1st century AD till its collapse after 270 AD. From this point onwards, inscriptions feature significantly in the region. Even though the inscriptions carved on rocks comprised mainly names they provide information about the religious and political situation during the 1st millennium AD. More than 5000 inscriptions with nearly a dozen different scripts have been documented. Kharoshthi, with more than 300 inscriptions, represents the earlier Buddhist Period. They mark the entry of a new religion into the region. Around 80% of the later inscriptions are written in Brahmi, the second Indian script of the 3rd–8th century AD, with its later versions Sharada and Proto-Sharada, used in the late Buddhist period. More than 700 Sogdian, Bactrian, Parthian, and Middle Persian inscriptions testify the presence of Central Asian Traders mainly originating from Samarkand. Additionally Chinese and Tibetan inscriptions, the latter representing the Tibetan dominance especially in Baltistan during the 8th century AD, and one even in Hebrew found at Gichi, highlight the region's ethnic and religious diversity. Fire-altars symbolize the presence of the Zoroastrian Religion, introduced during the Kushana Period.",
        images: ["/assets/img/Prehistoric/ghandara2.png"],
      },
    ],
  },
];

/* ──────────────── animation helpers ──────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ──────────────── component ──────────────── */

const Prehistoric = () => {
  const [previewImage, setPreviewImage] = useState<{ src: string; caption?: string } | null>(null);
  // Build hero slides from each section's first available image
  const heroSlides = sections
    .map((s) => {
      const firstImg = s.items.find((item) => item.images.length > 0)?.images[0];
      return firstImg ? { image: firstImg, label: s.heading } : null;
    })
    .filter(Boolean) as { image: string; label: string }[];

  return (
    <div>
      <PageHeroSlider
        title="Prehistoric Era"
        subtitle="Ancient Roots: The Dawn of Civilization in Gilgit-Baltistan"
        slides={heroSlides}
      />

      {sections.map((section, sIdx) => (
        <section
          key={sIdx}
          className={`py-20 px-4 ${sIdx % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
        >
          <div className="container mx-auto max-w-6xl">
            {/* ── Section heading ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2
                className="text-3xl md:text-4xl font-bold tracking-wide text-secondary"
                style={{ letterSpacing: "0.08em" }}
              >
                {section.heading}
              </h2>

              {section.description && (
                <p className="mt-6 max-w-3xl mx-auto text-foreground/80 leading-relaxed text-lg">
                  {section.description}
                </p>
              )}

              <div className="mt-6 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
            </motion.div>

            {/* ── Sub-items ── */}
            <div className="space-y-20">
              {section.items.map((item, iIdx) => {
                const isReversed = iIdx % 2 !== 0;
                const hasText = item.description.length > 0;

                return (
                  <motion.div
                    key={iIdx}
                    custom={iIdx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                    className={`flex flex-col ${hasText
                      ? isReversed
                        ? "lg:flex-row-reverse"
                        : "lg:flex-row"
                      : ""
                      } gap-10 items-center`}
                  >
                    {/* Text block */}
                    {hasText && (
                      <div className="lg:w-1/2 space-y-4">
                        <h3 className="text-xl md:text-2xl font-semibold text-primary">
                          {item.title}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    )}

                    {/* Images block */}
                    <div
                      className={
                        hasText
                          ? "lg:w-1/2"
                          : "w-full flex flex-col items-center"
                      }
                    >
                      {!hasText && (
                        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 text-center">
                          {item.title}
                        </h3>
                      )}

                      <div
                        className={`grid gap-4 ${item.images.length === 1
                          ? "grid-cols-1"
                          : item.images.length === 2
                            ? "grid-cols-1 sm:grid-cols-2"
                            : item.images.length === 3
                              ? "grid-cols-1 sm:grid-cols-3"
                              : "grid-cols-2"
                          }`}
                      >
                        {item.images.map((img, imgIdx) => (
                          <motion.div
                            key={imgIdx}
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden rounded-2xl shadow-lg border border-border/40 cursor-pointer flex flex-col h-full"
                            onClick={() => setPreviewImage({ src: img, caption: item.title })}
                          >
                            <img
                              src={img}
                              alt={item.title}
                              className="w-full h-full flex-1 object-cover"
                              loading="lazy"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageSrc={previewImage?.src || null}
        caption={previewImage?.caption}
      />
    </div>
  );
};

export default Prehistoric;
