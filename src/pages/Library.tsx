import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import BookModal from "@/components/shared/BookModal";
import { books, bookCategories, Book, Review } from "@/data/library";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, User, Star } from "lucide-react";

const Library = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [booksData, setBooksData] = useState<Book[]>(books);

  const filteredBooks = selectedCategory === "All" 
    ? booksData 
    : booksData.filter(book => book.category === selectedCategory);

  const handleAddReview = (bookId: string, review: Omit<Review, 'id'>) => {
    setBooksData(prevBooks => 
      prevBooks.map(book => {
        if (book.id === bookId) {
          const newReview: Review = {
            ...review,
            id: `review-${Date.now()}`
          };
          const updatedReviews = [...book.reviews, newReview];
          const newRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length;
          return {
            ...book,
            reviews: updatedReviews,
            rating: Math.round(newRating * 10) / 10,
            reviewCount: updatedReviews.length
          };
        }
        return book;
      })
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Museum Library"
        subtitle="Explore our collection of books on history, culture, and heritage"
        image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1920"
      />

      <section className="container mx-auto px-4 py-16">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant={selectedCategory === "All" ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm"
              onClick={() => setSelectedCategory("All")}
            >
              All Books
            </Badge>
            {bookCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedBook(book)}
              >
                <CardHeader className="p-0">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <Badge className="mb-2">{book.category}</Badge>
                  <CardTitle className="mb-2 line-clamp-2">{book.title}</CardTitle>
                  <CardDescription className="mb-4 line-clamp-3">
                    {book.description}
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {book.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {book.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium">{book.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({book.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Book Detail Modal */}
      <BookModal
        book={selectedBook}
        isOpen={!!selectedBook}
        onClose={() => setSelectedBook(null)}
        onAddReview={handleAddReview}
      />
    </div>
  );
};

export default Library;
