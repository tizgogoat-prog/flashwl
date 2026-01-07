import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";
import { Globe, Circle, Ban, MessageSquare } from "lucide-react";

const shortcuts = {
  global: {
    icon: Globe,
    title: "Global",
    color: "text-primary",
    items: ["Règles Discord", "Général/HRP", "Important", "Gestion des véhicules"],
  },
  legal: {
    icon: Circle,
    title: "Légal",
    color: "text-primary",
    items: ["SASP", "SAMC", "Government", "Entreprises", "Immobilier", "MortRP"],
  },
  illegal: {
    icon: Ban,
    title: "Illégal",
    color: "text-secondary",
    items: ["Règles Illégal"],
  },
  notionRP: {
    icon: MessageSquare,
    title: "Notion RP",
    color: "text-primary",
    items: [],
  },
};

const categories = [
  {
    icon: Globe,
    title: "Global",
    description: "Règles Discord, Général/HRP, Important, Véhicules",
    color: "text-primary",
  },
  {
    icon: Circle,
    title: "Légal",
    description: "SASP, SAMC, Government, Entreprises, Immobilier, MortRP",
    color: "text-primary",
  },
  {
    icon: Ban,
    title: "Illégal",
    description: "Règles pour les activités illégales",
    color: "text-secondary",
  },
  {
    icon: MessageSquare,
    title: "Notion RP",
    description: "Concepts et termes du roleplay",
    color: "text-primary",
  },
];

const Reglement = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Règlement</h1>
            <p className="text-muted-foreground">
              Dernière modification : 8:00, 10/03/2025
            </p>
          </div>

          {/* Shortcuts */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">Raccourcis</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {Object.entries(shortcuts).map(([key, section]) => (
                <div key={key}>
                  <div className={`flex items-center gap-2 mb-3 ${section.color}`}>
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {section.items.map((item, i) => (
                      <li key={i} className="hover:text-foreground cursor-pointer transition-colors">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {categories.map((cat, index) => (
              <div key={index} className="category-card">
                <div className={`w-16 h-16 rounded-full border-2 border-current flex items-center justify-center mb-4 ${cat.color}`}>
                  <cat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                <p className="text-muted-foreground text-sm">{cat.description}</p>
              </div>
            ))}
          </div>

          {/* Preambule */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-semibold mb-4 text-center">Préambule</h2>
            <p className="text-muted-foreground text-center max-w-3xl mx-auto">
              Le présent règlement est destiné à organiser la vie et les conditions d'utilisation du serveur CityBack. 
              Il est susceptible de subir des modifications à tout moment, elles seront directement prises en compte par vous 
              dès votre première connexion ou prochaine. Le non-respect de ce présent règlement se verra sanctionnable.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reglement;
