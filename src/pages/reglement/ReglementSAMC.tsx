import ReglementLayout from "@/components/ReglementLayout";
import samcBg from "@/assets/samc-bg.png";

const ReglementSAMC = () => (
  <ReglementLayout title="SAMC" icon="🚑" backgroundImage={samcBg}>
    <p>Les EMS doivent soigner tous les patients sans discrimination. Le matériel médical ne doit être utilisé qu'en service.</p>
  </ReglementLayout>
);

export default ReglementSAMC;
