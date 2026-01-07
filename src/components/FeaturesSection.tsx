import { Users, Shield, Gamepad2, Globe } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Communauté Active",
    description: "Rejoignez des milliers de joueurs passionnés par le roleplay.",
  },
  {
    icon: Shield,
    title: "Staff Présent",
    description: "Une équipe de modération active 24/7 pour une expérience optimale.",
  },
  {
    icon: Gamepad2,
    title: "Contenu Exclusif",
    description: "Des scripts uniques et des fonctionnalités développées sur mesure.",
  },
  {
    icon: Globe,
    title: "Immersion Totale",
    description: "Un univers riche avec de nombreuses factions et métiers.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative z-10 py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card-hover p-6 text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="feature-icon" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
