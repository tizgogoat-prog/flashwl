import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";
import { ClipboardList, User, MessageSquare, Gamepad2, BookOpen, Heart, CheckCircle2, Send, Loader2, XCircle, Clock, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Discord OAuth - client ID fetched from edge function

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  global_name: string | null;
}

interface ApplicationStatus {
  id: string;
  status: string;
  admin_message: string | null;
}

interface FormData {
  prenom: string;
  age: string;
  pays: string;
  disponibilites: string;
  pseudoDiscord: string;
  idDiscord: string;
  experienceTemps: string;
  experienceServeurs: string;
  persoNom: string;
  persoAge: string;
  persoHistoire: string;
  motivation: string;
  reglementAccepte: boolean;
}

const initialForm: FormData = {
  prenom: "",
  age: "",
  pays: "",
  disponibilites: "",
  pseudoDiscord: "",
  idDiscord: "",
  experienceTemps: "",
  experienceServeurs: "",
  persoNom: "",
  persoAge: "",
  persoHistoire: "",
  motivation: "",
  reglementAccepte: false,
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

type ValidationError = {
  message: string;
  field?: keyof FormData;
  fieldMessage?: string;
};

const getDiscordAvatarUrl = (user: DiscordUser) => {
  if (user.avatar) {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`;
  }
  const defaultIndex = user.discriminator === "0"
    ? (BigInt(user.id) >> 22n) % 6n
    : parseInt(user.discriminator) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
};

const getRedirectUri = () => {
  return `${window.location.origin}/whitelist`;
};

const getDiscordOAuthUrl = (clientId: string) => {
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getRedirectUri(),
    response_type: "code",
    scope: "identify",
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
};

const Whitelist = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const { toast } = useToast();

  // Discord auth state
  const [discordUser, setDiscordUser] = useState<DiscordUser | null>(null);
  const [existingApplication, setExistingApplication] = useState<ApplicationStatus | null>(null);
  const [hasCitoyenRole, setHasCitoyenRole] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [discordClientId, setDiscordClientId] = useState<string | null>(null);

  // Fetch Discord client ID
  useEffect(() => {
    supabase.functions.invoke("discord-oauth", { method: "GET" } as any).then(({ data }) => {
      if (data?.client_id) setDiscordClientId(data.client_id);
    });
  }, []);

  // Handle Discord OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Remove code from URL
      window.history.replaceState({}, "", window.location.pathname);
      handleDiscordCallback(code);
    } else {
      // Check if user info is in sessionStorage
      const stored = sessionStorage.getItem("discord_user");
      const storedApp = sessionStorage.getItem("discord_app");
      const storedRole = sessionStorage.getItem("discord_citoyen");
      if (stored) {
        setDiscordUser(JSON.parse(stored));
        if (storedApp) setExistingApplication(JSON.parse(storedApp));
        if (storedRole) setHasCitoyenRole(JSON.parse(storedRole));
        setAuthChecked(true);
      } else {
        setAuthChecked(true);
      }
    }
  }, []);

  const handleDiscordCallback = async (code: string) => {
    setAuthLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("discord-oauth", {
        body: { code, redirect_uri: getRedirectUri() },
      });

      if (error) throw new Error("Échec de la connexion Discord");

      if (data?.success) {
        setDiscordUser(data.user);
        setExistingApplication(data.application);
        setHasCitoyenRole(data.hasCitoyenRole);

        sessionStorage.setItem("discord_user", JSON.stringify(data.user));
        if (data.application) sessionStorage.setItem("discord_app", JSON.stringify(data.application));
        sessionStorage.setItem("discord_citoyen", JSON.stringify(data.hasCitoyenRole));
      } else {
        throw new Error(data?.error || "Erreur inconnue");
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Erreur", description: "Impossible de se connecter via Discord.", variant: "destructive" });
    } finally {
      setAuthLoading(false);
      setAuthChecked(true);
    }
  };

  const handleLogout = () => {
    setDiscordUser(null);
    setExistingApplication(null);
    setHasCitoyenRole(false);
    sessionStorage.removeItem("discord_user");
    sessionStorage.removeItem("discord_app");
    sessionStorage.removeItem("discord_citoyen");
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateAgeRange = (value: string) => {
    if (!/^\d{1,3}$/.test(value)) return false;
    const num = Number.parseInt(value, 10);
    return num >= 13 && num <= 99;
  };

  const validateForm = (): ValidationError | null => {
    const requiredText: (keyof FormData)[] = [
      "prenom", "age", "pays", "disponibilites",
      "experienceTemps", "experienceServeurs",
      "persoNom", "persoAge", "persoHistoire", "motivation",
    ];

    for (const key of requiredText) {
      if (!(form[key] as string).trim()) {
        return { message: "Merci de remplir tous les champs.", field: key, fieldMessage: "Champ obligatoire." };
      }
    }

    if (!form.reglementAccepte) {
      return { message: "Tu dois accepter le règlement pour continuer.", field: "reglementAccepte", fieldMessage: "Obligatoire." };
    }

    if (!validateAgeRange(form.age.trim())) {
      return { message: "Ton âge IRL doit être entre 13 et 99 ans.", field: "age", fieldMessage: "Âge invalide (13–99)." };
    }

    if (!validateAgeRange(form.persoAge.trim())) {
      return { message: "L'âge du personnage doit être entre 13 et 99 ans.", field: "persoAge", fieldMessage: "Âge invalide (13–99)." };
    }

    return null;
  };

  const focusInvalidField = (field: keyof FormData) => {
    if (field === "reglementAccepte") {
      const el = document.getElementById("reglementAccepte");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      (el as HTMLInputElement | null)?.focus?.();
      return;
    }
    const el = document.querySelector(`[name="${field}"]`) as HTMLInputElement | HTMLTextAreaElement | null;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.focus?.();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError.message);
      if (validationError.field && validationError.fieldMessage) {
        setFieldErrors({ [validationError.field]: validationError.fieldMessage });
        focusInvalidField(validationError.field);
      }
      toast({ title: "Formulaire invalide", description: validationError.message, variant: "destructive" });
      return;
    }

    if (!discordUser) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-whitelist", {
        body: {
          prenom: form.prenom.trim(),
          age: form.age.trim(),
          pays: form.pays.trim(),
          disponibilites: form.disponibilites.trim(),
          pseudoDiscord: `${discordUser.global_name || discordUser.username}`,
          idDiscord: discordUser.id,
          experienceTemps: form.experienceTemps.trim(),
          experienceServeurs: form.experienceServeurs.trim(),
          persoNom: form.persoNom.trim(),
          persoAge: form.persoAge.trim(),
          persoHistoire: form.persoHistoire.trim(),
          motivation: form.motivation.trim(),
        },
      });

      if (error) {
        let backendErrorMessage: string | null = null;
        const context = (error as { context?: Response }).context;
        if (context) {
          try {
            const responseBody = (await context.json()) as { error?: string };
            if (typeof responseBody?.error === "string") backendErrorMessage = responseBody.error;
          } catch {}
        }
        throw new Error(backendErrorMessage || error.message || "Une erreur est survenue.");
      }

      const parsedData = typeof data === "object" && data !== null ? (data as Record<string, unknown>) : null;
      if (parsedData?.success === false) {
        throw new Error(typeof parsedData.error === "string" ? parsedData.error : "Une erreur est survenue.");
      }

      setSubmitted(true);
      setExistingApplication({ id: "", status: "pending", admin_message: null });
      sessionStorage.setItem("discord_app", JSON.stringify({ id: "", status: "pending", admin_message: null }));
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error && err.message ? err.message : "Une erreur est survenue. Réessaie plus tard.";
      setErrorMessage(msg);
      toast({ title: "Erreur", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // === RENDER: Loading auth ===
  if (!authChecked || authLoading) {
    return (
      <div className="min-h-screen relative">
        <BackgroundImage />
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-12 flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-primary" />
              <p className="text-muted-foreground">Connexion en cours...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // === RENDER: Not connected — show Discord login ===
  if (!discordUser) {
    return (
      <div className="min-h-screen relative">
        <BackgroundImage />
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <ClipboardList className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Candidature</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Formulaire de <span className="gradient-text">Whitelist</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              Connecte-toi avec Discord pour accéder au formulaire de candidature.
            </p>

            <div className="glass-card p-10 flex flex-col items-center gap-6 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-full bg-[#5865F2]/20 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#5865F2' }}>
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-foreground">Connexion requise</h2>
              <p className="text-muted-foreground text-sm">
                Tu dois te connecter avec ton compte Discord pour envoyer ta candidature.
              </p>
              <a
                href={discordClientId ? getDiscordOAuthUrl(discordClientId) : "#"}
                className="btn-primary py-3 px-8 text-lg font-semibold flex items-center gap-3 rounded-lg no-underline"
              >
                <LogIn className="w-5 h-5" />
                Se connecter avec Discord
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // === RENDER: Already whitelisted (has Citoyen role) ===
  if (hasCitoyenRole) {
    return (
      <div className="min-h-screen relative">
        <BackgroundImage />
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-12 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 mb-2">
                <img src={getDiscordAvatarUrl(discordUser)} alt="" className="w-12 h-12 rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">{discordUser.global_name || discordUser.username}</p>
                  <p className="text-xs text-muted-foreground">@{discordUser.username}</p>
                </div>
              </div>
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Déjà whitelisté !</h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Tu es déjà whitelisté sur FlashWL. Tu peux rejoindre le serveur et commencer à jouer !
              </p>
              <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-4">
                Se déconnecter
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // === RENDER: Existing application status ===
  if (existingApplication || submitted) {
    const status = existingApplication?.status || "pending";
    const adminMessage = existingApplication?.admin_message;

    const statusConfig = {
      pending: {
        icon: Clock,
        color: "text-yellow-500",
        bgColor: "bg-yellow-500/20",
        title: "Candidature en cours d'examen",
        description: "Ta candidature est en attente. Un membre du staff va l'examiner prochainement.",
      },
      accepted: {
        icon: CheckCircle2,
        color: "text-green-500",
        bgColor: "bg-green-500/20",
        title: "Candidature acceptée !",
        description: "Félicitations ! Ta candidature a été acceptée. Bienvenue sur FlashWL !",
      },
      rejected: {
        icon: XCircle,
        color: "text-red-500",
        bgColor: "bg-red-500/20",
        title: "Candidature refusée",
        description: "Ta candidature a été refusée. Tu peux consulter le message de l'équipe ci-dessous.",
      },
      waiting: {
        icon: Clock,
        color: "text-blue-500",
        bgColor: "bg-blue-500/20",
        title: "En attente — Vocal WL",
        description: "Tu as été sélectionné pour un entretien vocal. Un membre du staff te contactera sur Discord.",
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const StatusIcon = config.icon;

    return (
      <div className="min-h-screen relative">
        <BackgroundImage />
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-12 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3 mb-2">
                <img src={getDiscordAvatarUrl(discordUser)} alt="" className="w-12 h-12 rounded-full" />
                <div className="text-left">
                  <p className="font-semibold text-foreground">{discordUser.global_name || discordUser.username}</p>
                  <p className="text-xs text-muted-foreground">@{discordUser.username}</p>
                </div>
              </div>
              <div className={`w-20 h-20 rounded-full ${config.bgColor} flex items-center justify-center`}>
                <StatusIcon className={`w-10 h-10 ${config.color}`} />
              </div>
              <h1 className="text-3xl font-bold text-foreground">{config.title}</h1>
              <p className="text-muted-foreground text-lg max-w-md">{config.description}</p>
              {adminMessage && (
                <div className="glass-card p-4 mt-2 w-full text-left">
                  <p className="text-sm text-muted-foreground mb-1 font-medium">💬 Message de l'équipe FlashWL :</p>
                  <p className="text-foreground">{adminMessage}</p>
                </div>
              )}
              <button onClick={handleLogout} className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-4">
                Se déconnecter
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // === RENDER: Show form ===
  const sections = [
    {
      icon: User,
      title: "Informations IRL",
      fields: [
        { key: "prenom" as keyof FormData, label: "Prénom", placeholder: "Ton prénom", type: "input" },
        { key: "age" as keyof FormData, label: "Âge", placeholder: "Ex: 18", type: "input" },
        { key: "pays" as keyof FormData, label: "Pays / Ville", placeholder: "Ex: France, Paris", type: "input" },
        { key: "disponibilites" as keyof FormData, label: "Disponibilités (jours / horaires)", placeholder: "Ex: Lundi-Vendredi 18h-23h", type: "input" },
      ],
    },
    {
      icon: Gamepad2,
      title: "Expérience RP",
      fields: [
        { key: "experienceTemps" as keyof FormData, label: "Depuis combien de temps fais-tu du RP ?", placeholder: "Ex: 2 ans", type: "input" },
        { key: "experienceServeurs" as keyof FormData, label: "Sur quels serveurs as-tu déjà joué ?", placeholder: "Ex: ServerA, ServerB...", type: "textarea" },
      ],
    },
    {
      icon: BookOpen,
      title: "Personnage RP",
      fields: [
        { key: "persoNom" as keyof FormData, label: "Nom & Prénom du personnage", placeholder: "Ex: Jean Dupont", type: "input" },
        { key: "persoAge" as keyof FormData, label: "Âge du personnage", placeholder: "Ex: 25", type: "input" },
        { key: "persoHistoire" as keyof FormData, label: "Histoire du personnage (5-10 lignes)", placeholder: "Raconte l'histoire de ton personnage...", type: "textarea-lg" },
      ],
    },
    {
      icon: Heart,
      title: "Motivations",
      fields: [
        { key: "motivation" as keyof FormData, label: "Pourquoi veux-tu rejoindre FlashWL ?", placeholder: "Explique-nous ta motivation...", type: "textarea" },
      ],
    },
  ];

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <ClipboardList className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Candidature</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Formulaire de <span className="gradient-text">Whitelist</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Remplis ce formulaire avec soin pour rejoindre l'aventure FlashWL.
            </p>
          </div>

          {/* Connected user info */}
          <div className="glass-card p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={getDiscordAvatarUrl(discordUser)} alt="" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold text-foreground text-sm">{discordUser.global_name || discordUser.username}</p>
                <p className="text-xs text-muted-foreground">@{discordUser.username} • {discordUser.id}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Déconnexion
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="sticky top-20 z-40 bg-destructive/15 border border-destructive/40 rounded-lg px-4 py-3 text-destructive text-sm font-medium text-center backdrop-blur">
                ⚠️ {errorMessage}
              </div>
            )}

            {sections.map((section, idx) => (
              <div key={idx} className="glass-card p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
                  <div className="flex-1 h-px bg-border/50 ml-2" />
                </div>

                <div className="space-y-5">
                  {section.fields.map((field) => {
                    const hasError = Boolean(fieldErrors[field.key]);
                    const baseClass = "w-full bg-muted/50 border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all";
                    const okClass = "border-border/50 focus:ring-primary/50 focus:border-primary/50";
                    const errClass = "border-destructive/60 ring-2 ring-destructive/20 focus:ring-destructive/30 focus:border-destructive/60";

                    return (
                      <div key={field.key}>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {field.label} <span className="text-destructive">*</span>
                        </label>
                        {field.type === "input" ? (
                          <input
                            type="text"
                            name={field.key}
                            aria-invalid={hasError}
                            value={form[field.key] as string}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            maxLength={200}
                            className={`${baseClass} ${hasError ? errClass : okClass}`}
                          />
                        ) : (
                          <textarea
                            name={field.key}
                            aria-invalid={hasError}
                            value={form[field.key] as string}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            maxLength={field.type === "textarea-lg" ? 2000 : 500}
                            rows={field.type === "textarea-lg" ? 6 : 3}
                            className={`${baseClass} resize-none ${hasError ? errClass : okClass}`}
                          />
                        )}
                        {hasError && <p className="mt-2 text-sm text-destructive">{fieldErrors[field.key]}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Règlement */}
            <div className="glass-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Règlement</h2>
                <div className="flex-1 h-px bg-border/50 ml-2" />
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    id="reglementAccepte"
                    type="checkbox"
                    checked={form.reglementAccepte}
                    onChange={(e) => handleChange("reglementAccepte", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all flex items-center justify-center ${fieldErrors.reglementAccepte ? "border-destructive" : "border-border"} peer-checked:border-primary peer-checked:bg-primary`}>
                    {form.reglementAccepte && (
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  J'ai lu et j'accepte le{" "}
                  <a href="/reglement" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    règlement de FlashWL
                  </a>{" "}
                  <span className="text-destructive">*</span>
                </span>
              </label>
              {fieldErrors.reglementAccepte && <p className="mt-3 text-sm text-destructive">{fieldErrors.reglementAccepte}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Envoyer ma candidature
                </>
              )}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Whitelist;
