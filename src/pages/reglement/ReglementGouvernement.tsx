import ReglementLayout from "@/components/ReglementLayout";
import gouvBg from "@/assets/gouvernement-bg.png";

const ReglementGouvernement = () => (
  <ReglementLayout title="Gouvernement" icon="🏛️" backgroundImage={gouvBg}>
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

    {/* Introduction */}
    <h3>📜 Introduction</h3>
    <p>Le gouvernement, dirigé par le gouverneur, sera à la tête de tout l'état de San Andreas, accompagné de son cabinet. Pour cela, des élections seront organisées, afin de permettre à tous les joueurs de voter.</p>
    <p>Pour toute personne souhaitant devenir gouverneur, il faudra d'abord contacter le staff gérant le gouvernement pour officialiser votre candidature, puis organiser votre campagne dans le jeu, contacter les médias, organiser des réunions ou conventions avec des entreprises, etc.</p>
    <p>Pour le DOJ, la justice est détachée du bureau du maire. Ils collaborent et travaillent étroitement ensemble, liés par leurs activités, mais aucun ne se considère comme supérieur à l'autre ou comme décisif par rapport à l'autre département.</p>
    <p>Nous vous demandons de respecter les critères d'éligibilité avant de préparer votre candidature. Ces critères incluent l'âge minimum (17 ans HRP), ne pas avoir de bannissement temporaire sur le serveur.</p>

    {/* Règlement Généralités */}
    <h3>📌 Règlement | Généralités</h3>
    <ul>
      <li>· Le RP Illégal est strictement interdit (il est impossible de postuler ou de déposer un dossier).</li>
      <li>· Il est strictement interdit de voler du matériel à tout service public, quelle que soit votre implication dans le milieu illégal. Si vous le faites, vous risquez le bannissement définitif.</li>
      <li>· Tous les membres du Gouvernement et du DOJ sont tenus de ne pas exercer un autre job parallèlement, sauf en cas d'accord et décision du staff.</li>
      <li>· Il n'est pas possible pour les joueurs d'avoir un P2 ou un autre slot.</li>
      <li>· Le transfert de matériel est interdit et passible d'un bannissement définitif du serveur.</li>
      <li>· En entrant dans le Gouvernement & DOJ, vous acceptez que le lead de la faction puisse vous licencier à tout moment, avec ou sans raison rendue publique.</li>
      <li>· De même, un membre gestionnaire peut être sanctionné s'il ne se comporte pas comme tel.</li>
      <li>· Les tribunaux et locaux du gouvernement sont considérés comme des zones de sécurité (zone safe). Il est donc interdit de braquer, kidnapper ou agresser d'autres joueurs.</li>
      <li>· Tout membre exposé à des actes illégaux est passible de la prison à vie ou de la peine de mort (Fin du personnage).</li>
      <li>· Vous ne pouvez pas attirer de membre du gouvernement dans une embuscade à cause de son emploi RP.</li>
      <li>· Il est interdit de prendre en otage un membre du Gouvernement / DOJ sans préméditation.</li>
    </ul>

    {/* Règlement DOJ */}
    <h3>🏦 Règlement | DOJ</h3>
    <ul>
      <li>· Les informations confidentielles relatives aux affaires en cours doivent être traitées avec le plus grand soin.</li>
      <li>· Aucune divulgation non autorisée d'informations sensibles n'est permise.</li>
      <li>· Les membres du bureau sont tenus d'assumer la responsabilité de leurs tâches et de respecter les délais.</li>
      <li>· Une utilisation appropriée des ressources du bureau est attendue ; plusieurs items sont affectés à ce département, les abus entraîneront des sanctions.</li>
      <li>· Comme l'exige le code de procédure des États-Unis, toute personne arrêtée ou inculpée par les forces de l'ordre est considérée comme coupable. C'est à l'accusé, ou à son avocat, de prouver son innocence.</li>
      <li>· Les interactions avec les médias et les autres organismes externes doivent être coordonnées par les canaux officiels du serveur.</li>
      <li>· Les membres ne doivent pas engager le bureau dans des activités non autorisées ou dans toute interaction avec l'illégalité, ce qui entraînerait un bannissement permanent de la faction.</li>
      <li>· Les cabinets d'avocats et ses membres sont soumis aux mêmes obligations que le DOJ.</li>
    </ul>

    {/* Règlement Gouvernement */}
    <h3>🏦 Règlement | Gouvernement</h3>
    <ul>
      <li>· Les informations confidentielles relatives au Gouvernement doivent être traitées avec le plus grand soin.</li>
      <li>· Des élections seront organisées pour choisir le prochain maire et son équipe d'adjoints, de secrétaires et de personnel de sécurité. Les élections auront lieu tous les 5 mois.</li>
      <li>· Aucune divulgation non autorisée d'informations sensibles n'est permise.</li>
      <li>· Les membres sont tenus d'assumer la responsabilité de leurs tâches et de respecter les délais.</li>
      <li>· Une utilisation appropriée des ressources du bureau est attendue ; plusieurs items sont affectés au Gouvernement, les abus entraîneront des sanctions.</li>
      <li>· Les interactions avec les médias et les autres organismes externes doivent être coordonnées par les canaux officiels du serveur.</li>
      <li>· Les membres ne doivent pas engager la mairie ou le gouvernement dans des activités non autorisées ou dans toute interaction avec l'illégalité, ce qui entraînerait un bannissement permanent de la faction.</li>
    </ul>

    {/* Règlement Interne */}
    <h3>📢 Règlement Interne</h3>
    <p>Le Gouvernement et DOJ disposent d'un règlement intérieur que tous les membres acceptent automatiquement lorsqu'ils rejoignent la faction. Les joueurs sont tenus de le respecter et peuvent être licenciés sur-le-champ ou faire l'objet d'une sanction "RP" en cas de non-respect. Pour vous familiariser avec, vous pouvez également la consulter via l'académie Discord.</p>

    {/* Application de Peines */}
    <h3>⚖️ Application de Peines</h3>
    <p>En ce qui concerne le Département de la Justice, qui a la haute main sur l'application des peines les plus importantes, pouvant aller jusqu'à la fin d'un personnage (prison à vie) ou quelques jours de prison, il est alors demandé de respecter les règles internes établies et de documenter ce type de procédure, ainsi que d'être équitable avec tous les joueurs. Vous avez le pouvoir de décider de l'avenir d'un personnage, n'en abusez pas.</p>
    <p>Toute demande d'emprisonnement à vie ou à long terme doit d'abord être approuvée par le Staff, gestionnaire du gouvernement.</p>
  </ReglementLayout>
);

export default ReglementGouvernement;
