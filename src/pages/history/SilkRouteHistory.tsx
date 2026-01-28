import Hero from "@/components/shared/Hero";
import Timeline from "@/components/shared/Timeline";
import { silkRouteHistory } from "@/data/history";

const SilkRouteHistory = () => {
  return (
    <div>
      <Hero
        title="Silk Route History"
        subtitle="The Ancient Trade Network Through Gilgit-Baltistan"
        image="/assets/img/silkroad.jfif"
      />

      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <Timeline events={silkRouteHistory} />
        </div>
      </section>
    </div>
  );
};

export default SilkRouteHistory;
