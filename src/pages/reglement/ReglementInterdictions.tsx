import ReglementLayout from "@/components/ReglementLayout";

const ReglementInterdictions = () => (
  <ReglementLayout title="Interdictions" icon="🟥">
    <ul>
      <li>1. Interdictions strictes :</li>
      <p className="pl-6">• Aucun propos haineux (racisme, xénophobie, homophobie)</p>
      <p className="pl-6">• Aucun contenu inapproprié</p>
      <p className="pl-6">• Personnages mineurs interdits (minimum 21 ans)</p>
      <p className="pl-6">• Vocal externe interdit</p>
      <p className="pl-6">• Streamhack interdit</p>
      <p className="pl-6">• RP sexuel interdit</p>
      <p className="pl-6">• Dialecte HRP interdit en RP</p>
      <p className="pl-6">• Publicité interdite</p>
      <p className="pl-6">• Exploitation de bugs et glitchs interdite</p>
      <p className="pl-6">• Aucune transaction d'argent réel</p>
      <li>2. Règles liées au coma & aux déconnexions :</li>
      <p className="pl-6">• Trash corps interdit</p>
      <p className="pl-6">• Déplacer un corps pour empêcher un sauvetage est interdit</p>
      <p className="pl-6">• Aucune communication en coma</p>
      <p className="pl-6">• Mémoire pré-coma conservée</p>
      <p className="pl-6">• Aucune vengeance après un coma</p>
    </ul>
  </ReglementLayout>
);

export default ReglementInterdictions;
