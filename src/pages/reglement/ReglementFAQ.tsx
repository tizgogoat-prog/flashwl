import ReglementLayout from "@/components/ReglementLayout";

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

const ReglementFAQ = () => (
  <ReglementLayout title="FAQ" icon="🚩">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
      {faqItems.map((question, i) => (
        <div key={i} className="py-5 border-b border-border/30">
          <p className="text-foreground font-medium text-sm leading-relaxed">{question}</p>
        </div>
      ))}
    </div>
  </ReglementLayout>
);

export default ReglementFAQ;
