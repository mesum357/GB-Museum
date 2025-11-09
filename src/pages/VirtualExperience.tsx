import { useState, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Glasses, MousePointer, Headphones, ArrowRight, Loader2 } from "lucide-react";
import { MuseumScene } from "@/components/virtual-museum/MuseumScene";
import { useSidebar } from "@/contexts/SidebarContext";

const VirtualExperience = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setHideSidebar } = useSidebar();

  // Hide sidebar when 3D experience starts, show it when it ends
  useEffect(() => {
    setHideSidebar(isStarted);
    return () => {
      setHideSidebar(false);
    };
  }, [isStarted, setHideSidebar]);

  const features = [
    {
      icon: <Glasses className="h-8 w-8" />,
      title: "360° Virtual Tours",
      description: "Explore museum galleries in immersive 360-degree views"
    },
    {
      icon: <MousePointer className="h-8 w-8" />,
      title: "Interactive Exhibits",
      description: "Click on artifacts to learn detailed information"
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Audio Guides",
      description: "Listen to expert narrations and stories"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      {!isStarted && (
      <section className="relative h-[80vh] overflow-hidden bg-muted flex items-center justify-center">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1568580370116-961f8d6c7f29?w=1920"
            alt="Virtual Reality Experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-white mb-6">Virtual Museum Experience</h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Step into our museum from anywhere in the world. Experience our collections through an immersive virtual tour.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  setIsStarted(true);
                }, 500);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-6 w-6" />
                  Launch Experience
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </section>
      )}

      {/* Features Section */}
      {!isStarted && (
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Experience Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our virtual experience offers cutting-edge technology to bring the museum to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 text-primary">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Virtual Tour Preview */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted">
            <CardTitle>Virtual Tour Preview</CardTitle>
            <CardDescription>
              Get a glimpse of what awaits you in the virtual experience
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative aspect-video bg-muted">
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=1200"
                alt="Virtual Tour Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setIsStarted(true);
                    }, 500);
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-5 w-5" />
                      Launch Experience
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Tours */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6">Available Virtual Tours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Main Exhibition Hall",
                description: "Explore our primary collection of artifacts and exhibits",
                image: "https://images.unsplash.com/photo-1566127444979-b3d2b6fd1da5?w=600"
              },
              {
                title: "Heritage Gallery",
                description: "Journey through the cultural heritage of Gilgit-Baltistan",
                image: "https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=600"
              },
              {
                title: "Silk Route Collection",
                description: "Discover artifacts from the ancient Silk Route trade",
                image: "https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?w=600"
              },
              {
                title: "Archaeological Findings",
                description: "View our collection of archaeological discoveries",
                image: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=600"
              }
            ].map((tour, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative h-48">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {tour.title}
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </CardTitle>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* 3D Museum Scene */}
      {isStarted && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin" />
                <h2 className="text-2xl font-bold mb-4">Loading Virtual Museum...</h2>
                <p className="text-white/70 mb-6">Preparing your immersive experience</p>
              </div>
            </div>
          }
        >
          <MuseumScene onExit={() => setIsStarted(false)} />
        </Suspense>
      )}
    </div>
  );
};

export default VirtualExperience;