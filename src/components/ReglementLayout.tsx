import { Link, useLocation } from "react-router-dom";
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

interface ReglementLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: string;
  backgroundImage?: string;
}

const ReglementLayout = ({ children, title, icon, backgroundImage }: ReglementLayoutProps) => {
  const location = useLocation();
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
      {/* Hero with image - shorter for sub-pages */}
      <section className="relative h-[40vh] flex flex-col items-center justify-end pb-12 overflow-hidden">
        <div className="absolute inset-0">
          <img src={backgroundImage || reglementHero} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/50" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight italic">
            {icon && <span className="mr-3 not-italic">{icon}</span>}
            {title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <main className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="reglement-section">{children}</div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReglementLayout;
