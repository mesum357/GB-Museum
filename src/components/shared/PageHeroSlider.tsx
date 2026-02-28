import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
    image: string;
    label: string;
}

interface PageHeroSliderProps {
    title: string;
    subtitle: string;
    slides: Slide[];
    interval?: number;
}

const PageHeroSlider = ({
    title,
    subtitle,
    slides,
    interval = 5000,
}: PageHeroSliderProps) => {
    const [current, setCurrent] = useState(0);

    const next = useCallback(
        () => setCurrent((prev) => (prev + 1) % slides.length),
        [slides.length]
    );

    useEffect(() => {
        if (slides.length <= 1) return;
        const id = setInterval(next, interval);
        return () => clearInterval(id);
    }, [next, interval, slides.length]);

    return (
        <section className="relative h-[70vh] min-h-[500px] overflow-hidden bg-muted">
            {/* Background slides */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="absolute inset-0"
                >
                    <img
                        src={slides[current].image}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/90" />
                </motion.div>
            </AnimatePresence>

            {/* Content overlay */}
            <div className="relative h-full flex flex-col items-center justify-center px-4 z-10">
                <div className="max-w-4xl text-center space-y-5">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-white drop-shadow-lg"
                    >
                        {title}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-white/90 drop-shadow"
                    >
                        {subtitle}
                    </motion.p>

                    {/* Current slide label */}
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={current}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.4 }}
                            className="inline-block mt-2 px-5 py-2 rounded-full bg-white/15 backdrop-blur-sm text-sm md:text-base text-white/90 tracking-widest font-medium border border-white/20"
                        >
                            {slides[current].label}
                        </motion.span>
                    </AnimatePresence>
                </div>

                {/* Dot indicators */}
                {slides.length > 1 && (
                    <div className="absolute bottom-8 flex gap-2">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === current
                                        ? "bg-white w-7"
                                        : "bg-white/40 hover:bg-white/60"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default PageHeroSlider;
