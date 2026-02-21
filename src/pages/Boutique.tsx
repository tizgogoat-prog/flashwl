import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";
import { Star, Crown, Check } from "lucide-react";

const plans = [
  {
    name: "VIP 1 Mois",
    icon: Star,
    price: "14.99€",
    period: "/mois",
    popular: false,
  },
  {
    name: "VIP 6 Mois",
    icon: Star,
    originalPrice: "119.94€",
    discount: "-33%",
    price: "79.99€",
    period: "/6mois",
    popular: true,
    iconClass: "text-primary",
  },
  {
    name: "VIP 1 An",
    icon: Crown,
    originalPrice: "179.88€",
    discount: "-17%",
    price: "149.99€",
    period: "/an",
    popular: false,
    iconClass: "text-secondary",
  },
];

const benefits = [
  "Création de groupes temporaire",
  "Rôle sur le discord et jeu",
  "Poser des props partout",
  "Mettre de la musique partout",
  "Type de propriété unique",
  "Numéro de téléphone custom",
  "Possibilité de faire des tags",
  "Prioritaire dans la queue",
  "Possibilité de sortir votre animal de compagnie",
  "Permet de dépenser plus d'argent en banque",
  "Skin d'armes",
  "Couleur de map custom",
  "Couleur voiture caméléon",
  "Possibilité d'ajuster sa position assise via un gizmo",
  "Les véhicules sont sales deux fois moins vite",
  "Accès à l'autopilot",
  "Accès à la freecam",
  "Accès prioritaire",
];

const Boutique = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Boutique VIP</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Débloquez des avantages exclusifs et soutenez le serveur en devenant VIP. 
              Profitez d'une expérience de jeu améliorée !
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={plan.popular ? "pricing-card-popular" : "pricing-card"}
              >
                {plan.popular && <span className="popular-badge">Populaire</span>}
                <plan.icon className={`w-12 h-12 mb-4 ${plan.iconClass || "text-muted-foreground"}`} />
                <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground line-through text-sm">
                      {plan.originalPrice}
                    </span>
                    <span className="discount-badge">{plan.discount}</span>
                  </div>
                )}
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <button className={`w-full py-3 rounded-lg font-medium transition-all ${
                  plan.popular 
                    ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                    : "bg-muted hover:bg-muted/80 text-foreground"
                }`}>
                  S'abonner
                </button>
              </div>
            ))}
          </div>

          {/* Benefits */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Avantages VIP inclus
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="glass-card p-6 text-center">
            <p className="text-muted-foreground">
              Les paiements sont sécurisés via Stripe. Pour toute question, contactez-nous sur{" "}
              <a
                href="https://discord.gg/gt4xYVUDXt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Discord
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Boutique;
