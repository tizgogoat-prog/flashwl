import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";
import BackgroundImage from "@/components/BackgroundImage";

const MDT = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <BackgroundImage />
      
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-foreground hover:text-primary transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </Link>

      {/* Login Card */}
      <div className="relative z-10 glass-card p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="CityBack" className="h-16 w-auto mb-4" />
          <h1 className="text-2xl font-semibold">Connexion MDT</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-foreground text-background py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Accès réservé au personnel autorisé
        </p>
      </div>
    </div>
  );
};

export default MDT;
