import ReglementLayout from "@/components/ReglementLayout";

interface Enterprise {
  name: string;
  discord?: string;
}

interface Category {
  icon: string;
  label: string;
  color: string;
  items: Enterprise[];
}

const enterpriseCategories: Category[] = [
  {
    icon: "✨",
    label: "Bars / Boîtes",
    color: "text-yellow-400",
    items: [
      { name: "Riverside" },
      { name: "Pacific Bluffs" },
      { name: "Yellow Jack" },
      { name: "Unicorn" },
      { name: "Club 77" },
      { name: "Hen House" },
    ],
  },
  {
    icon: "🚗",
    label: "Concessionnaires",
    color: "text-red-400",
    items: [
      { name: "Ls Motorcycle" },
      { name: "Premium Deluxe Motorsport" },
      { name: "Heavy Duty Motors" },
      { name: "Dock Tease" },
    ],
  },
  {
    icon: "🔧",
    label: "Garages",
    color: "text-muted-foreground",
    items: [
      { name: "Benny's" },
      { name: "Custom Motor's" },
      { name: "LS Custom's" },
      { name: "FlyWheels" },
      { name: "Auto Exotic" },
    ],
  },
  {
    icon: "✂️",
    label: "Salons Esthétiques",
    color: "text-teal-400",
    items: [
      { name: "Esthétique Vespucci" },
      { name: "Esthétique Vinewood" },
      { name: "Esthétique Sandy" },
      { name: "Esthétique Paleto" },
      { name: "Esthétique Groove Street" },
    ],
  },
  {
    icon: "🍔",
    label: "Restaurants",
    color: "text-orange-400",
    items: [
      { name: "Hen House" },
      { name: "Rex Diner's" },
      { name: "Custom Caffe" },
      { name: "Delight" },
      { name: "Horny's" },
    ],
  },
  {
    icon: "⛽",
    label: "Commerce",
    color: "text-blue-400",
    items: [
      { name: "LTD Sandy Shores" },
      { name: "LTD Little Seoul" },
      { name: "LTD Grove Street" },
      { name: "PawnShop" },
      { name: "PawnShop Roxwood" },
      { name: "LTD Roxwood" },
    ],
  },
  {
    icon: "🎵",
    label: "Musique",
    color: "text-purple-300",
    items: [
      { name: "ULM Records" },
      { name: "Underdogs Records" },
    ],
  },
  {
    icon: "🗞️",
    label: "Journaux / Événementiel",
    color: "text-foreground",
    items: [
      { name: "Weazel News" },
      { name: "Maze Event" },
      { name: "Life Invader" },
    ],
  },
  {
    icon: "🚜",
    label: "Agriculture et Usines",
    color: "text-green-400",
    items: [
      { name: "Ferme Biogood" },
      { name: "Boucherie" },
      { name: "Ferme Grapeseed" },
      { name: "Davis Quartz" },
      { name: "Grand Banks Foundry" },
      { name: "LD Organics" },
      { name: "Millar's Fishery" },
      { name: "Roxwood PWR" },
      { name: "Marlowe Vineyard" },
    ],
  },
  {
    icon: "🏠",
    label: "Agences immobilières",
    color: "text-red-300",
    items: [
      { name: "Agence Immobilière" },
    ],
  },
];

const ReglementEntreprises = () => (
  <ReglementLayout title="Entreprises" icon="🚨">
    {/* Général */}
    <h3>🌐 Général</h3>
    <p>Vous devez respecter le Code des taxes, du travail et des entreprises mis en place par le gouvernement en RP.</p>
    <p>L'utilisation de Discord à des fins RP, comme pour les entretiens ou les réunions, est interdite, à l'exception des cas suivants :</p>
    <ul>
      <li>· Réception des candidatures</li>
      <li>· Activités gouvernementales (impôts, reprise ou création d'entreprises, rendez-vous spécifiques), avec la présence d'une secrétaire en RP</li>
      <li>· Affichage de votre règlement, carte ou catalogue</li>
      <li>· Annonces et discussions internes (entre employés)</li>
      <li>· SAMC</li>
    </ul>
    <p>Tout le reste doit être effectué en RP (commandes, rendez-vous, etc.)</p>
    <ul>
      <li>· L'argent de l'entreprise ne vous appartient pas. Toute dépense doit être justifiée comme étant liée à l'activité de l'entreprise. Il est strictement interdit d'utiliser les fonds de l'entreprise à des fins personnelles.</li>
      <li>· Il est interdit de blanchir plus de 100 000 $ par semaine, que ce soit pour votre propre compte ou au profit de groupes illégaux.</li>
      <li>· Si vous souhaitez céder votre entreprise, que ce soit à quelqu'un ou non, veuillez consulter le gouvernement. En cas de wipe ou de mort RP, informez également le gouvernement.</li>
      <li>· Il est interdit de vendre des véhicules d'entreprise à des particuliers. Vous êtes uniquement autorisé à les revendre au concessionnaire concerné.</li>
      <li>· Il est interdit d'avoir plusieurs de vos personnages au sein de la même entreprise.</li>
      <li>· Les patrons et co-patrons ne sont pas autorisés à vendre leurs biens personnels à leur propre entreprise.</li>
      <li>· Vous ne pouvez être employé que dans deux entreprises de secteurs différents. Par exemple, être employé à la fois chez Auto Exotic et LS Custom n'est pas autorisé.</li>
      <li>· Il est interdit de réembaucher une personne ayant subi un wipe au sein de la même entreprise avec son nouveau personnage. La réintégration n'est possible qu'après la création d'au moins un autre personnage intermédiaire. Un délai total de 2 mois doit être respecté.</li>
      <li>· Lorsque vos personnages sont WIPE ou remplacés, il est strictement interdit de réintégrer votre entreprise au même grade. Vous devez recommencer depuis le grade le plus bas.</li>
      <li>· Il vous est interdit de prendre votre service uniquement pour effectuer une vente, une réparation, ou toute autre activité, puis de mettre fin à votre service immédiatement après.</li>
      <li>· Les licenciements doivent rester en RP et être justifiés par des raisons RP. Si la raison est HRP, elle doit être validée par les référents des entreprises.</li>
      <li>· Les entreprises officielles sont le reflet de l'image du serveur. Les PDG et leurs employés doivent adopter un comportement exemplaire. Tout manquement pourra entraîner des sanctions sévères.</li>
      <li>· Vous ne pouvez pas occuper un poste de direction (patron & co-patron) dans deux entreprises en même temps.</li>
      <li>· Les entreprises sont limitées à un maximum de 80 employés, y compris la direction.</li>
    </ul>

    {/* Mécano */}
    <h3>👨‍🔧 Mécano</h3>
    <ul>
      <li>· À la fin de votre service, vous devez déposer tous vos kits de réparation dans le stock de l'entreprise. Si vous les gardez chez vous ou vous déconnectez en les ayant sur vous, vous vous exposez à une sanction du staff.</li>
      <li>· Les dépannages simples peuvent être réalisés avec d'autres véhicules adaptés, tels que des pick-ups.</li>
      <li>· Il est interdit de commencer son service uniquement dans le but de dépanner des amis.</li>
      <li>· Les mécanos sont limités à deux 4x4 maximum, utilisés uniquement pour les interventions dans des zones inaccessibles aux dépanneuses.</li>
    </ul>
    <p className="font-semibold mt-2">Véhicules autorisés :</p>
    <ul>
      <li>↳ flatbed</li>
      <li>↳ flatbed4</li>
      <li>↳ flatbed3 (équipé d'une remorque dynamique)</li>
      <li>↳ slamtruck</li>
      <li>↳ towtruck</li>
      <li>↳ towtruck2</li>
      <li>↳ amb_rox-towtruck</li>
    </ul>

    {/* Maison de Disque */}
    <h3>🎤 Maison de Disque & Label</h3>
    <ul>
      <li>· Les maisons de disque doivent publier leur contenu exclusivement sur la chaîne YouTube dédiée à leur entité (ULM ou Underdogs). Avant de poster chaque contenu, il est impératif de l'écouter afin de vérifier qu'il est conforme.</li>
      <li>· Uniquement les sons créés et enregistrés sur le serveur sont autorisés à être publiés.</li>
      <li>· Toute sollicitation visant à obtenir des réactions sur une publication liée à une musique est interdite, que ce soit par message privé ou sur Discord. Tout doit se faire en RP.</li>
    </ul>

    {/* Concessionnaire */}
    <h3>🚗 Concessionnaire</h3>
    <ul>
      <li>· Le PDM sont des entreprises strictement légales. Il est interdit pour les membres de la direction (Patron / Co-patron) de commettre des actes illégaux. Les autres employés peuvent participer à des activités illégales.</li>
      <li>· Les cautions pour les locations ne doivent pas dépasser 15 000 $.</li>
      <li>· Vous êtes autorisé à racheter des véhicules uniquement s'ils figurent dans votre catalogue pour le marché de l'occasion.</li>
      <li>· Vous êtes autorisé à mettre en location tous les véhicules, même s'ils ne figurent pas dans votre catalogue.</li>
      <li>· Vous avez la possibilité de faire des retours fournisseurs pour les véhicules d'occasion, rachetés à 80% du prix usine.</li>
    </ul>

    {/* Presse */}
    <h3>📰 Presse</h3>
    <ul>
      <li>· Life Invader et Weazel News sont des entreprises strictement légales. Il est interdit pour les membres de la direction de commettre des actes illégaux. Les autres employés peuvent participer à des activités illégales.</li>
      <li>· Les médias doivent publier leur contenu exclusivement sur la chaîne YouTube dédiée à leur entité.</li>
      <li>· Les journaux ont l'interdiction de fournir des cartes de visite vierges. Ils devront eux-mêmes ajouter le contenu et les rendre non éditables et non duplicables. Seuls les membres de la direction d'une entreprise peuvent les acheter.</li>
      <li>· Toute sollicitation visant à obtenir des réactions sur une publication liée à un article de presse est interdite. Tout doit se faire en RP.</li>
    </ul>

    {/* Agent de sécurité */}
    <h3>🦺 Agent de sécurité</h3>
    <ul>
      <li>· Les menottes ne doivent pas être conservées par les employés. Elles doivent être remises et stockées dans le coffre de l'entreprise.</li>
      <li>· Les menottes doivent être données et récupérées à chaque fin de service, sous peine de sanctions de la part du staff.</li>
    </ul>

    {/* Liste des entreprises */}
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center text-foreground mb-12">
        Liste des entreprises présentes sur le serveur
      </h2>

      {enterpriseCategories.map((cat, idx) => (
        <div key={idx} className="mb-12">
          {idx > 0 && <hr className="border-border/30 mb-12" />}
          <h3 className={`text-2xl md:text-3xl font-bold text-center mb-8 ${cat.color}`}>
            <span className="mr-3">{cat.icon}</span>
            {cat.label}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.items.map((item, i) => (
              <div
                key={i}
                className="border border-border/40 rounded-sm py-3 px-6 text-center text-foreground font-medium hover:bg-card/50 transition-all cursor-default"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </ReglementLayout>
);

export default ReglementEntreprises;
