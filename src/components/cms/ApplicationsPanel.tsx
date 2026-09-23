import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, RefreshCw, Trash2, ChevronDown, ChevronRight } from 'lucide-react';

type Status = 'pending' | 'reviewing' | 'accepted' | 'rejected';

interface Application {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  position: string | null;
  location: string | null;
  current_club: string | null;
  message: string | null;
  video_url: string | null;
  status: Status;
  admin_notes: string | null;
  created_at: string;
}

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
                      <div className="grid sm:grid-cols-2 gap-3 text-sm">
                        <p><span className="text-muted-foreground">Email:</span> {app.email}</p>
                        <p><span className="text-muted-foreground">Phone:</span> {app.phone || '—'}</p>
                        <p><span className="text-muted-foreground">Date of birth:</span> {app.date_of_birth || '—'}</p>
                        <p><span className="text-muted-foreground">Location:</span> {app.location || '—'}</p>
                        <p><span className="text-muted-foreground">Current club:</span> {app.current_club || '—'}</p>
                        <p className="truncate">
                          <span className="text-muted-foreground">Video:</span>{' '}
                          {app.video_url ? (
                            <a href={app.video_url} target="_blank" rel="noreferrer" className="text-primary underline">
                              Open link
                            </a>
                          ) : (
                            '—'
                          )}
                        </p>
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
