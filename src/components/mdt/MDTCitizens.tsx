import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { Search, Plus, X, AlertTriangle } from "lucide-react";
import MDTCitizenProfile from "./MDTCitizenProfile";
import MDTCreateCitizen from "./MDTCreateCitizen";

interface Citizen {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string | null;
  phone: string | null;
  email: string | null;
  photo_url: string | null;
  weight: string;
  height: string;
  ethnicity: string;
  hair_color: string;
  job: string;
  drivers_license: string;
  ppa_civil: boolean;
  is_wanted: boolean;
  wanted_reason: string | null;
  wanted_by: string | null;
  created_at: string;
}

interface Props {
  user: User | null;
}

const MDTCitizens = ({ user }: Props) => {
  const [citizens, setCitizens] = useState<Citizen[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCitizen, setSelectedCitizen] = useState<Citizen | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchCitizens = async () => {
    if (!searchQuery.trim()) {
      setCitizens([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("citizens")
      .select("*")
      .or(
        `first_name.ilike.%${searchQuery}%,last_name.ilike.%${searchQuery}%`
      )
      .limit(20);

    if (error) {
      toast.error("Erreur de recherche");
    } else {
      setCitizens(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchQuery.length >= 2) searchCitizens();
      else setCitizens([]);
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const handleCitizenCreated = (citizen: Citizen) => {
    setShowCreate(false);
    setSelectedCitizen(citizen);
    toast.success("Citoyen enregistré");
  };

  const handleCitizenUpdated = (citizen: Citizen) => {
    setSelectedCitizen(citizen);
    // Refresh search
    if (searchQuery.length >= 2) searchCitizens();
  };

  if (showCreate) {
    return (
      <div className="p-8">
        <button
          onClick={() => setShowCreate(false)}
          className="flex items-center gap-2 text-[hsl(220,15%,55%)] hover:text-white mb-6 transition-colors"
        >
          <X className="w-4 h-4" /> Retour
        </button>
        <MDTCreateCitizen user={user} onCreated={handleCitizenCreated} />
      </div>
    );
  }

  if (selectedCitizen) {
    return (
      <div className="p-8">
        <button
          onClick={() => setSelectedCitizen(null)}
          className="flex items-center gap-2 text-[hsl(220,15%,55%)] hover:text-white mb-6 transition-colors"
        >
          <X className="w-4 h-4" /> Retour aux résultats
        </button>
        <MDTCitizenProfile citizen={selectedCitizen} user={user} onUpdate={handleCitizenUpdated} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Citoyens</h2>
      </div>

      {/* Search + Create */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(220,15%,45%)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher un citoyen..."
            className="w-full pl-10 pr-4 py-3 bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg text-white placeholder:text-[hsl(220,15%,40%)] focus:border-[hsl(220,60%,45%)] focus:ring-1 focus:ring-[hsl(220,60%,45%)] outline-none transition-all"
          />
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[hsl(220,60%,45%)] text-white rounded-lg hover:bg-[hsl(220,60%,50%)] transition-colors active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" /> Encoder un citoyen
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-[hsl(220,15%,50%)] text-center py-12">Recherche...</p>
      ) : citizens.length > 0 ? (
        <div className="space-y-2">
          {citizens.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCitizen(c)}
              className="w-full text-left p-4 bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg hover:bg-[hsl(220,25%,16%)] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[hsl(220,25%,20%)] flex items-center justify-center text-white font-semibold text-sm">
                  {c.first_name[0]}
                  {c.last_name[0]}
                </div>
                <div>
                  <span className="text-white font-medium">
                    {c.first_name} {c.last_name}
                  </span>
                  {c.date_of_birth && (
                    <span className="text-[hsl(220,15%,45%)] ml-3 text-sm">
                      {new Date(c.date_of_birth).toLocaleDateString("fr-FR")}
                    </span>
                  )}
                </div>
              </div>
              {c.is_wanted && (
                <span className="flex items-center gap-1 text-[hsl(0,70%,55%)] text-xs font-semibold uppercase">
                  <AlertTriangle className="w-3 h-3" /> Recherché
                </span>
              )}
            </button>
          ))}
        </div>
      ) : searchQuery.length >= 2 ? (
        <p className="text-[hsl(220,15%,45%)] text-center py-12">Aucun citoyen trouvé</p>
      ) : (
        <p className="text-[hsl(220,15%,40%)] text-center py-12">
          Entrez au moins 2 caractères pour rechercher
        </p>
      )}
    </div>
  );
};

export default MDTCitizens;
