import ReglementLayout from "@/components/ReglementLayout";
import samcBg from "@/assets/samc-bg.png";

const ReglementSAMC = () => (
  <ReglementLayout title="SAMC" icon="🚑" backgroundImage={samcBg}>
    {/* Discord Button */}
    <div className="flex justify-center mb-12">
      <a
        href="https://discord.gg/EEwZz2bbxU"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-16 py-4 border border-border/40 rounded-sm text-foreground font-bold text-lg hover:bg-card/50 transition-all"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
        Discord
      </a>
    </div>

    {/* Présentation */}
    <h3>🪢 Présentation</h3>
    <p>La San Andreas Medical Company (SAMC) est le principal service médical de la ville. Elle regroupe l'ensemble des professionnels de santé chargés d'assurer les interventions d'urgence, les soins médicaux et le suivi des patients dans toute la région de San Andreas.</p>
    <p>Créée afin d'améliorer la qualité des soins et d'offrir une couverture médicale complète, la SAMC dispose de plusieurs centres médicaux répartis dans différentes zones de la ville afin d'intervenir rapidement sur toutes les urgences.</p>
    <p>Grâce à des équipes formées et spécialisées, la SAMC est capable de gérer de nombreuses situations telles que :</p>
    <ul>
      <li>· Accidents de la route</li>
      <li>· Fusillades</li>
      <li>· Blessures graves</li>
      <li>· Interventions d'urgence</li>
      <li>· Suivi médical des habitants</li>
    </ul>
    <p>Les équipes médicales travaillent en étroite collaboration avec les forces de l'ordre et les autres services publics afin de garantir la sécurité et la santé de la population.</p>
    <p>La SAMC possède également plusieurs unités spécialisées permettant d'intervenir dans des situations complexes telles que :</p>
    <ul>
      <li>· Opérations de secours</li>
      <li>· Interventions dans des zones difficiles d'accès</li>
      <li>· Transport médical d'urgence</li>
      <li>· Assistance médicale spécialisée</li>
    </ul>
    <p>L'objectif principal de la SAMC est d'assurer des soins de qualité, de maintenir un RP médical sérieux et de garantir une expérience immersive pour tous les joueurs de la ville.</p>

    {/* Nous rejoindre */}
    <h3>🎓 Nous rejoindre</h3>
    <p>Afin de rejoindre la SAMC, il est nécessaire de passer par le processus de recrutement officiel de la faction.</p>
    <p className="font-semibold mt-2">Les étapes pour intégrer le service sont les suivantes :</p>
    <ul>
      <li>· Rejoindre le Discord de la faction</li>
      <li>· Lire le règlement interne</li>
      <li>· Déposer une candidature dans la section prévue</li>
      <li>· Passer un entretien avec un membre du commandement</li>
    </ul>
    <p>Lorsqu'un joueur rejoint la SAMC, il s'engage à être actif, sérieux et impliqué dans son rôle.</p>
    <p>La faction n'est pas faite pour les joueurs qui souhaitent simplement essayer ou quitter rapidement le service. Tout départ abusif ou comportement non sérieux pourra entraîner un blacklist des services publics.</p>
    <p>Une fois accepté, le nouveau membre devra suivre une formation initiale afin d'apprendre les procédures médicales et le fonctionnement du service.</p>

    {/* Règlement HRP EMS */}
    <h3>🔨 Règlement HRP EMS</h3>
    <p>Un EMS est un médecin ou un ambulancier chargé de soigner les blessures des citoyens et d'intervenir lors des urgences médicales.</p>
    <p>Les EMS disposent de plusieurs responsabilités et doivent respecter les règles suivantes :</p>
    <ul>
      <li>· Il est obligatoire pour un EMS d'être en service afin de réaliser des soins ou de facturer un patient.</li>
      <li>· Il est interdit de prendre son service uniquement dans le but de soigner un ami ou une connaissance.</li>
      <li>· Les soins doivent être réalisés avec la tenue de service et dans des conditions adaptées.</li>
      <li>· Les EMS doivent respecter la loi et ne peuvent pas participer à des activités illégales. Ils peuvent uniquement intervenir dans ces situations en tant que secouristes ou victimes.</li>
      <li>· Les véhicules de service sont réservés aux missions médicales. Il est interdit de les utiliser pour des déplacements personnels.</li>
      <li>· Il est strictement interdit de passer d'un rôle illégal à EMS ou inversement dans le but d'abuser du système. Toute tentative pourra entraîner : un wipe du personnage, un blacklist, un bannissement.</li>
      <li>· Les scènes de soins doivent être réalisées avec sérieux et réalisme.</li>
      <li>· Lorsqu'un joueur possède une blessure importante, l'EMS doit effectuer des examens et un traitement cohérent. Par exemple, une fracture de jambe ne peut pas être soignée simplement avec un bandage rapide.</li>
      <li>· Les EMS ont également la possibilité de créer des dossiers médicaux pour certains joueurs afin de suivre leur état de santé.</li>
    </ul>

    {/* Restrictions Médicales (ATA) */}
    <h3>🩺 Restrictions Médicales (ATA)</h3>
    <p>Un ATA peut être appliqué à un joueur lorsqu'il subit une blessure importante causée par :</p>
    <ul>
      <li>· Un accident</li>
      <li>· Une arme blanche</li>
      <li>· Une arme à feu</li>
      <li>· Une chute importante</li>
    </ul>
    <p>Cette restriction représente les conséquences physiques de la blessure et limite certaines actions du personnage pendant une durée déterminée.</p>
    <p className="font-semibold mt-2">Les restrictions les plus courantes sont :</p>
    <ul>
      <li>· 24 à 45 minutes pour des blessures légères</li>
      <li>· 1 à 24 heures pour des blessures graves</li>
    </ul>
    <p>Un ATA ne peut pas dépasser une durée maximale de 24 heures.</p>

    {/* Transport des patients */}
    <h3>🚑 Transport des patients</h3>
    <ul>
      <li>· Les patients doivent être transportés uniquement dans des véhicules médicaux adaptés.</li>
      <li>· Il est interdit de transporter des blessés dans des véhicules civils sauf situation exceptionnelle.</li>
    </ul>

    {/* Matériel médical */}
    <h3>💊 Matériel médical</h3>
    <ul>
      <li>· Il est interdit de donner ou vendre du matériel médical à des civils sans prescription médicale.</li>
      <li>· Tout abus concernant la distribution de matériel médical pourra entraîner un bannissement.</li>
      <li>· Le port d'équipement médical hors service est strictement interdit.</li>
      <li>· Les objets médicaux doivent rester dans l'environnement professionnel de l'EMS.</li>
    </ul>

    {/* Communication */}
    <h3>📻 Communication</h3>
    <ul>
      <li>· Les radios de service sont réservées aux EMS en service.</li>
      <li>· Il est interdit d'utiliser une radio professionnelle pour un usage personnel ou hors service.</li>
      <li>· Toute utilisation abusive pourra entraîner de lourdes sanctions.</li>
    </ul>

    {/* Double rôle */}
    <h3>⚖️ Double rôle</h3>
    <ul>
      <li>· Un EMS ne peut pas posséder un autre personnage impliqué dans des activités illégales.</li>
      <li>· Les membres de la SAMC doivent se consacrer uniquement à leur rôle médical afin de garantir un RP cohérent.</li>
      <li>· Un membre EMS ne peut pas non plus posséder plusieurs emplois en parallèle.</li>
    </ul>

    {/* MortRP */}
    <h3>☠️ MortRP</h3>
    <ul>
      <li>· Les MortRP sont décidées au cas par cas et doivent être validées par le staff.</li>
      <li>· Seuls certains EMS autorisés peuvent initier une procédure de MortRP.</li>
      <li>· Lorsqu'un EMS examine un patient avec un stéthoscope, un indicateur peut apparaître indiquant l'état du patient.</li>
      <li>· Si l'icône de mort est visible, cela signifie que le personnage est considéré comme décédé et que la procédure correspondante peut être engagée.</li>
      <li>· Si un joueur indique en RP vouloir mourir mais que l'indicateur n'est pas actif, le personnage doit être maintenu en coma artificiel. Dans ce cas, il est nécessaire de prévenir le staff en fournissant les informations du joueur concerné.</li>
    </ul>

    {/* Règlement Interne */}
    <h3>💊 Règlement Interne</h3>
    <p>La SAMC dispose également d'un règlement interne qui doit être respecté par tous les membres du service. Ce règlement détaille les procédures médicales, l'organisation du service et les règles de fonctionnement internes.</p>
    <p>Tout EMS rejoint automatiquement ce règlement en intégrant la faction.</p>
    <p className="font-semibold mt-2">Le non-respect de ces règles pourra entraîner :</p>
    <ul>
      <li>· Sanctions internes</li>
      <li>· Rétrogradation</li>
      <li>· Licenciement RP</li>
    </ul>
  </ReglementLayout>
);

export default ReglementSAMC;
