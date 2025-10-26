export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: number;
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-001",
    title: "Discovering Hidden Gems: A Journey Through Gilgit's Museums",
    author: "Ayesha Rahman",
    date: "2024-03-15",
    excerpt: "Join me as I explore the rich cultural heritage preserved in Gilgit's museums and uncover stories from centuries past.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
    category: "Museum Tours",
    readTime: 8
  },
  {
    id: "blog-002",
    title: "The Silk Route: Then and Now",
    author: "Ali Hussain",
    date: "2024-03-10",
    excerpt: "Exploring how the ancient Silk Route has shaped modern Gilgit-Baltistan and its cultural identity.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
    category: "History",
    readTime: 12
  },
  {
    id: "blog-003",
    title: "Traditional Craftsmanship: Meeting Local Artisans",
    author: "Nadia Khan",
    date: "2024-03-05",
    excerpt: "A deep dive into the traditional crafts that have been passed down through generations in Gilgit-Baltistan.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
    category: "Culture",
    readTime: 10
  },
  {
    id: "blog-004",
    title: "Rock Art: Ancient Messages from Our Ancestors",
    author: "Dr. Imran Malik",
    date: "2024-02-28",
    excerpt: "Understanding the significance of ancient petroglyphs and what they tell us about early civilizations.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    category: "Archaeology",
    readTime: 15
  },
  {
    id: "blog-005",
    title: "Festival Colors: Celebrating Cultural Diversity",
    author: "Sana Akhtar",
    date: "2024-02-20",
    excerpt: "A vibrant look at the festivals and celebrations that bring communities together in Gilgit-Baltistan.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800",
    category: "Culture",
    readTime: 6
  },
  {
    id: "blog-006",
    title: "Mountain Ecology: Preserving Our Natural Heritage",
    author: "Farhan Ahmed",
    date: "2024-02-15",
    excerpt: "Examining the unique ecological systems of the Karakoram and efforts to preserve them for future generations.",
    content: "Full blog content would go here...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    category: "Environment",
    readTime: 9
  }
];
