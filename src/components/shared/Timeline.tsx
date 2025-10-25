import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface TimelineEvent {
  date: string;
  title: string;
  body: string;
  images?: string[];
}

interface TimelineProps {
  events: TimelineEvent[];
}

const TimelineItem = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative pl-8 pb-12 border-l-2 border-primary last:pb-0"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" />

      {/* Content */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-primary">{event.date}</div>
        <h3 className="font-bold">{event.title}</h3>
        <p className="text-muted-foreground">{event.body}</p>
        
        {event.images && event.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-2">
            {event.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${event.title} - Image ${idx + 1}`}
                className="rounded-lg w-full h-32 object-cover"
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      {events.map((event, index) => (
        <TimelineItem key={index} event={event} index={index} />
      ))}
    </div>
  );
};

export default Timeline;
