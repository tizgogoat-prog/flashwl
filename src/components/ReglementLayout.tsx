import reglementHero from "@/assets/reglement-banner.png";
import Footer from "@/components/Footer";

interface ReglementLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: string;
  backgroundImage?: string;
}

const ReglementLayout = ({ children, title, icon, backgroundImage }: ReglementLayoutProps) => {
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
