import { useState } from "react";
import ReglementLayout from "@/components/ReglementLayout";

const faqItems = [
  {
    question: "Si j'annule mon abonnement avant son expiration, est-ce que je conserve les avantages VIP ?",
    answer: "Oui, les avantages VIP restent valables pour toute la durée du mois en cours, même si l'abonnement est annulé avant son échéance.",
  },
  {
    question: "Comment puis-je diffuser mon stream sur le site CityLand WL ?",
    answer: "L'affichage des streams sur le site CityLand WL est déterminé uniquement par les administrateurs. Des procédures de candidature seront bientôt mises en place pour ceux qui souhaitent être considérés.",
  },
  {
    question: "Est-il possible d'occuper deux emplois simultanément ?",
    answer: "Oui, c'est généralement possible, à l'exception du SASP, Gouvernement ainsi que la Justice.",
  },
  {
    question: "Quelle est la durée de location pour un véhicule dans le cadre d'un emploi intérimaire ?",
    answer: "Les véhicules mis à disposition pour les emplois intérimaires peuvent être loués pour une période de 3 heures à partir du moment de la location.",
  },
  {
    question: "Il est interdit de s'engager dans des activités illégales en tant qu'agent immobilier.",
    answer: "Oui, il est strictement interdit de se livrer à des activités illégales en tant qu'agent immobilier.",
  },
  {
    question: "Si je quitte un groupe PF (Petite Frappe), est-il nécessaire de wipe mon personnage ?",
    answer: "Non, quitter un groupe de petites frappes (PF) ne nécessite pas obligatoirement un wipe.",
  },
  {
    question: "Existe-t-il des emplois accessibles au public (intérimaires) sur le serveur ?",
    answer: "Oui, il y a quatre emplois publics disponibles : la Mine, le Bois, le Tabac et le Pétrole.",
  },
  {
    question: "Est-il permis d'effectuer des cambriolages ou des braquages en utilisant une moto ?",
    answer: "Non, l'utilisation de motos, skateboards et vélos n'est pas autorisée lors de cambriolages ou de braquages.",
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 flex items-start justify-between gap-4 group"
      >
        <h3 className="text-foreground font-semibold text-sm leading-relaxed">
          {question}
        </h3>
        <span className="text-muted-foreground text-xs shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {open ? "Réduire" : "Voir"}
        </span>
      </button>
      {open && (
        <p className="text-muted-foreground text-sm leading-relaxed pb-5 -mt-2">
          {answer}
        </p>
      )}
    </div>
  );
};

const ReglementFAQ = () => (
  <ReglementLayout title="FAQ" icon="🚩">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
      {faqItems.map((item, i) => (
        <FAQItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  </ReglementLayout>
);

export default ReglementFAQ;
