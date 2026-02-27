import logo from "@/assets/logo.png";

const BackgroundImage = () => {
  return (
    <>
      {/* Background Video */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background pointer-events-none" />
      
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
