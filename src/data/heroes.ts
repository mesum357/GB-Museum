export interface Hero {
  id: string;
  name: string;
  lifespan: string;
  bio: string;
  excerpt: string;
  thumbnail: string;
  images: string[];
}

export const heroes: Hero[] = [
  {
    id: "hero-001",
    name: "Mir Wazir Ali Khan",
    lifespan: "1920 - 1999",
    excerpt: "Freedom fighter and political leader who played a crucial role in Gilgit-Baltistan's liberation movement.",
    bio: "Mir Wazir Ali Khan was a prominent freedom fighter and political activist who dedicated his life to the liberation of Gilgit-Baltistan. He led numerous campaigns for political autonomy and worked tirelessly to improve the lives of the local people. His leadership during the 1947 liberation movement remains a cornerstone of the region's modern history.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "hero-002",
    name: "Colonel Hassan Khan",
    lifespan: "1910 - 1988",
    excerpt: "Military hero who led the Gilgit Scouts during the liberation war of 1947.",
    bio: "Colonel Hassan Khan was a distinguished military officer who commanded the Gilgit Scouts during the crucial liberation war of 1947. His strategic brilliance and leadership helped secure freedom for Gilgit-Baltistan. He was known for his bravery, tactical expertise, and deep commitment to the people of the region.",
    thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "hero-003",
    name: "Bibi Zainab",
    lifespan: "1925 - 2010",
    excerpt: "Pioneering educator and women's rights advocate who established the first girls' school in Gilgit.",
    bio: "Bibi Zainab was a trailblazer for women's education in Gilgit-Baltistan. In 1955, she established the region's first girls' school, facing significant social resistance but persevering with unwavering determination. Her work opened doors for thousands of young women to pursue education and empowered an entire generation. She continued her advocacy work well into her later years.",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop"
    ]
  },
  {
    id: "hero-004",
    name: "Nawab Khan",
    lifespan: "1890 - 1965",
    excerpt: "Cultural preservationist who documented traditional music and folklore of Gilgit-Baltistan.",
    bio: "Nawab Khan dedicated his life to preserving the rich cultural heritage of Gilgit-Baltistan. He traveled extensively throughout the region, recording traditional songs, folk tales, and historical narratives from elders. His extensive documentation efforts saved countless cultural treasures from being lost to time and remain invaluable resources for researchers and cultural institutions today.",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop"
    ]
  }
];
