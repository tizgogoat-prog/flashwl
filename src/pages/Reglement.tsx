import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import reglementHero from "@/assets/reglement-banner.png";
import Footer from "@/components/Footer";

interface SubItem {
  icon: string;
  label: string;
  path: string;
}

interface Category {
  id: string;
  icon: string;
  label: string;
  path?: string;
  subItems?: SubItem[];
}

const categories: Category[] = [
  {
    id: "global",
    icon: "🟦",
    label: "Global",
    subItems: [
      { icon: "🟦", label: "Règlement Discord", path: "/reglement/discord" },
      { icon: "🟩", label: "Règlement HRP", path: "/reglement/hrp" },
      { icon: "🟥", label: "Interdictions", path: "/reglement/interdictions" },
    ],
  },
  {
    id: "legal",
    icon: "⚖️",
    label: "Légal",
    subItems: [
      { icon: "🚔", label: "SASP", path: "/reglement/sasp" },
      { icon: "🚑", label: "SAMC", path: "/reglement/samc" },
      { icon: "🏛️", label: "Gouvernement", path: "/reglement/gouvernement" },
      { icon: "🏪", label: "Entreprises", path: "/reglement/entreprises" },
      { icon: "🏠", label: "Immobilier", path: "/reglement/immobilier" },
    ],
  },
  {
    id: "illegal",
    icon: "🌿",
    label: "Illégal",
    subItems: [
      { icon: "🌿", label: "Règlement illégal", path: "/reglement/illegal" },
    ],
  },
  { id: "notion-rp", icon: "💡", label: "Notions du RP", path: "/reglement/notions-rp" },
  { id: "faq", icon: "🚩", label: "FAQ", path: "/reglement/faq" },
];

const Reglement = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero with image */}
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
            Devenez qui vous voulez !
          </h1>
          <a
            href="https://discord.gg/EEwZz2bbxU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-card/70 hover:bg-primary text-foreground px-10 py-3.5 text-sm font-bold tracking-[0.1em] transition-all duration-300"
          >
            Nous Rejoindre
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reglement;
