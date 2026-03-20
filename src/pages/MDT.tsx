import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";
import BackgroundImage from "@/components/BackgroundImage";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MDT = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        if (data.user) {
          toast.success("Compte créé ! Vérifiez votre email pour confirmer.");
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        if (data.user) {
          // Check if user has any MDT role
          const { data: hasRole } = await supabase.rpc("has_any_mdt_role", {
            _user_id: data.user.id,
          });

          if (hasRole) {
            toast.success("Connexion réussie!");
            navigate("/mdt/dashboard");
          } else {
            // Check if admin
            const { data: isAdmin } = await supabase.rpc("is_mdt_admin", {
              _user_id: data.user.id,
            });
            if (isAdmin) {
              toast.success("Connexion réussie!");
              navigate("/admin");
            } else {
              toast.error("Vous n'avez pas accès au MDT. Contactez un administrateur.");
              await supabase.auth.signOut();
            }
          }
        }
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <BackgroundImage />

      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-foreground hover:text-primary transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </Link>

      <div className="relative z-10 glass-card p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="FlashWL" className="h-16 w-auto mb-4" />
          <h1 className="text-2xl font-semibold">
            {isSignup ? "Créer un compte MDT" : "Connexion MDT"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium mb-2">
                Nom d'affichage
              </label>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Votre nom RP"
                className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
            </div>
          )}

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
              required
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
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:bg-primary/90 transition-opacity disabled:opacity-50 active:scale-[0.98]"
          >
            {isLoading
              ? isSignup
                ? "Création..."
                : "Connexion..."
              : isSignup
              ? "Créer le compte"
              : "Se connecter"}
          </button>
        </form>

        <button
          onClick={() => setIsSignup(!isSignup)}
          className="w-full text-center text-muted-foreground text-sm mt-6 hover:text-primary transition-colors"
        >
          {isSignup
            ? "Déjà un compte ? Se connecter"
            : "Pas de compte ? Créer un compte"}
        </button>

        <p className="text-center text-muted-foreground text-xs mt-4">
          Accès réservé au personnel autorisé
        </p>
      </div>
    </div>
  );
};

export default MDT;
