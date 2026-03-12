import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { blogAPI, libraryAPI } from "@/lib/api";
import Hero from "@/components/shared/Hero";
import Gallery from "@/components/shared/Gallery";
import { Card } from "@/components/ui/card";
import salahudungImg from "@/assets/img/salahudung.jpeg";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

import rakaposhiImg from "@/assets/img/culture/rakaposhi1.jpg";
import hisparImg from "@/assets/img/culture/hispar1.jpg";
import { ArrowRight, Calendar, Clock, BookOpen, User } from "lucide-react";

const introImages = [
  {
    src: "/assets/img/Prehistoric/Bluesheep2.png",
    title: "Ancient Rock Art",
    subtitle: "Prehistoric Era"
  },
  {
    src: "/assets/img/modern/sec1-img2.png",
    title: "Historical Archives",
    subtitle: "Modern History"
  },
  {
    src: "/assets/img/modern/fort.png",
    title: "Ancient Forts",
    subtitle: "Modern History"
  },
  {
    src: "/assets/img/modern/sikh.png",
    title: "Sikh Era Heritage",
    subtitle: "Modern History"
  },
  {
    src: "/assets/img/modern/sikh9.png",
    title: "Historical Battles",
    subtitle: "Modern History"
  },
  {
    src: "/assets/img/modern/sikh11.png",
    title: "Legacy of Resistance",
    subtitle: "Modern History"
  },
  {
    src: "/assets/img/polo/poloi.jpg",
    title: "The Game of Kings",
    subtitle: "Polo"
  },
  {
    src: "/assets/img/polo/poloiv.jpg",
    title: "Balti Loshor",
    subtitle: "Free Style Polo"
  },
  {
    src: "/assets/img/polo/poloviii.jpg",
    title: "Culture and Diplomacy",
    subtitle: "Polo Matches"
  },
  {
    src: "/assets/img/heroes/sherhero.jpg",
    title: "Captain Karnal Sher Khan",
    subtitle: "Military Leader"
  },
  {
    src: "/assets/img/heroes/lalikjanhero.jpg",
    title: "Havildar Lalak Jan",
    subtitle: "Military Leader"
  },
  {
    src: "/assets/img/district/stupa1.jpg",
    title: "Buddhist Stupas",
    subtitle: "Districts of GB"
  },
  {
    src: "/assets/img/culture/shaap3.jpg",
    title: "Local Traditions",
    subtitle: "Culture"
  },
  {
    src: "/assets/img/culture/atire1.webp",
    title: "Traditional Attire",
    subtitle: "Culture"
  },
  {
    src: "/assets/img/culture/markhor3.jpeg",
    title: "Native Wildlife",
    subtitle: "Culture"
  },
  {
    src: rakaposhiImg,
    title: "Rakaposhi Peak",
    subtitle: "Landscapes of GB"
  },
  {
    src: hisparImg,
    title: "Hispar Glacier",
    subtitle: "Landscapes of GB"
  }
];

const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
  return url;
};

const Home = () => {
  const { data: blogsData, isLoading: isBlogsLoading } = useQuery({
    queryKey: ["recent-blogs"],
    queryFn: async () => {
      const response = await blogAPI.getAll();
      return response.data || [];
    },
  });

  const { data: libraryData, isLoading: isLibraryLoading } = useQuery({
    queryKey: ["recent-books"],
    queryFn: async () => {
      const response = await libraryAPI.getAll();
      return response.data || [];
    },
  });

  const recentBlogs = blogsData?.slice(0, 4) || [];
  const recentBooks = libraryData?.slice(0, 4) || [];

  const scrollToContent = () => {
    document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero
        title="Welcome to GB Museum & Library"
        subtitle="Preserving the Rich Heritage and Culture of Gilgit-Baltistan"
        image="/assets/img/gbmuseum.jpeg"
      />

      {/* Introduction Section */}
      <section className="py-16 bg-muted/30 overflow-hidden">
        <div className="container mx-auto flex flex-col items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 max-w-4xl"
          >
            <h2 className="text-primary text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Explore the Rich Tapestry of Gilgit-Baltistan’s Past
            </h2>
            <p className="text-xl text-muted-foreground">
              Step into a world of heritage, culture, and history preserved in the heart of the mountains.
            </p>
          </motion.div>
        </div>

        <div className="w-full relative px-0 mb-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnMouseEnter: true,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="m-0">
              {introImages.map((item, index) => (
                <CarouselItem key={index} className="p-0 basis-full">
                  <div className="relative w-full h-[75vh] md:h-[90vh] overflow-hidden group cursor-grab active:cursor-grabbing">
                    {/* Background Image / Solid background for contained images */}
                    <div className="absolute inset-0 bg-neutral-950/90" />
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 relative z-0"
                    />

                    {/* Lighting Transition Overlay */}
                    <motion.div
                      initial={{ opacity: 0, x: "-100%" }}
                      whileInView={{ opacity: [0, 0.5, 0], x: ["-100%", "100%"] }}
                      viewport={{ once: false, amount: 0.1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none mix-blend-overlay"
                    />

                    {/* Overlay Gradient (Like Hero Slider) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none" />

                    {/* Info Overlays */}
                    <div className="absolute bottom-12 left-12 right-12 md:bottom-20 md:left-20 text-white z-30 transition-transform duration-500 group-hover:-translate-y-2">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-bold mb-4 tracking-tight drop-shadow-lg"
                      >
                        {item.title}
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md"
                      >
                        {item.subtitle}
                      </motion.p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-8 w-full flex justify-center px-4 z-40">
              <CarouselDots />
            </div>
          </Carousel>
        </div>

        <div className="container mx-auto flex flex-col items-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mt-4"
          >
            <h3 className="text-secondary text-lg md:text-xl font-semibold uppercase tracking-wider leading-relaxed">
              THE GALLERY OF GILGIT-BALTISTAN’S HISTORY<br />
              A TIMELESS JOURNEY THROUGH THE CULTURE, PEOPLE, AND STORIES THAT SHAPED THE ROOF OF THE WORLD
            </h3>
          </motion.div>
        </div>
      </section>

      {/* Explore Culture Section */}
      <section className="py-20 px-4 bg-muted/10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-primary text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Explore the Culture And Tradition of Gilgit Baltistan
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the unique heritage, vibrant traditions, and breathtaking diversity across the districts of GB.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-[250px] md:auto-rows-auto h-auto md:h-[800px]">
            {[
              {
                name: "District Gilgit",
                path: "/culture/district-gilgit",
                image: "/assets/img/culture/shaap3.jpg",
                className: "md:col-span-2 md:row-span-2"
              },
              {
                name: "District Skardu",
                path: "/culture/district-skardu",
                image: "/assets/img/culture/kachura2.jpg",
                className: "md:col-span-1 md:row-span-1"
              },
              {
                name: "District Hunza",
                path: "/culture/district-hunza",
                image: "/assets/img/culture/baltit2.jpg",
                className: "md:col-span-1 md:row-span-1"
              },
              {
                name: "District Nagar",
                path: "/culture/district-nagar",
                image: rakaposhiImg,
                className: "md:col-span-2 md:row-span-1"
              },
              {
                name: "District Ghizer",
                path: "/culture/district-ghizer",
                image: hisparImg,
                className: "md:col-span-1 md:row-span-1"
              },
              {
                name: "District Astore",
                path: "/culture/district-astore",
                image: "/assets/img/culture/rama3.jpg",
                className: "md:col-span-1 md:row-span-1"
              },
              {
                name: "District Diamer",
                path: "/culture/district-diamer",
                image: "/assets/img/culture/fairy2.jpg",
                className: "md:col-span-2 md:row-span-1"
              }
            ].map((district, index) => (
              <Link 
                key={index} 
                to={district.path}
                className={`group relative overflow-hidden rounded-2xl block shadow-md hover:shadow-xl transition-all duration-300 ${district.className || ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <img 
                  src={district.image} 
                  alt={district.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 z-0"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <motion.div
                    initial={false}
                    className="transform transition-all duration-500 translate-y-2 group-hover:translate-y-0"
                  >
                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 drop-shadow-lg">
                      {district.name}
                    </h3>
                    <div className="w-12 h-1 bg-primary rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </motion.div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ancient History Section */}
      <section className="py-24 px-4 bg-muted/20 relative overflow-hidden">
        {/* Decorative Background Effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-primary text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Ancient History
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Uncover the prehistoric roots and early civilizations that laid the foundation of Gilgit-Baltistan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Chilas Dadam Das",
                description: "The earliest signs of human presence in this mountainous region is seen in the ancient petroglyphs dating back to 9000 BC.",
                image: "/assets/img/Prehistoric/chilasdas.png",
              },
              {
                title: "Rock Carvings",
                description: "Around 4000 BC, animals were carved in a unique stylised 'bi-triangular style' found extensively along the banks of the River Indus.",
                image: "/assets/img/Prehistoric/rockcraving.png",
              },
              {
                title: "The Bronze Age",
                description: "Exquisite metalwork in the shape of vessels and weapons emerged, similar to Central Asia, marking a sophisticated new era.",
                image: "/assets/img/Prehistoric/bronze1.png",
              },
              {
                title: "Megalithic Graves",
                description: "Mysterious burials in megalithic circles linked to the Southern Altai suggest pastoral agricultural economies spanning continents.",
                image: "/assets/img/Prehistoric/bronzegrave.png",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative h-[420px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>
                
                {/* Default Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />

                {/* Hover Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md mb-2">
                      {item.title}
                    </h3>
                    
                    {/* Expandable Section */}
                    <div className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 group-hover:mt-4">
                      <div className="h-[2px] w-12 bg-primary mb-4 rounded-full" />
                      <p className="text-gray-200 text-sm leading-relaxed mb-6 line-clamp-3">
                        {item.description}
                      </p>
                      <Link to="/history/prehistoric" className="block w-full">
                        <Button className="w-full bg-white/20 hover:bg-white text-white hover:text-black font-semibold backdrop-blur-md border border-white/30 rounded-xl transition-all duration-300">
                          Explore Era
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Medieval History Section */}
      <section className="py-24 px-4 bg-background relative border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-secondary text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Medieval History & The Silk Route
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Journey through the era of legendary trade networks and cultural exchanges that bridged civilizations across Gilgit-Baltistan.
            </p>
          </motion.div>

          {/* Staggered Split Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                title: "The Southern Karakoram Route",
                description: "The ancient route running through the Karakoram mountains, serving as the monumental gateway connecting civilizations over the formidable Hindukush.",
                image: "/assets/img/silk/silk1.png",
              },
              {
                title: "Trade & Civilizations",
                description: "A bustling network where precious silk, horses, gemstones, and groundbreaking technologies were traded, catalyzing the rise of empires.",
                image: "/assets/img/silk/silk2.png",
              },
              {
                title: "Cultural Exchange",
                description: "Beyond exotic goods, the route facilitated the profound transfer of art, philosophies, and religions like Buddhism and Islam.",
                image: "/assets/img/silk/silk3.png",
              },
              {
                title: "Traders of the Road",
                description: "Brave Sogdian, Parthian, and Bactrian merchants navigated treacherous gorges using indigenous hanging timber bridges.",
                image: "/assets/img/silk/silk4.png",
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="h-full"
              >
                <Card className="group h-full flex flex-col sm:flex-row overflow-hidden rounded-2xl border-border/50 bg-gradient-to-br from-card to-muted/20 hover:shadow-2xl hover:border-secondary/30 transition-all duration-300">
                  {/* Image Section - Left side on Desktop, Top on Mobile */}
                  <div className="sm:w-2/5 h-56 sm:h-auto relative overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto">
                      <Link to="/history/silk-route" className="inline-block">
                        <Button 
                          variant="ghost" 
                          className="p-0 h-auto text-secondary hover:text-secondary hover:bg-transparent tracking-wide font-semibold flex items-center group/btn"
                        >
                          See more 
                          <ArrowRight className="ml-2 w-4 h-4 transform group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern History Section */}
      <section className="py-24 px-4 bg-muted/10 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-primary text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Modern History
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Witness the era of conquest, resistance, and the monumental shaping of the Gilgit-Baltistan region.
            </p>
          </motion.div>

          {/* Featured Masonry Grid Layout (1 Large + 4 Small) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Featured Large Card */}
            {[
              {
                title: "The Liberation War of 1947",
                description: "The pivotal moment when Gilgit Scouts and local heroes launched a massive uprising against Dogra rule, securing independence and choosing to join Pakistan.",
                image: "/assets/img/modern/sikh11.png",
                colSpan: "lg:col-span-2 lg:row-span-2",
                titleSize: "text-3xl lg:text-4xl",
                height: "h-96 lg:h-full"
              }
            ].map((item, index) => (
              <motion.div
                key={`featured-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`${item.colSpan} ${item.height}`}
              >
                <Card className="group relative w-full h-full overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border-0">
                  <div className="absolute inset-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                    <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                      <span className="inline-block py-1 px-3 rounded-full bg-primary/80 backdrop-blur-md text-primary-foreground text-xs font-bold uppercase tracking-wider mb-4">
                        Featured Epoch
                      </span>
                      <h3 className={`${item.titleSize} font-bold text-white mb-3 drop-shadow-lg`}>
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-6 max-w-2xl">
                        {item.description}
                      </p>
                      <Link to="/history/modern" className="inline-block">
                        <Button className="bg-white text-black hover:bg-primary hover:text-primary-foreground transition-colors duration-300 rounded-full px-8">
                          Explore Era
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Sub Cards Grid */}
            <div className="col-span-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {[
                {
                  title: "Sikh Empire Expansion",
                  description: "Maharajah Ranjit Singh's invasion of Kashmir in 1819, extending Sikh control into the valleys.",
                  image: "/assets/img/modern/sec1-img2.png",
                },
                {
                  title: "Zorawar Singh Invades Skardu",
                  description: "The 1840 campaign conquering Skardu and the resilient uprisings by local leaders against Dogra forces.",
                  image: "/assets/img/modern/sikh.png",
                },
                {
                  title: "British Incursion",
                  description: "The establishment of the Gilgit Agency in 1877 amidst The Great Game and shifting geopolitical power.",
                  image: "/assets/img/modern/british1.png",
                },
                {
                  title: "The Anglo-Brusho War",
                  description: "The fierce 1891 resistance of Nagar and Hunza against British oppression at Nilt Fort.",
                  image: "/assets/img/modern/sikh6.png",
                }
              ].map((item, index) => (
                <motion.div
                  key={`sub-${index}`}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card className="group relative h-48 overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-0">
                    <div className="absolute inset-0">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 group-hover:from-primary/90 transition-colors duration-500" />
                    
                    <div className="absolute inset-0 p-5 flex flex-col justify-end z-20">
                      <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-xs leading-relaxed line-clamp-2 mb-3">
                        {item.description}
                      </p>
                      <Link to="/history/modern" className="mt-auto inline-flex items-center text-xs font-semibold text-white/80 hover:text-white transition-colors">
                        See more <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Blogs Section */}
      {recentBlogs.length > 0 && (
      <section className="py-24 px-4 bg-background relative border-t border-border/40">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-primary text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Our Blogs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Delve into profound stories, fascinating insights, and new discoveries about the heritage of Gilgit-Baltistan.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentBlogs.map((blog: any, index: number) => (
              <motion.div
                key={blog._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full flex"
              >
                <Card className="group overflow-hidden flex flex-col w-full border-border/50 hover:border-primary/50 shadow-md hover:shadow-2xl transition-all duration-300 rounded-2xl bg-gradient-to-br from-card to-background">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImageUrl(blog.image)}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 hover:bg-primary backdrop-blur-sm text-primary-foreground border-none font-semibold px-3 py-1">
                        {blog.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-3">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime || 5} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-grow mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="pt-4 mt-auto border-t border-border/50">
                      <Link to="/blogs" className="inline-block w-full">
                        <Button variant="ghost" className="w-full justify-between group/btn text-primary hover:text-primary hover:bg-primary/5">
                          Read Full Article
                          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/blogs">
              <Button size="lg" className="rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all">
                View All Blogs
              </Button>
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Explore the Library Section */}
      {recentBooks.length > 0 && (
      <section className="py-24 px-4 bg-muted/20 relative">
        {/* Soft Background Accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6"
          >
            <div className="text-center md:text-left md:max-w-2xl">
              <h2 className="text-secondary text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                Explore The Library
              </h2>
              <p className="text-lg text-muted-foreground">
                Access our vast, meticulously curated digital repository of authentic literature, research, and timeless books detailing the profound essence of the region.
              </p>
            </div>
            <Link to="/library">
              <Button variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground rounded-full px-8 shadow-sm">
                Browse Full Library
              </Button>
            </Link>
          </motion.div>

          {/* Library Books Layout (Horizontal Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {recentBooks.map((book: any, index: number) => (
              <motion.div
                key={book._id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full"
              >
                <Card className="group h-full flex flex-col sm:flex-row overflow-hidden border-border/60 hover:border-secondary/40 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl bg-card">
                  {/* Book Cover Container with beautiful framing */}
                  <div className="sm:w-1/3 bg-muted/30 p-4 sm:p-6 flex items-center justify-center shrink-0 border-b sm:border-b-0 sm:border-r border-border/40 relative overflow-hidden">
                     {/* Decorative blur effect behind cover */}
                     <div 
                        className="absolute inset-0 opacity-40 blur-2xl group-hover:opacity-60 transition-opacity" 
                        style={{ backgroundImage: `url(${getImageUrl(book.cover)})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
                     />
                    <div className="relative z-10 w-32 sm:w-full max-w-[140px] aspect-[2/3] shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 rounded-md overflow-hidden bg-background border border-border/50">
                      <img
                        src={getImageUrl(book.cover)}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <Badge variant="outline" className="text-secondary border-secondary/30 bg-secondary/5 shrink-0">
                          {book.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                        {book.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 font-medium">
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" /> {book.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" /> {book.year}
                        </span>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                        {book.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-border/40">
                      <Link to="/library" className="block">
                        <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-secondary hover:bg-transparent font-semibold flex items-center group/btn">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Read Synopsis
                          <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all text-secondary" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Museum Tour Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-primary">Museum Tour</h2>
            <p className="text-muted-foreground mt-2">
              Explore the galleries and exhibitions of GB Museum
            </p>
          </motion.div>

          <Gallery items={[
            {
              src: "/assets/img/museum-tour/IMG_0067.JPG",
              alt: "GB Museum Entrance",
              caption: "Main entrance of the GB Museum"
            },
            {
              src: "/assets/img/museum-tour/IMG_0066.JPG",
              alt: "GB Museum and Library Complex",
              caption: "GB Museum and Library Complex - A gift from FCNA to people of GB"
            },
            {
              src: "/assets/img/museum-tour/IMG_E0048.JPG",
              alt: "Wildlife Gallery",
              caption: "Wildlife exhibit featuring native species with stunning mountain backdrop"
            },
            {
              src: "/assets/img/museum-tour/IMG_E0047.JPG",
              alt: "Brown Bear Exhibit",
              caption: "Himalayan Brown Bear on display"
            },
            {
              src: "/assets/img/museum-tour/IMG_0051.JPG",
              alt: "Mountain Wildlife Collection",
              caption: "Markhor, Ibex, and Snow Leopard exhibits"
            },
            {
              src: "/assets/img/museum-tour/IMG_0041.JPG",
              alt: "Our Heroes Exhibit",
              caption: "Honoring the brave heroes of Gilgit-Baltistan"
            },
            {
              src: "/assets/img/museum-tour/IMG_0038.JPG",
              alt: "Historical Figures Gallery",
              caption: "Major Raja Babar Khan, Colonel Mirza Hassan, and Colonel Ihsan Ali"
            },
            {
              src: "/assets/img/museum-tour/IMG_0037.JPG",
              alt: "GB History Display",
              caption: "Historical photographs and scenic landscapes of GB"
            },
            {
              src: "/assets/img/museum-tour/IMG_0035.JPG",
              alt: "Our Pride Exhibition",
              caption: "Pride of Gilgit-Baltistan - Heritage and History"
            },
            {
              src: "/assets/img/museum-tour/IMG_0070.JPG",
              alt: "Ancient Rock Art",
              caption: "Petroglyphs and ancient rock carvings on display"
            },
            {
              src: "/assets/img/museum-tour/IMG_0017.JPG",
              alt: "Ancient Artifacts Collection",
              caption: "Buddhist monastery remains, bronze jewelry, and charm covers"
            },
            {
              src: "/assets/img/museum-tour/IMG_0016.JPG",
              alt: "Museum Gallery",
              caption: "Cultural artifacts and historical displays"
            },
            {
              src: "/assets/img/museum-tour/IMG_0015.JPG",
              alt: "Museum Collection",
              caption: "Curated collections showcasing GB heritage"
            }
          ]} />
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <h2 className="text-primary">Our Mission</h2>
                  <p className="text-lg leading-relaxed">
                    The GB Museum serves as a guardian of Gilgit-Baltistan's extraordinary cultural heritage.
                    We are dedicated to preserving, documenting, and showcasing the rich history, traditions,
                    and stories of our people for current and future generations.
                  </p>
                  <p className="text-muted-foreground">
                    Through our collections and programs, we celebrate the heroes, artisans, and everyday people
                    whose contributions have shaped this remarkable region at the crossroads of civilizations.
                  </p>
                </div>
                <div className="w-full md:w-64 flex-shrink-0">
                  <img
                    src={salahudungImg}
                    alt="R. Lt Col Sallah-ud-Din"
                    className="rounded-lg shadow-lg w-full h-80 object-cover object-top"
                  />
                  <p className="text-center mt-3 text-sm text-muted-foreground">
                    R. Lt Col Salah-ud-Din Nasir, Team Leader
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
