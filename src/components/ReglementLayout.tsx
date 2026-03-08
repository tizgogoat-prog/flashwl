import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SubItem {
  id: string;
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
    icon: "🌐",
    label: "Global",
    subItems: [
      { id: "discord", icon: "🟦", label: "Règlement Discord", path: "/reglement/discord" },
      { id: "general-hrp", icon: "🟩", label: "Règlement HRP", path: "/reglement/hrp" },
      { id: "important", icon: "🟥", label: "Interdictions", path: "/reglement/interdictions" },
    ],
  },
  {
    id: "legal",
    icon: "⚖️",
    label: "Légal",
    subItems: [
      { id: "sasp", icon: "🚔", label: "SASP", path: "/reglement/sasp" },
      { id: "samc", icon: "🚑", label: "SAMC", path: "/reglement/samc" },
      { id: "government", icon: "🏛️", label: "Gouvernement", path: "/reglement/gouvernement" },
      { id: "entreprises", icon: "🏪", label: "Entreprises", path: "/reglement/entreprises" },
      { id: "immobilier", icon: "🏠", label: "Immobilier", path: "/reglement/immobilier" },
    ],
  },
  {
    id: "illegal",
    icon: "🌿",
    label: "Illégal",
    subItems: [
      { id: "regles-illegal", icon: "🌿", label: "Règlement illégal", path: "/reglement/illegal" },
    ],
  },
  { id: "notion-rp", icon: "💡", label: "Notions du RP", path: "/reglement/notions-rp" },
  { id: "faq", icon: "🚩", label: "FAQ", path: "/reglement/faq" },
];

interface ReglementLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: string;
}

const ReglementLayout = ({ children, title, icon }: ReglementLayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero with video */}
      <section className="relative h-[50vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/videos/bg-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-lg text-muted-foreground mb-2">Règlement CityLand WL</p>
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            {icon && <span className="mr-3">{icon}</span>}
            {title}
          </h1>
        </div>
      </section>

      {/* Secondary Navigation */}
      <nav className="sticky top-16 z-40 bg-background/90 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2">
          <Link
            to="/reglement"
            className={`shrink-0 px-3 py-1.5 text-xs rounded-md transition-colors ${
              location.pathname === "/reglement"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            ‹ Vue d'ensemble
          </Link>
          <div className="w-px h-4 bg-border/30 mx-1 shrink-0" />
          {categories.map((cat) =>
            cat.subItems ? (
              cat.subItems.map((sub) => (
                <Link
                  key={sub.id}
                  to={sub.path}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors ${
                    location.pathname === sub.path
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <span>{sub.icon}</span>
                  <span>{sub.label}</span>
                </Link>
              ))
            ) : (
              <Link
                key={cat.id}
                to={cat.path!}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-colors ${
                  location.pathname === cat.path
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            )
          )}
        </div>
      </nav>

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
