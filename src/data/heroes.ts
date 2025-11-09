export interface Achievement {
  title: string;
  description: string;
  image: string;
  year?: string;
}

export interface Hero {
  id: string;
  name: string;
  title: string;
  lifespan: string;
  bio: string;
  excerpt: string;
  thumbnail: string;
  images: string[];
  achievements: Achievement[];
  category: 'freedom-fighter' | 'military' | 'educator' | 'cultural' | 'political' | 'religious';
}

export const heroes: Hero[] = [
  {
    id: "hero-001",
    name: "Captain Shah Khan",
    title: "Hero of Skardu Liberation",
    lifespan: "1920 - 1995",
    excerpt: "Military hero who led Eskimo Force during the liberation of Skardu and captured Kargil and Dras.",
    bio: "During liberation of Skardu, Ibex Force was assisted by Eskimo Force under the able Command of Lieutenant Shah Khan. Task of Eskimo Force was to counter and neutralize enemy Z Brigade which was launched to restore the deteriorated situation in Skardu. Lieutenant Shah Khan striked enemy's lifeline by capturing Kargil and Dras, thereby creating an imbalance in enemy's disposition. The enemy was absolutely unaware of the movement of Eskimo Force. On 10th May 1948, attack on Dras was launched. Indians, as anticipated sent a company size reinforcement but it was ambushed in Kharu Pahar area in which bulk of the enemy force was annihilated and rest surrendered. Later, attack at Kargil was launched. On approaching Kargil, it was learnt that entire Garrison was watching a Polo Match. He occupied the adjoining hills on the Southern Side and started shelling the Polo Ground. Resultantly, panic erupted and the enemy fled towards Leh without putting up a fight thus the vital Kargil Town was liberated unopposed. The loss of Kargil and Dras, coupled with the bold offensive actions of Ibex Force, created paralysis in Z Brigade, forcing it to withdraw leaving behind numerous dead and prisoners of war. The force continued its advance and captured Zojila Pass in addition to a considerable area in Nubra Valley. Lieutenant Shah Khan showed outstanding courage during the attack on captured Zojila Pass in addition to a considerable area in Nubra Valley. Lieutenant Shah Khan showed outstanding courage during the attack on Kargil and Drass by leading from the front despite heavy enemy fire. He led attack after attack without caring for his life. It was through his inspiring leadership and bold planning that Kargil was captured with a very few casualties. On this brave act, he was awarded \"Sitara-e-Jurat\".",
    thumbnail: "/assets/img/heroes/shahhero.webp",
    images: [
      "/assets/img/heroes/shah1.webp",
      "/assets/img/heroes/shah2.webp",
      "/assets/img/heroes/shah3.webp",
      "/assets/img/heroes/shah4.jpg"
    ],
    achievements: [
      {
        title: "BORN",
        description: "24 August 1914",
        image: "/assets/img/heroes/shahachievement.png",
        year: ""
      },
      {
        title: "HOME TOWN",
        description: "Nagar, Gilgit Baltistan",
        image: "/assets/img/heroes/shahachievement.png",
        year: ""
      },
      {
        title: "ACHIEVEMENTS",
        description: "Sitara-e-Jurat",
        image: "/assets/img/heroes/shahachievement.png",
        year: ""
      },
      {
        title: "UNIT",
        description: "Gilgit Scouts",
        image: "/assets/img/heroes/shahhero.webp",
        year: ""
      }
    ],
    category: "military"
  },
  {
    id: "hero-002",
    name: "Colonel Ihsan Ali Khan",
    title: "Leader of Ibex Force",
    lifespan: "1919 - 1990",
    excerpt: "First man from Gilgit Region to get commissioned in Kashmir State Army and leader of Ibex Force during Operation Sledge.",
    bio: "Maj Ihsan Ali was the first man from Gilgit Region to get commissioned in Kashmir State Army in 1932. The offensive plan to liberate Baltistan from India's illegal occupation by capturing Zojila and Traghbal Passes was termed as \"Operation Sledge\". The force was divided into three components i.e Ibex Force, Tiger Force and Eskimo Force. Ibex Force was led by Maj Ihsan Ali. He inspired his under command through courage, resilience and fostering a culture of trust and bondage. On 6th February 1949, Ibex Column started its advance towards Skardu - Kargil - Zojila Approach. On reaching Astak, it was learnt that enemy defences at Tsari were held by two platoons.The enemy platoon deployed along right bank of the river was planned to be relieved by Dogra Platoon. Major Ihsan decided to get across the enemy positions as quickly as possible. This bold and swift action enabled Maj Ihsan to attack Skardu without any delay. He established a blocking position to ambush the Dogra Platoon. After an intense fight, the Dogra Platoon was completely annihilated. On reaching Skardu Ibex Force laid siege to Skardu Garrison and Kharpocho Fort and compelled the enemy to surrender. The enemy reinforcement to relieve the besieged Garrison under command Brigadier Faqir Singh were successfully ambushed and destroyed at Thurgo Pari. Later, the enemy sent Z Brigade to restore the situation in Skardu. After heavy fight the advance of Z Brigade could not make any progress and was thus forced to withdraw. It was through the courageous leadership of Maj Ihsan that the enemy forces were destroyed West of Skardu in early 1948. It was through his inspiring leadership that the Indian Forces were pushed back upto Kargil. On this exemplary act of bravery and courage, he was awarded \"Sitara-e-Jurat\".",
    thumbnail: "/assets/img/heroes/ishanhero.jpg",
    images: [
      "/assets/img/heroes/ihsan1.png",
      "/assets/img/heroes/ihsan2.png",
      "/assets/img/heroes/ihsan3.png",
      "/assets/img/heroes/ihsan4.png"
    ],
    achievements: [
      {
        title: "BORN",
        description: "27 January 1919",
        image: "/assets/img/heroes/ihsanachievement.png",
        year: ""
      },
      {
        title: "HOME TOWN",
        description: "Gilgit, Gilgit Baltistan",
        image: "/assets/img/heroes/ihsanachievement.png",
        year: ""
      },
      {
        title: "ACHIEVEMENTS",
        description: "Sitara-e-Jurat",
        image: "/assets/img/heroes/ihsanachievement.png",
        year: ""
      },
      {
        title: "UNIT",
        description: "Gilgit Scouts",
        image: "/assets/img/heroes/ihsanachievement.png",
        year: ""
      }
    ],
    category: "military"
  },
  {
    id: "hero-003",
    name: "Colonel Mirza Hassan",
    title: "Fateh-e-Gilgit wa Baltistan",
    lifespan: "1920 - 1995",
    excerpt: "Epitome of courage and audacious leadership who commanded Tiger Force during Gilgit Baltistan Liberation War.",
    bio: "Captain Hassan Khan was an epitome of courage and audacious leadership. During Gilgit Baltistan Liberation War, Tiger Force under his command was tasked to secure Traghbal Pass, Gurez and Kishanganga Valleys. On 04 March 1948, he left for Bandipura when Burzil and Traghbal Passes were under 10 -15 feet snow. On reaching Sundarwan, he learnt the presence of an enemy Brigade in Bandipura. The force occupied defenses at Traghbal Pass to check enemy advance towards Gurez Valley. Frontier Constabulary and Chitral Scouts also arrived in Kishanganga Valley and occupied the Traghbal Defile. In 1st week of June 1948, enemy unveiled its evil designs and launched first major attack towards Traghbal. Enemy advanced upto Gurez and captured the area with very well equipped and logistically supported force. Captain Hassan assessed the threat, mustered up the available troops and brought them forward. Before the enemy could resume advance, the vacant areas were re-occupied. Due to his daring leadership morale of own troops rose again and enemy advance halted. He launched a quick attack on Domel and Dudgai and recaptured the areas after stiff resistance. By the end of July 1948, situation on all fronts was considerably stabilized except Skardu and Leh. Gilgit Scouts were defending vast frontage with 3000 scouts and volunteers with very limited logistic support against highly trained Indian Army, triple in size and equipment. It was due to great determination, valour and selflessness by Captain Hassan that enabled the force to remain solid firm and gave serious setbacks to the enemy. He borne the brunt of fighting for six months but never complained owing to the noble cause. Because of his courageous acts, he was awarded \"Sitara-e-Jurat\". He was also given the title of \"Fateh-e-Gilgit wa Baltistan\".",
    thumbnail: "/assets/img/heroes/mirzahero.jpg",
    images: [
      "/assets/img/heroes/mirza1.png",
      "/assets/img/heroes/mirza2.png",
      "/assets/img/heroes/mirza3.png",
      "/assets/img/heroes/mirza4.png"
    ],
    achievements: [
      {
        title: "BORN",
        description: "1920",
        image: "/assets/img/heroes/mirzaachievement.png",
        year: ""
      },
      {
        title: "HOME TOWN",
        description: "Gilgit Baltistan",
        image: "/assets/img/heroes/mirzaachievement.png",
        year: ""
      },
      {
        title: "ACHIEVEMENTS",
        description: "Sitara-e-Jurat",
        image: "/assets/img/heroes/mirzaachievement.png",
        year: ""
      },
      {
        title: "TITLE",
        description: "Fateh-e-Gilgit wa Baltistan",
        image: "/assets/img/heroes/mirzaachievement.png",
        year: ""
      }
    ],
    category: "military"
  },
  {
    id: "hero-004",
    name: "Major Raja Baber Khan",
    title: "Fakhre-e-Kashmir",
    lifespan: "1910 - 1990",
    excerpt: "Notable figure in Gilgit's history known for his extraordinary courage who led local forces against Dogra rulers.",
    bio: "Raja Muhammad Babar Khan was born at Royal Palace of Nagar. He was son of great Mir of Nagar, Sir Shah Sikandar Khan. Babar Khan is a notable figure in Gilgit's history, known for his extra ordinary courage. He led the local forces against the Dogra rulers. Under his charismatic and bold leadership, local forces launched a successful uprising against the oppressive Dogra forces, leading to the liberation of the region. Babar Khan's military strategy and leadership were instrumental in achieving the victory, making a turning point in the struggle for independence of Gilgit-Baltistan. In 1935, he joined the traditional Gilgit Scouts by following his elders as Viceroy Commission Officer. Because of his impressive performance, he reached to the rank of Subedar Major, the highest rank given to the local muslim. On 31 October 1947, he revolted against Dogra Raj, took his Commanding Officer Major William Brown in confidence and arrested Governor Ghansara Singh. On 1 November 1947, at Gilgit Scouts Camp, for the first time he raised Pakistan Flag and announced freedom in huge gathering at playground. For next 15 days, there was an interim setup formed as Independent State of Gilgit and he was appointed as Quarter Master General till accession to Pakistan. In 1947-48 war, he led the liberation war by his bold planning and dynamic leadership and thus was able to contribute in liberation of 27,000 miles of an area from Indian Dogra Raj. Because of his heroic act, he was honoured with commission and served in Gilgit Scouts till his retirement as a Major. In recognition to his extraordinary act of bravery, he was awarded \"Sitara-e-Quaid-e-Azam\" equivalent to \"Sitara-e-Jurat\". Moreover, he was also given the title of \"Fakhre-e-Kashmir\".",
    thumbnail: "/assets/img/heroes/baburhero.jpg",
    images: [
      "/assets/img/heroes/babur1.png",
      "/assets/img/heroes/babur2.png",
      "/assets/img/heroes/babur3.png",
      "/assets/img/heroes/babur4.png"
    ],
    achievements: [
      {
        title: "BORN",
        description: "25 December 1917",
        image: "/assets/img/heroes/baburachievement.png",
        year: ""
      },
      {
        title: "HOME TOWN",
        description: "Nager, Gilgit Baltistan",
        image: "/assets/img/heroes/baburachievement.png",
        year: ""
      },
      {
        title: "ACHIEVEMENTS",
        description: "Sitara-e-Quaid-e-Azam",
        image: "/assets/img/heroes/baburachievement.png",
        year: ""
      },
      {
        title: "UNIT",
        description: "Gilgit Scouts",
        image: "/assets/img/heroes/baburachievement.png",
        year: ""
      }
    ],
    category: "military"
  },
  {
    id: "hero-005",
    name: "Captain Kernal Sher Khan",
    title: "Hero of Kargil Conflict",
    lifespan: "1970 - 1999",
    excerpt: "Legend who wrote unparalleled history of heroic deeds during Kargil Conflict 1999, forcing even the enemy to acknowledge his bravery.",
    bio: "During Kargil Conflict - 1999, Captain Karnal Sher Khan became a legend who wrote unparallel history of heroic deeds by performing feats of valour that even forced the enemy to acknowledge his bravery and courage. Some of his achievements included capturing of an Enemy Post (Enemy OP) in Domel Sector in January 1998, establishment of 7 posts in Goma Lungma Sector (Gultari) in April/ May 1999, successful conduct of an ambush on enemy foot convoy moving on track Mashko - Kanzalwan and raiding on enemy camp in Mashko Valley in June 1999. In first week of July 1999, Captain Sher was tasked to remove an enemy blocking position between own Kashif Post - 129B (Tiger Hill) and Wakeel Post - 129C. He was accompanied by 14 individuals during this operation including Captain Ammar Shaheed, Sitara-e-Jurat, and Naib Subedar Aleem Zar Shaheed, Sitara-e-Jurat. Sher attacked the enemy position at first light on 5 July 1999 from two sides, with a group of seven men each and after having fought a fierce battle of about one hour successfully cleared the enemy position; seven soldiers including Naib Subedar Aleem Zar embraced shahadat in this operation. While he sent Sepoy Ibrahim to get reinforcements, Captain Sher spotted another blocking position and heavy enemy concentration forming up for attack on Kashif Post. Despite heavy odds, he stunned the enemy by deciding to attack with remaining soldiers. During this daring action, all seven soldiers including Captain Sher was hit by a sniper and embraced shahadat. His heroic action forced the enemy to pull back, suffering heavy losses. His chivalry and unbridled courage were acknowledged by Indian Brigade Commander, \"He led fierce counter attacks, and no doubt FOUGHT LIKE A TIGER\".",
    thumbnail: "/assets/img/heroes/sherhero.jpg",
    images: [
      "/assets/img/heroes/sher1.png",
      "/assets/img/heroes/sher2.png",
      "/assets/img/heroes/sher3.png",
      "/assets/img/heroes/sher4.png",
      "/assets/img/heroes/sher5.png"
    ],
    achievements: [
      {
        title: "BORN",
        description: "1st January 1970",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      },
      {
        title: "HOME TOWN",
        description: "Fojoon Abad, Swabi",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      },
      {
        title: "ACHIEVEMENTS",
        description: "Nishan-e-Haider",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      },
      {
        title: "UNIT",
        description: "27 Sindh Regiment/12 NL",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      }
    ],
    category: "military"
  },
  {
    id: "hero-006",
    name: "Havildar Lalak Jan",
    title: "Nishan-e-Haider",
    lifespan: "1967 - 1999",
    bio: "In May 1999, while enemy was preparing for a major offensive Havildar Lalak Jan was serving in Company Headquarters. He volunteered to fight on the frontline. Lalak Jan valiantly defended Qadir Post with handful of men and repulsed numerous Indian leaving behind scores of dead bodies. On 7 July, enemy constantly engaged his post for the entire day with unprecedented fire power. It was followed by a three-pronged night attack. During the night a time came once all individuals on the post were either seriously injured or had embraced shahadat except Havildar Lalak Jan, who kept on fighting the enemy from one bunker to another never letting them know that he was the last man standing. He alone defended the post against intense enemy attacks throughout the night till arrival of reinforcements in the morning under Captain Kashif and Captain Ahmad. Despite being critically injured, he refused to be evacuated and successfully repulsed the attack, inflicting heavy losses on the enemy. Later, Havildar Lalak Jan succumbed to injuries and embraced shahadat while defending the motherland on Qadir Post. Several Indian accounts maintain, \"it had been the most gallant defensive action fought to the last man\".",
    excerpt: "Havildar Lalak Jan valiantly defended Qadir Post during the Kargil Conflict, fighting alone against intense enemy attacks throughout the night until reinforcements arrived.",
    thumbnail: "/assets/img/heroes/lalikjanhero.jpg",
    images: [
      "/assets/img/heroes/lalik1.png",
      "/assets/img/heroes/lalik2.png",
      "/assets/img/heroes/lalik3.png",
      "/assets/img/heroes/lalik4.png",
      "/assets/img/heroes/lalik5.png"
    ],
    achievements: [
      {
        title: "BORN",
        description: "1st April 1967",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      },
      {
        title: "HOME TOWN",
        description: "Hindor, Yasin, Gilgit Baltistan",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      },
      {
        title: "ACHIEVEMENTS",
        description: "Nishan-e-Haider",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      },
      {
        title: "UNIT",
        description: "12 NLI",
        image: "/assets/img/heroes/sherachievement.png",
        year: ""
      }
    ],
    category: "military"
  }
];
