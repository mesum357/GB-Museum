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
  /* ═══════════ 1 — SIACHEN CONFLICT ═══════════ */
  {
    heading: "SIACHEN CONFLICT",
    description:
      "Siachen — Land of Roses lies in Eastern Karakoram Range and is the second longest glacier in world's non-polar areas. The 76 km long glacier originates at Indra Col Pass (18,875 ft) and ends at River Nubra. The temperature in Siachen can fall as low as minus 50° C making it inhabitable.",
    items: [
      {
        title: "Siachen Glacier",
        description: "",
        images: [
          { src: "/assets/img/liberation/siachen.png", caption: "Map — Siachen Glacier" },
          { src: "/assets/img/liberation/glacier.png", caption: "Map depicting location of Siachen Glacier" },
        ],
      },
      {
        title: "Genesis of Conflict",
        description:
          "The glacier was first charted by a Britisher, Tom Longstaff in 1908, however, its demarcation could not be carried out; being inhospitable terrain. Area remained un-demarcated even in Karachi and Shimla Agreements; demarcating Ceasefire Line upto point NJ 9842 and stating that it would run \"thence north to the glaciers\" in Karachi Agreement 1949. Basing on these agreements, the area from NJ 9842 to Karakoram Pass remained part of Pakistan till 1984, when Indian Forces cunningly occupied it and asserted their false claim on Siachen.",
        images: [],
      },
      {
        title: "Oropolitics Shaping the Future",
        description:
          "Historically, cartographers have always shown Siachen as part of Pakistan. Likewise, the movement of mountaineers/expeditions in the area was also regulated by Pakistan till 1980s. Between 1974–1981, 16 major expeditions explored Siachen by taking permits from the Pakistani Government. Out of these, 11 were from Japan, 3 were from Austria and one each from Britain and US thereby, further validating Pakistan's claim over Siachen Region. India accidentally recovered international maps of the area from a German expedition, depicting Siachen as part of Pakistan. Accession of Aksai Chin to China and fear of loss of land, suddenly brought Siachen in the focus of Indian policy makers.",
        images: [
          { src: "/assets/img/liberation/atlas.png", caption: "Atlas 1960 showing Siachen as part of Pakistan" },
          { src: "/assets/img/liberation/kangari.png", caption: "1981 — Indian Expedition on Teram Kangri" },
        ],
      },
      {
        title: "Indian Intrusion in Garb of Expeditions",
        description:
          "Because of extreme heights and inhospitable terrain, Siachen area remained vacant and was never occupied by Pakistan Army. Indian Army sent its 1st military expedition to Teram Kangri in 1978 followed by two other expeditions in 1980 and 1981. Based on multiple intelligence reports of Indian incursions, Pakistan also sent out a number of trekking expeditions to keep a track on Indian movements. Indian presence in Siachen was first confirmed by a Pakistani Police Officer patrolling the area in 1981; 15–20 Indians were reported in general area Chumik and Chulling Glacier.",
        images: [],
      },
      {
        title: "Indian Aggression — 1984",
        description:
          "After confirmation of Indian incursions, Pakistan sent protest notes to India on 21 and 29 August 1983. However, Indian Army, blatantly violated international norms and cunningly intruded into Pakistani Territory for occupation of passes leading to Siachen Glacier in April 1984. In order to check Indian intrusion, Pakistan Army occupied a defensive position along Sia La, Bilafond La, Chulling La and Gyong La. Thereafter, operations in Siachen remained limited to exchange of fire between two armies. During this period, sub tactical operations by Young officers and soldiers of Pakistan Army remained noteworthy.",
        images: [
          { src: "/assets/img/liberation/important.png", caption: "Important Passes in Siachen and Indian Aggression" },
          { src: "/assets/img/liberation/rana.png", caption: "Rana Post (Enemy) in clouds — Bilafond La" },
          { src: "/assets/img/liberation/post.png", caption: "Own Post in Gyong La overlooking Enemy Area" },
        ],
      },
    ],
  },

  /* ═══════════ 2 — CHUMIK OPERATION ═══════════ */
  {
    heading: "CHUMIK OPERATION — TALE OF DAUNTLESS COURAGE",
    description:
      "Pakistan launched Chumik Operation in April 1989 to disallow enemy to occupy dominating positions along Chumik Glacier. Since approach to the objective was non assailable, therefore Lieutenant Naveed of 9 Azad Kashmir Regiment was heli dropped near Point 22158 to achieve surprise against the enemy. As a result of daring action by Lieutenant Naveed, Indian Army suffered 34 dead and 150 wounded and later abandoned the entire area. In recognition to his heroic and bold actions, Lieutenant Naveed was awarded Sitara-e-Jurat. This epic tale of courage was re-enacted in TV Serial \"Alpha, Bravo, Charlie\".",
    items: [
      {
        title: "Chumik Operation",
        description: "",
        images: [
          { src: "/assets/img/liberation/naveed.png", caption: "Lieutenant Naveed" },
          { src: "/assets/img/liberation/challenge.png", caption: "Forward post at an altitude of 22,000 ft" },
        ],
      },
    ],
  },

  /* ═══════════ 3 — TERRAIN CHALLENGES ═══════════ */
  {
    heading: "TERRAIN CHALLENGES IN SIACHEN",
    description:
      "Surviving at these heights in temperature between -25 to -50 Degree Celsius, makes this sector the most challenging battlefield in the world. The soldiers in Siachen are deployed at heights upto 22,000 ft (ASL) and the routes to these posts are prone to crevasses, slides and avalanches.",
    items: [
      {
        title: "Snow Warriors",
        description: "",
        images: [
          { src: "/assets/img/liberation/img1.png", caption: "Soldiers moving to forward post" },
          { src: "/assets/img/liberation/img2.png", caption: "Soldiers crossing a crevasse" },
          { src: "/assets/img/liberation/img3.png", caption: "Pakistani snow warrior at Siachen" },
        ],
      },
    ],
  },

  /* ═══════════ 4 — GYARI DISASTER ═══════════ */
  {
    heading: "ENVIRONMENTAL DISASTER — GYARI",
    description:
      "On 7 April 2012, during an unfortunate environmental disaster, 140 soldiers embraced Shahadat due to land slide/avalanche at Gyari. Pakistan Army undertook extensive efforts to recover all shaheeds. This massive recovery operation was considered impossible by the international experts, however, it was only made possible due to the unwavering dedication of Pakistan Army.",
    items: [
      {
        title: "Gyari Recovery Operation",
        description: "",
        images: [
          { src: "/assets/img/liberation/monument.png", caption: "Gyari Monument" },
          { src: "/assets/img/liberation/operaion.png", caption: "Recovery operation at Gyari Site" },
          { src: "/assets/img/liberation/img4.png", caption: "\"We will dig out each and every one of our lost soldier, even if we have to dig up the whole mountain\" — Army Chief Gen Ashfaq Pervaiz Kayani" },
        ],
      },
      {
        title: "Challenges at Siachen",
        description: "",
        images: [
          { src: "/assets/img/liberation/9.1.png", caption: "Sling operation" },
          { src: "/assets/img/liberation/9.2.png", caption: "Frost Bite case" },
          { src: "/assets/img/liberation/9.3.png", caption: "Igloo accommodation" },
        ],
      },
      {
        title: "Unwavering Commitment",
        description:
          "Inhospitable environment continues to incite considerable casualties, as soldiers employed at high altitudes remain prone to life threatening sickness including Frostbite, Acute Mountain Sickness, Dural Venous Sinus Thrombosis, High Altitude Pulmonary and Cerebral Edemas. Acclimatisation, rigorous training and high end equipment play a crucial role in mitigating these challenges. Despite severe hardships and environmental challenges, Snow Warriors of Pakistan Army are still committed to defend every inch of snow capped mountains.",
        images: [],
      },
    ],
  },

  /* ═══════════ 5 — KARGIL CONFLICT ═══════════ */
  {
    heading: "KARGIL CONFLICT — OP KOH-E-PAIMA",
    description:
      "Kargil Conflict (Op Koh-e-Paima) was Pakistan's response to Indian aggressions over the period of time along the Line of Control (LOC) in Kashmir, Ladakh and Siachen Sectors.",
    items: [
      {
        title: "Kargil Conflict",
        description: "",
        images: [
          { src: "/assets/img/liberation/objectives.png", caption: "Kargil Conflict Overview" },
        ],
      },
      {
        title: "Area of Operation",
        description:
          "The operation was conducted in Mashko, Daras and Batalic Sectors/Valleys with primary focus remaining on interdiction of Srinagar–Leh Highway, NH-1.",
        images: [
          { src: "/assets/img/liberation/area.png", caption: "Area of Operation" },
          { src: "/assets/img/liberation/CONFLICT.png", caption: "Conflict Map" },
        ],
      },
      {
        title: "Objectives of Operation",
        description:
          "Political Significance: Op Koh-e-Paima was an attempt to thwart Indian effort to freeze Kashmir issue and highlight it at international forums to focus world attention towards resolving the dispute in the light of UNSC resolutions.\n\nMilitary Significance: It was aimed at sealing all unoccupied gaps existing in own defences along LOC in Gilgit Baltistan Region to prevent Indian Army from exploiting these as done in the past (1971 and Siachen). The operation was also aimed at occupying significant heights along LOC within these gaps to dominate Indian strategic line of communication, NH-1 (Srinagar-Leh Road).",
        images: [],
      },
      {
        title: "Conduct of Operation",
        description:
          "The operation commenced in extreme winters in December 1998 and was concluded in July 1999 at ceasefire.",
        images: [
          { src: "/assets/img/liberation/nh.png", caption: "From Left: Captain Kashif Khalil SJ, Major Asad TBt, Captain Karnal Sher Khan NH" },
          { src: "/assets/img/liberation/indian-aircraft.png", caption: "Destroyed Indian Aircraft during Kargil War" },
        ],
      },
      {
        title: "Kashif Post (Tiger Hill)",
        description:
          "The operation was executed with extreme brilliance and is a classic example of surprise and deception, where the Indian Army and their intelligence agencies remained totally unaware of the presence of Pakistani Forces throughout the conduct of the operation for entire five months, till May 1999. The operation is a testimony to the bravery, courage and audacity of valiant sons of Northern Light Infantry Regiment of Pakistan Army (having troops from Gilgit Baltistan and Kashmir) including Captain Karnal Sher Khan NH, Havildar Lalak Jan NH and many other unsung heroes who endorsed new chapters of valour, grit and supreme sacrifice in the history of Pakistan by achieving feats of glory and laying down their lives for defence of their motherland.",
        images: [
          { src: "/assets/img/liberation/khashif.png", caption: "Kashif Post — Tiger Hill" },
          { src: "/assets/img/liberation/qadir-op.png", caption: "Qadir OP" },
        ],
      },
      {
        title: "Qadir OP — Shahadat Place of Havildar Lalak Jan, NH",
        description: "",
        images: [
          { src: "/assets/img/liberation/state.png", caption: "Qadir OP — Shahadat place of Havildar Lalak Jan NH" },
        ],
      },
      {
        title: "End State",
        description:
          "The operation concluded at draw down of forces as a result of political settlement / international pressures, with Pakistan Army still holding substantial area of operational significance along the LOC, out of the captured territory.",
        images: [
          { src: "/assets/img/liberation/prime.png", caption: "Prime Minister of Pakistan visiting forward area" },
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

const SiachenKargilConflict = () => {
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
        title="Siachen–Kargil Conflict"
        subtitle="Guarding the Frozen Frontier"
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

export default SiachenKargilConflict;
