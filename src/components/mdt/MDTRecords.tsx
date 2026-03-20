import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { FileText } from "lucide-react";

const typeLabels: Record<string, string> = {
  rapports: "Rapports d'opération",
  plaintes: "Registre des plaintes",
  armes: "Registre des armes",
  delits: "Registre des délits",
  bracelets: "Registre des bracelets",
  vehicules: "Véhicules en infraction",
};

const typeToRecordType: Record<string, string> = {
  rapports: "arrestation",
  plaintes: "plainte",
  armes: "armes",
  delits: "casier",
  bracelets: "bracelet",
  vehicules: "ticket",
};

interface Props {
  type: string;
  user: User | null;
}

const MDTRecords = ({ type }: Props) => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const recordType = typeToRecordType[type];
      if (!recordType) {
        setRecords([]);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("citizen_records")
        .select("*, citizens(first_name, last_name)")
        .eq("record_type", recordType)
        .order("created_at", { ascending: false })
        .limit(50);

      setRecords(data || []);
      setLoading(false);
    };
    load();
  }, [type]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        {typeLabels[type] || type}
      </h2>

      {loading ? (
        <p className="text-[hsl(220,15%,50%)] text-center py-12">Chargement...</p>
      ) : records.length === 0 ? (
        <p className="text-[hsl(220,15%,40%)] text-center py-12">
          Aucun enregistrement
        </p>
      ) : (
        <div className="space-y-2">
          {records.map((r) => (
            <div
              key={r.id}
              className="p-4 bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-4 h-4 text-[hsl(220,60%,55%)]" />
                <span className="text-white font-medium">{r.title}</span>
              </div>
              <p className="text-[hsl(220,15%,45%)] text-sm">
                {r.citizens?.first_name} {r.citizens?.last_name} •{" "}
                {new Date(r.created_at).toLocaleDateString("fr-FR")}
              </p>
              {r.description && (
                <p className="text-[hsl(220,15%,50%)] text-sm mt-2">{r.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MDTRecords;
