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
  /* ═══════════ 1 — PHASE I ═══════════ */
  {
    heading: "MAHARAJA'S BETRAYAL — GB LIBERATION WAR",
    description:
      "Phase I — Liberation of Gilgit: After Pakistan and India gained independence, Maharaja Hari Singh's delay in deciding the future of Jammu and Kashmir started an uprising in the region. The agitation against the Dogra Dynasty was further intensified when Maharaja Hari Singh signed the Instrument of Accession in favour of India on 26 October 1947, against the wishes of the locals (77.12%), thus leading to an armed revolt.",
    items: [
      {
        title: "Liberation War",
        description:
          "The liberation war was fought in two phases. In Phase I, the Gilgit Region was freed from the Dogra Regime whereas in Phase II, Baltistan Region was liberated while fighting against regular Indian Armed Forces, despite being outnumbered and ill-equipped.",
        images: [
          { src: "/assets/img/liberation/liberation1.png", caption: "Gilgit Scouts with Subedar Major Babar Khan" },
          { src: "/assets/img/liberation/liberation2.png", caption: "Hari Singh's Instrument of Accession" },
        ],
      },
      {
        title: "Phase 1 — Operation Datta Khel",
        description:
          "Gilgit Scouts and Muslim component of State Forces launched Operation 'Datta Khel' to overthrow Dogra's Rule, led by Commandant Major William Brown and Subedar Major Babar Khan.",
        images: [
          { src: "/assets/img/liberation/liberation3.png", caption: "Major William Brown and Subedar Major Babar Khan" },
        ],
      },
      {
        title: "Surrender of Ghansara Singh",
        description:
          "On 31 October 1947, Gilgit Scouts took an oath of allegiance to Pakistan. Soon after they took the control of government buildings and surrounded the Governor's House, demanding Brigadier Ghansara Singh's surrender. The Governor's refusal resulted in a night-long fight which finally led to surrender of Brigadier Ghansara Singh to Subedar Major Baber Khan at around 9:00 am on November 1st, 1947.",
        images: [
          { src: "/assets/img/liberation/liberation4.png", caption: "Brigadier Ghansara Singh surrendering to Subedar Major Babar Khan" },
        ],
      },
      {
        title: "Hoisting of Pakistan Flag",
        description:
          "On 2 November 1947, Gilgit Scouts hoisted the Pakistan Flag to mark the end of the oppressive Dogra Rule. The State of Hunza and Nagar also acceded to Pakistan on 2 November 1947 with Major William Brown providing necessary patronage. Meanwhile, a provisional government was set up in Gilgit to manage the affairs until the arrival of a representative from Pakistan.",
        images: [
          { src: "/assets/img/liberation/liberation5.png", caption: "Gilgit Scouts Hoisting Pakistan Flag" },
        ],
      },
      {
        title: "End of Dogra Rule",
        description:
          "Sikh and Hindu soldiers of the 6 J&K Infantry Battalion stationed at Bunji were the only presence of Dogra Rule after the Governor surrendered. They were manning two piquets at Jaglot and Partap Bridge. Captain Jock Methison dispatched a Company of Scouts under command of Subedar Sher Ali from Chilas, which neutralized the piquets and destroyed the Partab Bridge thus severing the linkage between Gilgit and Bunji. Later, Captain Hassan Khan arrived with Muslim soldiers of 6 J&K Infantry and cleared Bunji, ending the Dogra Rule from Gilgit on 1st November 1947.",
        images: [
          { src: "/assets/img/liberation/liberation6.png" },
        ],
      },
      {
        title: "Appointment of Political Agent",
        description:
          "On 16 November 1947, Sardar Muhammad Alam arrived as a representative of the Government of Pakistan. He dissolved the Provisional Assembly and took over the charge as Pakistan's First Political Agent in Gilgit.",
        images: [],
      },
    ],
  },

  /* ═══════════ 2 — PHASE II ═══════════ */
  {
    heading: "GB LIBERATION WAR — PHASE II: LIBERATION OF SKARDU",
    items: [
      {
        title: "Change of Command",
        description:
          "Following accession to Pakistan, Major Muhammad Aslam, also known as Colonel Pasha, replaced Major William Brown as Commandant of Gilgit Scouts on 12 January 1948.",
        images: [
          { src: "/assets/img/liberation/majoraslam.png", caption: "Major Muhammad Aslam" },
        ],
      },
      {
        title: "Phase 2 — Operation Sledge",
        description:
          "The offensive plan to liberate Baltistan from India's illegal occupation by capturing Zojila and Tragbhal Passes was termed as 'Operation Sledge'. For the conduct of operation, the force was divided into three components i.e. Ibex Force, Tiger Force and Eskimo Force.",
        images: [
          { src: "/assets/img/liberation/ibex.png", caption: "Offensive Plan of Ibex, Eskimo and Tiger forces" },
        ],
      },
      {
        title: "Ibex Force",
        description:
          "On 6 February 1949, Major Ihsan led the Ibex Force on the Skardu-Kargil-Zojila Approach from Bunji. Enroute, they cleared a Dogra Platoon positioned at Tsari and laid siege to Skardu Garrison and Kharpocho Fort after reaching Skardu. The enemy tried to reinforce the besieged Skardu Garrison by a force under command Brigadier Faqir Singh; was successfully ambushed at Thorgo Pari by Ibex Force. Later, the enemy sent 'Z Brigade' from Leh to restore the situation in Skardu. However, stiff resistance by the Ibex Force compelled enemy's Z Brigade to withdraw without achieving any worthwhile gains.",
        images: [
          { src: "/assets/img/liberation/ihsan-ali.png", caption: "Major Ihsan Ali Khan" },
          { src: "/assets/img/liberation/fort.png", caption: "Kharpocho Fort" },
        ],
      },
      {
        title: "Eskimo Force — Lieutenant Shah Khan",
        description:
          "In order to assist Ibex Force, Colonel Pasha launched the Eskimo Force from Bunji under command Lieutenant Shah Khan across Deosai Plains with the task of capturing Kargil and Dras. On reaching Kargil, it was learnt that entire Garrison was witnessing a Polo Match. Eskimo Force occupied the adjoining hills and started shelling the Polo Ground. Resultantly, panic erupted and enemy fled towards Leh without putting up a resistance, thus the vital Kargil town was liberated unopposed. The loss of Dras and Kargil, coupled with bold offensive actions of Ibex Force, created dilemma of rear area security amongst the ranks and files of Z Brigade, thus forcing it to withdraw, leaving behind numerous prisoners of war and dead bodies. The force continued to advance and captured Zojila Pass as well as a considerable area in Nubra Valley.",
        images: [
          { src: "/assets/img/liberation/shahkhan.png", caption: "Lieutenant Shah Khan" },
        ],
      },
      {
        title: "Tiger Force",
        description:
          "Tiger Force under command Captain Hassan Khan was tasked to secure Gurez valley and Tragbal Pass. The force secured important areas including Tragbal Dele, Gurez Valley and Kishanganga Valley with assistance from Frontier Constabulary and Chitral Scouts. However, owing to superiority in strength, equipment and logistics, the enemy re-captured Tragbal and Gurez.",
        images: [
          { src: "/assets/img/liberation/hassan-khan.png", caption: "Captain Hassan Khan" },
        ],
      },
      {
        title: "Change of Command",
        description:
          "In April 1948, Lieutenant Colonel Ghulam Jillani relieved Major Muhammad Aslam as Commandant of Gilgit Scouts. Since the scouts were by then over stretched in an area of 350 square miles, consolidation of gains were ordered.",
        images: [
          { src: "/assets/img/liberation/jillani.png", caption: "Lieutenant Colonel Ghulam Jillani" },
        ],
      },
      {
        title: "Liberation of Skardu",
        description:
          "Lieutenant Colonel Mata-ul-Mulk reduced the Skardu Garrison, using artillery, thus forcing Colonel Sher Jung Thapa to surrender on 14 August 1948.",
        images: [
          { src: "/assets/img/liberation/mata.png", caption: "Lieutenant Colonel Mata-ul-Mulk" },
          { src: "/assets/img/liberation/sakrdu.png", caption: "Skardu Garrison" },
        ],
      },
      {
        title: "Ceasefire",
        description:
          "77 Indian Brigade under command Brigadier HL Attal launched two failed attacks to re-capture the Zojila Pass. At this stage, incorrect assessment of enemy intentions led to thinning of Scouts from Zojila Pass for the capture of Leh. Meanwhile, Indian Army took advantage of the situation, brought armour into the Sector which allowed 77 Indian Brigade to clear Zojila Pass, Dras and Kargil by 1st November 1948. Meanwhile, the matter was taken to UNSC by India and ceasefire was agreed upon on 1st January 1949. At this time, the scouts were holding a line roughly parallel to Kargil, Dras and Zojila. In total, Gilgit Scouts liberated 72,000 sq km of an area during the GB Liberation War.",
        images: [
          { src: "/assets/img/liberation/indisan.png", caption: "Indian Tanks at Zojila" },
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

const LiberationWar = () => {
  const [previewImage, setPreviewImage] = useState<{ src: string; caption?: string } | null>(null);
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
        title="GB Liberation War"
        subtitle="Courage, Sacrifice, and the Birth of Freedom"
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

export default LiberationWar;
