import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Mail, Calendar, Clock, ChevronLeft, ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';
import { agendar } from 'virtual:content';

const MONTHS_ES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

// Simulate some slots being unavailable
const UNAVAILABLE: Record<string, string[]> = {
  '1': ['09:00', '10:00', '14:00'],
  '3': ['11:00', '15:00', '16:00'],
  '5': ['09:30', '14:30', '17:00'],
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function isWeekend(year: number, month: number, day: number) {
  const d = new Date(year, month, day).getDay();
  return d === 0 || d === 6;
}
function isPast(year: number, month: number, day: number) {
  const today = new Date();
  const target = new Date(year, month, day);
  today.setHours(0, 0, 0, 0);
  return target < today;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AgendarPage() {
  const site = 'https://montiver.com';

  // Step: 1 = form, 2 = scheduler, 3 = confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    stage: '',
    sector: '',
    raise: '',
    description: '',
  });

  // Scheduler state
  const today = new Date();
  const [calYear, setCalYear] = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirm = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalYear((y) => y - 1); setCalMonth(11); }
    else setCalMonth((m) => m - 1);
    setSelectedDay(null);
    setSelectedTime(null);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalYear((y) => y + 1); setCalMonth(0); }
    else setCalMonth((m) => m + 1);
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const daysInMonth = getDaysInMonth(calYear, calMonth);
  const firstDay = getFirstDayOfMonth(calYear, calMonth);
  const unavailableToday = selectedDay ? (UNAVAILABLE[String(selectedDay % 7)] ?? []) : [];
  const availableSlots = TIME_SLOTS.filter((t) => !unavailableToday.includes(t));

  const canGoBack = !(calYear === today.getFullYear() && calMonth === today.getMonth());

  return (
    <>
      <Helmet>
        <title>Agendar Reunión — Montiver</title>
        <meta name="description" content="Agenda una reunión con el equipo inversor de Montiver. Selecciona fecha y hora, completa el formulario y te confirmamos en minutos." />
        <link rel="canonical" href={`${site}/agendar`} />
        <meta property="og:title" content="Agendar Reunión — Montiver" />
        <meta property="og:description" content="El primer paso hacia el capital que necesitas. Agenda una reunión con Montiver hoy." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/agendar`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <main>
        <section className="pt-36 pb-24 bg-background">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">

            {/* Hero */}
            <motion.div
              className="max-w-2xl mb-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">
                {agendar.hero.eyebrow}
              </span>
              <h1
                className="text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {agendar.hero.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {agendar.hero.subtitle}
              </p>
            </motion.div>

            {/* Step indicator */}
            {step < 3 && (
              <div className="flex items-center gap-3 mb-10">
                {[
                  { n: 1, label: 'Tu empresa' },
                  { n: 2, label: 'Fecha y hora' },
                ].map(({ n, label }) => (
                  <div key={n} className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 flex items-center justify-center text-xs font-bold transition-colors duration-300"
                      style={{
                        background: step >= n ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                        color: step >= n ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                      }}
                    >
                      {step > n ? <CheckCircle size={14} /> : n}
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: step >= n ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}
                    >
                      {label}
                    </span>
                    {n < 2 && <div className="w-8 h-px bg-border mx-1" />}
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence mode="wait">

              {/* ── STEP 1: Company form ─────────────────────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  <div className="lg:col-span-7">
                    <div className="bg-card border border-border/30 p-8">
                      <h2 className="text-xl font-bold text-foreground mb-7">{agendar.form.title}</h2>
                      <form onSubmit={handleFormSubmit} className="flex flex-col gap-5" noValidate>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              {agendar.form.fields.name} *
                            </label>
                            <input
                              id="name" name="name" type="text" required
                              value={form.name} onChange={handleChange}
                              className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                              placeholder="Tu nombre"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              {agendar.form.fields.email} *
                            </label>
                            <input
                              id="email" name="email" type="email" required
                              value={form.email} onChange={handleChange}
                              className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                              placeholder="tu@empresa.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="company" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              {agendar.form.fields.company} *
                            </label>
                            <input
                              id="company" name="company" type="text" required
                              value={form.company} onChange={handleChange}
                              className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                              placeholder="Nombre de tu empresa"
                            />
                          </div>
                          <div>
                            <label htmlFor="website" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              {agendar.form.fields.website}
                            </label>
                            <input
                              id="website" name="website" type="url"
                              value={form.website} onChange={handleChange}
                              className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors"
                              placeholder="https://tuempresa.com"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="stage" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              {agendar.form.fields.stage} *
                            </label>
                            <select
                              id="stage" name="stage" required
                              value={form.stage} onChange={handleChange}
                              className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                            >
                              <option value="">Seleccionar etapa</option>
                              {agendar.form.stageOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="sector" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                              {agendar.form.fields.sector} *
                            </label>
                            <select
                              id="sector" name="sector" required
                              value={form.sector} onChange={handleChange}
                              className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                            >
                              <option value="">Seleccionar sector</option>
                              {agendar.form.sectorOptions.map((o) => (
                                <option key={o} value={o}>{o}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="raise" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            {agendar.form.fields.raise} *
                          </label>
                          <select
                            id="raise" name="raise" required
                            value={form.raise} onChange={handleChange}
                            className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors appearance-none"
                          >
                            <option value="">Seleccionar monto</option>
                            {agendar.form.raiseOptions.map((o) => (
                              <option key={o} value={o}>{o}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="description" className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                            {agendar.form.fields.description} *
                          </label>
                          <textarea
                            id="description" name="description" required rows={4}
                            value={form.description} onChange={handleChange}
                            className="w-full bg-background border border-border/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none"
                            placeholder="¿Qué problema resuelves? ¿Cuál es tu tracción actual?"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          Continuar — Seleccionar fecha
                          <ArrowRight size={16} />
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <aside className="lg:col-span-5 flex flex-col gap-8">
                    <div className="bg-card border border-border/30 p-7">
                      <h3 className="text-base font-bold text-foreground mb-6">{agendar.sidebar.title}</h3>
                      <div className="flex flex-col gap-6">
                        {agendar.sidebar.steps.map((s) => (
                          <div key={s.step} className="flex gap-4">
                            <div
                              className="shrink-0 w-8 h-8 flex items-center justify-center text-xs font-bold"
                              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
                            >
                              {s.step}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-foreground mb-1">{s.title}</div>
                              <div className="text-xs text-muted-foreground leading-relaxed">{s.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-card border border-border/30 p-7">
                      <h3 className="text-sm font-bold text-foreground mb-4">{agendar.sidebar.contact.title}</h3>
                      <a
                        href={`mailto:${agendar.sidebar.contact.email}`}
                        className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Mail size={16} className="shrink-0" />
                        <span className="text-sm font-medium">{agendar.sidebar.contact.email}</span>
                      </a>
                      <a
                        href={`https://wa.me/${(agendar.sidebar.contact as any).whatsapp?.replace(/\+/g, '')}`}
                        className="flex items-center gap-3 text-primary hover:text-primary/80 transition-colors mb-4"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle size={16} className="shrink-0" />
                        <span className="text-sm font-medium">{(agendar.sidebar.contact as any).whatsappLabel}</span>
                      </a>
                      <p className="text-xs text-muted-foreground">{agendar.sidebar.contact.note}</p>
                    </div>
                  </aside>
                </motion.div>
              )}

              {/* ── STEP 2: Scheduler ────────────────────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                >
                  {/* Calendar */}
                  <div className="lg:col-span-5">
                    <div className="bg-card border border-border/30 p-7">
                      <div className="flex items-center justify-between mb-6">
                        <button
                          onClick={prevMonth}
                          disabled={!canGoBack}
                          className="p-2 hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Mes anterior"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <span className="text-sm font-bold text-foreground">
                          {MONTHS_ES[calMonth]} {calYear}
                        </span>
                        <button
                          onClick={nextMonth}
                          className="p-2 hover:bg-muted transition-colors"
                          aria-label="Mes siguiente"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      {/* Day headers */}
                      <div className="grid grid-cols-7 mb-2">
                        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d: string) => (
                          <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-1">
                            {d}
                          </div>
                        ))}
                      </div>

                      {/* Day cells */}
                      <div className="grid grid-cols-7 gap-y-1">
                        {Array.from({ length: firstDay }).map((_, i) => (
                          <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const disabled = isWeekend(calYear, calMonth, day) || isPast(calYear, calMonth, day);
                          const isSelected = selectedDay === day;
                          return (
                            <button
                              key={day}
                              onClick={() => { if (!disabled) { setSelectedDay(day); setSelectedTime(null); } }}
                              disabled={disabled}
                              className="aspect-square flex items-center justify-center text-xs font-medium transition-all duration-150"
                              style={{
                                background: isSelected ? 'hsl(var(--primary))' : 'transparent',
                                color: isSelected
                                  ? 'hsl(var(--primary-foreground))'
                                  : disabled
                                  ? 'hsl(var(--muted-foreground) / 0.35)'
                                  : 'hsl(var(--foreground))',
                                cursor: disabled ? 'not-allowed' : 'pointer',
                              }}
                              onMouseEnter={(e) => {
                                if (!disabled && !isSelected) {
                                  (e.currentTarget as HTMLButtonElement).style.background = 'hsl(var(--muted))';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isSelected) {
                                  (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                                }
                              }}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>

                      <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
                        <Calendar size={11} />
                        Zona horaria: Ciudad de México (CST)
                      </p>
                    </div>
                  </div>

                  {/* Time slots + summary */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    {/* Time slots */}
                    <div className="bg-card border border-border/30 p-7">
                      <h3 className="text-sm font-bold text-foreground mb-1 flex items-center gap-2">
                        <Clock size={15} className="text-primary" />
                        {selectedDay
                          ? `Horarios disponibles — ${selectedDay} de ${MONTHS_ES[calMonth]}`
                          : 'Selecciona un día para ver horarios'}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-5">Reunión de 45 minutos con dos socios del fondo</p>

                      {selectedDay ? (
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {availableSlots.map((slot) => {
                            const isChosen = selectedTime === slot;
                            return (
                              <button
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                className="py-2.5 text-xs font-semibold border transition-all duration-150"
                                style={{
                                  background: isChosen ? 'hsl(var(--primary))' : 'transparent',
                                  color: isChosen ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                                  borderColor: isChosen ? 'hsl(var(--primary))' : 'hsl(var(--border) / 0.4)',
                                }}
                              >
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="h-24 flex items-center justify-center border border-dashed border-border/30">
                          <span className="text-xs text-muted-foreground">Elige un día hábil en el calendario</span>
                        </div>
                      )}
                    </div>

                    {/* Booking summary */}
                    <div className="bg-muted border border-border/30 p-7">
                      <h3 className="text-sm font-bold text-foreground mb-4">Resumen de la reunión</h3>
                      <div className="flex flex-col gap-3 text-sm mb-6">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Empresa</span>
                          <span className="font-medium text-foreground">{form.company || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Contacto</span>
                          <span className="font-medium text-foreground">{form.name || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Etapa</span>
                          <span className="font-medium text-foreground">{form.stage || '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha</span>
                          <span className="font-medium text-foreground">
                            {selectedDay
                              ? `${selectedDay} de ${MONTHS_ES[calMonth]}, ${calYear}`
                              : '—'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Hora</span>
                          <span className="font-medium text-foreground">{selectedTime ?? '—'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duración</span>
                          <span className="font-medium text-foreground">45 minutos</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <button
                          onClick={handleConfirm}
                          disabled={!selectedDay || !selectedTime || loading}
                          className="w-full py-4 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {loading ? 'Confirmando...' : 'Confirmar reunión'}
                          {!loading && <CheckCircle size={15} />}
                        </button>
                        <button
                          onClick={() => setStep(1)}
                          className="w-full py-3 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5"
                        >
                          <ChevronLeft size={13} />
                          Volver y editar información
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Confirmed ────────────────────────────────────── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  className="max-w-2xl"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <div className="bg-card border border-primary/30 p-10 text-center">
                    <div
                      className="w-16 h-16 flex items-center justify-center mx-auto mb-6"
                      style={{ background: 'hsl(var(--primary) / 0.12)' }}
                    >
                      <CheckCircle size={32} className="text-primary" />
                    </div>
                    <h2
                      className="text-3xl font-bold text-foreground mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      ¡Reunión confirmada!
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Tu reunión con el equipo de Montiver está agendada para el{' '}
                      <strong className="text-foreground">
                        {selectedDay} de {MONTHS_ES[calMonth]}, {calYear} a las {selectedTime} CST
                      </strong>
                      . Recibirás una invitación de calendario en{' '}
                      <strong className="text-foreground">{form.email}</strong> en los próximos minutos.
                    </p>

                    <div className="bg-muted p-6 text-left mb-8">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Detalles de la reunión</div>
                      <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Empresa</span>
                          <span className="font-medium text-foreground">{form.company}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fecha y hora</span>
                          <span className="font-medium text-foreground">
                            {selectedDay} {MONTHS_ES[calMonth]} · {selectedTime} CST
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Formato</span>
                          <span className="font-medium text-foreground">Videollamada (link por correo)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Participantes</span>
                          <span className="font-medium text-foreground">2 socios de Montiver</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground">
                      ¿Necesitas cambiar la fecha?{' '}
                      <a href={`mailto:${agendar.sidebar.contact.email}`} className="text-primary hover:underline">
                        Escríbenos directamente
                      </a>
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  );
}
