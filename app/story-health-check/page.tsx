"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, PlayCircle, CheckCircle2 } from "lucide-react";
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import TypewriterHeadline from '@/components/TypewriterHeadline';
import ParallaxHeroBackground from '@/components/ParallaxHeroBackground';

const DUBSADO_URL = "#"; // TODO: Replace with Dubsado booking URL

export default function StoryHealthCheckPage() {
    // ── Multi-step Story Loom form ──────────────────────────────────────────
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', url: '', miss: '', stage: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loomSubmitted, setLoomSubmitted] = useState(false);
    const [pastLoomForm, setPastLoomForm] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);

    // ── Parallax for methodology interstitial ────────────────────────────────
    const methodologyRef = useRef(null);
    const { scrollYProgress: methodologyScroll } = useScroll({
        target: methodologyRef,
        offset: ['start end', 'end start'],
    });
    const methodologyY = useTransform(methodologyScroll, [0, 1], ['0%', '12%']);

    useEffect(() => {
        const loomSection = document.getElementById('free-loom');
        if (!loomSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
                    setPastLoomForm(true);
                } else if (entry.isIntersecting) {
                    setPastLoomForm(false);
                }
            },
            { threshold: 0 }
        );

        observer.observe(loomSection);
        return () => observer.disconnect();
    }, []);

    const steps = [
        { field: 'name',    label: "What's your name?",                                   type: 'text',     placeholder: 'First name is fine.',                                         required: true  },
        { field: 'email',   label: "Where should we send the Loom?",                       type: 'email',    placeholder: 'you@company.com',                                             required: true  },
        { field: 'company', label: "Company and what you do — one sentence.",               type: 'text',     placeholder: '"Acme — we help SaaS companies reduce churn."',               required: false },
        { field: 'url',     label: "Drop the link you want reviewed.",                      type: 'url',      placeholder: 'www.your-story.com',                                          required: true  },
        { field: 'miss',    label: "What do you wish prospects understood faster?",         type: 'textarea', placeholder: "Don't overthink it — that gap is usually the leak.",          required: false },
        { field: 'stage',   label: "What stage are you at?",                               type: 'select',   options: ['Pre-seed', 'Seed', 'Series A', 'Bootstrapped', 'Other'],        required: false },
    ];

    const currentStep  = steps[step];
    const currentField = currentStep.field as keyof typeof formData;

    const handleNext = () => {
        if (step < steps.length - 1) setStep(s => s + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(s => s - 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentStep.type !== 'textarea' && currentStep.type !== 'select') {
            e.preventDefault();
            if (!currentStep.required || formData[currentField]) handleNext();
        }
    };

    const handleSubmit = async (stageValue?: string) => {
        setIsSubmitting(true);
        const data = { ...formData, ...(stageValue ? { stage: stageValue } : {}) };
        try {
            const res = await fetch('/api/loom-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) setLoomSubmitted(true);
        } catch (err) {
            console.error('loom-submit:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col overflow-x-hidden bg-paper text-ink font-sans selection:bg-rust/20 selection:text-ink">
            <main className="pt-32 pb-32 isolate">

                {/* ═══════════════════════════════════════════════════════
                    SECTION 1 — HERO
                    Hook. Problem. Dark cinematic treatment — no form.
                    Photography: writers-room.jpg as parallax background
                    with vignette overlays. Navbar starts transparent/white.
                    ═══════════════════════════════════════════════════════ */}
                <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 mb-32 bg-ink overflow-hidden">

                    {/* Parallax background with cinematic vignette */}
                    <ParallaxHeroBackground
                        src="/writers-room.jpg"
                        alt="Strategy session — makers at work, whiteboards covered in red marks"
                    />

                    {/* Content — centered over the parallax background */}
                    <div className="max-w-6xl mx-auto z-10 w-full flex flex-col items-center md:items-end relative">
                        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-rust/30 pointer-events-none" />

                        <div className="text-right max-w-4xl md:max-w-[58%]">
                            <div className="inline-block mb-10 px-6 py-2 border border-rust/50 text-rust text-[0.65rem] font-bold uppercase tracking-[0.25em] bg-ink/50 backdrop-blur-sm reveal reveal-delay-1 shadow-[4px_4px_0px_rgba(200,60,47,0.15)]">
                                Story Audit
                            </div>

                            <h1 className="font-display text-6xl md:text-[8.5rem] leading-[0.85] mb-12 text-paper tracking-tighter">
                                <TypewriterHeadline
                                    text="Your Story is"
                                    initialDelay={400}
                                    wordDelay={100}
                                />
                                <br />
                                <span className="italic text-rust">
                                    <TypewriterHeadline
                                        text="Bleeding Revenue."
                                        initialDelay={750}
                                        wordDelay={100}
                                        showCursor={true}
                                    />
                                </span>
                            </h1>

                            <div className="w-full flex justify-end mb-16 reveal reveal-delay-3">
                                <p className="font-sans text-lg md:text-xl max-w-lg text-paper/70 leading-[1.8] font-light border-r-2 border-rust/50 pr-8 text-right backdrop-blur-sm p-4">
                                    Founders don&apos;t fail because their product is broken. They fail because their narrative is unrecognizable.<br />
                                    <span className="text-paper font-bold mt-4 block uppercase tracking-widest text-[0.65rem]">We apply engineering rigor to your brand story.</span>
                                </p>
                            </div>

                            {/* Single rust CTA + quiet text-link */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center reveal reveal-delay-4">
                                <a href="#story-loom" className="group relative flex">
                                    <div className="absolute inset-0 bg-black/50 transform translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                    <div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                        <PlayCircle className="w-4 h-4" />
                                        Get a Free Story Analysis
                                    </div>
                                </a>
                                <a href={DUBSADO_URL} className="font-sans text-[0.6rem] uppercase tracking-[0.15em] text-paper/40 hover:text-rust transition-colors">
                                    or skip to the paid audit →
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 2 — THE CRISIS MIRROR
                    Curse of Knowledge. Earns both products.
                    ═══════════════════════════════════════════════════════ */}
                <section className="max-w-6xl mx-auto px-6 mb-0 relative">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start relative z-10">
                        <motion.div
                            className="md:col-span-5 sticky top-32"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-rust font-bold font-sans text-sm">01</span>
                                <div className="flex-1 h-[1px] bg-ink/20" />
                            </div>
                            <h2 className="font-display text-5xl md:text-6xl italic leading-[0.9] mb-6 tracking-tight text-ink">The Crisis Mirror</h2>
                            <p className="text-[0.65rem] font-sans uppercase tracking-[0.2em] text-rust font-bold">Diagnostic Phase</p>
                        </motion.div>
                        <motion.div
                            className="md:col-span-7 space-y-12"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                        >
                            <p className="text-2xl md:text-3xl font-display font-light leading-[1.4] text-ink">
                                You are the protagonist. But the market sees <span className="bg-ink text-paper px-2 py-1 italic">a confused extra.</span>
                            </p>
                            <p className="text-ink/80 leading-[1.8] font-light text-lg border-l border-ink/20 pl-6">
                                Most founders suffer from the &ldquo;Curse of Knowledge.&rdquo; You know your product so well that you&apos;ve forgotten what it&apos;s like not to know. You speak in features, specs, and internal shorthand. The market hears noise.
                            </p>

                            <div className="p-10 bg-white border border-ink/10 relative overflow-hidden shadow-sm mt-16">

                                <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-8 text-rust flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                                    Symptoms of Narrative Debt
                                </h3>
                                <ul className="space-y-6 font-display text-xl text-ink/90 italic">
                                    <li className="flex items-start gap-4">
                                        <span className="text-ink/30 font-sans text-sm mt-1 not-italic">—</span>
                                        <span className="leading-relaxed">Investors nod politely but don&apos;t follow up.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-ink/30 font-sans text-sm mt-1 not-italic">—</span>
                                        <span className="leading-relaxed"><span className="line-through text-ink/40">Sales cycles</span> are dragging because prospects &ldquo;need to think.&rdquo;</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-ink/30 font-sans text-sm mt-1 not-italic">—</span>
                                        <span className="leading-relaxed">Marketing burns cash with zero attribution.</span>
                                    </li>
                                </ul>
                                <p className="mt-10 pt-8 border-t border-ink/10 text-ink/70 leading-[1.8] font-sans font-light text-base">
                                    Every day your story leaks, you pay for it&mdash;in abandoned carts, in meetings that don&apos;t convert, in funding rounds that stall before the second slide. The curse of knowledge isn&apos;t a metaphor. It&apos;s the invisible ceiling on your revenue, and it compounds.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 3 — METHODOLOGY INTERSTITIAL
                    Storybook background, parallax. Introduces what PI does.
                    ═══════════════════════════════════════════════════════ */}
                <div
                    ref={methodologyRef}
                    className="relative w-full min-h-[65vh] md:min-h-[75vh] overflow-hidden my-20 flex items-center justify-center"
                >
                    {/* Parallax background image */}
                    <motion.div
                        className="absolute inset-0 h-[115%] -top-[8%] z-0"
                        style={{ y: methodologyY }}
                    >
                        <Image
                            src="/images/pages/storybook_bg.jpg"
                            alt="Illustrated storybook pages — the craft of narrative strategy"
                            fill
                            sizes="100vw"
                            className="object-cover"
                            style={{ objectPosition: 'center 40%' }}
                        />
                    </motion.div>

                    {/* Dark overlay for legibility */}
                    <div className="absolute inset-0 bg-ink/60 z-[1]" />

                    {/* Gradual edge gradients — smooth bleed into surrounding sections */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-paper via-paper/60 to-transparent pointer-events-none z-[2]" />
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-paper via-paper/60 to-transparent pointer-events-none z-[2]" />
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_20px_rgba(0,0,0,0.3)] pointer-events-none z-[2]" />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 text-center py-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <p className="font-sans text-paper/50 text-[0.65rem] uppercase tracking-[0.25em] mb-6">
                            Our approach
                        </p>
                        <h2 className="font-display text-paper text-3xl md:text-5xl italic leading-[1.25] mb-8">
                            Every founder has a story<br className="hidden md:inline" /> worth telling.
                        </h2>
                        <p className="font-sans text-paper/80 text-base md:text-lg leading-[1.85] mb-4">
                            You built something real. But somewhere between your vision and the way people experience it, the signal gets lost. We help founders articulate what makes them matter&mdash;so the right audience doesn&apos;t just understand your product, they <em className="text-rust/90 not-italic">feel</em> it.
                        </p>
                        <p className="font-sans text-paper/60 text-sm md:text-base leading-[1.85]">
                            Protagonist Ink is a story strategy studio. We find the narrative thread that connects what you&apos;ve built to the people it&apos;s built for&mdash;then we make it impossible to ignore.
                        </p>
                    </motion.div>
                </div>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 4 — THE FREE STORY LOOM
                    Its own full spotlight. Light background.
                    Form with useState submission state.
                    ═══════════════════════════════════════════════════════ */}
                <section id="free-loom" className="py-32 bg-paper border-y border-ink/10 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--color-ink) 1px, transparent 1px)', backgroundSize: '1.5rem 1.5rem' }} />

                    <div id="story-loom" className="max-w-6xl mx-auto px-6 relative z-10">
                        <AnimatePresence mode="wait">
                            {showWelcome ? (
                                /* ── Welcome Card ── */
                                <motion.div
                                    key="welcome"
                                    initial={{ opacity: 0, scale: 0.97 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.97 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    className="max-w-2xl mx-auto text-center"
                                >
                                    <div className="bg-white border-2 border-ink shadow-[16px_16px_0px_rgba(10,10,10,0.05)] p-12 md:p-16 relative overflow-hidden">
                                        {/* Corner accents */}
                                        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-rust/40 -translate-y-px translate-x-px pointer-events-none" />
                                        <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-rust/40 translate-y-px -translate-x-px pointer-events-none" />

                                        {/* Badge */}
                                        <div className="inline-block mb-10 px-4 py-1 border border-rust text-rust text-[0.6rem] font-sans font-bold uppercase tracking-widest bg-white">
                                            Option 01 // $0
                                        </div>

                                        {/* Heading */}
                                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-ink mb-8">
                                            The 5-Minute<br />
                                            <span className="italic text-rust">Story Loom.</span>
                                        </h2>

                                        {/* Description */}
                                        <p className="font-sans text-base md:text-lg text-ink/60 leading-[1.85] max-w-lg mx-auto mb-4">
                                            Answer a few questions about your brand story. Within 48 hours, you&apos;ll receive a personalized Loom video diagnosing the narrative leaks costing you conversions.
                                        </p>
                                        <p className="font-sans text-sm text-ink/40 leading-relaxed max-w-md mx-auto mb-12">
                                            No pitch. No follow-up unless you want one. Just a brutal, honest teardown of your story architecture.
                                        </p>

                                        {/* CTA */}
                                        <button
                                            type="button"
                                            onClick={() => setShowWelcome(false)}
                                            className="bg-rust text-paper font-sans text-[0.7rem] uppercase tracking-widest px-10 py-4 hover:bg-rust/85 transition-all duration-300 inline-flex items-center gap-3 font-bold group"
                                        >
                                            Begin Your Audit
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    <p className="mt-8 font-sans text-[0.6rem] text-ink/30 uppercase tracking-widest">
                                        Already know you need the full audit?{" "}
                                        <a href={DUBSADO_URL} className="underline hover:text-rust transition-colors">Book direct — $1,500 →</a>
                                    </p>
                                </motion.div>
                            ) : (
                                /* ── Two-column Form Layout ── */
                                <motion.div
                                    key="form"
                                    initial={{ opacity: 0, scale: 1.02 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    onAnimationComplete={() => {
                                        const firstInput = document.querySelector<HTMLElement>('#free-loom input, #free-loom textarea, #free-loom select');
                                        firstInput?.focus();
                                    }}
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

                                        {/* Left — Value + what you get */}
                                        <div>
                                            <div className="flex items-center gap-4 mb-8">
                                                <span className="text-rust font-bold font-sans text-sm">02</span>
                                                <div className="flex-1 h-[1px] bg-ink/20" />
                                                <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-ink/40">Free</span>
                                            </div>
                                            <div className="inline-block mb-8 px-4 py-1 border border-rust text-rust text-[0.6rem] font-sans font-bold uppercase tracking-widest bg-white">
                                                Option 01 // $0
                                            </div>
                                            <h2 className="font-display text-6xl md:text-7xl leading-[0.9] tracking-tighter text-ink mb-8">
                                                The Story<br /><span className="italic text-rust">Loom.</span>
                                            </h2>
                                            <p className="font-sans text-lg text-ink/70 leading-[1.8] mb-12 max-w-md">
                                                Submit your deck or site. We record a brutal, 5-minute video teardown of your narrative architecture — exactly where the revenue is leaking. No pitch, just architecture.
                                            </p>

                                            <div className="space-y-4 border-l-2 border-ink/10 pl-8">
                                                {[
                                                    "Asynchronous Loom video. In your inbox in 2–3 days.",
                                                    "High-level structural review of your biggest leak.",
                                                    "Actionable quick-wins you can act on immediately.",
                                                    "No pitch. No follow-up sales call unless you want one.",
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <CheckCircle2 className="w-4 h-4 text-rust mt-0.5 flex-shrink-0" />
                                                        <span className="font-sans text-sm text-ink/70">{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right — Multi-step Form */}
                                        <div>
                                            {loomSubmitted ? (
                                                /* ── Success state ── */
                                                <div className="bg-white border-2 border-rust p-12 text-center shadow-[8px_8px_0px_rgba(200,60,47,0.12)]">
                                                    <div className="w-12 h-12 rounded-full bg-rust/10 flex items-center justify-center mx-auto mb-6">
                                                        <CheckCircle2 className="w-6 h-6 text-rust" />
                                                    </div>
                                                    <h3 className="font-display text-3xl mb-4 text-ink">Request Received.</h3>
                                                    <p className="font-sans text-sm text-ink/60 leading-relaxed max-w-sm mx-auto">
                                                        We&apos;ll record your Story Loom and send it within 2–3 business days. Watch your inbox.
                                                    </p>
                                                    <p className="mt-8 font-sans text-[0.6rem] uppercase tracking-widest text-ink/30">
                                                        Want the full surgical intervention?{" "}
                                                        <a href={DUBSADO_URL} className="underline hover:text-rust transition-colors">Book the Story Audit →</a>
                                                    </p>
                                                </div>
                                            ) : (
                                                /* ── Multi-step form card ── */
                                                <div className="bg-white border-2 border-ink shadow-[16px_16px_0px_rgba(10,10,10,0.05)] relative overflow-hidden">

                                                    {/* Corner accent */}
                                                    <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-rust/40 -translate-y-px translate-x-px pointer-events-none z-10" />

                                                    {/* Progress bar */}
                                                    <div className="h-[2px] bg-ink/8">
                                                        <div
                                                            className="h-full bg-rust transition-all duration-500 ease-out"
                                                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                                                        />
                                                    </div>

                                                    <div className="p-10">
                                                        {/* Step counter + pulse */}
                                                        <div className="flex items-center justify-between mb-10">
                                                            <span className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-rust">
                                                                {String(step + 1).padStart(2, '0')}{' '}
                                                                <span className="text-ink/20 mx-1">/</span>{' '}
                                                                {String(steps.length).padStart(2, '0')}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-rust animate-pulse" />
                                                                <span className="font-sans text-[0.55rem] uppercase tracking-widest text-ink/30">Free Diagnostic</span>
                                                            </div>
                                                        </div>

                                                        {/* Step content — key forces remount → triggers stepIn animation */}
                                                        <div key={step} style={{ animation: 'stepIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both' }}>

                                                            {/* Question */}
                                                            <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-8">
                                                                {currentStep.label}
                                                            </h3>

                                                            {/* ── Textarea ── */}
                                                            {currentStep.type === 'textarea' && (
                                                                <textarea
                                                                    rows={4}
                                                                    value={formData[currentField]}
                                                                    onChange={e => setFormData(f => ({ ...f, [currentField]: e.target.value }))}
                                                                    placeholder={currentStep.placeholder || ''}
                                                                    autoFocus
                                                                    className="w-full bg-paper border-0 border-b-2 border-ink/20 font-sans text-base px-0 pt-8 pb-3 focus:outline-none focus:border-rust placeholder:text-ink/30 text-ink transition-colors resize-none"
                                                                />
                                                            )}

                                                            {/* ── Stage button grid ── */}
                                                            {currentStep.type === 'select' && (
                                                                <>
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        {currentStep.options?.map(option => (
                                                                            <button
                                                                                key={option}
                                                                                type="button"
                                                                                onClick={() => handleSubmit(option)}
                                                                                disabled={isSubmitting}
                                                                                className="px-4 py-4 border border-ink/20 font-sans text-sm text-ink hover:border-rust hover:text-rust hover:bg-rust/5 transition-all duration-200 text-left disabled:opacity-50"
                                                                            >
                                                                                {option}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                    <div className="flex items-center justify-between mt-6">
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleBack}
                                                                            className="font-sans text-[0.65rem] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
                                                                        >
                                                                            ← Back
                                                                        </button>
                                                                        {isSubmitting && (
                                                                            <span className="font-sans text-[0.6rem] uppercase tracking-widest text-ink/40 animate-pulse">
                                                                                Submitting…
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* ── Text / email / url inputs ── */}
                                                            {currentStep.type !== 'textarea' && currentStep.type !== 'select' && (
                                                                <input
                                                                    type={currentStep.type}
                                                                    value={formData[currentField]}
                                                                    onChange={e => setFormData(f => ({ ...f, [currentField]: e.target.value }))}
                                                                    onKeyDown={handleKeyDown}
                                                                    placeholder={currentStep.placeholder || ''}
                                                                    autoFocus
                                                                    className="w-full bg-transparent border-0 border-b-2 border-ink/20 font-sans text-xl px-0 py-3 focus:outline-none focus:border-rust placeholder:text-ink/30 text-ink transition-colors"
                                                                />
                                                            )}

                                                            {/* ── Navigation (all types except select) ── */}
                                                            {currentStep.type !== 'select' && (
                                                                <div className="flex items-center justify-between mt-10">
                                                                    {/* Back */}
                                                                    {step > 0 ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleBack}
                                                                            className="font-sans text-[0.65rem] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
                                                                        >
                                                                            ← Back
                                                                        </button>
                                                                    ) : <span />}

                                                                    <div className="flex items-center gap-4">
                                                                        {/* Enter hint — single-line only */}
                                                                        {currentStep.type !== 'textarea' && (
                                                                            <span className="font-sans text-[0.55rem] text-ink/25 uppercase tracking-wider hidden sm:block">
                                                                                Press Enter ↵
                                                                            </span>
                                                                        )}
                                                                        {/* Next button */}
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleNext}
                                                                            disabled={currentStep.required && !formData[currentField]}
                                                                            className="bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-widest px-6 py-3 hover:bg-rust/85 transition-all duration-300 flex items-center gap-2 font-bold group disabled:opacity-30 disabled:cursor-not-allowed"
                                                                        >
                                                                            Next
                                                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <p className="mt-6 font-sans text-[0.6rem] text-ink/30 uppercase tracking-widest text-center">
                                                Already know you need the full audit?{" "}
                                                <a href={DUBSADO_URL} className="underline hover:text-rust transition-colors">Book direct — $1,500 →</a>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 5 — SOCIAL PROOF / WHY TRUST US
                    Testimonials + 40+ audits stat.
                    Photography: writers-room.jpg ghosts left edge.
                    Moved up: now immediately follows Free Loom form.
                    ═══════════════════════════════════════════════════════ */}
                <section className="bg-ink text-paper py-40 texture-grain relative overflow-hidden" id="proof">

                    <div className="absolute left-0 top-0 bottom-0 w-[22vw] max-w-[280px] z-0 pointer-events-none">
                        <Image
                            src="/writers-room.jpg"
                            alt=""
                            fill
                            className="object-cover grayscale contrast-75 opacity-20"
                            style={{ objectPosition: '70% top' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink pointer-events-none" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12 reveal">
                            <div>
                                <h2 className="font-display text-6xl md:text-7xl tracking-tighter mb-4 text-white">The Results.</h2>
                                <p className="text-[0.65rem] font-sans text-rust uppercase tracking-[0.2em] font-bold">Founders who stopped the bleeding</p>
                            </div>
                            <div className="hidden md:block font-sans text-[0.65rem] text-white/30 uppercase tracking-widest text-right">
                                <p>40+ narrative audits completed</p>
                                <p className="mt-1">Across SaaS, deep tech, and creative industries</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {[
                                {
                                    quote: "We'd been pitching for six months with polite rejections. After the audit, we closed our seed round in three weeks. The framing shift was that dramatic.",
                                    name: "Marcus T.",
                                    role: "Founder, B2B SaaS",
                                    result: "Seed round closed"
                                },
                                {
                                    quote: "I thought our problem was the product. It wasn't. It was that no one understood what we actually did in under 30 seconds. The redline was brutal and exactly what we needed.",
                                    name: "Priya K.",
                                    role: "Co-Founder, Climate Tech",
                                    result: "Website conversion +3×"
                                },
                                {
                                    quote: "The 'Soul Extraction' document became our internal north star. Every new hire reads it. It's the clearest articulation of what we're building and why it matters.",
                                    name: "James O.",
                                    role: "CEO, Series A",
                                    result: "Team alignment & hiring clarity"
                                }
                            ].map((item, i) => (
                                <div key={i} className={`space-y-8 reveal reveal-delay-${i + 1} border-l border-white/10 pl-8 relative`}>
                                    <div className="absolute top-0 -left-1 w-2 h-2 rounded-full bg-rust" />
                                    <div className="inline-block px-3 py-1 border border-rust/40 text-rust text-[0.6rem] font-bold uppercase tracking-widest">
                                        {item.result}
                                    </div>
                                    <p className="font-display text-xl text-paper/80 leading-[1.6] italic">
                                        &ldquo;{item.quote}&rdquo;
                                    </p>
                                    <div className="border-t border-white/10 pt-6">
                                        <p className="font-sans text-sm text-white font-bold">{item.name}</p>
                                        <p className="font-sans text-[0.75rem] text-white/40 uppercase tracking-widest mt-1">{item.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Narrative Pivot — Free → Paid Bridge */}
                <section className="py-24 md:py-32 bg-paper texture-paper relative">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <p className="font-display text-3xl md:text-4xl lg:text-5xl text-ink italic leading-tight reveal">
                            A 5-minute teardown stops the bleeding.
                        </p>
                        <p className="font-display text-3xl md:text-4xl lg:text-5xl text-ink/40 italic leading-tight mt-4 reveal reveal-delay-1">
                            A 5-day audit cures the disease.
                        </p>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 6 — THE STORY AUDIT (PAID)
                    Dark section. Its own full spotlight.
                    Blueprint (4 layers) integrated in right column.
                    girlfounder_conference.jpg breaks from right edge.
                    Risk reversal copy included. Scroll-triggered reveal.
                    ═══════════════════════════════════════════════════════ */}
                <motion.section
                    id="story-audit"
                    className="bg-ink text-paper py-32 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    {/* Blueprint grid overlay */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)', backgroundSize: '3rem 3rem' }} />

                    {/* HUMAN PHOTOGRAPHY — girlfounder_conference breaks right edge */}
                    <div className="absolute right-0 top-0 bottom-0 w-[32vw] max-w-[420px] z-[1] pointer-events-none">
                        <Image
                            src="/images/pages/girlfounder_conference.jpg"
                            alt="Founder reviewing narrative strategy"
                            fill
                            sizes="32vw"
                            className="object-cover grayscale contrast-110"
                            style={{ objectPosition: 'center top' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 to-ink/80 pointer-events-none" />
                    </div>

                    <div className="max-w-6xl mx-auto px-6 relative z-10">

                        {/* Header */}
                        <div className="max-w-full md:max-w-[62%] mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-rust font-bold font-sans text-sm">03</span>
                                <div className="flex-1 h-[1px] bg-white/20 max-w-20" />
                                <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/30">$1,500</span>
                            </div>
                            <p className="font-display text-xl md:text-2xl text-paper/50 italic mb-6">
                                Loved the teardown? There&apos;s more where that came from.
                            </p>
                            <h2 className="font-display text-6xl md:text-7xl leading-[0.9] tracking-tighter text-paper mb-8">
                                The Story<br /><span className="italic text-white/40">Audit.</span>
                            </h2>
                            <p className="font-sans text-lg text-paper/70 leading-[1.8] max-w-xl">
                                The free teardown shows you where the cracks are. This is the full treatment — a one-time surgical intervention where we examine your story at every layer, from your core thesis to your live website, and hand you a single, indelible message that works in your deck, your homepage, and every cold email you send.
                            </p>
                            <p className="mt-6 font-sans text-sm text-rust/80 italic">
                                If we can&apos;t identify a fixable narrative leak in your first call, you pay nothing.
                            </p>
                        </div>

                        {/* Two columns: Deliverables + Blueprint */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">

                            {/* Left: Deliverables + CTA */}
                            <div>
                                <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-8 text-rust flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                                    Engineer-Led Surgery
                                </h3>
                                <div className="space-y-6 border-l-2 border-rust/30 pl-8 mb-12">
                                    {[
                                        { item: "60-Min Live Diagnostic Call", sub: "We meet. We dissect. We rebuild your core thesis." },
                                        { item: "Redline Markup", sub: "A brutally honest annotation of your deck or site copy." },
                                        { item: "The Soul Extraction Plan", sub: "PDF. Your single indelible message + how to deploy it everywhere." },
                                        { item: "Brand Blueprint", sub: "The four-layer narrative architecture, documented." },
                                    ].map((d, i) => (
                                        <div key={i} className="group">
                                            <p className="font-sans text-sm font-bold text-paper group-hover:text-rust transition-colors">{d.item}</p>
                                            <p className="font-sans text-xs text-paper/40 mt-1">{d.sub}</p>
                                        </div>
                                    ))}
                                </div>

                                <a href={DUBSADO_URL} className="group relative inline-flex">
                                    <div className="absolute inset-0 bg-rust transform translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                    <div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                        Secure Your Spot — $1,500
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>
                            </div>

                            {/* Right: Blueprint — 4 layers */}
                            <div>
                                <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-8 text-white/40 flex items-center gap-3">
                                    <span className="w-8 h-[1px] bg-white/20" />
                                    The Four Layers We Examine
                                </h3>
                                <div className="space-y-px border border-white/10">
                                    {[
                                        { num: "01", title: "The Spine", desc: "Your core thesis — the single sentence that should anchor every conversation." },
                                        { num: "02", title: "The Script", desc: "Messaging architecture: headlines, elevator pitch, email subject lines." },
                                        { num: "03", title: "The Stage", desc: "Deck, website, anywhere a prospect first forms an impression." },
                                        { num: "04", title: "The Show", desc: "Distribution: what gets forwarded, remembered, and acted on." },
                                    ].map((layer) => (
                                        <div key={layer.num} className="group flex gap-6 p-6 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                            <span className="font-sans text-[0.6rem] text-paper/70 font-bold tracking-widest mt-1 flex-shrink-0">{layer.num}</span>
                                            <div>
                                                <h4 className="font-display text-xl text-paper mb-1 group-hover:text-rust transition-colors">{layer.title}</h4>
                                                <p className="font-sans text-xs text-paper/40 leading-relaxed">{layer.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-4 font-sans text-[0.6rem] text-white/20 uppercase tracking-widest">Most founders have a leak in at least two of these layers.</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 7 — THE CHOICE
                    Simplified 2-column comparison. Both products, side by side.
                    ═══════════════════════════════════════════════════════ */}
                <section className="py-32 bg-paper border-y border-ink/10">
                    <div className="max-w-5xl mx-auto px-6">
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <h2 className="font-display text-5xl md:text-6xl tracking-tighter text-ink mb-4">The Choice.</h2>
                            <p className="font-sans text-ink/50 text-sm max-w-md mx-auto">Both paths lead to clarity. Pick the depth you need.</p>
                        </motion.div>

                        <div className="flex flex-col md:flex-row gap-0">
                            {/* Free Loom Column */}
                            <motion.div
                                className="flex-1 py-12 md:pr-16"
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink/40 mb-4">Free</p>
                                <h3 className="font-display text-4xl text-ink mb-3 italic">Story Loom</h3>
                                <p className="font-display text-lg text-ink/60 italic mb-8">A 5-minute video teardown of your narrative blind spots.</p>
                                <ul className="space-y-4 font-sans text-[0.8rem] text-ink/70 mb-10">
                                    <li className="flex items-start gap-3">
                                        <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                                        <span>First-impression audit of your homepage or pitch deck</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                                        <span>Narrative gap identification</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                                        <span>Delivered via personalized Loom within 48 hours</span>
                                    </li>
                                </ul>
                                <a href="#free-loom" className="font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold text-rust hover:text-ink transition-colors flex items-center gap-2">
                                    Send Your URL
                                    <ArrowRight className="w-3 h-3" />
                                </a>
                            </motion.div>

                            {/* Vertical Rule */}
                            <div className="hidden md:block w-px bg-ink/15 self-stretch" />
                            <div className="md:hidden h-px bg-ink/15 w-full" />

                            {/* Paid Audit Column */}
                            <motion.div
                                className="flex-1 py-12 md:pl-16"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
                            >
                                <p className="font-sans text-[0.6rem] font-bold uppercase tracking-[0.2em] text-ink/40 mb-4">$1,500</p>
                                <h3 className="font-display text-4xl text-ink mb-3 italic">Story Audit</h3>
                                <p className="font-display text-lg text-ink/60 italic mb-8">A 5-day deep dive that rebuilds your narrative from the spine out.</p>
                                <ul className="space-y-4 font-sans text-[0.8rem] text-ink/70 mb-10">
                                    <li className="flex items-start gap-3">
                                        <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                                        <span>The Spine — your foundational narrative architecture</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                                        <span>The Script — rewritten homepage and pitch deck copy</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-rust mt-0.5"><CheckCircle2 className="w-3.5 h-3.5" /></span>
                                        <span>The Stage — content strategy and channel playbook</span>
                                    </li>
                                </ul>
                                <a href={DUBSADO_URL} className="group relative inline-flex">
                                    <div className="absolute inset-0 bg-rust transform translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                    <div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                        Book the Story Audit
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Full-width testimonial pull quote */}
                    <div className="max-w-4xl mx-auto px-6 pt-24 pb-8 reveal reveal-delay-2">
                        <div className="border-t border-ink/10 pt-20 text-center">
                            <p className="font-display text-3xl md:text-4xl lg:text-[2.75rem] italic text-ink leading-[1.35] tracking-tight">
                                &ldquo;We&apos;d been pitching for six months with polite rejections. After the audit, we closed our seed round in three weeks. The framing shift was that dramatic.&rdquo;
                            </p>
                            <div className="mt-10">
                                <p className="font-sans text-sm font-bold text-ink tracking-wide">Marcus T.</p>
                                <p className="font-sans text-[0.7rem] text-ink/40 uppercase tracking-[0.2em] mt-1">Founder, B2B SaaS</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 8 — CLOSING CTA
                    Both products. Photography ghost right edge.
                    Swapped with FAQ — CTA now precedes FAQ.
                    ═══════════════════════════════════════════════════════ */}
                <section className="bg-paper border-t-2 border-ink py-32 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.025]" style={{
                        backgroundImage: 'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem'
                    }} />

                    <div className="absolute right-0 top-0 bottom-0 w-[36vw] max-w-[480px] z-0 pointer-events-none">
                        <Image
                            src="/girlontablet.jpg"
                            alt=""
                            fill
                            className="object-cover grayscale contrast-110 opacity-30"
                            style={{ objectPosition: 'center top' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-paper to-paper/30 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-paper/90 to-transparent pointer-events-none" />
                    </div>

                    <motion.div
                        className="max-w-5xl mx-auto px-6 relative z-10 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="inline-block mb-10 px-4 py-1 border border-rust text-rust text-[0.6rem] font-bold uppercase tracking-widest">
                            The Decision Point
                        </div>
                        <h2 className="font-display text-6xl md:text-8xl tracking-tighter mb-8 text-ink leading-[0.9]">
                            Stop guessing.<br /><span className="italic text-rust">Start converting.</span>
                        </h2>
                        <p className="font-sans text-ink/60 text-lg max-w-xl mx-auto leading-relaxed mb-16">
                            The free Loom shows you the leak. The Story Audit fixes it. Either way, you&apos;ll know more about your narrative in the next 72 hours than you have in years.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href={DUBSADO_URL} className="group relative flex">
                                <div className="absolute inset-0 bg-rust transform translate-x-2 translate-y-2 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                <div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-10 py-5 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    Book the Story Audit — $1,500
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>

                            <a href="#free-loom" className="font-sans text-[0.6rem] tracking-[0.15em] text-ink/30 hover:text-rust transition-colors flex items-center gap-1.5 mt-6">
                                Not ready? Send your URL for the free teardown first
                                <ArrowRight className="w-3 h-3" />
                            </a>
                        </div>

                        <p className="mt-10 font-sans text-[0.6rem] text-ink/30 uppercase tracking-widest">
                            Questions? <a href="mailto:hello@protagonistink.com" className="underline hover:text-rust transition-colors">hello@protagonistink.com</a>
                        </p>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 9 — FAQ
                    "Who performs the audit?" added as first question.
                    Swapped with CTA — FAQ is now final content section.
                    ═══════════════════════════════════════════════════════ */}
                <section className="py-40 bg-paper border-t border-ink/5 relative overflow-hidden" id="faq">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="mb-24 reveal text-center lg:text-left">
                            <div className="inline-block px-4 py-1 border border-rust text-rust text-[0.6rem] font-bold uppercase tracking-widest mb-6">Inquiry Phase</div>
                            <h2 className="font-display text-5xl md:text-7xl italic leading-none text-ink tracking-tight mb-4">Got Questions?</h2>
                            <p className="font-sans text-ink/50 text-sm tracking-widest uppercase">The structural fine print</p>
                        </div>

                        <div className="space-y-12 mb-32 reveal reveal-delay-1">
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
                                {[
                                    { q: "Who performs the audit?", a: "Our senior strategists — not contractors, not AI. The same team whose work you can see on our work page. You'll get a real human on your first call, and a real human's markup on your copy." },
                                    { q: "Why is this $1,500?", a: "This isn't copywriting, it's architecture. You're investing in clarity that changes how you pitch, present, and sell. One story that works can move a room or close a round. That's measurable ROI." },
                                    { q: "What exactly will I walk away with?", a: "Three deliverables: A Story Audit, a Brand Blueprint, and a practical Narrative Roadmap (PDF) — all pulling from the same foundation so your team, site, and fundraising speak with one voice." },
                                    { q: "How long does it take?", a: "One business week. We'll send it 3–5 days from when we begin, keeping you out of 'brand work limbo.'" },
                                    { q: "Will this help me raise?", a: "Without question. Investors fund clarity. If your pitch stalls at 'what do you actually do?', this process fixes that." },
                                    { q: "What's the difference between the free Loom and the paid Audit?", a: "The Loom is a high-level read on your biggest leak — directional, fast, and free. The Audit is a surgical intervention across all four layers of your narrative, with deliverables your whole team can use." },
                                ].map((faq, i) => (
                                    <div key={i} className="group">
                                        <h4 className="font-display text-xl mb-4 group-hover:text-rust transition-colors flex items-start gap-3">
                                            <span className="text-rust font-sans text-xs mt-1">Q.</span>
                                            {faq.q}
                                        </h4>
                                        <p className="text-ink/60 font-sans text-sm leading-relaxed pl-6 border-l border-ink/5">
                                            {faq.a}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* ═══════════════════════════════════════════════════════
                STICKY BOTTOM BAR
                "Spots Available This Week" — not form language.
                ═══════════════════════════════════════════════════════ */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-white text-ink border-t-2 border-rust shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
                <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
                    <div className="hidden md:flex flex-col">
                        <span className="text-[0.6rem] font-sans text-rust uppercase tracking-[0.2em] mb-1 font-bold">Spots Available This Week</span>
                        <span className="font-display font-light text-2xl tracking-tighter text-ink italic">What is your confusion costing?</span>
                    </div>
                    <div className="md:hidden flex flex-col justify-center">
                        <span className="text-[0.6rem] font-sans text-rust uppercase tracking-[0.2em] mb-1 font-bold">Spots Available</span>
                        <span className="font-display font-light text-xl tracking-tighter text-ink italic">Stop the bleeding.</span>
                    </div>
                    <a
                        href={pastLoomForm ? DUBSADO_URL : '#free-loom'}
                        className="bg-rust hover:bg-rust/85 text-paper px-6 py-4 md:px-10 md:py-4 font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold flex items-center gap-4 transition-all hover:pr-8 shadow-sm group"
                    >
                        {pastLoomForm ? 'Book the Story Audit' : 'Send Your URL'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </a>
                </div>
            </div>
        </div>
    );
}
