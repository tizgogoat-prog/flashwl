import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.png";

const BackgroundImage = () => {
  return (
    <>
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      
      {/* Large Logo Watermark */}
      <div className="fixed bottom-0 left-0 opacity-10 pointer-events-none">
        <img 
          src={logo} 
          alt="" 
          className="w-80 h-auto"
        />
      </div>
    </>
  );
};

export default BackgroundImage;
