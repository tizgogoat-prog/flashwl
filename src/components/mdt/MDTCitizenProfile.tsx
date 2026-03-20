import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { AlertTriangle, Plus, FileText } from "lucide-react";

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

interface Record {
  id: string;
  record_type: string;
  title: string;
  description: string | null;
  created_at: string;
}

interface Props {
  citizen: Citizen;
  user: User | null;
  onUpdate: (citizen: Citizen) => void;
}

const recordTypes = [
  { value: "casier", label: "Extrait de casier judiciaire" },
  { value: "ticket", label: "Écrire un ticket routier" },
  { value: "arrestation", label: "Écrire un rapport d'arrestation" },
  { value: "dossier", label: "Écrire un dossier d'arrestation" },
  { value: "plainte", label: "Encoder une plainte" },
  { value: "deposition", label: "Encoder une déposition" },
  { value: "bracelet", label: "Encoder un bracelet électronique" },
];

const MDTCitizenProfile = ({ citizen, user, onUpdate }: Props) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [recordType, setRecordType] = useState("casier");
  const [recordTitle, setRecordTitle] = useState("");
  const [recordDesc, setRecordDesc] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadRecords();
  }, [citizen.id]);

  const loadRecords = async () => {
    const { data } = await supabase
      .from("citizen_records")
      .select("*")
      .eq("citizen_id", citizen.id)
      .order("created_at", { ascending: false });
    if (data) setRecords(data);
  };

  const toggleWanted = async () => {
    const { data, error } = await supabase
      .from("citizens")
      .update({
        is_wanted: !citizen.is_wanted,
        wanted_reason: !citizen.is_wanted ? "Recherché" : null,
        wanted_by: !citizen.is_wanted ? user?.user_metadata?.display_name || user?.email : null,
      })
      .eq("id", citizen.id)
      .select()
      .single();

    if (error) {
      toast.error("Erreur");
    } else if (data) {
      onUpdate(data as Citizen);
      toast.success(data.is_wanted ? "Citoyen marqué comme recherché" : "Avis de recherche retiré");
    }
  };

  const addRecord = async () => {
    if (!recordTitle.trim()) {
      toast.error("Titre requis");
      return;
    }
    setIsSubmitting(true);
    const { error } = await supabase.from("citizen_records").insert([
      {
        citizen_id: citizen.id,
        record_type: recordType,
        title: recordTitle,
        description: recordDesc || null,
        created_by: user?.id,
      },
    ]);
    if (error) {
      toast.error("Erreur");
    } else {
      toast.success("Enregistré");
      setRecordTitle("");
      setRecordDesc("");
      setShowAddRecord(false);
      loadRecords();
    }
    setIsSubmitting(false);
  };

  const infoField = (label: string, value: string | null) => (
    <div className="flex justify-between py-1.5 border-b border-[hsl(220,20%,15%)]">
      <span className="text-[hsl(220,15%,50%)] text-sm">{label}</span>
      <span className="text-white text-sm font-medium">{value || "N/A"}</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left: Profile */}
      <div className="lg:col-span-2">
        <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-6">
          {/* Header */}
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-[hsl(220,25%,20%)] flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {citizen.first_name[0]}{citizen.last_name[0]}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                {citizen.first_name} {citizen.last_name}
                {citizen.email && (
                  <span className="text-[hsl(220,15%,45%)] text-base font-normal ml-2">
                    &lt;{citizen.email}&gt;
                  </span>
                )}
              </h2>
              {citizen.date_of_birth && (
                <p className="text-[hsl(220,15%,50%)] text-sm">
                  {new Date(citizen.date_of_birth).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              )}
              {citizen.phone && (
                <p className="text-[hsl(220,15%,50%)] text-sm">{citizen.phone}</p>
              )}
              <p className="text-[hsl(220,15%,40%)] text-xs mt-1">
                Recensé(e) le{" "}
                {new Date(citizen.created_at).toLocaleDateString("fr-FR")} à{" "}
                {new Date(citizen.created_at).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-x-8">
            {infoField("Poids", citizen.weight)}
            {infoField("Taille", citizen.height)}
            {infoField("Ethnie", citizen.ethnicity)}
            {infoField("Couleur de cheveux", citizen.hair_color)}
            {infoField("Emploi", citizen.job)}
            {infoField("Permis de conduire", citizen.drivers_license)}
          </div>

          {/* PPA Civil */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-[hsl(220,15%,50%)] text-sm">PPA civil</span>
            <span
              className={`w-3 h-3 rounded-full ${
                citizen.ppa_civil
                  ? "bg-[hsl(120,60%,45%)]"
                  : "bg-[hsl(0,70%,50%)]"
              }`}
            />
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2">
            {recordTypes.map((rt) => (
              <button
                key={rt.value}
                onClick={() => {
                  setRecordType(rt.value);
                  setShowAddRecord(true);
                }}
                className="w-full text-center py-2.5 bg-[hsl(220,25%,16%)] border border-[hsl(220,20%,20%)] rounded text-white text-sm hover:bg-[hsl(220,25%,20%)] transition-colors"
              >
                {rt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Wanted + Records */}
      <div className="space-y-6">
        {/* Wanted */}
        <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Wanted
            </h3>
            <button
              onClick={toggleWanted}
              className={`px-3 py-1 text-xs rounded font-medium transition-colors ${
                citizen.is_wanted
                  ? "bg-[hsl(0,60%,20%)] text-[hsl(0,70%,60%)] hover:bg-[hsl(0,60%,25%)]"
                  : "bg-[hsl(220,25%,18%)] text-[hsl(220,15%,55%)] hover:bg-[hsl(220,25%,22%)]"
              }`}
            >
              {citizen.is_wanted ? "Retirer" : "Rechercher"}
            </button>
          </div>
          {citizen.is_wanted ? (
            <div className="bg-[hsl(0,40%,12%)] border border-[hsl(0,40%,20%)] rounded p-3">
              <div className="flex items-center gap-2 text-[hsl(0,70%,60%)] font-semibold text-sm mb-1">
                <AlertTriangle className="w-4 h-4" />
                CITOYEN RECHERCHÉ
              </div>
              <p className="text-[hsl(220,15%,55%)] text-xs">
                Écrit par : {citizen.wanted_by || "??"}
              </p>
              {citizen.wanted_reason && (
                <p className="text-[hsl(220,15%,55%)] text-xs">
                  Raison : {citizen.wanted_reason}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[hsl(220,15%,40%)] text-sm">Aucun avis de recherche</p>
          )}
        </div>

        {/* Records */}
        <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-4">
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-3">
            Dossiers
          </h3>
          {records.length === 0 ? (
            <p className="text-[hsl(220,15%,40%)] text-sm">Aucun dossier</p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {records.map((r) => (
                <div
                  key={r.id}
                  className="p-3 bg-[hsl(220,25%,16%)] rounded text-sm"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-3 h-3 text-[hsl(220,60%,55%)]" />
                    <span className="text-white font-medium">{r.title}</span>
                  </div>
                  <span className="text-[hsl(220,15%,45%)] text-xs capitalize">
                    {r.record_type} •{" "}
                    {new Date(r.created_at).toLocaleDateString("fr-FR")}
                  </span>
                  {r.description && (
                    <p className="text-[hsl(220,15%,50%)] text-xs mt-1">
                      {r.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddRecord && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[hsl(220,25%,12%)] border border-[hsl(220,20%,18%)] rounded-lg p-6 w-full max-w-lg">
            <h3 className="text-white font-semibold text-lg mb-4">
              {recordTypes.find((r) => r.value === recordType)?.label}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[hsl(220,15%,55%)] mb-1 uppercase tracking-wider">
                  Titre
                </label>
                <input
                  type="text"
                  value={recordTitle}
                  onChange={(e) => setRecordTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-[hsl(220,25%,15%)] border border-[hsl(220,20%,20%)] rounded text-white text-sm focus:border-[hsl(220,60%,45%)] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-[hsl(220,15%,55%)] mb-1 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={recordDesc}
                  onChange={(e) => setRecordDesc(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-[hsl(220,25%,15%)] border border-[hsl(220,20%,20%)] rounded text-white text-sm focus:border-[hsl(220,60%,45%)] outline-none resize-none"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowAddRecord(false)}
                  className="px-4 py-2 text-sm text-[hsl(220,15%,55%)] hover:text-white transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={addRecord}
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-[hsl(220,60%,45%)] text-white text-sm rounded hover:bg-[hsl(220,60%,50%)] transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "..." : "Enregistrer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MDTCitizenProfile;
