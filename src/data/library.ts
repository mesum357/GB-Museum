export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  description: string;
  cover: string;
  pages: number;
}

export const bookCategories = [
  "History",
  "Culture",
  "Geography",
  "Archaeology",
  "Art & Heritage",
  "Literature"
];

export const books: Book[] = [
  {
    id: "book-001",
    title: "Ancient Trails of Gilgit-Baltistan",
    author: "Dr. Ahmed Hassan",
    category: "History",
    year: 2018,
    description: "A comprehensive study of the historical trade routes and ancient civilizations that shaped Gilgit-Baltistan.",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    pages: 342
  },
  {
    id: "book-002",
    title: "Cultural Heritage of the Karakoram",
    author: "Sarah Khan",
    category: "Culture",
    year: 2020,
    description: "An exploration of the diverse cultural traditions, festivals, and customs of the Karakoram region.",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
    pages: 278
  },
  {
    id: "book-003",
    title: "Rock Art and Petroglyphs",
    author: "Prof. Muhammad Ali",
    category: "Archaeology",
    year: 2019,
    description: "Documentation and analysis of ancient rock carvings and petroglyphs found throughout the region.",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    pages: 156
  },
  {
    id: "book-004",
    title: "Geography of High Mountains",
    author: "Dr. Fatima Noor",
    category: "Geography",
    year: 2021,
    description: "A detailed geographical survey of the highest mountain ranges and their ecological significance.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    pages: 412
  },
  {
    id: "book-005",
    title: "Traditional Crafts and Artisans",
    author: "Zainab Mirza",
    category: "Art & Heritage",
    year: 2017,
    description: "Showcasing the traditional craftsmanship and artistic heritage of Gilgit-Baltistan's artisans.",
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
    pages: 224
  },
  {
    id: "book-006",
    title: "Folk Tales of the North",
    author: "Hassan Karim",
    category: "Literature",
    year: 2022,
    description: "A collection of traditional folk tales, legends, and oral histories passed down through generations.",
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
    pages: 198
  }
];
