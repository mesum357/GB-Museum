export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  type: 'image' | 'video';
  category: string;
  tags: string[];
  year?: number;
  location?: string;
  photographer?: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const galleryCategories: GalleryCategory[] = [
  {
    id: 'landscapes',
    name: 'Landscapes',
    description: 'Breathtaking mountain views and natural beauty',
    icon: '🏔️',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'culture',
    name: 'Culture & Traditions',
    description: 'Traditional ceremonies and cultural practices',
    icon: '🎭',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'architecture',
    name: 'Architecture',
    description: 'Historic buildings and traditional structures',
    icon: '🏛️',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'people',
    name: 'People & Portraits',
    description: 'Local communities and their daily lives',
    icon: '👥',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'heritage',
    name: 'Heritage Sites',
    description: 'Ancient monuments and archaeological sites',
    icon: '🏺',
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 'festivals',
    name: 'Festivals & Events',
    description: 'Celebrations and cultural events',
    icon: '🎉',
    color: 'from-indigo-500 to-purple-500'
  }
];

export const galleryItems: GalleryItem[] = [
  // Landscapes
  {
    id: 'landscape-1',
    title: 'Karakoram Range at Dawn',
    description: 'The majestic Karakoram mountain range bathed in golden morning light, showcasing the raw beauty of Gilgit-Baltistan\'s landscape.',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    alt: 'Karakoram mountain range at sunrise',
    type: 'image',
    category: 'landscapes',
    tags: ['mountains', 'sunrise', 'karakoram', 'nature'],
    year: 2023,
    location: 'Hunza Valley',
    photographer: 'Ahmed Ali'
  },
  {
    id: 'landscape-2',
    title: 'Naltar Valley Lakes',
    description: 'Crystal clear alpine lakes surrounded by dense pine forests in the Naltar Valley, a hidden gem of the region.',
    src: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
    alt: 'Alpine lakes in Naltar Valley',
    type: 'image',
    category: 'landscapes',
    tags: ['lakes', 'forests', 'naltar', 'alpine'],
    year: 2023,
    location: 'Naltar Valley',
    photographer: 'Fatima Khan'
  },
  {
    id: 'landscape-3',
    title: 'Deosai Plains',
    description: 'The vast Deosai National Park, known as the "Land of Giants", with its rolling grasslands and wildflowers.',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    alt: 'Deosai plains with wildflowers',
    type: 'image',
    category: 'landscapes',
    tags: ['plains', 'wildflowers', 'deosai', 'national-park'],
    year: 2022,
    location: 'Deosai National Park',
    photographer: 'Ibrahim Shah'
  },

  // Culture & Traditions
  {
    id: 'culture-1',
    title: 'Traditional Wedding Ceremony',
    description: 'A traditional Balti wedding ceremony showcasing the rich cultural heritage and colorful traditional attire.',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    alt: 'Traditional wedding ceremony',
    type: 'image',
    category: 'culture',
    tags: ['wedding', 'traditional', 'balti', 'ceremony'],
    year: 2023,
    location: 'Skardu',
    photographer: 'Ayesha Khan'
  },
  {
    id: 'culture-2',
    title: 'Folk Music Performance',
    description: 'Local musicians performing traditional folk songs using indigenous instruments, preserving the musical heritage.',
    src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=800&fit=crop',
    alt: 'Folk music performance',
    type: 'video',
    category: 'culture',
    tags: ['music', 'folk', 'instruments', 'performance'],
    year: 2023,
    location: 'Gilgit',
    photographer: 'Hassan Ali'
  },
  {
    id: 'culture-3',
    title: 'Traditional Handicrafts',
    description: 'Skilled artisans creating beautiful handicrafts including woodwork, textiles, and pottery using traditional techniques.',
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    alt: 'Traditional handicrafts being made',
    type: 'image',
    category: 'culture',
    tags: ['handicrafts', 'artisans', 'traditional', 'crafts'],
    year: 2023,
    location: 'Hunza',
    photographer: 'Zara Ahmed'
  },

  // Architecture
  {
    id: 'architecture-1',
    title: 'Baltit Fort',
    description: 'The historic Baltit Fort in Hunza, a UNESCO World Heritage site showcasing traditional mountain architecture.',
    src: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=800&fit=crop',
    alt: 'Baltit Fort in Hunza',
    type: 'image',
    category: 'architecture',
    tags: ['fort', 'hunza', 'historic', 'unesco'],
    year: 2022,
    location: 'Hunza Valley',
    photographer: 'Muhammad Ali'
  },
  {
    id: 'architecture-2',
    title: 'Traditional Stone Houses',
    description: 'Ancient stone houses built using traditional techniques, perfectly adapted to the mountain environment.',
    src: 'https://images.unsplash.com/photo-1583483425010-c566431a7710?w=1200&h=800&fit=crop',
    alt: 'Traditional stone houses',
    type: 'image',
    category: 'architecture',
    tags: ['houses', 'stone', 'traditional', 'mountain'],
    year: 2023,
    location: 'Skardu',
    photographer: 'Sara Khan'
  },
  {
    id: 'architecture-3',
    title: 'Ancient Buddhist Stupas',
    description: 'Well-preserved Buddhist stupas and monasteries dating back to the 7th century, showcasing the region\'s Buddhist heritage.',
    src: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1200&h=800&fit=crop',
    alt: 'Ancient Buddhist stupas',
    type: 'image',
    category: 'architecture',
    tags: ['buddhist', 'stupas', 'ancient', 'monastery'],
    year: 2022,
    location: 'Gilgit',
    photographer: 'Ali Hassan'
  },

  // People & Portraits
  {
    id: 'people-1',
    title: 'Elderly Storyteller',
    description: 'An elderly man sharing stories of the past, keeping the oral tradition alive for younger generations.',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop',
    alt: 'Elderly storyteller',
    type: 'image',
    category: 'people',
    tags: ['elderly', 'storyteller', 'tradition', 'wisdom'],
    year: 2023,
    location: 'Hunza',
    photographer: 'Fatima Ali'
  },
  {
    id: 'people-2',
    title: 'Children at Play',
    description: 'Local children playing traditional games in the village square, showcasing the simple joys of mountain life.',
    src: 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=800&fit=crop',
    alt: 'Children playing traditional games',
    type: 'image',
    category: 'people',
    tags: ['children', 'games', 'village', 'joy'],
    year: 2023,
    location: 'Skardu',
    photographer: 'Ahmed Khan'
  },
  {
    id: 'people-3',
    title: 'Mountain Guide',
    description: 'An experienced mountain guide sharing his knowledge of the local terrain and climbing routes.',
    src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1200&h=800&fit=crop',
    alt: 'Mountain guide',
    type: 'image',
    category: 'people',
    tags: ['guide', 'mountains', 'experience', 'knowledge'],
    year: 2023,
    location: 'Gilgit',
    photographer: 'Ibrahim Shah'
  },

  // Heritage Sites
  {
    id: 'heritage-1',
    title: 'Ancient Rock Carvings',
    description: 'Intricate rock carvings depicting Buddhist art and ancient scripts, dating back over a thousand years.',
    src: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1200&h=800&fit=crop',
    alt: 'Ancient rock carvings',
    type: 'image',
    category: 'heritage',
    tags: ['rock-carvings', 'buddhist', 'ancient', 'art'],
    year: 2022,
    location: 'Gilgit',
    photographer: 'Ayesha Khan'
  },
  {
    id: 'heritage-2',
    title: 'Silk Route Caravanserai',
    description: 'Remains of an ancient caravanserai that once served travelers on the historic Silk Route.',
    src: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=800&fit=crop',
    alt: 'Silk Route caravanserai',
    type: 'image',
    category: 'heritage',
    tags: ['silk-route', 'caravanserai', 'ancient', 'trade'],
    year: 2022,
    location: 'Hunza',
    photographer: 'Hassan Ali'
  },
  {
    id: 'heritage-3',
    title: 'Ancient Petroglyphs',
    description: 'Prehistoric petroglyphs carved into rock faces, providing insights into the region\'s early inhabitants.',
    src: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=1200&h=800&fit=crop',
    alt: 'Ancient petroglyphs',
    type: 'image',
    category: 'heritage',
    tags: ['petroglyphs', 'prehistoric', 'rock-art', 'ancient'],
    year: 2022,
    location: 'Skardu',
    photographer: 'Zara Ahmed'
  },

  // Festivals & Events
  {
    id: 'festival-1',
    title: 'Shandur Polo Festival',
    description: 'The world\'s highest polo ground hosts this annual festival, attracting teams from across the region.',
    src: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&h=800&fit=crop',
    alt: 'Shandur Polo Festival',
    type: 'video',
    category: 'festivals',
    tags: ['polo', 'festival', 'shandur', 'sports'],
    year: 2023,
    location: 'Shandur Pass',
    photographer: 'Muhammad Ali'
  },
  {
    id: 'festival-2',
    title: 'Cherry Blossom Festival',
    description: 'Annual celebration of cherry blossoms in Hunza Valley, marking the arrival of spring in the mountains.',
    src: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200&h=800&fit=crop',
    alt: 'Cherry Blossom Festival',
    type: 'image',
    category: 'festivals',
    tags: ['cherry-blossom', 'spring', 'hunza', 'celebration'],
    year: 2023,
    location: 'Hunza Valley',
    photographer: 'Sara Khan'
  },
  {
    id: 'festival-3',
    title: 'Cultural Dance Performance',
    description: 'Traditional dance performances during the annual cultural festival, showcasing the region\'s diverse dance forms.',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop',
    alt: 'Cultural dance performance',
    type: 'video',
    category: 'festivals',
    tags: ['dance', 'cultural', 'festival', 'performance'],
    year: 2023,
    location: 'Gilgit',
    photographer: 'Ali Hassan'
  }
];

export const getItemsByCategory = (categoryId: string): GalleryItem[] => {
  return galleryItems.filter(item => item.category === categoryId);
};

export const getItemById = (id: string): GalleryItem | undefined => {
  return galleryItems.find(item => item.id === id);
};

export const searchItems = (query: string): GalleryItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return galleryItems.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
