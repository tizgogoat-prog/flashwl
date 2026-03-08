import ReglementLayout from "@/components/ReglementLayout";
import immobilierBg from "@/assets/immobilier-bg.png";

const ReglementImmobilier = () => (
  <ReglementLayout title="Immobilier" icon="🏠" backgroundImage={immobilierBg}>
    {/* Joueurs */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>👤</span> Joueurs
      </h2>
      <ul className="space-y-3 text-muted-foreground list-disc list-inside">
        <li>Si un bien immobilier n'est ni loué ni utilisé pendant une période de <strong className="text-foreground">14 jours (2 semaines)</strong>, l'agent immobilier aura l'autorisation de supprimer le bien afin de libérer l'emplacement pour une nouvelle propriété.</li>
        <li>La règle générale des <strong className="text-foreground">30 jours d'inactivité</strong> reste cependant en vigueur. Si une propriété n'est pas utilisée pendant 30 jours, elle pourra être supprimée automatiquement.</li>
        <li>En cas de bannissement du joueur, aucun remboursement ne sera effectué, même si la location de la propriété est interrompue pendant cette période. Cette règle s'applique également aux locataires liés à la propriété.</li>
        <li>En cas de non-renouvellement de la propriété, aucun remboursement ne sera accordé, y compris pour les locataires.</li>
        <li>Si les agents immobiliers vous contactent concernant une incohérence ou un problème lié à votre propriété, vous êtes dans l'obligation de leur répondre. En cas d'absence de réponse, les agents immobiliers sont en droit de verrouiller la propriété jusqu'à régularisation de la situation.</li>
        <li>Il est strictement interdit de vendre l'emplacement d'une propriété. Par exemple : vendre un terrain ou un emplacement afin que l'acheteur puisse ensuite y placer ses propres points de location.</li>
      </ul>
    </div>

    {/* Placement des propriétés */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>📍</span> Placement des propriétés
      </h2>
      <ul className="space-y-3 text-muted-foreground list-disc list-inside">
        <li>Il est interdit de placer une propriété trop proche d'une entrée existante, même si cela semble cohérent (exemple : maisons mitoyennes, copropriétés, entrées multiples).</li>
        <li>Dans ce type de situation, il est obligatoire de demander l'autorisation d'un référent immobilier avant de placer la propriété.</li>
        <li>Il est également interdit de positionner des propriétés dans des emplacements incohérents ou dangereux, comme par exemple :
          <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
            <li>devant des armoires électriques</li>
            <li>devant des installations techniques</li>
            <li>sur des zones bloquant l'accès à un bâtiment</li>
          </ul>
        </li>
      </ul>
    </div>

    {/* Motel / Caravanes */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>🏨</span> Motel / Caravanes
      </h2>
      <ul className="space-y-3 text-muted-foreground list-disc list-inside">
        <li>L'intérieur « Motel » est réservé uniquement aux motels.</li>
        <li>L'intérieur « Caravane » est réservé uniquement aux caravanes ou campings.</li>
        <li>Toute utilisation de ces intérieurs sur un autre type de propriété est interdite.</li>
      </ul>
    </div>

    {/* Garages */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>🚘</span> Garages
      </h2>
      <ul className="space-y-3 text-muted-foreground list-disc list-inside">
        <li>Les garages doivent être positionnés uniquement devant les portes de garage prévues à cet effet.</li>
        <li>Les garages à plusieurs étages doivent être placés exclusivement dans des bâtiments adaptés comme des tours ou parkings multi-niveaux, afin de conserver une cohérence RP.</li>
      </ul>
    </div>

    {/* Maison avec garage */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>🏡</span> Maison avec garage
      </h2>
      <ul className="space-y-3 text-muted-foreground list-disc list-inside">
        <li>Il est interdit de louer uniquement le garage d'une maison sans inclure l'habitation.</li>
        <li>Chaque maison doit obligatoirement comporter :
          <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
            <li>un intérieur d'habitation accessible par la porte principale</li>
            <li>au minimum un garage</li>
          </ul>
        </li>
        <li>Si plusieurs garages sont présents, une seule entrée pour l'intérieur de la maison est autorisée.</li>
      </ul>
    </div>

    {/* Interdictions */}
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <span>⛔</span> Interdictions
      </h2>
      <ul className="space-y-3 text-muted-foreground list-disc list-inside">
        <li>Il est strictement interdit de changer de rôle en passant d'activités illégales au statut d'agent immobilier, ou inversement. Toute tentative de contournement de cette règle pourra entraîner :
          <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
            <li>un wipe du personnage</li>
            <li>un blacklist des métiers publics</li>
            <li>un bannissement du serveur</li>
          </ul>
        </li>
        <li>Un agent immobilier ne peut pas participer à des activités illégales, notamment :
          <ul className="mt-2 ml-6 space-y-1 list-disc list-inside">
            <li>participation à un groupe criminel</li>
            <li>go fast</li>
            <li>braquages</li>
            <li>blanchiment d'argent</li>
            <li>transferts illégaux d'argent</li>
          </ul>
        </li>
        <li>Il est interdit de placer une propriété sur les yachts.</li>
        <li>Il est interdit de placer des motels ou des caravanes sur des maisons ou sur des emplacements non adaptés.</li>
        <li>Il est interdit de placer un garage sur une place de parking ou dans un emplacement non prévu pour cela.</li>
        <li>Il est interdit d'avoir des entrepôts ou bureaux dissimulés derrière une maison.</li>
        <li>Il est interdit de braquer un agent immobilier en service dans le but d'obtenir des informations immobilières, ou de prendre rendez-vous avec un agent immobilier dans le but de le braquer.</li>
        <li>La divulgation d'informations confidentielles concernant un client ou une propriété est strictement interdite. Toute personne ayant accès à ces informations est tenue au secret professionnel.</li>
        <li>La sous-location de propriétés dans le but de dissimuler un propriétaire réel afin d'éviter une perquisition ou une enquête est strictement interdite.</li>
        <li>Si votre P1 (Personnage principal) est membre d'une agence immobilière, il est interdit de créer un P2 impliqué dans l'illégal, et inversement.</li>
        <li>Il est interdit de transférer une décoration achetée en agence immobilière à un autre joueur.</li>
        <li>Il est interdit de revendre une décoration que vous n'avez pas créée vous-même.</li>
        <li>Il est interdit de voler les décorations appartenant à d'autres joueurs.</li>
      </ul>
    </div>
  </ReglementLayout>
);

export default ReglementImmobilier;
