import fleche from "@/assets/fleche.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-5xl mx-auto">
        <p className="text-2xl md:text-4xl lg:text-5xl font-normal text-foreground mb-2 tracking-tight italic">
          Rejoignez l'aventure
        </p>
        
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-foreground mb-14 tracking-tight">
          Devenez qui vous voulez !
        </h1>
        
        <a
          href="https://discord.gg/EEwZz2bbxU"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-card/70 hover:bg-primary text-foreground px-12 py-4 text-base font-bold tracking-[0.1em] transition-all duration-300"
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
