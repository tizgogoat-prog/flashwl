import ReglementLayout from "@/components/ReglementLayout";
import illegalBg from "@/assets/illegal-bg.png";

const ReglementIllegal = () => (
  <ReglementLayout title="Règlement Illégal" icon="🌿" backgroundImage={illegalBg}>
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

    {/* Discord Rules */}
    <h3>🖥️ Discord</h3>
    <p>Avant de rejoindre le Discord illégal de FlashWL, voici la liste des règles à respecter que vous devrez impérativement prendre en compte sous peine de sanctions.</p>
    
    <p className="font-semibold mt-4">⛔ Interdictions :</p>
    <ul>
      <li>· Ping sans raisons les staff.</li>
      <li>· Réaliser un message provoquant contre un joueur ou un groupe illégal.</li>
      <li>· Pas de contenu inapproprié : Les membres ne sont pas autorisés à publier du contenu offensant, raciste, sexiste, pornographique ou violent.</li>
      <li>· Pas de publicité : Les membres ne sont pas autorisés à faire de la publicité pour d'autres serveurs Discord ou pour des projets extérieurs.</li>
      <li>· Pas de spam : Les membres ne sont pas autorisés à envoyer des messages en boucle ou de manière répétitive, ou à envoyer des liens en masse.</li>
      <li>· Les membres doivent utiliser les canaux appropriés pour discuter et pour le RP.</li>
      <li>· Les membres ne sont pas autorisés à avoir plusieurs comptes sur le serveur Discord.</li>
    </ul>

    <p className="font-semibold mt-4">⚠️ Comportement :</p>
    <ul>
      <li>· Respectez les autres membres : Tous les membres doivent être traités avec respect et politesse. Les insultes, le harcèlement et la discrimination ne seront pas tolérés.</li>
      <li>· Évitez les conflits : Les membres sont invités à résoudre les conflits de manière mature et respectueuse.</li>
      <li>· Les membres doivent utiliser un pseudo approprié sur le serveur Discord.</li>
      <li>· Les membres doivent respecter les décisions de l'administrateur et des modérateurs du serveur.</li>
      <li>· En tant que lead vous avez la responsabilité du comportement de vos joueurs dans un groupe. Si vos membres ne se comportent pas correctement, nous sanctionnerons l'intégralité du groupe.</li>
    </ul>

    <p className="font-semibold mt-4">💭 Communication :</p>
    <ul>
      <li>· Il est obligatoire de faire une demande de rôles pour tous les membres de votre groupe afin de pouvoir répertorier nos joueurs.</li>
      <li>· Des référents illégaux seront présents et vous seront attitrés. En tant que groupe officiels, vous devrez respecter les demandes et consignes de vos référents.</li>
      <li>· Si vous souhaitez nous faire remonter des comportements inappropriés, vous avez l'obligation de fournir des preuves de ce que vous avancez.</li>
      <li>· Prioriser l'ouverture de ticket complet : explication du problème + contextualisation, clarification sur les joueurs concernés, preuves (recs ou screenshots).</li>
    </ul>
    <p>Les staff sanctionneront sévèrement tout manquement au règlement plus particulièrement l'attitude que vous aurez. Sachez qu'un bannissement du discord illégal peut également entraîner un bannissement IG.</p>

    {/* Introduction */}
    <h3>📜 Introduction</h3>
    <p>Vous démarrez votre histoire en tant que civil. Pour suivre un chemin illégal il vous suffit de créer votre groupe de petites frappes composé de 10 membres maximum. Vous devrez alors accomplir diverses missions illégales afin d'augmenter votre crédibilité dans les quartiers de Los Santos. Une fois celle-ci assez importante il vous faudra ouvrir un ticket auprès du staff et peut-être valider votre groupe.</p>

    <p className="font-semibold mt-4">Comment augmenter mes chances de valider mon groupe ?</p>
    <ul>
      <li>· Il vous faudra nous montrer une qualité et une cohérence de jeu importante pendant votre parcours de petites frappes.</li>
      <li>· Il faudra vous munir d'un dossier (G.Slide de préférence) expliquant le lore de votre groupe, son nom, vos membres, vos motivations RP, etc.</li>
      <li>· Une fois votre dossier traité par l'équipe de modération vous recevrez un message pour convenir d'un entretien oral avec quelques staff.</li>
      <li>· Vous recevrez ensuite une réponse positive ou négative sous 1 à 2 jours.</li>
    </ul>

    {/* Généralités */}
    <h3>🚫 Généralités</h3>
    <ul>
      <li>· Vous avez interdiction de retourner dans votre quartier après une course-poursuite avec la police ou un groupe.</li>
      <li>· Respectez le "fear naturel" qui s'impose envers les services publics, car vous êtes des criminels à votre échelle et devez avoir peur d'être arrêtés.</li>
      <li>· Interdiction de participer à des actions illégales avec un groupe sans avoir été recruté dans le CREW de celui-ci.</li>
      <li>· Les plans pneus sont autorisés uniquement pour les groupes officiels après minimum 15 minutes de course poursuite.</li>
      <li>· Il est interdit de mentir sur vos blessures ou ceux de vos camarades.</li>
      <li>· Les alliances entre groupes sont interdites.</li>
      <li>· Trash le corps de quelqu'un au sol est un motif de sanctions.</li>
      <li>· Prendre l'unité X alors que des EMS ou LSPD sont présents sur place est interdit.</li>
      <li>· Effectuer des transactions ou actions illégales sur une position proche de votre QG ou dans une zone safe est interdit.</li>
      <li>· Il n'y a pas de fear orga, à vous de vous imposer en RP.</li>
      <li>· Aucun remboursement ne sera accordé si vous décidez de kick un membre et qu'il possède des objets vous appartenant.</li>
      <li>· Il est strictement interdit de posséder des habitants en tant que groupe de Petite Frappe.</li>
      <li>· Seuls les groupes officiels peuvent effectuer une descente à l'arme blanche ou au poing dans un quartier ou QG officiels.</li>
      <li>· Vendre des armes, des circuits illégaux et des objets autre que sur le DarkChat est strictement interdit.</li>
      <li>· Les mutilations permanentes sont interdites sans autorisations préalables.</li>
      <li>· Il est interdit de trahir son groupe pour les intérêts d'un autre groupe sauf accord staff.</li>
      <li>· Il est interdit d'avoir plus d'un personnage dans l'illégal.</li>
      <li>· Il est interdit d'avoir des entrepôts en commun avec d'autres groupes.</li>
      <li>· Il est obligatoire de braquer les véhicules de transport uniquement si vous avez la certitude que le véhicule appartient au groupe en question.</li>
      <li>· Il est interdit de revendiquer un point de récolte de ressources ou de braquage en tant que petites frappes.</li>
      <li>· La fuite dans l'eau suite à une course poursuite est soumise à une possibilité de tir d'arme à feu de la part des poursuiveurs.</li>
    </ul>
    <p>Désormais, les gangs s'installeront exclusivement dans les zones indiquées sur la carte. Chaque groupe occupera un secteur en fonction de son identité, de son histoire et de son environnement culturel. Les habitants, petites frappes et autres personnages évoluant dans ces quartiers devront respecter cette répartition afin de maintenir une cohérence roleplay solide.</p>

    {/* Prise d'otage */}
    <h3>🔪 Prise d'otage</h3>
    <p className="font-semibold">🔎 Précisions :</p>
    <ul>
      <li>· Si vous prenez en otage un membre des services publics, votre personnage se voit exposé à une peine de prison à perpétuité, ou même une Mort RP. La prise d'otage sur des agents de l'état ou membres du gouvernement doit être un ultime recours.</li>
      <li>· Tout abus de prise d'otage sur des agents en service seront sanctionnés. Cela doit être votre ultime solution, nous vous encourageons à être innovants.</li>
      <li>· Il est autorisé de braquer ou d'ouvrir le feu lors d'un rendez-vous, les embuscades étant permises. Toutefois, si des otages sont présents et qu'une fusillade éclate, ces otages sont soumis à une mort RP s'ils sont tués.</li>
    </ul>

    <p className="font-semibold mt-4">💀 Un otage s'expose à une mort RP si :</p>
    <ul>
      <li>· Son groupe ne se présente pas pour récupérer l'otage.</li>
      <li>· L'otage ne respecte pas son fear.</li>
    </ul>

    <p className="font-semibold mt-4">⛔ Interdictions :</p>
    <ul>
      <li>· L'utilisation de faux otages.</li>
      <li>· Attendre devant un quartier (Camp QG) pour prendre en otage des joueurs.</li>
      <li>· Braquer le groupe ennemi s'il possède un otage à vous. L'otage se soumet à une mort RP le cas échéant.</li>
      <li>· Braquer et prendre en otage des joueurs sans aucune raison.</li>
      <li>· Il est interdit de demander plus de 5 000$ de rançon.</li>
      <li>· Il est interdit d'échanger des otages contre des armes blanches, armes à feu ou munitions.</li>
      <li>· La prise d'otage de médecin en service est interdite sauf validation par le staff.</li>
      <li>· Lors d'une prise d'otage, il est interdit de faire jouer des scènes désobligeantes à caractère sexuel.</li>
    </ul>

    {/* Fusillades */}
    <h3>🔫 Fusillades</h3>
    <p>Nous sommes sur un serveur RP sérieux où le fait d'engager une fusillade doit être l'ultime recours. Soyez créatifs pour proposer de belles scènes et éviter le plus possible d'avoir à utiliser des armes à feu.</p>

    <p className="font-semibold mt-4">⛔ Interdictions :</p>
    <ul>
      <li>· Déclencher une fusillade sans avoir au préalable échangé verbalement avec le groupe d'en face.</li>
      <li>· Tirer deux fois dans la même soirée (maximum 1 fois).</li>
      <li>· Se venger après une fusillade et après avoir été réanimé par les EMS.</li>
      <li>· Prendre les hauteurs avant que la fusillade soit engagée.</li>
      <li>· Ragdoll pendant une fusillade pour faire semblant d'être touché.</li>
      <li>· Ramasser des corps (coma) après une fusillade.</li>
    </ul>
    <p>Les membres du staff se laissent le droit de sanctionner ou de mort RP des joueurs si vous êtes trop souvent affiliés à des scènes de gunfight.</p>

    <p className="font-semibold mt-4">Drive by :</p>
    <ul>
      <li>· Il est interdit de drive by à bord d'un véhicule roulant.</li>
      <li>· Le drive by doit se faire avec un véhicule à l'arrêt total.</li>
      <li>· Le drive by se doit d'être très court (quelques secondes). Les joueurs tirent quelques balles puis prennent la fuite.</li>
      <li>· Le groupe/quartier ciblé a le droit de riposter s'il en a l'occasion.</li>
      <li>· Le drive by (en voiture ou à vélo) est autorisé sur un quartier, dans la rue, sur un trottoir ou devant un magasin de vêtement.</li>
      <li>· Le but du drive by étant de revendiquer une attaque auprès d'un autre groupe.</li>
      <li>· Les tirs peuvent être à but mortel.</li>
      <li>· Le walk by est également autorisé en respectant les mêmes règles.</li>
      <li>· Il est interdit de braquer depuis un véhicule. Vous devez toujours descendre de votre véhicule pour braquer un autre joueur.</li>
    </ul>

    {/* Drogues */}
    <h3>🍀 Drogues</h3>
    <p className="font-semibold">⛔ Interdictions :</p>
    <ul>
      <li>· Vendre de la drogue en Zone Safe.</li>
      <li>· Vendre votre propre production aux PNJ. Pour vendre aux PNJ vous devez acheter à un groupe tiers.</li>
      <li>· Vendre de la drogue aux PNJ en voiture, moto, quad, vélo ou skateboard, et s'enfuir avec ce dernier.</li>
      <li>· Réaliser des transactions dans des zones safe ou à moins de 3Km de votre QG.</li>
      <li>· Planter/Fabriquer dans son QG, dans les intérieurs/instances, toits, montagnes, tout endroit incohérent et en Zone Safe.</li>
    </ul>
    <p>La vente aux PNJ est autorisée pour les civils, petites frappes, habitants et gangs. Elle reste interdite pour les organisations.</p>

    <p className="font-semibold mt-4">🌳 Récoltes :</p>
    <ul>
      <li>· Il est interdit de faire du copinage sur les points de récoltes.</li>
      <li>· Il est interdit pour les gangs de récolter les drogues des organisations.</li>
      <li>· Obligation de se rendre sur les zones de récoltes avec des véhicules de transports (Speedo, Rumpo, Burrito, ...).</li>
    </ul>

    {/* Véhicules */}
    <h3>🚗 Véhicules</h3>
    <p>Vous serez dans l'obligation de respecter la liste de véhicules imposés par les référents illégaux. Cette liste sera amenée à changer au fil du temps.</p>
    <ul>
      <li>· Les convois sont interdits sauf M.C. via le schéma suivant en scènes illégales : 4 motos max ou 1 voiture et 2 motos.</li>
      <li>· Les convois sont interdits, 1 contre 1 uniquement : une voiture contre une voiture. Seuls les plans préparés sont autorisés.</li>
      <li>· Les motos, skateboard et vélos sont interdits pour toutes activités illégales sauf M.C.</li>
      <li>· Le drive by est UNIQUEMENT autorisé pour les gangs. Cependant, il est INTERDIT de tirer d'un véhicule en mouvement.</li>
    </ul>

    {/* Armes et munitions */}
    <h3>⛏️ Armes et munitions</h3>
    <p>Les civils/petites frappes ont accès uniquement aux armes suivantes : Pétoire (Pas MK II) et Judge Revolver.</p>

    <p className="font-semibold mt-4">Nombre de balles maximum qu'un joueur peut avoir sur soi :</p>
    <ul>
      <li>· Armes de poing : 36 balles</li>
      <li>· Fusil à pompe : 24 balles</li>
      <li>· SMG : 80 balles</li>
      <li>· Fusil d'assaut : 90 balles</li>
    </ul>

    <p className="font-semibold mt-4">⛔ Interdictions :</p>
    <ul>
      <li>· Briser l'économie des armes en vendant des armes à des prix incohérents.</li>
      <li>· Avoir une arme lourde et une arme auto en même temps sur soi.</li>
      <li>· Transférer ses armes de perso en perso.</li>
      <li>· Vendre des armes, des circuits illégaux et des objets autre que sur le DarkChat est strictement interdit.</li>
      <li>· Utiliser des outils tels que des pioches ou autres instruments de farm à des fins criminelles.</li>
    </ul>

    <p className="font-semibold mt-4">💰 Tarifs - Prix maximum des reventes d'armes :</p>
    <ul>
      <li>· Armes contondantes (non tranchantes) : 10 000$</li>
      <li>· Armes tranchantes : 20 000$</li>
      <li>· Item jetable (canette, bouteille...) : 200$ maximum par unité</li>
      <li>· Armes de poing (Pétoire, Beretta, Glock etc) : 80 000$ maximum</li>
    </ul>

    {/* Braquages */}
    <h3>🏦 Braquages</h3>
    <p className="font-semibold">🏦 Fleeca et 💎 Bijouterie :</p>
    <p>Il est obligatoire d'entamer une course poursuite suite à un braquage de Fleeca ou de Bijouterie. Vous avez l'obligation d'attendre que la police arrive. Si au bout de 15 minutes, aucune patrouille de Police n'est présente vous pouvez partir.</p>
    <ul>
      <li>· Avoir 2 braqueurs au minimum</li>
      <li>· Avoir 2 otages au minimum</li>
      <li>· Avoir 1 arme à feu au minimum</li>
      <li>· Avoir 2 véhicules au maximum</li>
    </ul>
    <p>Les plans mule sont autorisés, mais il vous sera demandé d'effectuer dix minutes de poursuite avant d'avoir recours à cette solution.</p>
    <ul>
      <li>⛔ Il est interdit de loot des items sur un de vos otages.</li>
      <li>⛔ Il est interdit de demander une rançon contre les otages.</li>
    </ul>
    <p>Les MC sont autorisés à effectuer les différents braquages à moto.</p>

    <p className="font-semibold mt-4">🏪 Supérettes / Conteneurs / Cambriolages :</p>
    <p>Vous devez attendre la Police afin de partir en course poursuite. Si aucune patrouille de Police n'est présente au bout de 5 minutes vous pouvez partir.</p>
    <p className="font-semibold mt-2">⛔ Interdictions :</p>
    <ul>
      <li>· Il est interdit d'avoir des otages.</li>
      <li>· Les plans mules ne sont pas autorisés pour ce type de braquage.</li>
      <li>· Interdiction d'utiliser des deux-roues, skate, BMX ou véhicules de métiers.</li>
    </ul>

    {/* Laboratoires de drogues */}
    <h3>🧪 Laboratoires de drogues</h3>
    <p>Pour réaliser une attaque sur un laboratoire, le groupe doit obligatoirement fournir de nombreuses preuves sous forme de dossier (GSlide) au staff :</p>
    <ul>
      <li>· La position du laboratoire.</li>
      <li>· Interception de deux véhicules : l'un chargé de drogues brutes, l'autre de drogues transformées.</li>
      <li>· Une photo avec un joueur devant la porte du laboratoire.</li>
    </ul>
    <p>Toutes ces informations doivent impérativement être obtenues de manière totalement RP.</p>
    <ul>
      <li>· Il est interdit de camper le laboratoire et ses alentours.</li>
      <li>· Il est interdit de bâcher ses véhicules devant ou à l'intérieur du laboratoire.</li>
      <li>· Obligation de se rendre aux Laboratoires avec des véhicules de transports (Speedo, Rumpo, Burrito, ...).</li>
      <li>· Posséder une quelconque propriété à moins de 3Km du laboratoire est interdit.</li>
    </ul>

    {/* Laboratoire d'armes */}
    <h3>🏹 Laboratoire d'armes</h3>
    <ul>
      <li>· Les armes ne sont pas lootables (même si plusieurs sur une seule personne).</li>
      <li>· Cependant, vous êtes en droit de demander en CA$H l'équivalent du surplus d'armes qu'un joueur possède.</li>
      <li>· L'alliage en titane est un item classique donc lootable à hauteur de 50%.</li>
      <li>· Il est interdit de bâcher ses véhicules devant ou à l'intérieur du laboratoire.</li>
    </ul>

    {/* Business Secondaire */}
    <h3>🧱 Business Secondaire</h3>
    <p>Pour réaliser une attaque sur un business secondaire, le groupe doit obligatoirement fournir de nombreuses preuves sous forme de dossier (GSlide) au staff :</p>
    <ul>
      <li>· La position du laboratoire.</li>
      <li>· L'interception d'un véhicule rempli d'objets liés au business.</li>
      <li>· Une photo avec un joueur devant la porte du laboratoire.</li>
    </ul>
    <p>Un groupe peut posséder jusqu'à deux business secondaires, mais pas deux du même type.</p>

    {/* Loot/Prises d'otages */}
    <h3>📵 Loot/Prises d'otages</h3>
    <p className="font-semibold">⛔ Interdictions :</p>
    <ul>
      <li>· Loot des armes et/ou des munitions sur un joueur, peu importe la raison et le contexte.</li>
      <li>· Freeloot un joueur, c'est-à-dire racketter quelqu'un sans aucune raison.</li>
      <li>· Loot plus d'un item et prendre plus de 50% de celui-ci.</li>
      <li>· Loot le téléphone d'un joueur. Il peut être saisi temporairement mais vous avez l'obligation de le rendre.</li>
      <li>· Braquer quelqu'un et le forcer à retirer de l'argent.</li>
      <li>· Le pillage de clés (sauf clés de véhicules), de cartes d'identité ou de tout autre document est strictement interdit.</li>
    </ul>

    {/* Mort RP/Wipe */}
    <h3>☠️ Mort RP/Wipe</h3>
    <p>Avant de rentrer dans un projet illégal, vous devrez absolument passer par un wipe de votre personnage.</p>
    <p>Sachez que votre lead a la possibilité d'imposer une mort RP à votre personnage si ce dernier ne correspond pas à ses attentes.</p>
    <p>Vous êtes obligé de wipe si vous quittez un groupe illégal officiel, peu importe la raison et le temps que vous y êtes resté.</p>
    <p>Il n'est plus nécessaire de procéder à un wipe lorsque vous quittez un groupe de petites frappes, toutefois il est impératif de maintenir une logique de cohérence.</p>
    <p>Vous êtes dans l'obligation de quitter sans emporter aucun item.</p>
    <p><em>PS : Un joueur quittant un groupe officiel ne peut pas en rejoindre un autre avant une durée de 3 semaines.</em></p>

    <p className="font-semibold mt-4">⛔ Interdictions :</p>
    <ul>
      <li>· Il est interdit de passer du légal à l'illégal sans passer par un wipe de votre personnage.</li>
      <li>· Se rappeler de quoi que ce soit sur votre ancien personnage et utiliser les informations sur votre nouveau personnage.</li>
      <li>· Faire une demande de wipe alors que vous avez une procédure judiciaire en cours.</li>
      <li>· Faire une demande de wipe alors que votre compte bancaire est dans le négatif ou que vous avez des factures impayées.</li>
      <li>· Transférer des biens (armes, véhicules, items, argent, ...) avant de wipe son personnage. Aucune exception ne sera autorisée.</li>
    </ul>

    {/* Arnaques/Vols */}
    <h3>💣 Arnaques/Vols</h3>
    <ul>
      <li>· Les arnaques sont formellement interdites sur notre serveur.</li>
      <li>· Il est interdit de réaliser des fausses ventes d'armes, de blanchiment d'argent, de biens immobiliers, de drogues ou toute autre activité frauduleuse.</li>
      <li>· Il est interdit de mettre en vente son véhicule à un prix injustifié.</li>
      <li>· Le vol d'armes dans les coffres de véhicules est strictement interdit.</li>
      <li>· Le vol de carte bancaire et l'utilisation de celle-ci est formellement interdit.</li>
      <li>· Lors de vol dans des appartements habités (uniquement s'ils sont ouverts), il est strictement interdit de prendre plus de 50% par items.</li>
      <li>· Il est interdit de forcer un joueur à ouvrir son appartement afin de lui voler des objets.</li>
      <li>· Les vols dans les coffres de véhicules ne seront plus remboursés, à l'exception des armes.</li>
    </ul>
    <p><strong>Rappel :</strong> Quel que soit le type de vol, il est strictement interdit de voler plus de 50% par items sous peine de lourdes sanctions !</p>

    {/* Corruption */}
    <h3>🪙 Corruption</h3>
    <p>Un membre du Gouvernement peut être corrompu à la suite d'un dossier déposé et validé par le Staff.</p>

    <p className="font-semibold mt-4">Liste des postes pouvant être corrompus :</p>
    <ul>
      <li>· Conseiller</li>
      <li>· Secrétaire</li>
      <li>· Sécurité rapprochée</li>
    </ul>

    <p className="font-semibold mt-4">Liste des postes ne pouvant pas être corrompus :</p>
    <ul>
      <li>· Gouverneur</li>
      <li>· Gouverneur adjoint</li>
      <li>· Chef de cabinet</li>
      <li>· IRS</li>
    </ul>

    <p className="font-semibold mt-4">Comment constituer un dossier pour devenir corrompu ?</p>
    <ul>
      <li>· Nom du personnage</li>
      <li>· Poste du personnage au sein du Gouvernement</li>
      <li>· Motivation à devenir corrompu</li>
      <li>· Objectif de la corruption</li>
    </ul>
    <p>Ce dossier doit être envoyé via un ticket Discord. Un joueur corrompu se soumet à une mort RP à la suite de ses activités illégales. Tout joueur membre du Gouvernement jouant un RP de corrompu sans accord staff se verra sanctionné.</p>
  </ReglementLayout>
);

export default ReglementIllegal;
