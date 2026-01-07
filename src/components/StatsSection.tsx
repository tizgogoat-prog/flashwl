const stats = [
  { value: "500+", label: "Joueurs actifs" },
  { value: "50+", label: "Métiers" },
  { value: "24/7", label: "Serveur en ligne" },
  { value: "99%", label: "Uptime" },
];

const StatsSection = () => {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="stat-number">{stat.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
