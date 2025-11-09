import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Modal from "@/components/shared/Modal";
import { blogAPI } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, User, Clock, Heart, MessageCircle, Share2, Send, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Blog {
  _id: string;
  title: string;
  author: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: number;
  comments?: Comment[];
  likeCount?: number;
  liked?: boolean;
}

interface Comment {
  _id: string;
  userName: string;
  email?: string;
  content: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [newComment, setNewComment] = useState({ author: "", email: "", content: "" });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const queryClient = useQueryClient();

  // Fetch blogs from API
  const { data: blogsData, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await blogAPI.getAll();
      const blogs = response.data;
      
      // Fetch like status for each blog
      const likeStatusPromises = blogs.map(async (blog: Blog) => {
        try {
          const likeStatus = await blogAPI.getLikeStatus(blog._id);
          return {
            ...blog,
            liked: likeStatus.data.liked,
            likeCount: likeStatus.data.likeCount || 0,
          };
        } catch (error) {
          // If like status fails, use defaults
          return {
            ...blog,
            liked: false,
            likeCount: blog.likeCount || 0,
          };
        }
      });
      
      const blogsWithLikes = await Promise.all(likeStatusPromises);
      
      // Update local state with like information
      blogsWithLikes.forEach((blog) => {
        if (blog.liked) {
          setLikedPosts((prev) => new Set(prev).add(blog._id));
        }
        setLikeCounts((prev) => ({
          ...prev,
          [blog._id]: blog.likeCount || 0,
        }));
      });
      
      return blogsWithLikes;
    },
  });

  // Add comment mutation
  const addCommentMutation = useMutation({
    mutationFn: ({ blogId, commentData }: { blogId: string; commentData: any }) =>
      blogAPI.addComment(blogId, commentData),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your comment has been submitted and is pending approval",
      });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setNewComment({ author: "", email: "", content: "" });
      setShowCommentForm(false);
      // Refresh selected blog
      if (selectedBlog) {
        fetchBlogDetails(selectedBlog._id);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit comment",
        variant: "destructive",
      });
    },
  });

  const fetchBlogDetails = async (id: string) => {
    try {
      const response = await blogAPI.getById(id);
      const blog = response.data;
      
      // Fetch like status for the blog
      try {
        const likeStatus = await blogAPI.getLikeStatus(id);
        setSelectedBlog({
          ...blog,
          liked: likeStatus.data.liked,
          likeCount: likeStatus.data.likeCount || 0,
        });
      } catch (error) {
        // If like status fails, use defaults
        setSelectedBlog({
          ...blog,
          liked: false,
          likeCount: blog.likeCount || 0,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch blog details",
        variant: "destructive",
      });
    }
  };

  // Like mutation
  const likeMutation = useMutation({
    mutationFn: blogAPI.toggleLike,
    onSuccess: (data, blogId) => {
      const { liked, likeCount } = data.data;
      
      // Update local state
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        if (liked) {
          newSet.add(blogId);
        } else {
          newSet.delete(blogId);
        }
        return newSet;
      });
      
      setLikeCounts((prev) => ({
        ...prev,
        [blogId]: likeCount,
      }));
      
      // Update the selected blog if it's the one being liked
      if (selectedBlog && selectedBlog._id === blogId) {
        setSelectedBlog({
          ...selectedBlog,
          liked,
          likeCount,
        });
      }
      
      // Invalidate queries to refresh blog list
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update like",
        variant: "destructive",
      });
    },
  });

  const handleLike = (postId: string) => {
    likeMutation.mutate(postId);
  };

  const handleShare = async (post: Blog) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Link copied to clipboard!",
      });
    }
  };

  const handleAddComment = (blogId: string) => {
    if (!newComment.content.trim() || !newComment.author.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addCommentMutation.mutate({
      blogId,
      commentData: {
        userName: newComment.author,
        email: newComment.email || undefined,
        content: newComment.content,
      },
    });
  };

  const handleViewBlog = async (blog: Blog) => {
    await fetchBlogDetails(blog._id);
    setShowCommentForm(false);
  };

  const getApprovedComments = (blog: Blog | null): Comment[] => {
    if (!blog || !blog.comments) return [];
    return blog.comments.filter((comment) => comment.status === "approved");
  };

  const blogs = blogsData || [];

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Museum Blogs"
        subtitle="Stories, insights, and discoveries from our community"
        image="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920"
      />

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No blogs available yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((post: Blog, index: number) => {
              const approvedComments = getApprovedComments(post);
              return (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-80 object-cover cursor-pointer"
                        onClick={() => handleViewBlog(post)}
                      />
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge>{post.category}</Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime} min read
                          </span>
                        </div>
                      </div>
                      <CardTitle
                        className="mb-3 text-2xl cursor-pointer hover:text-primary transition-colors"
                        onClick={() => handleViewBlog(post)}
                      >
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mb-4 text-base">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </span>
                      </div>

                      {/* Like, Comment, Share Actions */}
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(post._id);
                          }}
                          disabled={likeMutation.isPending}
                        >
                          <Heart
                            className={`h-4 w-4 ${likedPosts.has(post._id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                          <span>{likedPosts.has(post._id) ? "Liked" : "Like"}</span>
                          {(likeCounts[post._id] || post.likeCount || 0) > 0 && (
                            <span className="ml-1">({likeCounts[post._id] || post.likeCount || 0})</span>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewBlog(post);
                            setShowCommentForm(true);
                          }}
                        >
                          <MessageCircle className="h-4 w-4" />
                          <span>Comment</span>
                          {approvedComments.length > 0 && (
                            <span className="ml-1">({approvedComments.length})</span>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(post);
                          }}
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Blog Detail Modal */}
      <Modal
        isOpen={!!selectedBlog}
        onClose={() => {
          setSelectedBlog(null);
          setShowCommentForm(false);
        }}
        title={selectedBlog?.title || ""}
        fullscreen={true}
      >
        {selectedBlog && (
          <div className="space-y-6">
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="space-y-4">
              <Badge>{selectedBlog.category}</Badge>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <strong>By:</strong> {selectedBlog.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedBlog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {selectedBlog.readTime} min read
                </span>
              </div>
              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground">{selectedBlog.excerpt}</p>
                <p className="mt-4">{selectedBlog.content}</p>
              </div>

              {/* Like, Comment, Share Actions */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleLike(selectedBlog._id)}
                  disabled={likeMutation.isPending}
                >
                  <Heart
                    className={`h-4 w-4 ${likedPosts.has(selectedBlog._id) || selectedBlog.liked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span>{likedPosts.has(selectedBlog._id) || selectedBlog.liked ? "Liked" : "Like"}</span>
                  {(likeCounts[selectedBlog._id] || selectedBlog.likeCount || 0) > 0 && (
                    <span className="ml-1">({likeCounts[selectedBlog._id] || selectedBlog.likeCount || 0})</span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setShowCommentForm(!showCommentForm)}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Comment</span>
                  {getApprovedComments(selectedBlog).length > 0 && (
                    <span className="ml-1">({getApprovedComments(selectedBlog).length})</span>
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => handleShare(selectedBlog)}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>

              {/* Comments Section */}
              <div className="pt-6 border-t">
                <h3 className="text-xl font-bold mb-4">
                  Comments ({getApprovedComments(selectedBlog).length})
                </h3>

                {/* Comment Form */}
                {showCommentForm && (
                  <Card className="mb-6">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="author">Name *</Label>
                            <Input
                              id="author"
                              placeholder="Your name"
                              value={newComment.author}
                              onChange={(e) =>
                                setNewComment({ ...newComment, author: e.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email (optional)</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              value={newComment.email}
                              onChange={(e) =>
                                setNewComment({ ...newComment, email: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="comment">Comment *</Label>
                          <Textarea
                            id="comment"
                            placeholder="Write your comment here..."
                            value={newComment.content}
                            onChange={(e) =>
                              setNewComment({ ...newComment, content: e.target.value })
                            }
                            rows={4}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAddComment(selectedBlog._id)}
                            disabled={
                              !newComment.content.trim() ||
                              !newComment.author.trim() ||
                              addCommentMutation.isPending
                            }
                          >
                            {addCommentMutation.isPending ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4 mr-2" />
                                Post Comment
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowCommentForm(false);
                              setNewComment({ author: "", email: "", content: "" });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Comments List - Only show approved comments */}
                <div className="space-y-4">
                  {getApprovedComments(selectedBlog).length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  ) : (
                    getApprovedComments(selectedBlog).map((comment: Comment) => (
                      <Card key={comment._id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                {comment.userName.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <p className="font-semibold">{comment.userName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(comment.date).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-3">{comment.content}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Blogs;
