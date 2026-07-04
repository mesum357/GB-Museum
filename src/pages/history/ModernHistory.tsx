import { useState } from "react";
import { motion } from "framer-motion";
import PageHeroSlider from "@/components/shared/PageHeroSlider";
import ImagePreviewModal from "@/components/shared/ImagePreviewModal";

/* ──────────────────── types ──────────────────── */

interface SubItem {
  title: string;
  description: string;
  images: { src: string; caption?: string }[];
}

interface HistorySection {
  heading: string;
  description?: string;
  items: SubItem[];
}

/* ──────────────────── data ──────────────────── */

const sections: HistorySection[] = [
  /* ═══════════ 1 — PATOLA SHAHI ═══════════ */
  {
    heading: "THE REIGN OF THE PATOLA SHAHIS — GILGIT, 600–800 AD",
    description:
      "During the flowering of Buddhism from the fourth to the eighth century AD, three main principalities came into existence in the Northern Areas, although it is not possible to outline the exact borders of these territories. It was the Korean pilgrim Huichao who first defined the political situation around 726 AD by distinguishing between the two domains called Great and Little Palur (Bolor). The powerful Great Palur, covering the North-Eastern territory including Baltistan and Astore — and possibly extending as far as the confluence of the Gilgit and Indus rivers — was ruled by the local Palola, or Patola Shahi, Dynasty. From the epigraphic evidence of rock inscriptions and dedications on the Kashmir bronzes, a sequence of nine kings and queens has been established. \"Little Palur\" was located in the region of Gilgit and the neighbouring valleys of Ghizar and Ishkoman.",
    items: [],
  },

  /* ═══════════ 2 — GILGIT MANUSCRIPTS ═══════════ */
  {
    heading: "THE GILGIT MANUSCRIPTS",
    description:
      "Because of its strategic position as the gateway to India, the territory of Gilgit-Baltistan played a key role during the Chinese–Tibetan struggle for hegemony in the 7th and 8th centuries AD. In the southern valleys of the Upper Indus, another local kingdom — ruled by the King of the Daradas, or the Dards — had been established, with its exposed outpost at Chilas and its bridgehead at Thalpan protecting the important Indus crossing and the Babusar Pass route to the south. The Darada Kingdom, covering a wider area than the lower part of the valley, must have been ruled from a political centre possibly located west of Kashmir, such as the Hazara District or the Kaghan Valley, or later in the Neelum Valley, perhaps near Gurais. Buddhism was the predominant religion at that time, while the earlier Bon religion prevailed in Baltistan, with forms of Buddhism becoming more prominent in the early Middle Ages.",
    items: [],
  },

  /* ═══════════ 3 — CLIMAX OF BUDDHISM ═══════════ */
  {
    heading: "CLIMAX OF BUDDHISM IN GILGIT-BALTISTAN, 500–800 AD",
    description:
      "All the richness, elegance and expression of Buddhist art are signified by the carvings, the most elaborate of which are found around the Chilas–Thalpan area. These images show stylistic influences from Kashmir, East Turkestan and India. In Chilas–Thalpan, two donors are mainly recorded in the inscriptions: Kuberavahana and Sinhota. This makes it possible to date this group of carvings to at least one or two generations within the 6th century AD.",
    items: [
      {
        title: "The Two Buddhas and Bodhisattvas — Chilas (Jayachand), Diamer, 500–700 AD",
        description:
          "According to the inscription, two Buddhas — Sakyamuni and Vipasyin — are seen seated on lotus thrones, while two Bodhisattvas — Avalokitesvara and Maitreya — are seen standing. A stupa, the \"Purana Ghata\" or Vase of Plenty, is dedicated by Sinhota, an individual who dedicated these carvings to the Buddha.",
        images: [],
      },
      {
        title: "Buddha's First Sermon — Thalpan Bridge, Chilas, 7th century AD",
        description:
          "The carving depicts the Buddha's first sermon in the deer park of Sarnath near Varanasi (Benares, India). Surrounded by his first disciples, two caprines and the dharmachakra, he enunciates the Four Noble Truths: Dukkha (suffering), Samudaya (the origin of suffering), Nirodha (the cessation of suffering) and Magga (the path to the cessation of suffering).",
        images: [],
      },
      {
        title: "The Stupa of Amrtendralamkara — Shing Nala, Thor North and Hodur-West, Diamer, 7th–8th century AD",
        description:
          "A stupa is flanked by two Buddhas seated on a single pedestal. The inscription, \"This is the pious gift of Amrtendralamkarasya,\" indicates a donor who left his mark at five other sites between the 7th and 8th centuries AD.",
        images: [],
      },
      {
        title: "Stupa Dedicated to Kubera Vahana — Thalpan, Diamer, 500–800 AD",
        description:
          "This carving shows a stupa dedicated to Kubera Vahana, with three Buddha figures and three figures of the lokapalas (Guardians of the World) beneath the chattras (umbrellas).",
        images: [],
      },
    ],
  },

  /* ═══════════ 4 — SOGDIAN & PARTHIAN MERCHANTS ═══════════ */
  {
    heading: "SOGDIAN AND PARTHIAN MERCHANTS, 4TH TO 8TH CENTURY AD",
    description:
      "As early as the 3rd century AD, merchants from Central Asia appeared along the Upper Indus for the first time. From their homeland around Samarkand, they established trading colonies along the Silk Road as far as China. Among these were the Sogdians, who possibly traded horses with China during the Trans-Asiatic trade, as deduced from the carvings of Sogdian horses and heraldic symbols found in Diamer.",
    items: [],
  },

  /* ═══════════ 5 — DECLINE OF PATOLA SHAHI / CHINESE SUPREMACY ═══════════ */
  {
    heading: "THE DECLINE OF THE PATOLA SHAHI KINGDOM AND THE RISE OF CHINESE SUPREMACY, 618–907 AD",
    description:
      "Narrative records in the Tibetan annals refer to clashes in Bolor between the Chinese and the Tibetans. Between 720 and 745 AD, Tibetan armies invaded Bolor, thereby terminating the supremacy of the Patola Shahi Dynasty in Baltistan. From there, they undertook a thrust westwards to Brusha, the Kingdom of Little Palur around Gilgit. In 747 AD, the Chinese assembled an army under the command of the Korean general Kao Hsien-chi in Wakhan. After traversing the Karakoram — apparently via the Darkot and Baroghil Passes — the Chinese army invaded the Yasin and Gilgit valleys and entered the Gilgit Basin. The Chinese force collided with the Tibetans at a river crossing that the Tibetans had destroyed to prevent Kao Hsien-chi's advance into the territory of former Great Bolor. The site of this clash can be located around the strategically important Alam Bridge, at the junction of the Gilgit River with the Indus, where Tibetan inscriptions and images of a terraced stupa testify to a Tibetan presence. After the defeat of the Tibetans and the capture of the pro-Tibetan king, the Kingdom of Little Palur seems to have survived by remaining loyal to the Chinese Tang Dynasty (618–907). It remained a Chinese military district until the middle of the eighth century AD, when the empire's predominance in the \"Western countries\" declined and Tibet attained big-power status.",
    items: [],
  },

  /* ═══════════ 6 — NESTORIAN CROSSES ═══════════ */
  {
    heading: "EARLY CHRISTIANITY IN CHINA — NESTORIAN CROSSES, 781 AD",
    description:
      "The transmission of Christianity was primarily known as Nestorianism along the Silk Road. Traders from the Tang Dynasty engraved Nestorian crosses — representing early Christianity in China — at various locations in Gilgit, Chilas and Hunza while traversing the Silk Route from China to Central Asia.",
    items: [
      {
        title: "Chinese Inscription — Thak, Diamer",
        description:
          "A Chinese inscription is carved around a two-storied building, possibly a pagoda, the curving roofs of which are typical of Chinese architecture. The two characters on the right are arranged vertically, the first being \"Zhang\" and the second \"Zi\". The third, on the left, is an ancient variant of \"Giu\". The last two characters make up the given name; hence, the full name given in this carving is Zhang ZiGiu.",
        images: [],
      },
    ],
  },

  /* ═══════════ 7 — JATAKA TALES ═══════════ */
  {
    heading: "JATAKA TALES — STORIES FROM THE BUDDHA'S LIFE, 800 AD",
    description:
      "Jatakas are an important part of Buddhist art and literature. Scenes carved on rock faces depict significant stages in the life of the Buddha with extraordinary artistic excellence.",
    items: [
      {
        title: "The Rishi and the Five Animals",
        description:
          "A Rishi addresses a group of five animals. In Sanskrit, \"Rishi\" means an enlightened one or sage — one who reaches beyond this mundane world by means of spiritual knowledge. Rishis gave up material wealth and renounced the world in order to gain enlightenment. A Rishi in Buddhism is similar to a monk or a saint.",
        images: [],
      },
      {
        title: "The Sibi Jataka — Thalpan, Diamer",
        description:
          "The Sibi Jataka is one of the tales detailing episodes from the various incarnations of the Buddha. Each Jataka tale illustrates the Buddhist ideals of Dharma and sacrifice in various forms. Here, the Buddha cuts a piece of his own flesh to offer in exchange to a hunter who is taking a pigeon home to feed his family.",
        images: [],
      },
    ],
  },

  /* ═══════════ 8 — BATTLE-AXE PEOPLE ═══════════ */
  {
    heading: "ANTI-BUDDHIST MOVEMENT AND THE BATTLE-AXE PEOPLE, 900–1000 AD",
    description:
      "The new people who came into the area left images of horse riders carrying axes with serrated edges, which are found even today in parts of Diamer District. There is no evidence of their language or the religion they practiced. However, it appears that they were hostile to the Buddhists living in the region and may have caused Buddhist migrations to valleys further north.",
    items: [],
  },

  /* ═══════════ 9 — BUDDHISM SPREADS NORTH ═══════════ */
  {
    heading: "BUDDHISM SPREADS TO THE NORTH OF GILGIT — 8TH CENTURY AD",
    description:
      "The Bubur Buddha was found by a farmer in the village of Bubur, Ghizer District, on the left bank of the Gilgit River. Excavated from a cornfield between 1980 and 1985 (the exact date is uncertain), the statue is made of a single block of granite, stands 165 cm high, and is carved on three of its four sides. It is evident that Bubur village was very close to the routes between China and India, and the Bubur Buddha testifies to the long presence of Buddhists in this region. The facial features and posture of the Buddha figure closely resemble those of the Kargah Buddha, north of Gilgit.",
    items: [],
  },

  /* ═══════════ 10 — TRAKHAN DYNASTY ═══════════ */
  {
    heading: "TRAKHAN DYNASTY — 780–1821 AD",
    description:
      "During the medieval era in the Gilgit sub-region, the Trakhan Dynasty emerged as the primary ruling authority, serving as the epicentre from which the governance of Nagar and Hunza emanated. The rulers of Yasin, Punial and Chitral also maintained close ties, while tribal territories such as Gor, Darel, Chilas, Tangir, Herban and Nuristan to the west had their roots intertwined with the Trakhan Dynasty. Despite romanticized traditions, historical records from the second period of the Trakhan Dynasty (997 to 1241 AD) reveal insights into Shah Mirza, also known as Mirza I, who ascended the throne in 1127 AD and ruled until 1205 AD. Following his passing at the age of 109, his son Tartorra Khan succeeded him. Raised in the Hodur Valley, Tartorra Khan faced succession disputes that led to his exile and eventual return, consolidating his reign. Consequently, the dynasty became known as the Trakhan Dynasty, after its influential ruler, Torra Khan. Under his rule, significant advancements were made in the propagation of Ismailism, culminating in the establishment of the Raisia Dynasty in Chitral. This era marked a pivotal period in the region's history, characterized by political intrigue and religious transformation.",
    items: [],
  },

  /* ═══════════ 11 — ARRIVAL OF ISLAM ═══════════ */
  {
    heading: "ARRIVAL OF ISLAM IN GILGIT-BALTISTAN — 15TH CENTURY AD",
    description:
      "Muslim rule in Central Asia and India around the 8th century AD also influenced the spread of Islam in this region. However, until the 14th century AD — despite the arrival of several preachers and invaders — Islam could not fully spread in the area. In the 14th century AD, Sufi Muslim preachers from Persia and Central Asia introduced Islam in Baltistan. Famous among them was Mir Sayyid Ali Hamadani, who came via Kashmir in 1379 AD, and Mir Shamsuddin (1440–1526 AD), a Persian Sufi Muslim saint who introduced the Noorbakhshi tenets.",
    items: [],
  },

  /* ═══════════ 12 — CONSOLIDATION OF PRINCELY RULERS ═══════════ */
  {
    heading: "CONSOLIDATION OF PRINCELY RULERS IN GILGIT-BALTISTAN",
    description:
      "In the 12th or 13th century AD, Ibrahim Shah, a Kashmiri prince, married the Princess of Skardu, establishing the Maqpon Dynasty. After Tibetan suzerainty dissolved, the Maqpon Dynasty ruled Baltistan. Raja Ali Sher Khan Anchan, the 15th king of the Maqpon Dynasty, was famed for unifying Baltistan and expanding its frontiers to Ladakh and Western Tibet in the east, and to Ghizar and Chitral in the west. Ali Sher Khan Anchan lost his royal father as a child. His maternal uncle, the Raja of Shigar, took him and his mother to Shigar, probably intending to put him to death and annex the Skardu Kingdom. At the age of 18, with twelve faithful followers of his father, Ali Sher Khan fled to Delhi. He was noticed by Emperor Akbar when he displayed his physical prowess by killing a lion while hunting in Delhi. The Emperor gave him command of a Mughal army to reclaim his lost kingdom. While in Delhi, he married a Mughal princess named Gul Khatoon, the daughter of Akbar's uncle, Kamran Mirza. When Akbar conquered Kashmir, Ali Sher Khan Anchan was with him in 1586 AD.",
    items: [
      {
        title: "The Legacy of Raja Ali Sher Khan Anchan",
        description:
          "Raja Ali Sher Khan Anchan is credited with the expansion of his kingdom and the construction of water channels and a dam at Satpara Lake. He also built the \"King of Forts,\" Kharphucho Khar, in Skardu, the capital of the Maqpon rulers. He introduced polo in the region as the Game of Kings, and the first polo match at Shandur is said to have been played during his era.",
        images: [],
      },
    ],
  },

  /* ═══════════ 13 — TUSI BROTHERS & SUFISM ═══════════ */
  {
    heading: "THE TUSI BROTHERS AND THE SPREAD OF SUFISM, 1600–1670 AD",
    description:
      "In the late 16th century AD, two brothers of Persian origin — Syed Mahmud Shah Tusi and Syed Ali al-Tusi — arrived in Khaplu from Yarkand through the Saltoro Glacier and preached Islam in this region. Syed Mahmud Tusi died in 1669 AD and is buried in Skardu. Syed Ali Tusi died in 1670 AD and is buried at Kuwardo.",
    items: [],
  },
];

/* ──────────────── hero slides ──────────────── */
// The provided content has no imagery, so the hero reuses existing
// regional rock-carving/Buddhist visuals already bundled in the project.
const heroSlides: { image: string; label: string }[] = [
  { image: "/assets/img/Prehistoric/ghandara.png", label: "Climax of Buddhism in Gilgit-Baltistan" },
  { image: "/assets/img/Prehistoric/rockcraving.png", label: "Rock Carvings of the Upper Indus" },
  { image: "/assets/img/Prehistoric/ghandara2.png", label: "Buddhist Heritage of Gilgit" },
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

const ModernHistory = () => {
  const [previewImage, setPreviewImage] = useState<{ src: string; caption?: string } | null>(null);

  return (
    <div>
      <PageHeroSlider
        title="Medieval History"
        subtitle="Buddhism, Dynasties, and the Coming of Islam"
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
                <p className="mt-6 max-w-3xl mx-auto text-foreground/80 leading-relaxed text-lg whitespace-pre-line">
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
                const hasImages = item.images.length > 0;

                return (
                  <motion.div
                    key={iIdx}
                    custom={iIdx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={fadeUp}
                    className={`flex flex-col ${hasText && hasImages
                      ? isReversed
                        ? "lg:flex-row-reverse"
                        : "lg:flex-row"
                      : ""
                      } gap-10 items-center`}
                  >
                    {/* Text block */}
                    {hasText && (
                      <div className={hasImages ? "lg:w-1/2 space-y-4" : "w-full max-w-3xl mx-auto space-y-4 text-center"}>
                        <h3 className="text-xl md:text-2xl font-semibold text-primary">
                          {item.title}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
                          {item.description}
                        </p>
                      </div>
                    )}

                    {/* Images block */}
                    {hasImages && (
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
                              : "grid-cols-1 sm:grid-cols-3"
                            }`}
                        >
                          {item.images.map((img, imgIdx) => (
                            <motion.figure
                              key={imgIdx}
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden rounded-2xl shadow-lg border border-border/40 cursor-pointer flex flex-col h-full"
                              onClick={() => setPreviewImage(img)}
                            >
                              <img
                                src={img.src}
                                alt={img.caption || item.title}
                                className="w-full h-full flex-1 object-cover"
                                loading="lazy"
                              />
                              {img.caption && (
                                <figcaption className="text-xs font-bold text-center text-muted-foreground py-2 px-3">
                                  {img.caption}
                                </figcaption>
                              )}
                            </motion.figure>
                          ))}
                        </div>
                      </div>
                    )}
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

export default ModernHistory;
