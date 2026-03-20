import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import MDTSidebar from "@/components/mdt/MDTSidebar";
import MDTCitizens from "@/components/mdt/MDTCitizens";
import MDTHome from "@/components/mdt/MDTHome";
import MDTRecords from "@/components/mdt/MDTRecords";
import MDTSettings from "@/components/mdt/MDTSettings";

export type MDTView =
  | "accueil"
  | "citoyens"
  | "effectifs"
  | "rapports"
  | "plaintes"
  | "armes"
  | "delits"
  | "bracelets"
  | "vehicules"
  | "parametres";

const MDTDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<MDTView>("accueil");
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/mdt");
        return;
      }

      setUser(session.user);

      const { data: hasRole } = await supabase.rpc("has_any_mdt_role", {
        _user_id: session.user.id,
      });

      if (!hasRole) {
        toast.error("Accès non autorisé");
        navigate("/mdt");
        return;
      }

      // Get user's role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      if (roles && roles.length > 0) {
        setUserRole(roles[0].role);
      }

      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/mdt");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(220,25%,10%)] flex items-center justify-center">
        <div className="text-foreground animate-pulse">Chargement du MDT...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case "citoyens":
        return <MDTCitizens user={user} />;
      case "parametres":
        return <MDTSettings user={user} />;
      case "rapports":
      case "plaintes":
      case "armes":
      case "delits":
      case "bracelets":
      case "vehicules":
        return <MDTRecords type={currentView} user={user} />;
      default:
        return <MDTHome user={user} userRole={userRole} />;
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220,25%,10%)] flex">
      <MDTSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
        userRole={userRole}
      />
      <main className="flex-1 overflow-y-auto">{renderContent()}</main>
    </div>
  );
};

export default MDTDashboard;
