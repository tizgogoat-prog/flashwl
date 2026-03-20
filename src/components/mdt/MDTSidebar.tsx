import { useState } from "react";
import {
  Home,
  Users,
  UserCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  Shield,
  Gavel,
  Car,
  LogOut,
  Link2,
} from "lucide-react";
import type { MDTView } from "@/pages/MDTDashboard";
import logo from "@/assets/logo.png";

interface Props {
  currentView: MDTView;
  onViewChange: (view: MDTView) => void;
  onLogout: () => void;
  userRole: string;
}

const MDTSidebar = ({ currentView, onViewChange, onLogout, userRole }: Props) => {
  const [generalOpen, setGeneralOpen] = useState(true);
  const [registresOpen, setRegistresOpen] = useState(false);

  const sidebarItem = (
    label: string,
    view: MDTView,
    icon?: React.ReactNode
  ) => (
    <button
      onClick={() => onViewChange(view)}
      className={`w-full text-left px-4 py-2 text-sm rounded transition-colors ${
        currentView === view
          ? "bg-[hsl(220,30%,20%)] text-white"
          : "text-[hsl(220,15%,60%)] hover:text-white hover:bg-[hsl(220,25%,15%)]"
      }`}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
    </button>
  );

  return (
    <aside className="w-64 min-h-screen bg-[hsl(220,25%,8%)] border-r border-[hsl(220,20%,15%)] flex flex-col">
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-[hsl(220,20%,15%)]">
        <img src={logo} alt="MDT" className="h-16 w-auto opacity-80" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* Général */}
        <button
          onClick={() => setGeneralOpen(!generalOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-white uppercase tracking-wider"
        >
          Général
          {generalOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {generalOpen && (
          <div className="space-y-0.5 ml-1">
            {sidebarItem("Accueil", "accueil", <Home className="w-4 h-4" />)}
            {sidebarItem("Citoyens", "citoyens", <Users className="w-4 h-4" />)}
            {sidebarItem("Effectifs", "effectifs", <UserCheck className="w-4 h-4" />)}
          </div>
        )}

        {/* Registres */}
        <button
          onClick={() => setRegistresOpen(!registresOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-white uppercase tracking-wider mt-4"
        >
          Registres
          {registresOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {registresOpen && (
          <div className="space-y-0.5 ml-1">
            {sidebarItem("Rapports d'opération", "rapports", <FileText className="w-4 h-4" />)}
            {sidebarItem("Registre des plaintes", "plaintes", <Gavel className="w-4 h-4" />)}
            {sidebarItem("Registre des armes", "armes", <Shield className="w-4 h-4" />)}
            {sidebarItem("Registre des délits", "delits", <AlertTriangle className="w-4 h-4" />)}
            {sidebarItem("Registre des bracelets", "bracelets", <Link2 className="w-4 h-4" />)}
            {sidebarItem("Véhicules en infraction", "vehicules", <Car className="w-4 h-4" />)}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[hsl(220,20%,15%)]">
        <div className="px-3 py-2 text-xs text-[hsl(220,15%,45%)] uppercase tracking-wider mb-2">
          {userRole || "Agent"}
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[hsl(0,60%,55%)] hover:bg-[hsl(0,40%,15%)] rounded transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
};

export default MDTSidebar;
