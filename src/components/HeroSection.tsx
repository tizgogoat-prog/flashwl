import { ExternalLink, Gamepad2 } from "lucide-react";
import fleche from "@/assets/fleche.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Rejoignez l'aventure
          <br />
          <span className="text-foreground">Devenez </span>
          <span className="gradient-text italic">qui vous voulez !</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Cityland WL est un serveur GTA RP FiveM offrant une expérience roleplay immersive et unique. Créez votre histoire dans notre ville.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://discord.gg/EEwZz2bbxU"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-2"
          >
            Nous rejoindre
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href="fivem://connect/play.cityland.fr"
            className="btn-outline flex items-center justify-center gap-2"
          >
            Jouer maintenant
            <Gamepad2 className="w-4 h-4" />
          </a>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
        <img src={fleche} alt="Scroll down" className="w-8 h-8 opacity-60" />
      </div>
    </section>
  );
};

export default HeroSection;
