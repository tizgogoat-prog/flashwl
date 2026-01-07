import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import BackgroundImage from "@/components/BackgroundImage";
import { toast } from "sonner";
import { LogOut, Shield, Users, Plus, Trash2 } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  email?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserRole[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<string>("sasp");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/mdt");
        return;
      }

      setUser(session.user);

      const { data: adminCheck } = await supabase.rpc('is_mdt_admin', { 
        _user_id: session.user.id 
      });

      if (!adminCheck) {
        toast.error("Accès non autorisé");
        navigate("/mdt");
        return;
      }

      setIsAdmin(true);
      loadUsers();
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const loadUsers = async () => {
    const { data: roles } = await supabase.from('user_roles').select('*');
    
    if (roles) {
      const enrichedRoles: UserRole[] = [];
      for (const role of roles) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('email')
          .eq('user_id', role.user_id)
          .single();
        
        enrichedRoles.push({
          ...role,
          email: profile?.email || 'Email inconnu'
        });
      }
      setUsers(enrichedRoles);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/mdt");
  };

  const addRole = async () => {
    if (!newEmail) {
      toast.error("Veuillez entrer un email");
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('email', newEmail)
      .single();

    if (!profile) {
      toast.error("Utilisateur non trouvé");
      return;
    }

    const { error } = await supabase
      .from('user_roles')
      .insert([{ user_id: profile.user_id, role: newRole as "admin" | "sasp" | "samc" | "government" }]);

    if (error) {
      toast.error("Erreur lors de l'ajout du rôle");
      return;
    }

    toast.success("Rôle ajouté avec succès");
    setNewEmail("");
    loadUsers();
  };

  const removeRole = async (id: string) => {
    const { error } = await supabase.from('user_roles').delete().eq('id', id);
    if (!error) {
      toast.success("Rôle supprimé");
      loadUsers();
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="text-foreground">Chargement...</div></div>;
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundImage />
      <div className="relative z-10 p-6">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">Administration MDT</h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg">
              <LogOut className="w-4 h-4" />Déconnexion
            </button>
          </div>

          <div className="glass-card p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Plus className="w-5 h-5" />Ajouter un rôle</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="Email" className="flex-1 px-4 py-2 rounded-lg bg-muted border border-border" />
              <select value={newRole} onChange={(e) => setNewRole(e.target.value)} className="px-4 py-2 rounded-lg bg-muted border border-border">
                <option value="admin">Admin</option>
                <option value="sasp">SASP</option>
                <option value="samc">SAMC</option>
                <option value="government">Government</option>
              </select>
              <button onClick={addRole} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">Ajouter</button>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users className="w-5 h-5" />Utilisateurs avec accès MDT</h2>
            {users.length === 0 ? <p className="text-muted-foreground text-center py-8">Aucun utilisateur</p> : (
              <div className="space-y-3">
                {users.map((u) => (
                  <div key={u.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div><p className="font-medium">{u.email}</p><p className="text-sm text-muted-foreground capitalize">{u.role}</p></div>
                    <button onClick={() => removeRole(u.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
