import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";
import { Plus, Trash2, Shield } from "lucide-react";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

interface Props {
  user: User | null;
}

const MDTSettings = ({ user }: Props) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState<UserRole[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<string>("sasp");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!user) return;
      const { data } = await supabase.rpc("is_mdt_admin", { _user_id: user.id });
      setIsAdmin(!!data);
      if (data) loadUsers();
      setLoading(false);
    };
    check();
  }, [user]);

  const loadUsers = async () => {
    const { data: roles } = await supabase.from("user_roles").select("*");
    if (roles) {
      const enriched: UserRole[] = [];
      for (const role of roles) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .eq("user_id", role.user_id)
          .single();
        enriched.push({ ...role, email: profile?.email || "Email inconnu" });
      }
      setUsers(enriched);
    }
  };

  const addRole = async () => {
    if (!newEmail.trim()) {
      toast.error("Entrez un email");
      return;
    }
    setAdding(true);

    const { data: profile } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("email", newEmail.trim())
      .single();

    if (!profile) {
      toast.error("Utilisateur non trouvé. Il doit d'abord créer un compte sur /mdt");
      setAdding(false);
      return;
    }

    const { error } = await supabase
      .from("user_roles")
      .insert([{ user_id: profile.user_id, role: newRole as any }]);

    if (error) {
      if (error.code === "23505") {
        toast.error("Cet utilisateur a déjà ce rôle");
      } else {
        toast.error("Erreur lors de l'ajout");
      }
    } else {
      toast.success("Accès MDT accordé !");
      setNewEmail("");
      loadUsers();
    }
    setAdding(false);
  };

  const removeRole = async (id: string) => {
    const { error } = await supabase.from("user_roles").delete().eq("id", id);
    if (!error) {
      toast.success("Accès retiré");
      loadUsers();
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-[hsl(220,15%,50%)]">Chargement...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-8">
        <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-8 text-center">
          <Shield className="w-10 h-10 text-[hsl(220,15%,35%)] mx-auto mb-3" />
          <p className="text-[hsl(220,15%,50%)]">
            Seuls les administrateurs peuvent gérer les accès MDT.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-white mb-6">Paramètres — Gestion des accès</h2>

      {/* Add access */}
      <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-6 mb-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Donner accès au MDT
        </h3>
        <p className="text-[hsl(220,15%,50%)] text-sm mb-4">
          Entrez l'email de la personne qui doit avoir accès. Elle doit d'abord avoir créé un compte.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="email@exemple.com"
            className="flex-1 px-4 py-2.5 bg-[hsl(220,25%,10%)] border border-[hsl(220,20%,20%)] rounded-lg text-white placeholder:text-[hsl(220,15%,35%)] focus:border-[hsl(220,60%,45%)] outline-none text-sm"
          />
          <select
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="px-4 py-2.5 bg-[hsl(220,25%,10%)] border border-[hsl(220,20%,20%)] rounded-lg text-white text-sm outline-none"
          >
            <option value="admin">Admin</option>
            <option value="sasp">SASP</option>
            <option value="samc">SAMC</option>
            <option value="government">Gouvernement</option>
          </select>
          <button
            onClick={addRole}
            disabled={adding}
            className="px-6 py-2.5 bg-[hsl(220,60%,45%)] text-white rounded-lg hover:bg-[hsl(220,60%,50%)] transition-colors text-sm font-medium disabled:opacity-50 active:scale-[0.98]"
          >
            {adding ? "..." : "Ajouter"}
          </button>
        </div>
      </div>

      {/* Users list */}
      <div className="bg-[hsl(220,25%,13%)] border border-[hsl(220,20%,18%)] rounded-lg p-6">
        <h3 className="text-white font-semibold mb-4">
          Utilisateurs avec accès ({users.length})
        </h3>
        {users.length === 0 ? (
          <p className="text-[hsl(220,15%,40%)] text-sm py-4 text-center">
            Aucun utilisateur avec accès
          </p>
        ) : (
          <div className="space-y-2">
            {users.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between p-3 bg-[hsl(220,25%,16%)] rounded-lg"
              >
                <div>
                  <p className="text-white text-sm font-medium">{u.email}</p>
                  <p className="text-[hsl(220,15%,45%)] text-xs capitalize">{u.role}</p>
                </div>
                <button
                  onClick={() => removeRole(u.id)}
                  className="p-2 text-[hsl(0,60%,55%)] hover:bg-[hsl(0,40%,15%)] rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MDTSettings;
