import { useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/shared/Hero";
import Modal from "@/components/shared/Modal";
import { blogPosts } from "@/data/blogs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Clock } from "lucide-react";

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState<typeof blogPosts[0] | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Hero
        title="Museum Blogs"
        subtitle="Stories, insights, and discoveries from our community"
        image="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1920"
      />

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                onClick={() => setSelectedBlog(post)}
              >
                <CardHeader className="p-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <Badge className="mb-3">{post.category}</Badge>
                  <CardTitle className="mb-3 line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime} min read
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog Detail Modal */}
      <Modal
        isOpen={!!selectedBlog}
        onClose={() => setSelectedBlog(null)}
        title={selectedBlog?.title || ""}
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
                  {new Date(selectedBlog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
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
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Blogs;
