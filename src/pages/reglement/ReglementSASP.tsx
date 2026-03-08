import ReglementLayout from "@/components/ReglementLayout";
import saspBg from "@/assets/sasp-bg.png";

const ReglementSASP = () => (
  <ReglementLayout title="SASP" icon="🚔" backgroundImage={saspBg}>
    <p>Les membres du SASP doivent respecter les procédures d'arrestation, de contrôle et d'intervention. La corruption modérée est autorisée mais doit rester réaliste.</p>
  </ReglementLayout>
);

export default ReglementSASP;
