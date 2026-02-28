import { motion } from "framer-motion";
import PageHeroSlider from "@/components/shared/PageHeroSlider";

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
  /* ═══════════ 1 — SIKH INVASION ═══════════ */
  {
    heading: "SIKH INVASION OF THE REGION — 1819",
    description:
      "In the beginning of the 19th century, Maharajah Ranjit Singh invaded Kashmir with an army of 30,000 Sikh soldiers and captured the valley on June 15, 1819. After consolidation of his control over Kashmir Valley, he ventured North of Zojila Pass into Ladakh and Baltistan region. At that time, the region of Gilgit Baltistan was divided into different principalities ruled by Rajas, Mirs and Tribal Chieftains in some of the Western Districts. This predominantly Muslim region included the former principalities of Gilgit, Hunza, Nagar, and other territories bordering Chinese Xinjiang region and Afghanistan.",
    items: [
      {
        title: "Sikh Empire Expansion",
        description: "",
        images: [
          { src: "/assets/img/modern/sec1-img2.png", caption: "Map showing Sikh Territory" },
          { src: "/assets/img/modern/sec-1-img2.png", caption: "Maharaja Ranjit Singh" },
        ],
      },
    ],
  },

  /* ═══════════ 2 — ZORAWAR SINGH ═══════════ */
  {
    heading: "ZORAWAR SINGH INVADES SKARDU",
    items: [
      {
        title: "Skardu Fort — 1840",
        description: "",
        images: [
          { src: "/assets/img/modern/fort.png", caption: "Skardu Fort 1840" },
        ],
      },
      {
        title: "Sikh's Campaign against Baltistan",
        description:
          "In Nov 1839, Zorawar Singh started his campaign against Baltistan. In 1840, he conquered Skardu and captured the ruler, Ahmad Shah. He built Skardu Fort in the foot hills of the Kharpocho mountain (where Kharpocho Fort stands today) and appointed Baghwan Singh as the Administrator. In 1841, Ali Khan of Rondu, Haider Khan of Shigar and Daulat Khan of Khaplu led a successful uprising against the Dogras and captured Baghwan Singh. In 1842, Dogra Commander Wasir Lakhpat, conquered Baltistan (supposedly with the support of some locals) for the second time and till 1947, the entire region of Baltistan remained under Dogra Rule.",
        images: [
          { src: "/assets/img/modern/sikh.png" },
        ],
      },
      {
        title: "Muslim Resistance against Sikhs — Gilgit Region",
        description:
          "In 1841, Gohar Aman (ruler of Yasin) launched series of attacks to capture Gilgit with the support of people from Darel, Tangir and Chitral against Raja Shah Sikander Khan. In 1842, Maharaja of Kashmir sent an Army on the request of Karim Khan (brother of Sikander Khan), to restore the power. In 1852, the famous ambush of Bhoop Singh Pari was carried out by Gohar Aman against the Maharaja forces marching from Bunji, which resulted in humiliating defeat of Dogra Forces. Gohar Aman ruled Gilgit region till his death in 1860. After his death, Dogras were able to capture Gilgit in 1870.",
        images: [
          { src: "/assets/img/modern/sikh2.png", caption: "Zorawar Singh" },
          { src: "/assets/img/modern/sikh3.png", caption: "Ali Sher Khan, Rondu" },
          { src: "/assets/img/modern/sikh4.png", caption: "Gohar Aman (left), Picture received from his family" },
          { src: "/assets/img/modern/sikh5.png", caption: "Ambush Site Bhoop Singh Pari" },
        ],
      },
    ],
  },

  /* ═══════════ 3 — BRITISH INCURSION ═══════════ */
  {
    heading: "INCURSION OF THE BRITISH AND MADHUPUR ARRANGEMENT",
    items: [
      {
        title: "British Incursion in Gilgit",
        description:
          "In 1870, British Government decided to strengthen its Northern Frontiers by placing its representative at Gilgit. Resultantly, in December 1876, the British and Maharaja of Kashmir came to an agreement (Madhupur Arrangement), for establishment of Political Agency in Gilgit. During this time, the region saw a period of dual governance, where both local rulers and British officials exerted their influence. This led to complex power dynamics and diplomatic manoeuvring.",
        images: [
          { src: "/assets/img/modern/british1.png" },
          { src: "/assets/img/modern/british2.png", caption: "John Biddulph, Political Agent (1879-1881)" },
        ],
      },
      {
        title: "Establishment of Gilgit Agency and Appointment of First British Political Agent",
        description:
          "The British Government of India established Gilgit Agency in 1877 and appointed John Biddulph as the first Political Agent. Lack of cooperation by the Maharajah's Wazire-Wazarat (Governor) in Gilgit with British Political Agent resulted in mutually agreed upon administrative division of Gilgit region. Maharaja's Governor ruled over the Gilgit Wazarat whereas the Political Agent governed Hunza, Nager, Punial, Ishkoman, Yasin, Koh-Ghizer and Chilas. The system of dual management created a lot of friction since the British Agents tried to establish their control over the Governor in managing the region. Due to frequent conflicts and change in orientation of British Frontier Politics, the Gilgit Agency was closed down in 1881.",
        images: [
          { src: "/assets/img/modern/british3.png", caption: "Map of Gilgit Wazarat" },
          { src: "/assets/img/modern/british4.png", caption: "Colonel Algernon George Arnold Durand" },
        ],
      },
      {
        title: "Re-establishment of Gilgit Agency",
        description:
          "In 1886, after an attack on Roshan Fort by Malik Aman (Son of Gohar Aman), followed by the visit of Russian officer, Captain Grombchevsky to Hunza in 1889, the British Government decided to address its vulnerability towards the Northern Frontier. Resultantly, the Gilgit Agency was re-established in 1889 and Algeron Durand was appointed as the Political Agent. During this era, British made efforts to strengthen infrastructural links with Kashmir Valley through roads, mail and telegraph system. The British and Kashmiri administration instituted a system of forced purchase (Hukmi Kharid), where most of the provisions were acquired from the local peasants by order with very little return. The system of forced labour (Begaar) was also used for transportation and construction work, thus making this regime oppressive and cruel in the eyes of the locals.",
        images: [],
      },
      {
        title: "The Anglo-Brusho War (Jahngir-e-Lae) — Resistance against British Oppression",
        description:
          "In 1890, tensions arose when the British reinforced Chalt Fort (located near Guru Jaglot) and started improving the road leading to it. In May 1891, representatives from Nagar and Hunza demanded the British to cease roadwork and withdraw from the Fort. However, Algernon Durand continued the fort's reinforcement and accelerated road construction. Nagar and Hunza viewed Durand's actions as an escalation and blocked mail from the British Resident in Chinese Turkmenistan from passing through their territory. British Government interpreted this as a violation of the 1889 agreement with Hunza (in which Hunza accepted suzerainty of the British). After issuing an ultimatum which was ignored, British initiated the Anglo-Brusho Campaign of 1891.",
        images: [
          { src: "/assets/img/modern/british5.png" },
        ],
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

const Modern = () => {
  // Build hero slides from each section's first available image
  const heroSlides = sections
    .map((s) => {
      const firstImg = s.items.find((item) => item.images.length > 0)?.images[0];
      return firstImg ? { image: firstImg.src, label: s.heading } : null;
    })
    .filter(Boolean) as { image: string; label: string }[];

  return (
    <div>
      <PageHeroSlider
        title="Modern History"
        subtitle="Conquest, Resistance, and the Shaping of a Region"
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
                                : item.images.length === 3
                                  ? "grid-cols-1 sm:grid-cols-3"
                                  : "grid-cols-2"
                            }`}
                        >
                          {item.images.map((img, imgIdx) => (
                            <motion.figure
                              key={imgIdx}
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden rounded-2xl shadow-lg border border-border/40"
                            >
                              <img
                                src={img.src}
                                alt={img.caption || item.title}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                              />
                              {img.caption && (
                                <figcaption className="text-xs text-center text-muted-foreground py-2 px-3">
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
    </div>
  );
};

export default Modern;
