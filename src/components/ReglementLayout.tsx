import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import reglementHero from "@/assets/reglement-hero.png";
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
      {/* Règlement Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-12 flex items-center justify-between" ref={dropdownRef}>
          <Link to="/reglement" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="CityLand WL" className="h-7 w-auto" />
            <span className="text-foreground font-semibold text-sm">
              CityLand WL{" "}
              <span className="text-muted-foreground font-normal">Règlement</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ‹‹‹ Retour au Site
            </Link>

            {categories.map((cat) => (
              <div key={cat.id} className="relative">
                {cat.subItems ? (
                  <button
                    onClick={() => toggleDropdown(cat.id)}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        openDropdown === cat.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    to={cat.path!}
                    className={`flex items-center gap-1 px-2.5 py-1.5 text-xs transition-colors ${
                      location.pathname === cat.path
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="text-sm">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </Link>
                )}

                {cat.subItems && openDropdown === cat.id && (
                  <div className="absolute top-full right-0 mt-1 bg-card/95 backdrop-blur-md rounded-md border border-border/30 shadow-xl py-2 min-w-[180px] z-50">
                    {cat.subItems.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        onClick={() => setOpenDropdown(null)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-muted/30 transition-colors text-left ${
                          location.pathname === sub.path
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>{sub.icon}</span>
                        <span>{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

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
