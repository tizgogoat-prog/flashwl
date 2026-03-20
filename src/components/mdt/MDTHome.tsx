import type { User } from "@supabase/supabase-js";
import { Shield, Users, FileText } from "lucide-react";

interface Props {
  user: User | null;
  userRole: string;
}

const MDTHome = ({ user, userRole }: Props) => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Mobile Data Terminal
        </h1>
        <p className="text-[hsl(220,15%,55%)]">
          Bienvenue, {user?.user_metadata?.display_name || user?.email}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-6">
          <Shield className="w-8 h-8 text-[hsl(220,60%,55%)] mb-3" />
          <h3 className="text-white font-semibold mb-1">Rôle actuel</h3>
          <p className="text-[hsl(220,15%,55%)] capitalize">{userRole || "Agent"}</p>
        </div>
        <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-6">
          <Users className="w-8 h-8 text-[hsl(220,60%,55%)] mb-3" />
          <h3 className="text-white font-semibold mb-1">Citoyens</h3>
          <p className="text-[hsl(220,15%,55%)]">Rechercher et gérer les citoyens</p>
        </div>
        <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-6">
          <FileText className="w-8 h-8 text-[hsl(220,60%,55%)] mb-3" />
          <h3 className="text-white font-semibold mb-1">Registres</h3>
          <p className="text-[hsl(220,15%,55%)]">Consultez les registres et rapports</p>
        </div>
      </div>
    </div>
  );
};

export default MDTHome;
