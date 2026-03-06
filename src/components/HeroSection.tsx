import fleche from "@/assets/fleche.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-4 text-foreground tracking-tight">
          Rejoignez l'aventure
        </h1>
        
        <p className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-12">
          Devenez qui vous voulez !
        </p>
        
        <a
          href="https://discord.gg/EEwZz2bbxU"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-card/80 hover:bg-card border border-border/50 text-foreground px-10 py-4 text-lg font-semibold tracking-wide transition-all duration-200 hover:scale-105"
        >
          Nous Rejoindre
        </a>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <img src={fleche} alt="Scroll down" className="w-8 h-8 opacity-60" />
      </div>
    </section>
  );
};

export default HeroSection;
