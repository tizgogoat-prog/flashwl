import ReglementLayout from "@/components/ReglementLayout";

const ReglementHRP = () => (
  <ReglementLayout title="Règlement HRP" icon="🟩">
    <ul>
      <li>1. Faites preuve de respect envers chaque membre. Tout comportement abusif, insultant ou discriminatoire est strictement interdit.</li>
      <li>2. Interdictions spécifiques :</li>
      <p className="pl-6">• Suppression ou modification d'éléments du jeu : props, objets, eau, buissons, etc.</p>
      <p className="pl-6">• Utilisation de viseurs externes (crosshairs).</p>
      <p className="pl-6">• Effets modifiés : kill effects, tracer, blood effects, hit effects.</p>
      <p className="pl-6">• Modification du champ de vision (FOV).</p>
      <p className="pl-6">• Utilisation de fichiers ou scripts donnant un avantage (ex. full stamina).</p>
      <li>3. Toute utilisation de ces modifications est strictement interdite et pourra entraîner des sanctions immédiates.</li>
      <li>4. Aucun remboursement ne sera effectué pour les raisons suivantes :</li>
      <p className="pl-6">• Pertes de biens lors d'un reboot du serveur</p>
      <p className="pl-6">• Erreurs de virement</p>
      <p className="pl-6">• Pertes de biens illégaux en cas de coma ou de déconnexion involontaire</p>
      <p className="pl-6">• Pertes de biens dues à l'inactivité prolongée</p>
      <p className="pl-6">• Vols ou trahisons par des personnes ayant accès à votre propriété</p>
      <li>5. Nous nous réservons le droit de refuser toute demande de remboursement selon les circonstances.</li>
      <li>6. Vous êtes libre de streamer sur le serveur, mais certaines règles doivent être respectées.</li>
      <li>7. Interdictions stream :</li>
      <p className="pl-6">• TrashTalk interdit</p>
      <p className="pl-6">• Utilisation d'informations HRP via le chat interdite</p>
      <p className="pl-6">• Diffusion des interadmin interdite</p>
      <p className="pl-6">• Dénigrement du serveur et/ou de ses membres interdit</p>
      <li>8. Le wipe consiste à réinitialiser totalement votre personnage.</li>
      <li>9. Un wipe peut être appliqué si votre personnage subit une Mort RP validée.</li>
      <li>10. Interdictions & Règles wipe :</li>
      <p className="pl-6">• Aucun transfert de biens entre joueurs</p>
      <p className="pl-6">• Un wipe est impossible si votre compte est en négatif</p>
      <p className="pl-6">• Passage illégal/légal interdit sans wipe</p>
      <p className="pl-6">• Un nouveau personnage ne peut pas être lié à l'ancien</p>
    </ul>
  </ReglementLayout>
);

export default ReglementHRP;
