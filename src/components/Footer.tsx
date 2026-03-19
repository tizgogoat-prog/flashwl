import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-lg py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={logo} alt="FlashWL" className="h-8 w-auto opacity-50" />
          <p className="text-muted-foreground text-sm text-center">
            © 2024 FlashWL. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
