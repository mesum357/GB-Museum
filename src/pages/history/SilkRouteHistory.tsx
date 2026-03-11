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
  /* ═══════════ 1 — HISTORY OF SILK ROUTE ═══════════ */
  {
    heading: "HISTORY OF SILK ROUTE",
    description:
      "Silk Route is a 4000 miles long historical network of ancient trade routes across Eurasia which connected East, South, and Western Asia with the European world in the past. It is also used to greater extent even today. The name Silk Road originates from the lucrative Chinese Silk trade along this route. Silk trade began in the Han Dynasty (206 BC – 220 AD) during 114 BC. Later, Central Asian sections of the trade route (including present day Gilgit Baltistan) were expanded as per the missions and explorations of Zhang Dynasty.",
    items: [
      {
        title: "The Southern Karakoram Route",
        description:
          "The Southern route (Karakoram route) was mainly a single route running from China through Karakoram mountains, connecting Pakistan with China. It then set off westwards, but with southward spurs enabling the journey to be completed by sea from various points in Southern Pakistan's Sindh. Crossing the high mountains, it passed through Northern Pakistan over the Hindukush mountains into Afghanistan, rejoining Northern route near Merv (Turkmenistan).",
        images: [
          { src: "/assets/img/silk/silk1.png", caption: "Ancient Silk Route Trade Network" },
        ],
      },
      {
        title: "Trade & Civilizations",
        description:
          "Trade on the Silk Road played a significant role in the development of the civilizations along the routes (Present day China, Pakistan, India, Iran, Europe and Arabia). Though the silk route got its fame because of the silk trade from China, the route was a comprehensive network of trade route having requisite facilities of that era. Major commodities being traded since old times were horses, grains, weapons, gun-powder, metals, minerals, gem stones and textiles.",
        images: [
          { src: "/assets/img/silk/silk2.png", caption: "Trade along the Silk Route" },
        ],
      },
      {
        title: "Cultural & Technological Exchange",
        description:
          "Besides trade, the Silk Road also helped transfer various technologies, religions, philosophies, culture and art. An interesting innovation was hanging bridges on the site of rock face, built by locally available timber. Caravans used to pass over these bridges to negotiate the steep and inhospitable terrain conditions in modern day GB. The symbols and remnants of the caravans are presently found near the river gorges (BG Ziarat, Chillas, Thor, Thalpan, Ghizer) where caravans used to wait for low water table in winters to cross.",
        images: [
          { src: "/assets/img/silk/silk3.png", caption: "Remnants of Ancient Caravans" },
        ],
      },
      {
        title: "Traders of the Silk Road",
        description:
          "The route was used in earlier times by Indian and Bactrian traders, followed by Parthians and Sogdian traders during 5th to 8th century AD. The Silk Route enabled the spread of Buddhism from India to East Asia and Islam from the Middle East to Central Asia. It helped in fostering diplomatic relations and cultural understanding between various civilizations.",
        images: [
          { src: "/assets/img/silk/silk4.png", caption: "Silk Road Merchants" },
        ],
      },
      {
        title: "Geopolitical Significance & Modern Legacy",
        description:
          "It played a significant role in shaping Global Geopolitics with empires vying for control over key trade routes and strategic locations. It also contributed to the rise and fall of Empires as well as the formation of new states and alliances. The legacy of Silk Route continues to resonate in modern times with initiatives like the Belt and Road trade, aiming to revive ancient trade routes for contemporary integration.",
        images: [
          { src: "/assets/img/silk/silk5.png", caption: "Strategic Trade Locations" },
        ],
      },
    ],
  },

  /* ═══════════ 2 — EXISTING SILK ROUTE ═══════════ */
  {
    heading: "EXISTING SILK ROUTE (ALONG KKH)",
    description:
      "The old Silk Route passes through Pakistan at the following seven locations ranging from a length of 200 – 800 Km. These routes continue to serve as vital corridors connecting the region with Central Asia and beyond.",
    items: [
      {
        title: "Key Routes through Gilgit-Baltistan",
        description:
          "• Hunza – Misghar – Kilik Pass – Tajikistan\n• Kashghar – Hunza – Gilgit – Ishkoman Valley – Tajikistan\n• Kashghar – Hunza – Gilgit – Kohistan – Bisham – Swat – Afghanistan\n• Gilgit – Ghizer – Chitral\n• Gilgit – Chilas – Babusar – Islamabad",
        images: [
          { src: "/assets/img/silk/silk6.png", caption: "Modern KKH — Successor of the Ancient Silk Route" },
        ],
      },
    ],
  },
];

/* ──────────────── hero slides ──────────────── */

const heroSlides = [
  { image: "/assets/img/silk/silk1.png", label: "History of the Silk Route" },
  { image: "/assets/img/silk/silk2.png", label: "Trade & Civilizations" },
  { image: "/assets/img/silk/silk3.png", label: "Cultural Exchange" },
  { image: "/assets/img/silk/silk4.png", label: "Traders of the Silk Road" },
  { image: "/assets/img/silk/silk5.png", label: "Geopolitical Significance" },
  { image: "/assets/img/silk/silk6.png", label: "Existing Silk Route (KKH)" },
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

const SilkRouteHistory = () => {
  return (
    <div>
      <PageHeroSlider
        title="Silk Route History"
        subtitle="The Ancient Trade Network Through Gilgit-Baltistan"
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

export default SilkRouteHistory;
