import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import trialsImg from '@/assets/placeholder-trials-portrait.jpg';

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  position: string;
  location: string;
  current_club: string;
  video_url: string;
  message: string;
}

const emptyForm: FormState = {
  full_name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  position: '',
  location: '',
  current_club: '',
  video_url: '',
  message: '',
};

const Apply = () => {
  const { content } = useContent();
  const trials = content.trials;
  const heroImage = content.images?.trialsHero || trialsImg;
  const { toast } = useToast();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (key: keyof FormState, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim() || !form.email.trim()) {
      toast({ title: 'Missing details', description: 'Your name and email are required.', variant: 'destructive' });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('player_applications').insert({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      date_of_birth: form.date_of_birth || null,
      position: form.position || null,
      location: form.location.trim() || null,
      current_club: form.current_club.trim() || null,
      video_url: form.video_url.trim() || null,
      message: form.message.trim() || null,
    });
    setSubmitting(false);

    if (error) {
      toast({ title: 'Could not send', description: error.message, variant: 'destructive' });
      return;
    }
    setForm(emptyForm);
    setDone(true);
  };

  const inputClass =
    'w-full px-4 py-3.5 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:border-[hsl(var(--royal-blue))] focus:ring-4 focus:ring-[hsl(var(--royal-blue))]/10 transition-all';

  return (
    <Layout>
      <section className="relative bg-background pt-28 sm:pt-32 lg:pt-40 pb-14 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-[hsl(var(--royal-blue))]/[0.05] blur-[150px]" />
        <div className="container-premium relative grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 animate-fade-up">
              <span className="h-[2px] w-10 bg-[hsl(var(--royal-blue))]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))]">
                Player Portal
              </span>
            </div>
            <h1 className="mt-7 text-[2.5rem] leading-[0.95] sm:text-5xl lg:text-6xl font-black tracking-[-0.04em] text-foreground animate-fade-up-delay-1">
              {trials.heroTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground max-w-xl animate-fade-up-delay-2">
              {trials.heroSubtitle}
            </p>
          </div>
          <figure className="overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] bg-muted shadow-[0_40px_80px_-40px_hsl(217_100%_12%/0.3)] animate-fade-up-delay-3">
            <img
              src={heroImage}
              alt="AMTAY FC trials"
              loading="lazy"
              className="w-full aspect-[4/3] lg:aspect-[4/5] object-cover object-center"
            />
          </figure>
        </div>
      </section>

      <section className="relative bg-muted/40 border-y border-border">
        <div className="container-premium py-16 sm:py-24 grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16">
          {/* Requirements */}
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground mb-10">{trials.intro}</p>
            <h2 className="text-[11px] uppercase tracking-[0.28em] text-[hsl(var(--primary-blue))] font-bold mb-5">
              What we look for
            </h2>
            <ul className="space-y-0 mb-10 divide-y divide-border border-t border-border">
              {(trials.requirements || []).map((req, i) => (
                <li key={i} className="flex items-start gap-3 py-4 text-foreground/85">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 text-[hsl(var(--royal-blue))] shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-background border border-border">
              <ShieldCheck className="w-5 h-5 text-[hsl(var(--royal-blue))] shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">{trials.closingNote}</p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-[1.75rem] border border-border bg-background p-6 sm:p-10 shadow-[0_30px_60px_-40px_hsl(217_100%_12%/0.25)]">
            {done ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-5 text-[hsl(var(--royal-blue))]" />
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-3">Application received</h2>
                <p className="text-muted-foreground mb-8">
                  Our technical crew reviews every submission. If you are shortlisted, we will reach out with trial details.
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-border font-bold text-sm hover:border-[hsl(var(--royal-blue))] transition-colors"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-2xl sm:text-3xl font-black tracking-[-0.03em] mb-1">Application form</h2>
                <p className="text-sm text-muted-foreground !mt-1 mb-6">Fields marked * are required.</p>


                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full name *</label>
                    <input className={inputClass} value={form.full_name} onChange={(e) => set('full_name', e.target.value)} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email *</label>
                    <input type="email" className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone</label>
                    <input className={inputClass} value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="+234 ..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Date of birth</label>
                    <input type="date" className={inputClass} value={form.date_of_birth} onChange={(e) => set('date_of_birth', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Preferred position</label>
                    <select className={inputClass} value={form.position} onChange={(e) => set('position', e.target.value)}>
                      <option value="" className="text-black">Select a position</option>
                      {(trials.positions || []).map((p) => (
                        <option key={p} value={p} className="text-black">{p}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">City / State</label>
                    <input className={inputClass} value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Kano" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Current club / academy</label>
                    <input className={inputClass} value={form.current_club} onChange={(e) => set('current_club', e.target.value)} placeholder="Optional" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Highlight video link</label>
                    <input className={inputClass} value={form.video_url} onChange={(e) => set('video_url', e.target.value)} placeholder="YouTube, Instagram or Google Drive link" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Tell us about yourself</label>
                    <textarea rows={4} className={inputClass} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Experience, achievements, why AMTAY FC..." />
                  </div>
                </div>

                <button type="submit" disabled={submitting} className="btn-hero w-full justify-center disabled:opacity-60">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Submit application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
