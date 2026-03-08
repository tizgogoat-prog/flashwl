import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";
import { Twitch, Youtube, Twitter, Users } from "lucide-react";
import wecheuAvatar from "@/assets/wecheu-avatar.png";

const streamers = [
  {
    name: "Wecheu",
    avatar: wecheuAvatar,
    platform: "Twitch",
    followers: "15.2K",
    description: "Streamer officiel Cityland WL - RP quotidien",
    isLive: true,
    links: ["twitch", "twitter"],
  },
  {
    name: "Zango",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zango",
    platform: "Twitch",
    followers: "8.5K",
    description: "Membre du SASP - Roleplay policier",
    isLive: false,
    links: ["twitch", "youtube"],
  },
];

const Streamers = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nos Streamers Partenaires
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les créateurs de contenu qui font vivre Cityland WL au quotidien. 
              Suivez-les pour ne rien rater de l'action !
            </p>
          </div>

          {/* Streamers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {streamers.map((streamer, index) => (
              <div key={index} className="streamer-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={streamer.avatar}
                      alt={streamer.name}
                      className="w-16 h-16 rounded-full bg-muted"
                    />
                    {streamer.isLive && (
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-destructive rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{streamer.name}</h3>
                      {streamer.isLive && <span className="live-badge">LIVE</span>}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      {streamer.platform === "Twitch" ? (
                        <Twitch className="w-4 h-4" />
                      ) : (
                        <Youtube className="w-4 h-4" />
                      )}
                      <span>{streamer.platform}</span>
                      <span>•</span>
                      <Users className="w-4 h-4" />
                      <span>{streamer.followers}</span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {streamer.description}
                </p>
                <div className="flex gap-2">
                  {streamer.links.includes("twitch") && (
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm">
                      <Twitch className="w-4 h-4" />
                      Twitch
                    </button>
                  )}
                  {streamer.links.includes("youtube") && (
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm">
                      <Youtube className="w-4 h-4" />
                      YouTube
                    </button>
                  )}
                  {streamer.links.includes("twitter") && (
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-sm">
                      <Twitter className="w-4 h-4" />
                      Twitter
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-semibold mb-3">
              Devenir Streamer Partenaire
            </h2>
            <p className="text-muted-foreground mb-6">
              Tu streames régulièrement sur Cityland WL ? Rejoins notre programme partenaire !
            </p>
            <a
              href="https://discord.gg/gt4xYVUDXt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Postuler sur Discord
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Streamers;
