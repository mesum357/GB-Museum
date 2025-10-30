export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  year: number;
  description: string;
  cover: string;
  pages: number;
  pdfUrl: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  contentPages: string[];
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
    description: "A comprehensive study of the historical trade routes and ancient civilizations that shaped Gilgit-Baltistan. This meticulously researched work explores the Silk Route connections, ancient settlements, and the cultural exchanges that occurred along these historic pathways. The book provides detailed archaeological evidence and historical accounts that shed light on the region's significance as a crossroads of civilizations.",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    pages: 342,
    pdfUrl: "/pdfs/ancient-trails-gilgit-baltistan.pdf",
    rating: 4.5,
    reviewCount: 23,
    contentPages: [
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=1000&fit=crop"
    ],
    reviews: [
      {
        id: "review-001",
        userName: "Ahmad Khan",
        rating: 5,
        comment: "Excellent research and comprehensive coverage of the region's history. Highly recommended for anyone interested in Gilgit-Baltistan's ancient past.",
        date: "2024-01-15"
      },
      {
        id: "review-002",
        userName: "Sarah Ahmed",
        rating: 4,
        comment: "Very informative book with great historical insights. The maps and illustrations are particularly helpful.",
        date: "2024-01-10"
      }
    ]
  },
  {
    id: "book-002",
    title: "Cultural Heritage of the Karakoram",
    author: "Sarah Khan",
    category: "Culture",
    year: 2020,
    description: "An exploration of the diverse cultural traditions, festivals, and customs of the Karakoram region. This book delves into the rich tapestry of local cultures, documenting traditional practices, religious ceremonies, and community celebrations that have been preserved for centuries. It includes detailed accounts of local festivals, traditional music, dance forms, and the unique customs that define the cultural identity of the region.",
    cover: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
    pages: 278,
    pdfUrl: "/pdfs/cultural-heritage-karakoram.pdf",
    rating: 4.2,
    reviewCount: 18,
    contentPages: [
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=1000&fit=crop"
    ],
    reviews: [
      {
        id: "review-003",
        userName: "Mirza Hassan",
        rating: 4,
        comment: "Beautiful documentation of our cultural heritage. The photographs are stunning and really bring the traditions to life.",
        date: "2024-01-08"
      }
    ]
  },
  {
    id: "book-003",
    title: "Rock Art and Petroglyphs",
    author: "Prof. Muhammad Ali",
    category: "Archaeology",
    year: 2019,
    description: "Documentation and analysis of ancient rock carvings and petroglyphs found throughout the region. This scholarly work presents a systematic study of prehistoric rock art, providing detailed analysis of motifs, techniques, and cultural significance. The book includes high-quality photographs and detailed drawings of the most significant petroglyph sites, along with interpretations of their historical and cultural meaning.",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    pages: 156,
    pdfUrl: "/pdfs/rock-art-petroglyphs.pdf",
    rating: 4.8,
    reviewCount: 31,
    contentPages: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=1000&fit=crop"
    ],
    reviews: [
      {
        id: "review-004",
        userName: "Dr. Fatima",
        rating: 5,
        comment: "Outstanding archaeological documentation. This book is a must-have for anyone studying prehistoric art in the region.",
        date: "2024-01-12"
      },
      {
        id: "review-005",
        userName: "Ali Raza",
        rating: 4,
        comment: "Fascinating insights into ancient civilizations. The analysis is thorough and well-presented.",
        date: "2024-01-05"
      }
    ]
  },
  {
    id: "book-004",
    title: "Geography of High Mountains",
    author: "Dr. Fatima Noor",
    category: "Geography",
    year: 2021,
    description: "A detailed geographical survey of the highest mountain ranges and their ecological significance. This comprehensive study examines the geological formations, climate patterns, and unique ecosystems of the high-altitude regions. The book provides detailed analysis of glacial systems, alpine vegetation, and the impact of climate change on these fragile mountain environments.",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    pages: 412,
    pdfUrl: "/pdfs/geography-high-mountains.pdf",
    rating: 4.3,
    reviewCount: 15,
    contentPages: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800&h=1000&fit=crop"
    ],
    reviews: [
      {
        id: "review-006",
        userName: "Hassan Ali",
        rating: 4,
        comment: "Comprehensive geographical study with excellent maps and diagrams. Very informative for geography students.",
        date: "2024-01-14"
      }
    ]
  },
  {
    id: "book-005",
    title: "Traditional Crafts and Artisans",
    author: "Zainab Mirza",
    category: "Art & Heritage",
    year: 2017,
    description: "Showcasing the traditional craftsmanship and artistic heritage of Gilgit-Baltistan's artisans. This beautifully illustrated book documents the skills and techniques of local craftspeople, from woodcarving and metalwork to textile weaving and pottery. It includes interviews with master artisans and detailed explanations of traditional methods that have been passed down through generations.",
    cover: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400",
    pages: 224,
    pdfUrl: "/pdfs/traditional-crafts-artisans.pdf",
    rating: 4.6,
    reviewCount: 27,
    contentPages: [
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=1000&fit=crop"
    ],
    reviews: [
      {
        id: "review-007",
        userName: "Noor Khan",
        rating: 5,
        comment: "Amazing documentation of our traditional crafts. The stories of the artisans are truly inspiring.",
        date: "2024-01-11"
      },
      {
        id: "review-008",
        userName: "Amina Shah",
        rating: 4,
        comment: "Beautiful book that preserves our cultural heritage. The photographs are exceptional.",
        date: "2024-01-09"
      }
    ]
  },
  {
    id: "book-006",
    title: "Folk Tales of the North",
    author: "Hassan Karim",
    category: "Literature",
    year: 2022,
    description: "A collection of traditional folk tales, legends, and oral histories passed down through generations. This enchanting compilation brings together the most beloved stories from the region, including tales of heroes, mythical creatures, and moral lessons that have shaped local culture. Each story is presented with cultural context and explanations of traditional values and beliefs.",
    cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400",
    pages: 198,
    pdfUrl: "/pdfs/folk-tales-north.pdf",
    rating: 4.4,
    reviewCount: 19,
    contentPages: [
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=1000&fit=crop"
    ],
    reviews: [
      {
        id: "review-009",
        userName: "Karim Ali",
        rating: 4,
        comment: "Wonderful collection of stories that capture the spirit of our region. Great for both children and adults.",
        date: "2024-01-13"
      }
    ]
  }
];
