import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Trash2, ChevronDown, ChevronRight, Phone, MessageCircle } from 'lucide-react';

type Status = 'pending' | 'reviewing' | 'accepted' | 'rejected';

interface Application {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  date_of_birth: string | null;
  position: string | null;
  location: string | null;
  current_club: string | null;
  message: string | null;
  video_url: string | null;
  nationality: string | null;
  state_of_origin: string | null;
  lga: string | null;
  address: string | null;
  city: string | null;
  nin: string | null;
  nok_name: string | null;
  nok_phone: string | null;
  nok_relationship: string | null;
  medical_conditions: string | null;
  current_medications: string | null;
  jersey_number: string | null;
  previous_club_contact: string | null;
  preferred_foot: string | null;
  player_license: string | null;
  highest_level: string | null;
  fa_status: string | null;
  status: Status;
  admin_notes: string | null;
  created_at: string;
}

const Group = ({ title, rows }: { title: string; rows: [string, string | null][] }) => {
  const filled = rows.filter(([, v]) => v && v.trim());
  if (filled.length === 0) return null;
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {filled.map(([label, value]) => (
          <div key={label} className="text-sm">
            <dt className="text-xs text-muted-foreground">{label}</dt>
            <dd className="font-medium break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

const statuses: Status[] = ['pending', 'reviewing', 'accepted', 'rejected'];

const statusStyles: Record<Status, string> = {
  pending: 'bg-amber-500/15 text-amber-600',
  reviewing: 'bg-sky-500/15 text-sky-600',
  accepted: 'bg-emerald-500/15 text-emerald-600',
  rejected: 'bg-rose-500/15 text-rose-600',
};

export const ApplicationsPanel = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('player_applications')
      .select('*')
      .order('created_at', { ascending: false });
    setLoading(false);
    if (error) {
      toast({ title: 'Could not load applications', description: error.message, variant: 'destructive' });
      return;
    }
    setItems((data ?? []) as Application[]);
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const channel = supabase
      .channel('player_applications_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'player_applications' }, () => load())
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const updateItem = async (id: string, patch: { status?: Status; admin_notes?: string }) => {
    const { error } = await supabase
      .from('player_applications')
      .update({ ...patch, reviewed_by: user?.id ?? null, reviewed_at: new Date().toISOString() })
      .eq('id', id);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    toast({ title: 'Application updated' });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from('player_applications').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const visible = filter === 'all' ? items : items.filter((i) => i.status === filter);
  const pendingCount = items.filter((i) => i.status === 'pending').length;

  return (
    <div className="border border-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 bg-muted/50 hover:bg-muted transition-colors"
      >
        <span className="font-semibold text-lg flex items-center gap-3">
          Player Applications
          {pendingCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600">
              {pendingCount} new
            </span>
          )}
        </span>
        {open ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
      </button>

      {open && (
        <div className="p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            {(['all', ...statuses] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                  filter === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/70'
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={load}
              className="ml-auto inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
          </div>

          {loading ? (
            <div className="py-10 flex justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : visible.length === 0 ? (
            <p className="text-muted-foreground text-sm py-6 text-center">No applications here yet.</p>
          ) : (
            <div className="space-y-3">
              {visible.map((app) => (
                <div key={app.id} className="border border-border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                    className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-muted/40 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold truncate">{app.full_name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {app.position || 'No position'} · {new Date(app.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[app.status]}`}>
                      {app.status}
                    </span>
                  </button>

                  {expanded === app.id && (
                    <div className="p-4 pt-0 space-y-4">
                      <div className="space-y-3">
                        <Group
                          title="Identity"
                          rows={[
                            ['Date of birth', app.date_of_birth],
                            ['Nationality', app.nationality],
                            ['State of origin', app.state_of_origin],
                            ['LGA', app.lga],
                            ['NIN / ID number', app.nin],
                          ]}
                        />
                        <Group
                          title="Contact"
                          rows={[
                            ['Phone', app.phone],
                            ['Email', app.email],
                            ['Address', app.address],
                            ['City', app.city],
                            ['Location', app.location],
                          ]}
                        />
                        <Group
                          title="Next of kin & medical"
                          rows={[
                            ['Next of kin', app.nok_name],
                            ['Next of kin phone', app.nok_phone],
                            ['Relationship', app.nok_relationship],
                            ['Medical conditions', app.medical_conditions],
                            ['Current medication', app.current_medications],
                          ]}
                        />
                        <Group
                          title="Football profile"
                          rows={[
                            ['Preferred position', app.position],
                            ['Preferred foot', app.preferred_foot],
                            ['Preferred jersey number', app.jersey_number],
                            ['Current club', app.current_club],
                            ['Previous club contact', app.previous_club_contact],
                            ['Highest level played', app.highest_level],
                            ['FA status', app.fa_status],
                            ['Player licence', app.player_license],
                          ]}
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {app.phone && (
                          <>
                            <a
                              href={`tel:${app.phone}`}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call
                            </a>
                            <a
                              href={`https://wa.me/${app.phone.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                            >
                              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                            </a>
                          </>
                        )}
                        {app.video_url && (
                          <a
                            href={app.video_url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted"
                          >
                            Watch reel
                          </a>
                        )}
                      </div>

                      {app.message && (
                        <p className="text-sm bg-muted/50 rounded-xl p-3 whitespace-pre-wrap">{app.message}</p>
                      )}

                      <div>
                        <label className="block text-sm font-medium mb-2">Management notes</label>
                        <textarea
                          rows={2}
                          defaultValue={app.admin_notes ?? ''}
                          onBlur={(e) => {
                            if (e.target.value !== (app.admin_notes ?? '')) {
                              updateItem(app.id, { admin_notes: e.target.value });
                            }
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {statuses.map((s) => (
                          <button
                            key={s}
                            onClick={() => updateItem(app.id, { status: s })}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-colors ${
                              app.status === s ? 'border-primary text-primary' : 'border-border text-muted-foreground hover:bg-muted'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                        {isAdmin && (
                          <button
                            onClick={() => remove(app.id)}
                            className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:underline"
                          >
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
