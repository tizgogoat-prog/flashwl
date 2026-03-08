import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import reglementHero from "@/assets/reglement-hero.png";

const categories = [
  {
    chapter: "CHAPITRE I. GLOBAL",
    items: [
      { icon: "🟦", label: "Règlement Discord", path: "/reglement/discord" },
      { icon: "🟩", label: "Règlement HRP", path: "/reglement/hrp" },
      { icon: "🟥", label: "Interdictions", path: "/reglement/interdictions" },
    ],
  },
  {
    chapter: "CHAPITRE II. LÉGAL",
    items: [
      { icon: "🚔", label: "SASP", path: "/reglement/sasp" },
      { icon: "🚑", label: "SAMC", path: "/reglement/samc" },
      { icon: "🏛️", label: "Gouvernement", path: "/reglement/gouvernement" },
      { icon: "🏪", label: "Entreprises", path: "/reglement/entreprises" },
      { icon: "🏠", label: "Immobilier", path: "/reglement/immobilier" },
    ],
  },
  {
    chapter: "CHAPITRE III. ILLÉGAL",
    items: [
      { icon: "🌿", label: "Règlement illégal", path: "/reglement/illegal" },
    ],
  },
  {
    chapter: "AUTRES",
    items: [
      { icon: "💡", label: "Notions du RP", path: "/reglement/notions-rp" },
      { icon: "🚩", label: "FAQ", path: "/reglement/faq" },
    ],
  },
];

const Reglement = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero with video */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={reglementHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-xl md:text-3xl font-normal text-foreground/90 mb-2 italic">
            Rejoignez l'aventure
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-foreground mb-10 tracking-tight">
            Règlement CityLand WL
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Le présent règlement est destiné à organiser la vie et les conditions d'utilisation du serveur CityLand WL.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <main className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          {categories.map((cat) => (
            <section key={cat.chapter} className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-6 tracking-wide">{cat.chapter}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group flex items-center gap-4 p-5 rounded-lg bg-card/50 border border-border/20 hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reglement;
