import { useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useContent } from '@/context/ContentContext';
import { Check, ChevronLeft, ChevronRight, Loader2, PartyPopper } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Form shape                                                          */
/* ------------------------------------------------------------------ */

interface FormState {
  full_name: string;
  date_of_birth: string;
  nationality: string;
  state_of_origin: string;
  lga: string;
  nin: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  nok_name: string;
  nok_phone: string;
  nok_relationship: string;
  medical_conditions: string;
  current_medications: string;
  position: string;
  preferred_foot: string;
  jersey_number: string;
  highest_level: string;
  fa_status: string;
  player_license: string;
  current_club: string;
  previous_club_contact: string;
  video_url: string;
  message: string;
}

const empty: FormState = {
  full_name: '', date_of_birth: '', nationality: 'Nigeria', state_of_origin: '', lga: '', nin: '',
  phone: '', email: '', address: '', city: '', nok_name: '', nok_phone: '', nok_relationship: '',
  medical_conditions: '', current_medications: '', position: '', preferred_foot: '', jersey_number: '',
  highest_level: '', fa_status: '', player_license: '', current_club: '', previous_club_contact: '',
  video_url: '', message: '',
};

const DRAFT_KEY = 'amtay-academy-application-draft';

const steps = [
  { id: 0, label: 'You', title: 'Who are you?', blurb: 'Six quick details. Nothing else on this screen.' },
  { id: 1, label: 'Contact', title: 'How do we reach you?', blurb: 'Plus the person we call if anything happens at trials.' },
  { id: 2, label: 'Football', title: 'How do you play?', blurb: 'Tap what fits. No essays needed.' },
  { id: 3, label: 'Finish', title: 'Anything to show us?', blurb: 'A short clip helps, but it is optional.' },
];

const requiredByStep: (keyof FormState)[][] = [
  ['full_name', 'date_of_birth', 'state_of_origin'],
  ['phone', 'city', 'nok_name', 'nok_phone'],
  ['position', 'preferred_foot'],
  [],
];

const feet = ['Right', 'Left', 'Both'];
const levels = ['School / Street football', 'Academy', 'State league', 'National league (NLO)', 'Professional league', 'National team'];
const faOptions = ['Not registered', 'Registered with state FA', 'Registered with NFF', 'Currently contracted to a club'];
const licenceOptions = ['No', 'Yes — state FA licence', 'Yes — NFF licence'];

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

const labelCls = 'block text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground';
const inputCls =
  'mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-all placeholder:text-muted-foreground/60 focus:border-[hsl(var(--royal-blue))] focus:ring-4 focus:ring-[hsl(var(--royal-blue))]/10';

const Field = ({
  label, name, value, onChange, type = 'text', placeholder, required, error, hint, span,
}: {
  label: string; name: keyof FormState; value: string;
  onChange: (name: keyof FormState, value: string) => void;
  type?: string; placeholder?: string; required?: boolean; error?: boolean; hint?: string; span?: boolean;
}) => (
  <div className={span ? 'sm:col-span-2' : undefined}>
    <label className={labelCls} htmlFor={name}>
      {label} {required && <span className="text-[hsl(var(--royal-blue))]">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(name, e.target.value)}
      className={`${inputCls} ${error ? 'border-rose-400 ring-4 ring-rose-400/10' : ''}`}
    />
    {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    {error && <p className="mt-1.5 text-xs font-semibold text-rose-500">We need this one.</p>}
  </div>
);

const Pills = ({
  label, options, value, onSelect, error, required,
}: {
  label: string; options: string[]; value: string; onSelect: (v: string) => void; error?: boolean; required?: boolean;
}) => (
  <div className="sm:col-span-2">
    <span className={labelCls}>
      {label} {required && <span className="text-[hsl(var(--royal-blue))]">*</span>}
    </span>
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            className={`rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
              active
                ? 'border-transparent bg-[hsl(var(--primary-blue))] text-white shadow-[0_10px_25px_-12px_hsl(217_100%_32%/0.8)]'
                : 'border-border bg-background text-foreground/70 hover:border-[hsl(var(--royal-blue))]/40 hover:text-foreground'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
    {error && <p className="mt-2 text-xs font-semibold text-rose-500">Pick one to continue.</p>}
  </div>
);

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export const AcademyApplication = () => {
  const { content } = useContent();
  const [form, setForm] = useState<FormState>(empty);
  const [step, setStep] = useState(0);
  const [touchedErrors, setTouchedErrors] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  /* Restore an unfinished application so nobody loses their typing */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setForm({ ...empty, ...JSON.parse(saved) });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form]);

  const set = (name: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [name]: value }));
    setTouchedErrors((prev) => {
      if (!prev.has(name)) return prev;
      const next = new Set(prev);
      next.delete(name);
      return next;
    });
  };

  const positions = content.trials?.positions?.length
    ? content.trials.positions
    : ['Goalkeeper', 'Defender', 'Midfielder', 'Winger', 'Striker'];

  /* Progress reflects filled fields, not just step count — it always moves */
  const progress = useMemo(() => {
    const keys = Object.keys(form) as (keyof FormState)[];
    const filled = keys.filter((k) => form[k].trim()).length;
    return Math.min(100, Math.round((filled / keys.length) * 100));
  }, [form]);

  const validate = (index: number) => {
    const missing = requiredByStep[index].filter((k) => !form[k].trim());
    setTouchedErrors(new Set(missing));
    return missing.length === 0;
  };

  const goTo = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const next = () => {
    if (!validate(step)) return;
    goTo(Math.min(steps.length - 1, step + 1));
  };

  const submit = async () => {
    for (let i = 0; i < requiredByStep.length; i += 1) {
      if (!validate(i)) {
        goTo(i);
        return;
      }
    }
    setSubmitting(true);
    setFailed(null);
    const payload = {
      ...form,
      email: form.email.trim() || null,
      date_of_birth: form.date_of_birth || null,
      status: 'pending' as const,
    };
    const { error } = await supabase.from('player_applications').insert(payload);
    setSubmitting(false);
    if (error) {
      setFailed('We could not send your application. Please check your connection and try again.');
      return;
    }
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* ignore */
    }
    setDone(true);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const err = (k: keyof FormState) => touchedErrors.has(k);

  /* ---------------- success ---------------- */
  if (done) {
    return (
      <section id="apply" className="section-padding scroll-mt-24">
        <div className="container-premium">
          <div ref={topRef} className="mx-auto max-w-2xl rounded-[1.75rem] border border-border bg-card p-8 text-center sm:p-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <PartyPopper className="h-8 w-8 text-emerald-500" />
            </div>
            <h2 className="mt-7 text-3xl font-black tracking-[-0.03em] sm:text-4xl">You're in the pile.</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
              {content.trials?.closingNote ||
                'Shortlisted players are contacted by phone with the trial date, venue and what to bring.'}
            </p>
            <div className="mt-8 rounded-2xl bg-muted/60 p-5 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">What happens next</p>
              <ol className="mt-3 space-y-2 text-sm text-foreground/80">
                <li>1 — Our technical crew reads your application.</li>
                <li>2 — Shortlisted players get a call or message.</li>
                <li>3 — You show up, and the pitch decides.</li>
              </ol>
            </div>
            <p className="mt-7 text-[11px] font-bold uppercase tracking-[0.18em] text-[hsl(var(--primary-blue))]">
              Wear the shirt. Earn the shirt.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ---------------- form ---------------- */
  return (
    <section id="apply" className="section-padding scroll-mt-24">
      <div className="container-premium">
        <div ref={topRef} className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-label-blue">Join the academy</span>
            <h2 className="heading-section mt-2">Apply for trials</h2>
            <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
              {content.trials?.intro ||
                'We are always scouting hungry, disciplined talent. Four short steps — about two minutes.'}
            </p>
          </div>

          {/* Progress */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => {
                const state = i < step ? 'done' : i === step ? 'current' : 'todo';
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => i < step && goTo(i)}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-black transition-all duration-300 ${
                        state === 'done'
                          ? 'bg-emerald-500 text-white'
                          : state === 'current'
                            ? 'bg-[hsl(var(--primary-blue))] text-white ring-4 ring-[hsl(var(--royal-blue))]/15'
                            : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {state === 'done' ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    <span
                      className={`text-[9px] font-bold uppercase tracking-[0.16em] ${
                        state === 'todo' ? 'text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary-blue))] to-[hsl(var(--electric-cyan))] transition-all duration-500"
                style={{ width: `${Math.max(progress, (step / steps.length) * 100)}%` }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="mt-8 rounded-[1.75rem] border border-border bg-card p-6 sm:p-9">
            <h3 className="text-2xl font-black tracking-[-0.03em] sm:text-3xl">{steps[step].title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{steps[step].blurb}</p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              {step === 0 && (
                <>
                  <Field label="Full name" name="full_name" value={form.full_name} onChange={set} required error={err('full_name')} placeholder="Surname first" span />
                  <Field label="Date of birth" name="date_of_birth" value={form.date_of_birth} onChange={set} type="date" required error={err('date_of_birth')} />
                  <Field label="Nationality" name="nationality" value={form.nationality} onChange={set} />
                  <Field label="State of origin" name="state_of_origin" value={form.state_of_origin} onChange={set} required error={err('state_of_origin')} placeholder="e.g. Kano" />
                  <Field label="Local government area" name="lga" value={form.lga} onChange={set} placeholder="e.g. Nassarawa" />
                  <Field label="NIN / ID number" name="nin" value={form.nin} onChange={set} hint="Optional now — bring your ID on trial day." span />
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="Phone number" name="phone" value={form.phone} onChange={set} required error={err('phone')} placeholder="+234 ..." />
                  <Field label="Email" name="email" value={form.email} onChange={set} type="email" placeholder="Optional" />
                  <Field label="Home address" name="address" value={form.address} onChange={set} span />
                  <Field label="City / town" name="city" value={form.city} onChange={set} required error={err('city')} />
                  <div className="sm:col-span-2 mt-2 h-px bg-border" />
                  <Field label="Next of kin name" name="nok_name" value={form.nok_name} onChange={set} required error={err('nok_name')} />
                  <Field label="Next of kin phone" name="nok_phone" value={form.nok_phone} onChange={set} required error={err('nok_phone')} />
                  <Field label="Relationship" name="nok_relationship" value={form.nok_relationship} onChange={set} placeholder="Parent, guardian, sibling" span />
                  <Field label="Medical conditions" name="medical_conditions" value={form.medical_conditions} onChange={set} placeholder="Write 'None' if none" />
                  <Field label="Current medication" name="current_medications" value={form.current_medications} onChange={set} placeholder="Write 'None' if none" />
                </>
              )}

              {step === 2 && (
                <>
                  <Pills label="Preferred position" options={positions} value={form.position} onSelect={(v) => set('position', v)} required error={err('position')} />
                  <Pills label="Preferred foot" options={feet} value={form.preferred_foot} onSelect={(v) => set('preferred_foot', v)} required error={err('preferred_foot')} />
                  <Field label="Preferred jersey number" name="jersey_number" value={form.jersey_number} onChange={set} placeholder="1 – 99" />
                  <Field label="Current club" name="current_club" value={form.current_club} onChange={set} placeholder="Or 'None'" />
                  <Pills label="Highest level played" options={levels} value={form.highest_level} onSelect={(v) => set('highest_level', v)} />
                  <Pills label="Current FA status" options={faOptions} value={form.fa_status} onSelect={(v) => set('fa_status', v)} />
                  <Pills label="Do you hold a player licence?" options={licenceOptions} value={form.player_license} onSelect={(v) => set('player_license', v)} />
                  <Field label="Previous club contact" name="previous_club_contact" value={form.previous_club_contact} onChange={set} placeholder="Coach name and phone, if available" span />
                </>
              )}

              {step === 3 && (
                <>
                  <Field label="Highlight video link" name="video_url" value={form.video_url} onChange={set} placeholder="YouTube, TikTok or Google Drive link" hint="Optional. Two minutes of real match footage beats a long edit." span />
                  <div className="sm:col-span-2">
                    <label className={labelCls} htmlFor="message">Anything else we should know?</label>
                    <textarea
                      id="message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => set('message', e.target.value)}
                      placeholder="Tell us in your own words why you want to wear this shirt."
                      className={inputCls}
                    />
                  </div>
                  <div className="sm:col-span-2 rounded-2xl bg-muted/60 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Before you send</p>
                    <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                      {(content.trials?.requirements ?? []).map((r) => (
                        <li key={r} className="flex items-start gap-2">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-muted-foreground">
                      Your details go straight to the AMTAY FC technical crew and are never shared outside the club.
                    </p>
                  </div>
                </>
              )}
            </div>

            {failed && (
              <p className="mt-6 rounded-xl bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-600">{failed}</p>
            )}

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => goTo(Math.max(0, step - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </button>

              {step < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary-blue))] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-[hsl(var(--royal-blue))] hover:shadow-[0_18px_40px_-18px_hsl(217_100%_32%/0.8)]"
                >
                  Continue <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary-blue))] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-[hsl(var(--royal-blue))] disabled:opacity-60"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {submitting ? 'Sending' : 'Send application'}
                </button>
              )}
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            Step {step + 1} of {steps.length} · your answers are saved on this device as you type.
          </p>
        </div>
      </div>
    </section>
  );
};
