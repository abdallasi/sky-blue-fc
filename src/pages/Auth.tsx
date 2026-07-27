import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate('/cms', { replace: true });
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } =
      mode === 'signin' ? await signIn(email, password) : await signUp(email, password, fullName);
    setBusy(false);

    if (error) {
      toast({ title: 'Authentication failed', description: error, variant: 'destructive' });
      return;
    }
    if (mode === 'signup') {
      toast({ title: 'Account created', description: 'You can now sign in to the CMS.' });
      setMode('signin');
    }
  };

  return (
    <Layout>
      <section className="min-h-[80vh] flex items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-md border border-border rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-2">{mode === 'signin' ? 'Management Sign In' : 'Create Account'}</h1>
          <p className="text-muted-foreground mb-8">Access to the AMTAY FC content management system.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="fullName">Full name</label>
                <input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background"
              />
            </div>

            <button type="submit" disabled={busy} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
              {busy && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="mt-6 text-sm text-primary hover:underline"
          >
            {mode === 'signin' ? "Need an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Auth;
