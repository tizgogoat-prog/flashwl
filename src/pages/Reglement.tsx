import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import reglementBg from "@/assets/reglement-bg.png";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface SubItem {
  id: string;
  icon: string;
  label: string;
  color?: string;
}

interface Category {
  id: string;
  icon: string;
  label: string;
  subItems?: SubItem[];
}

const categories: Category[] = [
  {
    id: "global",
    icon: "🌐",
    label: "Global",
    subItems: [
      { id: "discord", icon: "🟦", label: "Règlement Discord", color: "text-blue-400" },
      { id: "general-hrp", icon: "🟩", label: "Règlement HRP", color: "text-green-400" },
      { id: "important", icon: "🟥", label: "Interdictions", color: "text-red-400" },
    ],
  },
  {
    id: "legal",
    icon: "⚖️",
    label: "Légal",
    subItems: [
      { id: "sasp", icon: "🚔", label: "SASP" },
      { id: "samc", icon: "🚑", label: "SAMC" },
      { id: "government", icon: "🏛️", label: "Gouvernement" },
      { id: "entreprises", icon: "🏪", label: "Entreprises" },
      { id: "immobilier", icon: "🏠", label: "Immobilier" },
    ],
  },
  {
    id: "illegal",
    icon: "🌿",
    label: "Illégal",
    subItems: [
      { id: "regles-illegal", icon: "🌿", label: "Règlement illégal" },
    ],
  },
  { id: "notion-rp", icon: "💡", label: "Notions du RP" },
  { id: "faq", icon: "🚩", label: "FAQ" },
];

const faqItems = [
  "Comment rejoindre le serveur CityLand WL ?",
  "Comment diffuser mon stream sur le site CityLand WL ?",
  "Est-il possible d'occuper deux emplois simultanément ?",
  "Quelle est la durée de location pour un véhicule dans le cadre d'un emploi intérimaire ?",
  "Il est interdit de s'engager dans des activités illégales en tant qu'agent immobilier.",
  "Si je quitte un groupe PF (Petite Frappe), est-il nécessaire de wipe mon personnage ?",
  "Existe-t-il des emplois accessibles au public (intérimaires) sur le serveur ?",
  "Est-il permis d'effectuer des cambriolages ou des braquages en utilisant une moto ?",
];

const Reglement = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    setOpenDropdown(null);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-12 flex items-center justify-between" ref={dropdownRef}>
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src={logo} alt="CityLand WL" className="h-7 w-auto" />
            <span className="text-foreground font-semibold text-sm">
              CityLand WL{" "}
              <span className="text-muted-foreground font-normal">Règlement</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ‹‹‹ Retour au Site
            </Link>

            {categories.map((cat) => (
              <div key={cat.id} className="relative">
                <button
                  onClick={() =>
                    cat.subItems ? toggleDropdown(cat.id) : scrollToSection(cat.id)
                  }
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-sm">{cat.icon}</span>
                  <span>{cat.label}</span>
                  {cat.subItems && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform ${
                        openDropdown === cat.id ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown */}
                {cat.subItems && openDropdown === cat.id && (
                  <div className="absolute top-full right-0 mt-1 bg-card/95 backdrop-blur-md rounded-md border border-border/30 shadow-xl py-2 min-w-[180px] z-50">
                    {cat.subItems.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => scrollToSection(sub.id)}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors text-left"
                      >
                        <span>{sub.icon}</span>
                        <span>{sub.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero with background image */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/bg-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="relative z-10 text-center">
          <p className="text-xl md:text-3xl font-normal text-foreground/90 mb-2 italic">
            Rejoignez l'aventure
          </p>
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-foreground mb-10 tracking-tight">
            Devenez qui vous voulez !
          </h1>
          <a
            href="https://discord.gg/EEwZz2bbxU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-card/70 hover:bg-primary text-foreground px-10 py-3.5 text-sm font-bold tracking-[0.1em] transition-all duration-300"
          >
            Nous Rejoindre
          </a>
        </div>
      </section>

      {/* Content */}
      <main className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-5xl">
          {/* PRÉAMBULE */}
          <section className="reglement-section">
            <h2>PRÉAMBULE</h2>
            <p>
              Le présent règlement est destiné à organiser la vie et les conditions d'utilisation du serveur CityLand WL.
              Il est susceptible de subir des modifications à tout moment, elles seront directement prises en compte par vous
              dès votre première connexion ou prochaine. Le non-respect de ce présent règlement se verra sanctionnable.
            </p>
          </section>

          {/* CHAPITRE I - GLOBAL */}
          <section className="reglement-section" id="global">
            <h2>CHAPITRE I. GLOBAL</h2>

            <h3 id="discord">🟦 Règlement Discord</h3>
            <ul>
              <li>1. Faites preuve de respect envers chaque membre. Tout comportement abusif, insultant ou discriminatoire (harcèlement, intimidation, discours haineux, racisme, homophobie, sexisme, etc.) est strictement interdit.</li>
              <li>2. Tout partage de contenu illégal, inapproprié ou offensant (images, vidéos, liens, etc.) est prohibé.</li>
              <li>3. La publicité et le spam, que ce soit dans les salons ou en messages privés, ne sont pas autorisés sans accord préalable.</li>
              <li>4. Ne partagez jamais d'informations personnelles (les vôtres ou celles d'autrui) sans consentement explicite.</li>
              <li>5. Les publicités pour d'autres serveurs ou services externes sont interdites.</li>
              <li>6. Chaque canal a un but précis : utilisez-les à bon escient et évitez le hors-sujet.</li>
              <li>7. Les propos vulgaires, insultants ou déplacés ne seront pas tolérés.</li>
              <li>8. Les modérateurs ont le dernier mot en cas de litige. Si un problème survient, contactez un administrateur.</li>
              <li>9. Les règles peuvent être mises à jour à tout moment. Il est de votre responsabilité de vous tenir informé des éventuelles modifications.</li>
              <li>10. Tout non-respect des règles peut entraîner des avertissements, des sanctions temporaires ou un bannissement définitif, selon la gravité de l'infraction.</li>
              <li>11. Si vous avez une question ou un problème, utilisez le système de tickets pour contacter l'équipe de modération.</li>
            </ul>

            <h3 id="general-hrp">🟩 Règlement HRP (Général)</h3>
            <ul>
              <li>1. Faites preuve de respect envers chaque membre. Tout comportement abusif, insultant ou discriminatoire est strictement interdit.</li>
              <li>2. Interdictions spécifiques :</li>
              <p className="pl-6">• Suppression ou modification d'éléments du jeu : props, objets, eau, buissons, etc.</p>
              <p className="pl-6">• Utilisation de viseurs externes (crosshairs).</p>
              <p className="pl-6">• Effets modifiés : kill effects, tracer, blood effects, hit effects.</p>
              <p className="pl-6">• Modification du champ de vision (FOV).</p>
              <p className="pl-6">• Utilisation de fichiers ou scripts donnant un avantage (ex. full stamina).</p>
              <li>3. Toute utilisation de ces modifications est strictement interdite et pourra entraîner des sanctions immédiates.</li>
              <li>4. Aucun remboursement ne sera effectué pour les raisons suivantes :</li>
              <p className="pl-6">• Pertes de biens lors d'un reboot du serveur</p>
              <p className="pl-6">• Erreurs de virement</p>
              <p className="pl-6">• Pertes de biens illégaux en cas de coma ou de déconnexion involontaire</p>
              <p className="pl-6">• Pertes de biens dues à l'inactivité prolongée</p>
              <p className="pl-6">• Vols ou trahisons par des personnes ayant accès à votre propriété</p>
              <li>5. Nous nous réservons le droit de refuser toute demande de remboursement selon les circonstances.</li>
              <li>6. Vous êtes libre de streamer sur le serveur, mais certaines règles doivent être respectées.</li>
              <li>7. Interdictions stream :</li>
              <p className="pl-6">• TrashTalk interdit</p>
              <p className="pl-6">• Utilisation d'informations HRP via le chat interdite</p>
              <p className="pl-6">• Diffusion des interadmin interdite</p>
              <p className="pl-6">• Dénigrement du serveur et/ou de ses membres interdit</p>
              <li>8. Le wipe consiste à réinitialiser totalement votre personnage.</li>
              <li>9. Un wipe peut être appliqué si votre personnage subit une Mort RP validée.</li>
              <li>10. Interdictions & Règles wipe :</li>
              <p className="pl-6">• Aucun transfert de biens entre joueurs</p>
              <p className="pl-6">• Un wipe est impossible si votre compte est en négatif</p>
              <p className="pl-6">• Passage illégal/légal interdit sans wipe</p>
              <p className="pl-6">• Un nouveau personnage ne peut pas être lié à l'ancien</p>
            </ul>

            <h3 id="important">🟥 Interdictions</h3>
            <ul>
              <li>1. Interdictions strictes :</li>
              <p className="pl-6">• Aucun propos haineux (racisme, xénophobie, homophobie)</p>
              <p className="pl-6">• Aucun contenu inapproprié</p>
              <p className="pl-6">• Personnages mineurs interdits (minimum 21 ans)</p>
              <p className="pl-6">• Vocal externe interdit</p>
              <p className="pl-6">• Streamhack interdit</p>
              <p className="pl-6">• RP sexuel interdit</p>
              <p className="pl-6">• Dialecte HRP interdit en RP</p>
              <p className="pl-6">• Publicité interdite</p>
              <p className="pl-6">• Exploitation de bugs et glitchs interdite</p>
              <p className="pl-6">• Aucune transaction d'argent réel</p>
              <li>2. Règles liées au coma & aux déconnexions :</li>
              <p className="pl-6">• Trash corps interdit</p>
              <p className="pl-6">• Déplacer un corps pour empêcher un sauvetage est interdit</p>
              <p className="pl-6">• Aucune communication en coma</p>
              <p className="pl-6">• Mémoire pré-coma conservée</p>
              <p className="pl-6">• Aucune vengeance après un coma</p>
            </ul>

            <h3 id="vehicules">🚗 Gestion des Véhicules</h3>
            <ul>
              <li>Le serveur dispose de plusieurs systèmes de gestion des véhicules pour garantir un usage organisé et réaliste.</li>
            </ul>
          </section>

          {/* CHAPITRE II - LÉGAL */}
          <section className="reglement-section" id="legal">
            <h2>CHAPITRE II. LÉGAL</h2>

            <h3 id="sasp">🚔 SASP (San Andreas State Police)</h3>
            <p>Les membres du SASP doivent respecter les procédures d'arrestation, de contrôle et d'intervention. La corruption modérée est autorisée mais doit rester réaliste.</p>

            <h3 id="samc">🚑 SAMC (San Andreas Medical Center)</h3>
            <p>Les EMS doivent soigner tous les patients sans discrimination. Le matériel médical ne doit être utilisé qu'en service.</p>

            <h3 id="government">🏛️ Gouvernement</h3>
            <p>Les membres du gouvernement représentent l'autorité de l'État. Ils doivent agir avec professionnalisme et intégrité.</p>

            <h3 id="entreprises">🏪 Entreprises</h3>
            <p>Les entreprises doivent respecter les lois et réglementations en vigueur. Les employés représentent leur entreprise en tout temps.</p>

            <h3 id="immobilier">🏠 Immobilier</h3>
            <p>Les propriétés doivent être renouvelées régulièrement pour éviter la perte. Le squattage de propriétés abandonnées est possible sous certaines conditions RP.</p>

            <h3 id="mortrp">💀 MortRP</h3>
            <p>La mort RP est définitive et entraîne un wipe du personnage. Elle doit être validée par le staff selon des critères précis.</p>
          </section>

          {/* CHAPITRE III - ILLÉGAL */}
          <section className="reglement-section" id="illegal">
            <h2>CHAPITRE III. ILLÉGAL</h2>

            <h3 id="regles-illegal">🌿 Règlement Illégal</h3>
            <p>Règles spécifiques aux activités illégales.</p>
          </section>

          {/* CHAPITRE IV - NOTION RP */}
          <section className="reglement-section" id="notion-rp">
            <h2>CHAPITRE IV. NOTIONS DU RP</h2>

            <h3>Règles RolePlay (RP)</h3>
            <ul>
              <li>• Restez dans votre rôle à tout moment : pas de comportements hors RP (HRP) en jeu.</li>
              <li>• Le "Metagaming" (utiliser des informations hors RP en jeu, comme lire un stream) est interdit.</li>
              <li>• Le "Powergaming" (forcer des actions irréalistes sur d'autres joueurs) est interdit.</li>
              <li>• Le "Fail RP" (actions non réalistes, comme sauter d'un immeuble sans conséquence) est interdit.</li>
              <li>• Respectez la règle du "Fear RP" : votre personnage doit avoir peur dans des situations dangereuses.</li>
              <li>• Ne tuez pas sans raison valable ("RDM" - Random Death Match).</li>
              <li>• Le "VDM" (Vehicle Death Match - tuer avec un véhicule sans raison RP) est interdit.</li>
            </ul>

            <h3>Règles de comportement</h3>
            <ul>
              <li>• Utilisez le chat vocal et textuel de manière respectueuse et pertinente.</li>
              <li>• Les discussions HRP doivent se faire dans les canaux dédiés (ex. Discord).</li>
              <li>• Ne pas harceler ou provoquer d'autres joueurs.</li>
              <li>• Les pseudos ou avatars inappropriés sont interdits.</li>
              <li>• Évitez de crier ou de diffuser de la musique non désirée via le chat vocal.</li>
            </ul>

            <h3>Règles sur les bugs et exploits</h3>
            <ul>
              <li>• Il est interdit d'exploiter des bugs ou des failles du jeu pour obtenir un avantage.</li>
              <li>• Si vous découvrez un bug, signalez-le immédiatement au staff via Discord.</li>
              <li>• Ne partagez pas les bugs ou exploits avec d'autres joueurs avant qu'ils ne soient corrigés.</li>
              <li>• L'utilisation d'exploits peut entraîner un bannissement immédiat.</li>
            </ul>

            <h3>Sanctions</h3>
            <ul>
              <li><strong>Avertissement verbal</strong> : Pour les infractions mineures.</li>
              <li><strong>Kick</strong> : Exclusion temporaire pour une infraction modérée.</li>
              <li><strong>Ban temporaire</strong> : De 1 jour à 1 semaine, selon la gravité.</li>
              <li><strong>Ban permanent</strong> : Pour les infractions graves (triche, comportement toxique répété, etc.).</li>
              <li>Les sanctions sont à la discrétion du staff et peuvent être adaptées selon le contexte.</li>
              <li>Vous pouvez contester une sanction via Discord, en fournissant des preuves.</li>
            </ul>
          </section>

          {/* FAQ */}
          <section className="reglement-section" id="faq">
            <h2>🚩 Foire aux questions (FAQ)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 mt-6">
              {faqItems.map((question, i) => (
                <div key={i} className="py-5 border-b border-border/30">
                  <p className="text-foreground font-medium text-sm leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reglement;
