import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  image: string;
  cta?: {
    text: string;
    onClick: () => void;
  };
}

const Hero = ({ title, subtitle, image, cta }: HeroProps) => {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-muted">
      {/* Parallax Background */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Darker overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background/95" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-bold font-sans"
          >
            {title}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>

          {cta && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                onClick={cta.onClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {cta.text}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
