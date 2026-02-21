import Navbar from "@/components/Navbar";
import BackgroundImage from "@/components/BackgroundImage";
import Footer from "@/components/Footer";
import { Globe, Circle, Ban, MessageSquare } from "lucide-react";

const shortcuts = {
  global: {
    icon: Globe,
    title: "Global",
    color: "text-primary",
    items: ["Règles Discord", "Général/HRP", "Important", "Gestion des véhicules"],
  },
  legal: {
    icon: Circle,
    title: "Légal",
    color: "text-primary",
    items: ["SASP", "SAMC", "Government", "Entreprises", "Immobilier", "MortRP"],
  },
  illegal: {
    icon: Ban,
    title: "Illégal",
    color: "text-secondary",
    items: ["Règles Illégal"],
  },
  notionRP: {
    icon: MessageSquare,
    title: "Notion RP",
    color: "text-primary",
    items: [],
  },
};

const Reglement = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Règlement</h1>
            <p className="text-muted-foreground">
              Dernière modification : 8:00, 10/03/2025
            </p>
          </div>

          {/* Shortcuts */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">Raccourcis</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {Object.entries(shortcuts).map(([key, section]) => (
                <div key={key}>
                  <div className={`flex items-center gap-2 mb-3 ${section.color}`}>
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.title}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {section.items.map((item, i) => (
                      <li key={i}>
                        <a 
                          href={`#${item.toLowerCase().replace(/[^a-z0-9àâäéèêëïîôùûüÿçœæ]+/g, '-').replace(/(^-|-$)/g, '')}`}
                          className="hover:text-foreground cursor-pointer transition-colors"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <a href="#global" className="category-card">
              <Globe className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">Global</h3>
              <p className="text-muted-foreground text-sm">Règles Discord, Général/HRP, Important, Véhicules</p>
            </a>
            <a href="#legal" className="category-card">
              <Circle className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">Légal</h3>
              <p className="text-muted-foreground text-sm">SASP, SAMC, Government, Entreprises, Immobilier, MortRP</p>
            </a>
            <a href="#illegal" className="category-card">
              <Ban className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">Illégal</h3>
              <p className="text-muted-foreground text-sm">Règles pour les activités illégales</p>
            </a>
            <a href="#notion-rp" className="category-card">
              <MessageSquare className="feature-icon" />
              <h3 className="text-xl font-semibold mb-2">Notion RP</h3>
              <p className="text-muted-foreground text-sm">Concepts et termes du roleplay</p>
            </a>
          </div>

          {/* Préambule */}
          <section className="reglement-section">
            <h2>PRÉAMBULE</h2>
            <p>
              Le présent règlement est destiné à organiser la vie et les conditions d'utilisation du serveur Cityland WL. 
              Il est susceptible de subir des modifications à tout moment, elles seront directement prises en compte par vous 
              dès votre première connexion ou prochaine. Le non-respect de ce présent règlement se verra sanctionnable.
            </p>
          </section>

          {/* CHAPITRE I - GLOBAL */}
          <section className="reglement-section" id="global">
            <h2>CHAPITRE I. GLOBAL</h2>
            
            <h3 id="discord">Règles Discord</h3>
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
            
            <h3 id="general-hrp">Général/HRP</h3>
            <ul>
              <li>1. Faites preuve de respect envers chaque membre. Tout comportement abusif, insultant ou discriminatoire est strictement interdit.</li>
              <li>2. Interdictions spécifiques :</li>
              <p>• Suppression ou modification d'éléments du jeu : props, objets, eau, buissons, etc.</p>
              <p>• Utilisation de viseurs externes (crosshairs).</p>
              <p>• Effets modifiés : kill effects, tracer, blood effects, hit effects.</p>
              <p>• Modification du champ de vision (FOV).</p>
              <p>• Utilisation de fichiers ou scripts donnant un avantage (ex. full stamina).</p>
              <li>3. Toute utilisation de ces modifications est strictement interdite et pourra entraîner des sanctions immédiates.</li>
              <li>4. Aucun remboursement ne sera effectué pour les raisons suivantes :</li>
              <p>• Pertes de biens lors d'un reboot du serveur</p>
              <p>• Erreurs de virement</p>
              <p>• Pertes de biens illégaux en cas de coma ou de déconnexion involontaire</p>
              <p>• Pertes de biens dues à l'inactivité prolongée</p>
              <p>• Vols ou trahisons par des personnes ayant accès à votre propriété</p>
              <li>5. Nous nous réservons le droit de refuser toute demande de remboursement selon les circonstances.</li>
              <li>6. Vous êtes libre de streamer sur le serveur, mais certaines règles doivent être respectées.</li>
              <li>7. Interdictions stream :</li>
              <p>• TrashTalk interdit</p>
              <p>• Utilisation d'informations HRP via le chat interdite</p>
              <p>• Diffusion des interadmin interdite</p>
              <p>• Dénigrement du serveur et/ou de ses membres interdit</p>
              <li>8. Le wipe consiste à réinitialiser totalement votre personnage.</li>
              <li>9. Un wipe peut être appliqué si votre personnage subit une Mort RP validée.</li>
              <li>10. Interdictions & Règles wipe :</li>
              <p>• Aucun transfert de biens entre joueurs</p>
              <p>• Un wipe est impossible si votre compte est en négatif</p>
              <p>• Passage illégal/légal interdit sans wipe</p>
              <p>• Un nouveau personnage ne peut pas être lié à l'ancien</p>
            </ul>
            
            <h3 id="important">Important</h3>
            <ul>
              <li>1. Interdictions strictes :</li>
              <p>• Aucun propos haineux (racisme, xénophobie, homophobie)</p>
              <p>• Aucun contenu inapproprié</p>
              <p>• Personnages mineurs interdits (minimum 21 ans)</p>
              <p>• Vocal externe interdit</p>
              <p>• Streamhack interdit</p>
              <p>• RP sexuel interdit</p>
              <p>• Dialecte HRP interdit en RP</p>
              <p>• Publicité interdite</p>
              <p>• Exploitation de bugs et glitchs interdite</p>
              <p>• Aucune transaction d'argent réel</p>
              <li>2. Règles liées au coma & aux déconnexions :</li>
              <p>• Trash corps interdit</p>
              <p>• Déplacer un corps pour empêcher un sauvetage est interdit</p>
              <p>• Aucune communication en coma</p>
              <p>• Mémoire pré-coma conservée</p>
              <p>• Aucune vengeance après un coma</p>
            </ul>
            
            <h3 id="vehicules">Gestion des Véhicules</h3>
            <ul>
              <li>Le serveur dispose de plusieurs systèmes de gestion des véhicules pour garantir un usage organisé et réaliste.</li>
            </ul>
          </section>

          {/* CHAPITRE II - LÉGAL */}
          <section className="reglement-section" id="legal">
            <h2>CHAPITRE II. LÉGAL</h2>
            <h3 id="sasp">SASP (San Andreas State Police)</h3>
            <p>Les membres du SASP doivent respecter les procédures d'arrestation, de contrôle et d'intervention. La corruption modérée est autorisée mais doit rester réaliste.</p>
            <h3 id="samc">SAMC (San Andreas Medical Center)</h3>
            <p>Les EMS doivent soigner tous les patients sans discrimination. Le matériel médical ne doit être utilisé qu'en service.</p>
            <h3 id="government">Government</h3>
            <p>Les membres du gouvernement représentent l'autorité de l'État. Ils doivent agir avec professionnalisme et intégrité.</p>
            <h3 id="entreprises">Entreprises</h3>
            <p>Les entreprises doivent respecter les lois et réglementations en vigueur. Les employés représentent leur entreprise en tout temps.</p>
            <h3 id="immobilier">Immobilier</h3>
            <p>Les propriétés doivent être renouvelées régulièrement pour éviter la perte. Le squattage de propriétés abandonnées est possible sous certaines conditions RP.</p>
            <h3 id="mortrp">MortRP</h3>
            <p>La mort RP est définitive et entraîne un wipe du personnage. Elle doit être validée par le staff selon des critères précis.</p>
          </section>

          {/* CHAPITRE III - ILLÉGAL */}
          <section className="reglement-section" id="illegal">
            <h2>CHAPITRE III. ILLÉGAL</h2>
            <h3 id="regles-illegal">Règles Illégal</h3>
            <p>Règles spécifiques aux activités illégales.</p>
          </section>

          {/* CHAPITRE IV - NOTION RP */}
          <section className="reglement-section" id="notion-rp">
            <h2>CHAPITRE IV. NOTION RP</h2>
            <p>Concepts et termes du roleplay.</p>
          </section>

          {/* Règles RolePlay */}
          <section className="reglement-section">
            <h2>Règles RolePlay (RP)</h2>
            <ul>
              <li>• Restez dans votre rôle à tout moment : pas de comportements hors RP (HRP) en jeu.</li>
              <li>• Le "Metagaming" (utiliser des informations hors RP en jeu, comme lire un stream) est interdit.</li>
              <li>• Le "Powergaming" (forcer des actions irréalistes sur d'autres joueurs) est interdit.</li>
              <li>• Le "Fail RP" (actions non réalistes, comme sauter d'un immeuble sans conséquence) est interdit.</li>
              <li>• Respectez la règle du "Fear RP" : votre personnage doit avoir peur dans des situations dangereuses.</li>
              <li>• Ne tuez pas sans raison valable ("RDM" - Random Death Match).</li>
              <li>• Le "VDM" (Vehicle Death Match - tuer avec un véhicule sans raison RP) est interdit.</li>
            </ul>
          </section>

          {/* Règles de comportement */}
          <section className="reglement-section">
            <h2>Règles de comportement</h2>
            <ul>
              <li>• Utilisez le chat vocal et textuel de manière respectueuse et pertinente.</li>
              <li>• Les discussions HRP doivent se faire dans les canaux dédiés (ex. Discord).</li>
              <li>• Ne pas harceler ou provoquer d'autres joueurs.</li>
              <li>• Les pseudos ou avatars inappropriés sont interdits.</li>
              <li>• Évitez de crier ou de diffuser de la musique non désirée via le chat vocal.</li>
            </ul>
          </section>

          {/* Règles sur les bugs */}
          <section className="reglement-section">
            <h2>Règles sur les bugs et exploits</h2>
            <ul>
              <li>• Il est interdit d'exploiter des bugs ou des failles du jeu pour obtenir un avantage.</li>
              <li>• Si vous découvrez un bug, signalez-le immédiatement au staff via Discord.</li>
              <li>• Ne partagez pas les bugs ou exploits avec d'autres joueurs avant qu'ils ne soient corrigés.</li>
              <li>• L'utilisation d'exploits peut entraîner un bannissement immédiat.</li>
            </ul>
          </section>

          {/* Sanctions */}
          <section className="reglement-section">
            <h2>Sanctions</h2>
            <ul>
              <li><strong>Avertissement verbal</strong> : Pour les infractions mineures.</li>
              <li><strong>Kick</strong> : Exclusion temporaire pour une infraction modérée.</li>
              <li><strong>Ban temporaire</strong> : De 1 jour à 1 semaine, selon la gravité.</li>
              <li><strong>Ban permanent</strong> : Pour les infractions graves (triche, comportement toxique répété, etc.).</li>
              <li>Les sanctions sont à la discrétion du staff et peuvent être adaptées selon le contexte.</li>
              <li>Vous pouvez contester une sanction via Discord, en fournissant des preuves.</li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reglement;
