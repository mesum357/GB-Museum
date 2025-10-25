export interface HistoryEvent {
  date: string;
  title: string;
  body: string;
  images?: string[];
}

export const poloHistory: HistoryEvent[] = [
  {
    date: "6th Century BCE",
    title: "Origins of Mountain Polo",
    body: "The ancient game of polo originated in the mountainous regions of Central Asia, with Gilgit-Baltistan being one of its earliest homes. Warriors and nobility played the game as both sport and military training.",
    images: ["https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=400&h=300&fit=crop"]
  },
  {
    date: "15th-17th Century",
    title: "Royal Patronage",
    body: "Local rulers and nobility of Gilgit-Baltistan became ardent patrons of polo. The game evolved into a prestigious sport with elaborate ceremonies and became deeply intertwined with regional identity.",
  },
  {
    date: "1936",
    title: "Shandur Polo Festival Established",
    body: "The legendary Shandur Polo Festival was officially established at the world's highest polo ground (12,200 feet). This annual event became a symbol of cultural pride and attracted visitors from around the world.",
    images: ["https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400&h=300&fit=crop"]
  },
  {
    date: "Present Day",
    title: "Living Heritage",
    body: "Polo continues to thrive in Gilgit-Baltistan as a living cultural heritage. The Shandur Polo Festival draws thousands of spectators annually, and local teams maintain the centuries-old traditions while adapting to modern sports standards.",
  }
];

export const silkRouteHistory: HistoryEvent[] = [
  {
    date: "2nd Century BCE",
    title: "Ancient Trade Networks Emerge",
    body: "Gilgit-Baltistan became a crucial junction on the ancient Silk Route, connecting China, Central Asia, and the Indian subcontinent. Caravans carrying silk, spices, precious stones, and ideas passed through these mountain valleys.",
    images: ["https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=400&h=300&fit=crop"]
  },
  {
    date: "5th-7th Century CE",
    title: "Buddhist Pilgrimage Center",
    body: "The region flourished as a major center of Buddhist learning and pilgrimage. Monasteries and stupas were constructed, and scholars from across Asia traveled here to study. Rock carvings and inscriptions from this period still dot the landscape.",
  },
  {
    date: "8th-15th Century",
    title: "Cultural Exchange Flourishes",
    body: "As trade intensified, Gilgit-Baltistan became a melting pot of cultures, languages, and artistic traditions. Persian, Chinese, Tibetan, and Indian influences merged, creating the region's unique cultural synthesis.",
  },
  {
    date: "Modern Era",
    title: "Karakoram Highway",
    body: "The construction of the Karakoram Highway (KKH) in the 1960s-70s revived the ancient Silk Route. Today, the KKH serves as a vital trade and tourism corridor, connecting Pakistan with China and beyond.",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"]
  }
];

export const liberationWarHistory: HistoryEvent[] = [
  {
    date: "October 1947",
    title: "Beginning of the Struggle",
    body: "Local forces, led by brave freedom fighters, initiated the liberation movement against the oppressive rule. The Gilgit Scouts, under Colonel Hassan Khan, played a pivotal role in organizing the resistance.",
  },
  {
    date: "November 1, 1947",
    title: "Declaration of Independence",
    body: "On November 1, 1947, the people of Gilgit-Baltistan declared their independence and chose to accede to Pakistan. This momentous decision was the culmination of brave sacrifices by local leaders and fighters.",
    images: ["https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=300&fit=crop"]
  },
  {
    date: "1947-1948",
    title: "Consolidation and Integration",
    body: "Following liberation, the region underwent political reorganization. Local governance structures were established, and efforts began to integrate the region into the broader political framework while respecting local autonomy.",
  },
  {
    date: "Legacy",
    title: "Remembering the Heroes",
    body: "The liberation war left an indelible mark on the collective memory of Gilgit-Baltistan. Annual commemorations honor the sacrifices of those who fought for freedom, and their stories continue to inspire new generations.",
  }
];
