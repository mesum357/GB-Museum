import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import { libraryAPI } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookOpen, Calendar, User, Star, Download, Loader2, Send } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Book {
  _id: string;
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
}

interface Review {
  _id: string;
  userName: string;
  email?: string;
  rating: number;
  comment: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const bookCategories = [
  "All",
  "History",
  "Culture",
  "Geography",
  "Archaeology",
  "Art & Heritage",
  "Literature",
];

const Library = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showBookModal, setShowBookModal] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: "",
    email: "",
    rating: 5,
    comment: "",
  });
  const queryClient = useQueryClient();

  // Fetch books
  const { data: booksData, isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await libraryAPI.getAll();
      return response.data;
    },
  });

  // Fetch book details
  const { data: bookDetails, refetch: refetchBookDetails } = useQuery({
    queryKey: ["book", selectedBook?._id],
    queryFn: async () => {
      if (!selectedBook?._id) return null;
      const response = await libraryAPI.getById(selectedBook._id);
      return response.data;
    },
    enabled: !!selectedBook?._id,
  });

  // Add review mutation
  const addReviewMutation = useMutation({
    mutationFn: ({ bookId, reviewData }: { bookId: string; reviewData: any }) =>
      libraryAPI.addReview(bookId, reviewData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your review has been submitted and is pending approval",
      });
      queryClient.invalidateQueries({ queryKey: ["books"] });
      if (selectedBook) {
        refetchBookDetails();
      }
      setNewReview({ userName: "", email: "", rating: 5, comment: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive",
      });
    },
  });

  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setShowBookModal(true);
  };

  const handleAddReview = () => {
    if (!selectedBook || !newReview.userName || !newReview.comment) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addReviewMutation.mutate({
      bookId: selectedBook._id,
      reviewData: {
        userName: newReview.userName,
        email: newReview.email || undefined,
        rating: newReview.rating,
        comment: newReview.comment,
      },
    });
  };

  const getApprovedReviews = (book: Book | null): Review[] => {
    if (!book || !book.reviews) return [];
    return book.reviews.filter((review) => review.status === "approved");
  };

  const filteredBooks =
    selectedCategory === "All"
      ? booksData || []
      : (booksData || []).filter((book: Book) => book.category === selectedCategory);

  const displayBook = bookDetails || selectedBook;
  const approvedReviews = displayBook ? getApprovedReviews(displayBook) : [];

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
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No books available in this category.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book: Book, index: number) => {
              const approvedReviews = getApprovedReviews(book);
              return (
            <motion.div
                  key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => handleViewBook(book)}
              >
                <CardHeader className="p-0">
                  <img
                        src={book.cover?.startsWith('http') ? book.cover : `http://localhost:5000${book.cover}`}
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
                            <span className="text-sm font-medium">
                              {book.rating > 0 ? book.rating.toFixed(1) : "0.0"}
                            </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                            ({approvedReviews.length} reviews)
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
              );
            })}
        </div>
        )}
      </section>

      {/* Book Detail Modal */}
      <Dialog open={showBookModal} onOpenChange={setShowBookModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{displayBook?.title}</DialogTitle>
            <DialogDescription>
              {displayBook?.category} • {displayBook?.author} • {displayBook?.year}
            </DialogDescription>
          </DialogHeader>
          {displayBook && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <img
                  src={displayBook.cover?.startsWith('http') ? displayBook.cover : `http://localhost:5000${displayBook.cover}`}
                  alt={displayBook.title}
                  className="w-48 h-72 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground">
                      {displayBook.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold">Pages:</span> {displayBook.pages}
                    </div>
                    <div>
                      <span className="font-semibold">Rating:</span>{" "}
                      {displayBook.rating > 0 ? displayBook.rating.toFixed(1) : "0.0"}/5
                    </div>
                    <div>
                      <span className="font-semibold">Reviews:</span> {approvedReviews.length}
                    </div>
                  </div>
                  {displayBook.pdfUrl && (
                    <Button
                      onClick={() => {
                        const url = displayBook.pdfUrl.startsWith('http')
                          ? displayBook.pdfUrl
                          : `http://localhost:5000${displayBook.pdfUrl}`;
                        window.open(url, '_blank');
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="pt-6 border-t">
                <h3 className="text-xl font-bold mb-4">
                  Reviews ({approvedReviews.length})
                </h3>

                {/* Add Review Form */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reviewerName">Name *</Label>
                          <Input
                            id="reviewerName"
                            placeholder="Your name"
                            value={newReview.userName}
                            onChange={(e) =>
                              setNewReview({ ...newReview, userName: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reviewerEmail">Email (optional)</Label>
                          <Input
                            id="reviewerEmail"
                            type="email"
                            placeholder="your.email@example.com"
                            value={newReview.email}
                            onChange={(e) =>
                              setNewReview({ ...newReview, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rating">Rating *</Label>
                        <Select
                          value={newReview.rating.toString()}
                          onValueChange={(value) =>
                            setNewReview({ ...newReview, rating: parseInt(value) })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <SelectItem key={rating} value={rating.toString()}>
                                {rating} Star{rating > 1 ? "s" : ""}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reviewComment">Comment *</Label>
                        <Textarea
                          id="reviewComment"
                          placeholder="Write your review here..."
                          value={newReview.comment}
                          onChange={(e) =>
                            setNewReview({ ...newReview, comment: e.target.value })
                          }
                          rows={4}
                        />
                      </div>
                      <Button
                        onClick={handleAddReview}
                        disabled={
                          !newReview.userName ||
                          !newReview.comment ||
                          addReviewMutation.isPending
                        }
                      >
                        {addReviewMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Review
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List - Only show approved reviews */}
                <div className="space-y-4">
                  {approvedReviews.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      No reviews yet. Be the first to review!
                    </p>
                  ) : (
                    approvedReviews.map((review: Review) => (
                      <Card key={review._id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                {review.userName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold">{review.userName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="font-semibold">{review.rating}/5</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-3">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Library;
