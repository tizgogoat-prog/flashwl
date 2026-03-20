import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface Props {
  user: User | null;
  onCreated: (citizen: any) => void;
}

const MDTCreateCitizen = ({ user, onCreated }: Props) => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    phone: "",
    email: "",
    weight: "N/A",
    height: "N/A",
    ethnicity: "Non renseigné",
    hair_color: "N/A",
    job: "N/A",
    drivers_license: "N/A",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.first_name || !form.last_name) {
      toast.error("Nom et prénom requis");
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase
      .from("citizens")
      .insert([
        {
          ...form,
          date_of_birth: form.date_of_birth || null,
          created_by: user?.id,
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error("Erreur lors de l'enregistrement");
    } else {
      onCreated(data);
    }
    setIsLoading(false);
  };

  const field = (
    label: string,
    key: keyof typeof form,
    type = "text",
    required = false
  ) => (
    <div>
      <label className="block text-xs font-medium text-[hsl(220,15%,55%)] mb-1 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className="w-full px-3 py-2 bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded text-white text-sm focus:border-[hsl(220,60%,45%)] outline-none transition-colors"
        required={required}
      />
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Encoder un citoyen</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("Prénom", "first_name", "text", true)}
          {field("Nom", "last_name", "text", true)}
          {field("Date de naissance", "date_of_birth", "date")}
          {field("Téléphone", "phone")}
          {field("Email", "email", "email")}
          {field("Poids", "weight")}
          {field("Taille", "height")}
          {field("Ethnie", "ethnicity")}
          {field("Couleur de cheveux", "hair_color")}
          {field("Emploi", "job")}
          {field("Permis de conduire", "drivers_license")}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-3 bg-[hsl(220,60%,45%)] text-white rounded-lg hover:bg-[hsl(220,60%,50%)] transition-colors disabled:opacity-50 active:scale-[0.98]"
        >
          {isLoading ? "Enregistrement..." : "Enregistrer le citoyen"}
        </button>
      </form>
    </div>
  );
};

export default MDTCreateCitizen;
