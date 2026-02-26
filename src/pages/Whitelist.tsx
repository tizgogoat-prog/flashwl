import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";
import { ClipboardList, User, MessageSquare, Gamepad2, BookOpen, Heart, CheckCircle2, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

const Whitelist = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateAgeRange = (value: string) => {
    if (!/^\d{1,3}$/.test(value)) return false;
    const num = Number.parseInt(value, 10);
    return num >= 13 && num <= 99;
  };

  const validateForm = (): string | null => {
    const requiredText: (keyof FormData)[] = [
      "prenom", "age", "pays", "disponibilites",
      "pseudoDiscord", "idDiscord",
      "experienceTemps", "experienceServeurs",
      "persoNom", "persoAge", "persoHistoire", "motivation",
    ];

    for (const key of requiredText) {
      if (!(form[key] as string).trim()) {
        return "Merci de remplir tous les champs.";
      }
    }

    if (!form.reglementAccepte) {
      return "Tu dois accepter le règlement pour continuer.";
    }

    if (!validateAgeRange(form.age.trim())) {
      return "Ton âge IRL doit être entre 13 et 99 ans (chiffres uniquement).";
    }

    if (!validateAgeRange(form.persoAge.trim())) {
      return "L'âge du personnage doit être entre 13 et 99 ans (chiffres uniquement).";
    }

    if (!/^\d{17,20}$/.test(form.idDiscord.trim())) {
      return "Ton ID Discord doit contenir entre 17 et 20 chiffres.";
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      toast({ title: "Formulaire invalide", description: validationError, variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-whitelist", {
        body: {
          prenom: form.prenom.trim(),
          age: form.age.trim(),
          pays: form.pays.trim(),
          disponibilites: form.disponibilites.trim(),
          pseudoDiscord: form.pseudoDiscord.trim(),
          idDiscord: form.idDiscord.trim(),
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
            const responseBody = await context.json() as { error?: string };
            if (typeof responseBody?.error === "string") {
              backendErrorMessage = responseBody.error;
            }
          } catch {
            // Ignore parsing failures and fallback to generic error below
          }
        }

        throw new Error(backendErrorMessage || error.message || "Une erreur est survenue lors de l'envoi.");
      }

      const parsedData = typeof data === "object" && data !== null ? (data as Record<string, unknown>) : null;
      if (parsedData?.success === false) {
        throw new Error(
          typeof parsedData.error === "string"
            ? parsedData.error
            : "Une erreur est survenue lors de l'envoi."
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error && err.message
        ? err.message
        : "Une erreur est survenue lors de l'envoi. Réessaie plus tard.";
      setErrorMessage(msg);
      toast({ title: "Erreur", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen relative">
        <BackgroundImage />
        <Navbar />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="glass-card p-12 flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Candidature envoyée !</h1>
              <p className="text-muted-foreground text-lg max-w-md">
                Merci pour ta candidature. Notre équipe va l'examiner et te contacter sur Discord.
              </p>
              <div className="glass-card p-4 mt-2 w-full">
                <p className="text-sm text-muted-foreground">
                  📌 Délai de réponse estimé : <span className="text-foreground font-medium">24 à 48h</span>
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const sections = [
    {
      icon: User,
      title: "Informations IRL",
      fields: [
        { key: "prenom" as keyof FormData, label: "Prénom", placeholder: "Ton prénom", type: "input" },
        { key: "age" as keyof FormData, label: "Âge", placeholder: "Ex: 18", type: "input" },
        { key: "pays" as keyof FormData, label: "Pays / Ville", placeholder: "Ex: France, Paris", type: "input" },
        { key: "disponibilites" as keyof FormData, label: "Disponibilités (jours / horaires)", placeholder: "Ex: Lundi-Vendredi 18h-23h, Week-end toute la journée", type: "input" },
      ],
    },
    {
      icon: MessageSquare,
      title: "Informations Discord",
      fields: [
        { key: "pseudoDiscord" as keyof FormData, label: "Pseudo Discord", placeholder: "Ex: Wecheu#1234", type: "input" },
        { key: "idDiscord" as keyof FormData, label: "ID Discord", placeholder: "Ex: 123456789012345678", type: "input" },
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
        { key: "motivation" as keyof FormData, label: "Pourquoi veux-tu rejoindre Cityland WL ?", placeholder: "Explique-nous ta motivation...", type: "textarea" },
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
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
              <ClipboardList className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Candidature</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Formulaire de <span className="gradient-text">Whitelist</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Remplis ce formulaire avec soin pour rejoindre l'aventure Cityland WL. Chaque candidature est examinée par notre équipe.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  {section.fields.map((field) => (
                    <div key={field.key}>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {field.label} <span className="text-destructive">*</span>
                      </label>
                      {field.type === "input" ? (
                        <input
                          type="text"
                          value={form[field.key] as string}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          maxLength={200}
                          className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                        />
                      ) : (
                        <textarea
                          value={form[field.key] as string}
                          onChange={(e) => handleChange(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          maxLength={field.type === "textarea-lg" ? 2000 : 500}
                          rows={field.type === "textarea-lg" ? 6 : 3}
                          className="w-full bg-muted/50 border border-border/50 rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                        />
                      )}
                    </div>
                  ))}
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
                    type="checkbox"
                    checked={form.reglementAccepte}
                    onChange={(e) => handleChange("reglementAccepte", e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 rounded border-2 border-border peer-checked:border-primary peer-checked:bg-primary transition-all flex items-center justify-center">
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
                    règlement de Cityland WL
                  </a>{" "}
                  <span className="text-destructive">*</span>
                </span>
              </label>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div className="bg-destructive/20 border border-destructive/50 rounded-lg px-4 py-3 text-destructive text-sm font-medium text-center">
                ⚠️ {errorMessage}
              </div>
            )}

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
