import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import GalleryCard from "@/components/shared/GalleryCard";
import GalleryModal from "@/components/shared/GalleryModal";
import { galleryAPI } from "@/lib/api";
import type { GalleryItem } from "@/data/gallery";

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch gallery items
  const { data: itemsData, isLoading: itemsLoading } = useQuery({
    queryKey: ["galleryItems"],
    queryFn: async () => {
      const response = await galleryAPI.getAll();
      return response.data;
    },
  });

  // Fetch categories
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["galleryCategories"],
    queryFn: async () => {
      const response = await galleryAPI.getCategories();
      return response.data;
    },
  });

  // Transform API data to match GalleryItem interface
  const transformedItems: GalleryItem[] = useMemo(() => {
    if (!itemsData) return [];
    return itemsData.map((item: any) => ({
      id: item._id,
      title: item.title,
      description: item.description || "",
      src: item.src,
      alt: item.alt || item.title,
      type: item.type || "image",
      category: item.category?._id || item.category || "",
      tags: item.tags || [],
      year: item.year,
      location: item.location,
      photographer: item.photographer,
    }));
  }, [itemsData]);

  // Transform categories
  const transformedCategories = useMemo(() => {
    if (!categoriesData) return [];
    return categoriesData.map((cat: any) => ({
      id: cat._id,
      name: cat.name,
      description: cat.description || "",
      icon: cat.icon || "📷",
      color: cat.color || "from-blue-500 to-cyan-500",
    }));
  }, [categoriesData]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let items = transformedItems;

    // Filter by category
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          item.location?.toLowerCase().includes(query) ||
          item.photographer?.toLowerCase().includes(query)
      );
    }

    return items;
  }, [transformedItems, selectedCategory, searchQuery]);

  const isLoading = itemsLoading || categoriesLoading;

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const goToPrevious = () => {
    if (selectedItem) {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
      if (currentIndex > 0) {
        setSelectedItem(filteredItems[currentIndex - 1]);
      }
    }
  };

  const goToNext = () => {
    if (selectedItem) {
      const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
      if (currentIndex < filteredItems.length - 1) {
        setSelectedItem(filteredItems[currentIndex + 1]);
      }
    }
  };

  const getCurrentIndex = () => {
    if (!selectedItem) return 0;
    return filteredItems.findIndex(item => item.id === selectedItem.id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Heritage Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the rich visual heritage of Gilgit-Baltistan through our curated collection of images and videos
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 bg-background border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search gallery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Filters */}
          <motion.div
            initial={false}
            animate={{ height: showFilters ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:block"
          >
            <div className="mt-6 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  All
                  <Badge variant="secondary" className="ml-2">
                    {transformedItems.length}
                  </Badge>
                </Button>
                {transformedCategories.map((category) => {
                  const count = transformedItems.filter((item) => item.category === category.id).length;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                      <Badge variant="secondary" className="ml-2">
                        {count}
                      </Badge>
                    </Button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {selectedCategory === "all" ? "All Items" : transformedCategories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-muted-foreground">
                {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                <X className="w-4 h-4 mr-2" />
                Clear search
              </Button>
            )}
          </div>

          {/* Gallery Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredItems.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  onOpenModal={openModal}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Card className="p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No items found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? `No items match your search for "${searchQuery}"`
                    : "No items in this category"}
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  View all items
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        onPrevious={goToPrevious}
        onNext={goToNext}
        hasPrevious={getCurrentIndex() > 0}
        hasNext={getCurrentIndex() < filteredItems.length - 1}
        currentIndex={getCurrentIndex()}
        totalItems={filteredItems.length}
      />
    </div>
  );
};

export default Gallery;
