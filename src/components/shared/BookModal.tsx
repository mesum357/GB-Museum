import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Star, MessageCircle, Calendar, User, BookOpen, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Book, Review } from "@/data/library";

interface BookModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (bookId: string, review: Omit<Review, 'id'>) => void;
}

const BookModal = ({ book, isOpen, onClose, onAddReview }: BookModalProps) => {
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 5,
    comment: ""
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [showContentSlider, setShowContentSlider] = useState(false);

  const handleSubmitReview = () => {
    if (book && newReview.userName.trim() && newReview.comment.trim()) {
      onAddReview(book.id, {
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      });
      setNewReview({ userName: "", rating: 5, comment: "" });
    }
  };

  const handleDownload = () => {
    if (book) {
      // Create a temporary link to trigger download
      const link = document.createElement('a');
      link.href = book.pdfUrl;
      link.download = `${book.title}.pdf`;
      link.click();
    }
  };

  const nextPage = () => {
    if (book && currentPageIndex < book.contentPages.length - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const prevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const toggleContentSlider = () => {
    setShowContentSlider(!showContentSlider);
    setCurrentPageIndex(0);
  };

  // Add keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="fixed inset-4 bg-background rounded-lg shadow-2xl overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-muted/50">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{book.category}</Badge>
              <h1 className="text-2xl font-bold">{book.title}</h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {showContentSlider ? (
                /* Content Slider View */
                <div className="h-full flex flex-col">
                  {/* Slider Header */}
                  <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleContentSlider}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Back to Details
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        Page {currentPageIndex + 1} of {book.contentPages.length}
                      </span>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                        Scroll to view full content
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={prevPage}
                        disabled={currentPageIndex === 0}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={nextPage}
                        disabled={currentPageIndex === book.contentPages.length - 1}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Content Page */}
                  <div className="flex-1 overflow-y-auto p-4 bg-muted/10 scrollbar-thin">
                    <div className="max-w-4xl mx-auto min-h-full flex items-start justify-center">
                      <img
                        src={book.contentPages[currentPageIndex]}
                        alt={`${book.title} - Page ${currentPageIndex + 1}`}
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>

                  {/* Page Indicators */}
                  <div className="flex justify-center gap-2 p-4 border-t bg-muted/30">
                    {book.contentPages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentPageIndex 
                            ? "bg-primary" 
                            : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                /* Normal Details View */
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                  {/* Left Column - Book Info */}
                  <div className="space-y-6">
                    {/* Book Cover */}
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Book Details */}
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span><strong>Author:</strong> {book.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span><strong>Year:</strong> {book.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />
                          <span><strong>Pages:</strong> {book.pages}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span><strong>Rating:</strong> {book.rating}/5 ({book.reviewCount} reviews)</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        onClick={toggleContentSlider}
                        className="w-full bg-secondary hover:bg-secondary/90"
                        size="lg"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Full Content
                      </Button>
                      <Button 
                        onClick={handleDownload}
                        className="w-full bg-primary hover:bg-primary/90"
                        size="lg"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Description & Reviews */}
                  <div className="space-y-6">
                    {/* Description */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-3">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {book.description}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Reviews Section */}
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                          <MessageCircle className="h-5 w-5" />
                          Reviews & Ratings
                        </h3>

                        {/* Average Rating */}
                        <div className="flex items-center gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                          <div className="text-3xl font-bold">{book.rating}</div>
                          <div>
                            {renderStars(book.rating)}
                            <p className="text-sm text-muted-foreground mt-1">
                              Based on {book.reviewCount} reviews
                            </p>
                          </div>
                        </div>

                        {/* Add Review Form */}
                        <div className="space-y-4 mb-6 p-4 border rounded-lg">
                          <h4 className="font-medium">Write a Review</h4>
                          <div className="space-y-3">
                            <Input
                              placeholder="Your name"
                              value={newReview.userName}
                              onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-sm">Rating:</span>
                              {renderStars(newReview.rating, true, (rating) => 
                                setNewReview(prev => ({ ...prev, rating }))
                              )}
                            </div>
                            <Textarea
                              placeholder="Write your review..."
                              value={newReview.comment}
                              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                              rows={3}
                            />
                            <Button 
                              onClick={handleSubmitReview}
                              disabled={!newReview.userName.trim() || !newReview.comment.trim()}
                              size="sm"
                            >
                              Submit Review
                            </Button>
                          </div>
                        </div>

                        {/* Existing Reviews */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Recent Reviews</h4>
                          {book.reviews.map((review) => (
                            <div key={review.id} className="p-4 border rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{review.userName}</span>
                                <span className="text-sm text-muted-foreground">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="mb-2">
                                {renderStars(review.rating)}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookModal;
