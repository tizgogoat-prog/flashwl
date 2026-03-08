import ReglementLayout from "@/components/ReglementLayout";
import saspBg from "@/assets/sasp-bg.png";

const ReglementSASP = () => (
  <ReglementLayout title="SASP" icon="🚔" backgroundImage={saspBg}>
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
    <p>
      Le San Andreas State Police, ou SASP, est une organisation chargée de l'application de la loi dans la région de Los Santos, San Andreas, dirigée par le chef de la police. Le département est responsable de la gestion et de la supervision de toutes les forces de police, de l'application de la loi, des divisions spécialisées, de la Police Scientifique et des médecins légistes, du recrutement et de la formation des agents de l'État, de la lutte contre la criminalité routière, de la résolution des enquêtes et de la protection des dignitaires.
    </p>
    <p>
      Plusieurs postes sont utilisés par le SASP, notamment Sandy Shore, Blaine County, La Mesa, Roxwood, Davis et comme poste principal, Mission Row, dirigée par l'état-major.
    </p>

    {/* Intégrer la Police */}
    <h3>🖥️ Intégrer la Police</h3>
    <p>
      Avant de pouvoir faire partie du service et de soumettre votre candidature, vous devez postuler en rejoignant le Discord dont le lien se trouve en haut de cette page.
    </p>
    <p>
      Nous vous demandons de respecter les critères d'éligibilité et de préparer votre candidature. Assurez-vous de répondre aux critères d'éligibilité établis. Ces critères incluent l'âge minimum (18 ans HRP), ne pas avoir eu de bannissement lourd sur le serveur.
    </p>

    {/* Règlement Police */}
    <h3>📌 Règlement Police</h3>
    <ul>
      <li>Le RP Ripou est strictement interdit, cependant il est possible de déposer un dossier sur validation Staff.</li>
      <li>Il n'est pas possible de faire un projet SASP avec un personnage ayant été lié, de près ou de loin, à l'illégal. Cela entraînera une sanction ainsi que le wipe définitif de votre personnage.</li>
      <li>Il est strictement interdit de voler du matériel, des uniformes, véhicules et des armes à tout service public, quelle que soit votre implication dans le milieu illégal. Si vous le faites, vous risquez le bannissement définitif.</li>
      <li>Tous les membres du SASP sont tenus de ne pas exercer une autre profession parallèlement au service, ni de prendre une deuxième identité, donc un deuxième personnage.</li>
      <li>Il n'est pas possible pour les joueurs SASP d'avoir un P2 ou un autre slot.</li>
      <li>En cas de nouveau projet, les joueurs SASP sont tenus de wipe et de terminer leur personnage qui sera lock par le staff, avant de commencer dans l'illégal.</li>
      <li>Un citoyen doit être fouillé pour une raison valable (délit, etc.). Toutefois, les fouilles sont autorisées dans les lieux publics en fonction de l'état de la ville (defcon / niveau d'alerte).</li>
      <li>Lorsque vous êtes en service, vous avez l'obligation de porter votre uniforme, et lorsque vous n'êtes pas en service, vous avez l'obligation de laisser tout votre équipement dans votre casier.</li>
      <li>Le transfert de matériel de police (armes, menottes, uniformes, objets de police) est interdit et passible d'un bannissement définitif du serveur.</li>
      <li>Lors d'une poursuite, le nombre de véhicules de police peut augmenter en fonction de la durée de la poursuite. Ces critères sont connus de l'état-major.</li>
      <li>Pour des raisons de sécurité, la police n'est autorisée à pit un véhicule qu'à vitesse modérée sous demande du Command Staff.</li>
      <li>En entrant dans la police, vous acceptez qu'un membre du Command Staff puisse vous licencier à tout moment, avec ou sans raison rendue publique.</li>
      <li>De même, un membre du Command Staff peut être sanctionné s'il ne se comporte pas comme tel.</li>
      <li>En service, les agents du SASP sont équipés de caméras corporelles (bodycam). Ces images peuvent être utilisées en RP par le bureau des affaires internes et le département de la justice.</li>
      <li>En cas d'utilisation d'une arme à feu, un rapport doit être établi. Dans le cas contraire, le département de la justice appliquera des sanctions.</li>
      <li>Rappel, les munitions des policiers sont comptées, il est donc très facile de savoir si vous avez fait usage de votre arme à feu. Le ministère de la Justice peut également poursuivre les policiers pour manquement à leurs devoirs.</li>
      <li>Les postes de police sont considérés comme des zones de sécurité (zone safe). Il est donc interdit de braquer, kidnapper ou agresser d'autres joueurs.</li>
      <li>Tout fonctionnaire exposé à des actes illégaux est passible de la prison à vie ou de la peine de mort (Fin du personnage).</li>
      <li>Soyez fairplay et n'oubliez pas de donner à chacun du jeu.</li>
      <li>Ne fuyez pas un simple contrôle de police par principe.</li>
      <li>Comme l'exige le code de procédure des États-Unis, toute personne arrêtée ou inculpée par les forces de l'ordre est considérée comme coupable. C'est à l'accusé, ou à son avocat, de prouver son innocence, il est donc considéré comme coupable jusqu'à preuve du contraire.</li>
      <li>Vous ne pouvez pas attirer un agent dans une embuscade à cause de son emploi RP. Exemple : Appeler un officier sur les lieux d'une affaire et le prendre en otage à son arrivée.</li>
    </ul>

    {/* Règlement Prison */}
    <h3>🏦 Règlement Prison</h3>
    <ul>
      <li>Dès que vous entrez dans la prison de Bolingbroke, vous devez jouer le RP lié à la prison.</li>
      <li>Vous devez également adapter votre RP à celui d'un prisonnier. Par exemple, lorsque vous êtes condamné au TIG ou à l'UC, vous devez vous conformer à la sentence, car aucune évasion n'est possible pour le moment.</li>
      <li>S'il doit y avoir une évasion, elle doit avoir lieu pendant le convoi. En prison, les agents de police ont la possibilité de revêtir un uniforme de gardien et d'effectuer un RP pénitentiaire.</li>
      <li>Le bracelet électronique informe la police de votre position toutes les 5 minutes. Il n'est pas possible de retirer le bracelet par ses propres moyens.</li>
    </ul>

    {/* Règlement Interne */}
    <h3>📢 Règlement Interne</h3>
    <p>
      La SASP dispose d'un règlement intérieur que tous les officiers et membres acceptent automatiquement lorsqu'ils rejoignent le service. Les joueurs policiers sont tenus de le respecter et peuvent être licenciés sur-le-champ ou faire l'objet d'une sanction "RP" en cas de non-respect. Pour vous familiariser avec, vous pouvez également la consulter via l'académie Discord.
    </p>

    {/* Application de Peines */}
    <h3>⚖️ Application de Peines</h3>
    <p>
      Lorsqu'un agent doit émettre une facture, une amende ou appliquer une pénalité, il est tenu de respecter le code pénal, qui sera contrôlé par le DOJ et les gradés du SASP. Tout manquement ou facturation abusive peut entraîner l'exclusion du joueur de la faction. De même, tout civil qui refuse de payer une facture peut être sujet à une peine de prison.
    </p>
  </ReglementLayout>
);

export default ReglementSASP;
