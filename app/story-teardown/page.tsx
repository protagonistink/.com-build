"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from 'next/image';
import Script from 'next/script';
import { motion, useScroll, useTransform, AnimatePresence, MotionConfig } from 'motion/react';
import TypewriterHeadline from '@/components/TypewriterHeadline';
import ParallaxHeroBackground from '@/components/ParallaxHeroBackground';
import {
    EMPTY_STORY_RIP_FORM,
    STORY_RIP_STEPS,
    TURNSTILE_SITE_KEY,
    getStoryRipFieldError,
    isValidEmail,
    isValidWebUrl,
    normalizeWebUrl,
} from '@/components/story-teardown/storyRipForm';

const BOOKING_ACTION = process.env.NEXT_PUBLIC_DUBSADO_URL ?? "https://elixirs.protagonist.ink/public/form/view/69a8e2029373e6642f6a2642";

// ── Shared animation presets ─────────────────────────────────────────────────
const FADE_UP = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 } } as const;
const SLIDE_LEFT = { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 } } as const;
const SLIDE_RIGHT = { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 } } as const;
const MOTION_TRANSITION = { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } as const;
const MOTION_VIEWPORT = { once: true, amount: 0.2 } as const;

declare global {
    interface Window {
        onTurnstileSuccess?: (token: string) => void;
        onTurnstileExpired?: () => void;
        onTurnstileError?: () => void;
    }
}

export default function StoryHealthCheckPage() {
    // ── Multi-step Story Rip form ───────────────────────────────────────────
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState(EMPTY_STORY_RIP_FORM);
    const [showWelcome, setShowWelcome] = useState(true);
    const [turnstileToken, setTurnstileToken] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [formStartedAt, setFormStartedAt] = useState<number | null>(null);

    // ── Parallax for methodology interstitial ────────────────────────────────
    const methodologyRef = useRef(null);
    const { scrollYProgress: methodologyScroll } = useScroll({
        target: methodologyRef,
        offset: ['start end', 'end start'],
    });
    const methodologyY = useTransform(methodologyScroll, [0, 1], ['0%', '12%']);

    useEffect(() => {
        if (!TURNSTILE_SITE_KEY) return;

        window.onTurnstileSuccess = (token: string) => {
            setTurnstileToken(token);
            setSubmitError('');
        };
        window.onTurnstileExpired = () => {
            setTurnstileToken('');
        };
        window.onTurnstileError = () => {
            setTurnstileToken('');
            setSubmitError('Verification failed. Please retry the captcha.');
        };

        return () => {
            delete window.onTurnstileSuccess;
            delete window.onTurnstileExpired;
            delete window.onTurnstileError;
        };
    }, []);

    const currentStep  = STORY_RIP_STEPS[step];
    const currentField = currentStep.field as keyof typeof formData;
    const currentFieldValue = formData[currentField];

    const currentFieldError = getStoryRipFieldError(currentField, currentFieldValue);
    const canProceed = (!currentStep.required || Boolean(currentFieldValue.trim())) && !currentFieldError;

    const handleNext = () => {
        if (step < STORY_RIP_STEPS.length - 1 && canProceed) setStep(s => s + 1);
    };

    const handleBack = () => {
        if (step > 0) setStep(s => s - 1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentStep.type !== 'textarea' && currentStep.type !== 'select') {
            e.preventDefault();
            if (canProceed) handleNext();
        }
    };

    const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'submitted'>('idle');
    const [submitError, setSubmitError] = useState('');
    const loomSubmitted = submitState === 'submitted';
    const beginForm = () => {
        setShowWelcome(false);
        setFormStartedAt(Date.now());
        setSubmitError('');
    };

    const handleSubmit = async (stageValue?: string) => {
        if (submitState === 'submitting') return;

        if (!isValidEmail(formData.email)) {
            setSubmitError('Enter a valid email address before submitting.');
            return;
        }

        if (!isValidWebUrl(formData.url)) {
            setSubmitError('Enter a valid URL before submitting.');
            return;
        }

        if (TURNSTILE_SITE_KEY && !turnstileToken) {
            setSubmitError('Complete the verification before submitting.');
            return;
        }

        setSubmitError('');
        setSubmitState('submitting');
        const data = {
            ...formData,
            email: formData.email.trim(),
            url: normalizeWebUrl(formData.url),
            companyFax: honeypot,
            formStartedAt: formStartedAt ?? Date.now(),
            turnstileToken,
            ...(stageValue ? { stage: stageValue } : {}),
        };

        try {
            const response = await fetch('/api/loom-submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const responseData = await response.json().catch(() => null);
                const message = responseData && typeof responseData.error === 'string'
                    ? responseData.error
                    : 'Submission failed. Please try again in a minute.';
                throw new Error(message);
            }

            setSubmitState('submitted');
        } catch (error) {
            console.error('[story-teardown] Loom submit failed', error);
            setSubmitError(error instanceof Error ? error.message : 'Submission failed. Please try again in a minute.');
            setSubmitState('idle');
        }
    };

    return (
        <MotionConfig reducedMotion="user">
        {TURNSTILE_SITE_KEY && (
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="afterInteractive"
            />
        )}
        <div className="flex flex-col overflow-x-hidden bg-paper text-ink font-sans selection:bg-rust/20 selection:text-ink">
            <main className="pt-0 pb-24 md:pb-28 isolate">

                {/* ═══════════════════════════════════════════════════════
                    SECTION 1 — HERO (7.1)
                    Hook. Problem. Dark cinematic treatment.
                    CTA scrolls to paid Story Teardown product.
                    ═══════════════════════════════════════════════════════ */}
                <section className="relative min-h-[100svh] md:min-h-[90vh] flex flex-col justify-center items-center px-6 pt-24 md:pt-0 mb-24 md:mb-32 bg-ink overflow-hidden">

                    {/* Parallax background with cinematic vignette */}
                    <ParallaxHeroBackground
                        src="/images/pages/storybook_bg3.jpg"
                        alt="Illustrated storybook pages — the craft of narrative strategy"
                    />

                    {/* Content — left-aligned over the parallax background */}
                    <div className="max-w-6xl mx-auto z-10 w-full flex flex-col items-start relative">
                        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-rust/30 pointer-events-none" />

                        <div className="text-left max-w-4xl md:max-w-[58%]">
                            <div className="inline-block mb-8 md:mb-10 px-4 md:px-6 py-2 border border-rust/50 text-rust text-[0.58rem] md:text-[0.65rem] font-bold uppercase tracking-[0.2em] md:tracking-[0.25em] bg-ink/50 backdrop-blur-sm reveal reveal-delay-1 shadow-[4px_4px_0px_rgba(200,60,47,0.15)]">
                                Story Teardown
                            </div>

                            <h1 className="font-display text-5xl sm:text-6xl md:text-[8.5rem] leading-[0.9] md:leading-[0.85] mb-10 md:mb-12 text-paper tracking-tight md:tracking-tighter">
                                <TypewriterHeadline
                                    text="Your Story's"
                                    initialDelay={400}
                                    wordDelay={100}
                                />
                                <br />
                                <span className="italic text-rust">
                                    <TypewriterHeadline
                                        text="Bleeding Money."
                                        initialDelay={750}
                                        wordDelay={100}
                                        showCursor={true}
                                    />
                                </span>
                            </h1>

                            <div className="w-full flex justify-start mb-10 md:mb-16 reveal reveal-delay-3">
                                <p className="font-sans text-base md:text-xl max-w-lg text-paper/70 leading-[1.75] md:leading-[1.8] font-light border-l-2 border-rust/50 pl-5 md:pl-8 text-left backdrop-blur-sm p-3 md:p-4">
                                    Wonder why your pitch stalls, your site doesn&apos;t convert, and your donors dry up? It&apos;s not your product. It&apos;s because no one understands what you do&nbsp;&mdash; or why it matters.<br />
                                    <span className="text-paper font-bold mt-4 block uppercase tracking-widest text-[0.65rem]">Let&apos;s fix that.</span>
                                </p>
                            </div>

                            {/* Single rust CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-start items-start sm:items-center reveal reveal-delay-4 w-full max-w-lg">
                                <a href="#story-teardown" className="group relative flex w-full sm:w-auto">
                                    <div className="absolute inset-0 bg-black/50 transform translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                    <div className="relative bg-rust text-paper font-sans text-[0.62rem] md:text-[0.65rem] uppercase tracking-[0.16em] md:tracking-[0.2em] font-bold px-6 md:px-8 py-4 flex items-center justify-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform w-full">
                                        See What&apos;s Costing You
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 2 — THE CRISIS MIRROR (7.2)
                    "Knowing your lines isn't enough."
                    ═══════════════════════════════════════════════════════ */}
                <section className="max-w-6xl mx-auto px-6 mb-0 relative">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start relative z-10">
                        <motion.div
                            className="md:col-span-5 sticky top-32"
                            {...SLIDE_LEFT}
                            viewport={MOTION_VIEWPORT}
                            transition={MOTION_TRANSITION}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-rust font-bold font-sans text-sm">01</span>
                                <div className="flex-1 h-[1px] bg-ink/20" />
                            </div>
                            <h2 className="font-display text-5xl md:text-6xl italic leading-[1.15] mb-6 tracking-tight text-ink">
                                Knowing your lines <span className="bg-ink text-paper px-2 py-1">isn&apos;t enough.</span>
                            </h2>
                            <p className="text-[0.65rem] font-sans uppercase tracking-[0.2em] text-rust font-bold">Diagnostic Phase</p>
                        </motion.div>
                        <motion.div
                            className="md:col-span-7 space-y-12"
                            {...SLIDE_RIGHT}
                            viewport={MOTION_VIEWPORT}
                            transition={{ ...MOTION_TRANSITION, delay: 0.15 }}
                        >
                            <p className="text-ink/80 leading-[1.8] font-light text-lg border-l border-ink/20 pl-6">
                                You know when a story turns just because the writer needed it to. And you know when you&apos;re pitching and you can see that no one but you gets it. You&apos;re your story&apos;s protagonist. But the market sees you as an extra.
                            </p>
                            <p className="text-ink/80 leading-[1.8] font-light text-lg border-l border-ink/20 pl-6">
                                You know your product so well that you&apos;ve forgotten what it&apos;s like not to know. You speak in features, specs, and shorthand. The market hears noise.
                            </p>

                            <div className="p-10 bg-white border border-ink/10 relative overflow-hidden shadow-sm mt-16">

                                <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-8 text-rust flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                                    When It&apos;s Not Working
                                </h3>
                                <h4 className="font-display text-2xl md:text-3xl italic text-ink mb-8">Every pitch, every call, every idea.</h4>
                                <ul className="space-y-6 font-display text-xl text-ink/90 italic">
                                    <li className="flex items-start gap-4">
                                        <span className="text-ink/30 font-sans text-sm mt-1 not-italic">—</span>
                                        <span className="leading-relaxed">Investors nod politely but don&apos;t follow up.</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-ink/30 font-sans text-sm mt-1 not-italic">—</span>
                                        <span className="leading-relaxed">Sales cycles are dragging because prospects &ldquo;need to think.&rdquo;</span>
                                    </li>
                                    <li className="flex items-start gap-4">
                                        <span className="text-ink/30 font-sans text-sm mt-1 not-italic">—</span>
                                        <span className="leading-relaxed">Marketing burns cash with zero response.</span>
                                    </li>
                                </ul>
                                <p className="mt-10 pt-8 border-t border-ink/10 text-ink/70 leading-[1.8] font-sans font-light text-base">
                                    You know the feeling. Abandoned carts, calls that don&apos;t convert, and funding rounds that go stale. You&apos;re an expert at this, so why isn&apos;t anyone buying?
                                </p>
                                <p className="mt-6 font-display text-2xl md:text-3xl italic text-ink leading-tight">
                                    Because if people don&apos;t understand it, they can&apos;t choose it.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 3 — METHODOLOGY INTERSTITIAL (7.4)
                    "Some stories sound good. Others get funded."
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
                            src="/writers-room.jpg"
                            alt="Strategy session — makers at work, whiteboards covered in red marks"
                            fill
                            sizes="100vw"
                            className="object-cover"
                            style={{ objectPosition: 'center 40%' }}
                        />
                    </motion.div>

                    {/* Dark overlay for legibility */}
                    <div className="absolute inset-0 bg-ink/65 z-[1]" />

                    {/* Gradual edge gradients — smooth bleed into surrounding sections */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper via-paper/50 via-30% to-transparent pointer-events-none z-[2]" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper via-paper/50 via-30% to-transparent pointer-events-none z-[2]" />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_30px_rgba(0,0,0,0.35)] pointer-events-none z-[2]" />

                    {/* Content */}
                    <motion.div
                        className="relative z-10 max-w-2xl mx-auto px-6 md:px-10 text-center py-20"
                        {...FADE_UP}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ ...MOTION_TRANSITION, duration: 0.8 }}
                    >
                        <p className="font-sans text-paper/50 text-[0.65rem] uppercase tracking-[0.25em] mb-6">
                            What We Believe
                        </p>
                        <h2 className="font-display text-paper text-3xl md:text-5xl italic leading-[1.25] mb-8">
                            Some stories sound good.<br className="hidden md:inline" /> Others get funded.
                        </h2>
                        <p className="font-sans text-paper/80 text-base md:text-lg leading-[1.85]">
                            Somewhere between your vision and how people experience it, that story gets lost. We use the same methods that have made thousands of stories sell for hundreds of years to help founders, artists, non-profits, and small businesses tell the story their work deserves. Audiences won&apos;t just understand it. They&apos;ll act on it.
                        </p>
                    </motion.div>
                </div>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 4 — THE STORY TEARDOWN (PAID PRODUCT) (7.5)
                    Main conversion section. $1,500.
                    Moved UP — now appears before social proof.
                    ═══════════════════════════════════════════════════════ */}
                <motion.section
                    id="story-teardown"
                    className="scroll-mt-24 md:scroll-mt-28 bg-ink text-paper py-32 relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ ...MOTION_TRANSITION, duration: 0.8 }}
                >
                    {/* Blueprint grid overlay */}
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)', backgroundSize: '3rem 3rem' }} />

                    {/* HUMAN PHOTOGRAPHY — yellowbrickroad breaks right edge */}
                    <div className="absolute right-0 top-0 bottom-0 w-[32vw] max-w-[420px] z-[1] pointer-events-none">
                        <Image
                            src="/images/pages/yellowbrickroad.jpg"
                            alt="Founder on the path to narrative clarity"
                            fill
                            sizes="32vw"
                            className="object-cover contrast-110"
                            style={{ objectPosition: '75% 45%' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-ink/10 to-ink/60 pointer-events-none" />
                    </div>

                    <div className="max-w-6xl mx-auto px-6 relative z-10">

                        {/* Header */}
                        <div className="max-w-full md:max-w-[62%] mb-20">
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-rust font-bold font-sans text-sm">02</span>
                                <div className="flex-1 h-[1px] bg-white/20 max-w-20" />
                                <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-white/30">$1,500</span>
                            </div>
                            <h2 className="font-display text-6xl md:text-7xl leading-[0.9] tracking-tighter text-paper mb-8">
                                The Protagonist<br /><span className="italic text-white/40">Story Teardown.</span>
                            </h2>
                            <p className="font-sans text-lg text-paper/70 leading-[1.8] max-w-xl">
                                This one-week diagnostic examines your story at every layer, from your core thesis to your live website, and hands you a single message that holds across your deck, your home page, and every cold email you send.
                            </p>
                        </div>

                        {/* Deliverables */}
                        <div className="max-w-full md:max-w-[62%] mb-20">
                            <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-8 text-rust flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-rust animate-pulse" />
                                What You Get
                            </h3>
                            <div className="space-y-6 border-l-2 border-rust/30 pl-8 mb-12">
                                {[
                                    { item: "60-Minute Zoom Diagnostic", sub: "We want to hear your story directly from you. We'll meet, we'll dissect, and we'll find new angles for your core narrative." },
                                    { item: "Red Line Blueprint", sub: "We'll walk through your current marketing and pitch deck and give you a simple map of where your story is breaking and how to fix it." },
                                    { item: "Narrative Brief", sub: "A clear, usable version of your core message. The line you can drop into your homepage, your deck, your next email without rewriting it." },
                                ].map((d, i) => (
                                    <div key={i} className="group">
                                        <p className="font-sans text-sm font-bold text-paper group-hover:text-rust transition-colors">{d.item}</p>
                                        <p className="font-sans text-xs text-paper/40 mt-1">{d.sub}</p>
                                    </div>
                                ))}
                            </div>

                            <p className="font-sans text-base text-paper/60 italic mb-10">
                                Give us one week, and we&apos;ll give you clarity.
                            </p>

                            <a href={BOOKING_ACTION} className="group relative inline-flex">
                                <div className="absolute inset-0 bg-rust transform translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                <div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-8 py-4 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    Secure Your Story Teardown — $1,500
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>
                            <p className="mt-4 font-sans text-sm text-rust/80 italic">
                                Nothing to fix? Then you don&apos;t pay.
                            </p>
                        </div>
                    </div>
                </motion.section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 5 — SOCIAL PROOF (7.6)
                    "Founders who found their story"
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
                                <p className="text-[0.65rem] font-sans text-rust uppercase tracking-[0.2em] font-bold">Across SaaS, deep tech, and nonprofit industries</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                            {[
                                {
                                    quote: "We'd been pitching for six months and getting the same \"we'll call you\" every time. Protagonist Ink's teardown gave us a clear line to use so investors finally started writing checks.",
                                    role: "SaaS Founder",
                                    result: "Investors writing checks"
                                },
                                {
                                    quote: "I started thinking we'd spent months building something totally useless. The red line changed our entire game. Half our pitch was tossed. We're better for it.",
                                    role: "Co-Founder & CEO",
                                    result: "Entire game changed"
                                },
                                {
                                    quote: "We pull out the one-liner every time we launch something new. It keeps us aligned on what actually matters.",
                                    role: "Board Director",
                                    result: "Team alignment & clarity"
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
                                        <p className="font-sans text-sm text-white/50 uppercase tracking-widest">{item.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Transition text */}
                        <div className="mt-24 text-center reveal">
                            <p className="font-display text-2xl md:text-3xl italic text-paper/50">
                                Need proof? Give us 5 minutes, we&apos;ll show you where the cracks are.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 6 — THE STORY RIP (FREE FORM) (7.7)
                    Renamed from "Story Loom". Moved DOWN after social proof.
                    Internal IDs kept as #free-loom to avoid breaking integrations.
                    ═══════════════════════════════════════════════════════ */}
                <section id="free-loom" className="scroll-mt-24 md:scroll-mt-28 py-32 bg-paper border-y border-ink/10 relative overflow-hidden">
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
                                            Try Us Out // Free
                                        </div>

                                        {/* Heading */}
                                        <h2 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter text-ink mb-8">
                                            The<br />
                                            <span className="italic text-rust">Story Rip.</span>
                                        </h2>

                                        {/* Description */}
                                        <p className="font-sans text-base md:text-lg text-ink/60 leading-[1.85] max-w-lg mx-auto mb-4">
                                            Right here, right now, you can answer a few questions about your brand story and we&apos;ll send you a Loom covering our first impressions and where we can help.
                                        </p>
                                        <div className="mb-12" />

                                        {/* CTA */}
                                        <button
                                            type="button"
                                            onClick={beginForm}
                                            className="bg-rust text-paper font-sans text-[0.7rem] uppercase tracking-widest px-10 py-4 hover:bg-rust/85 transition-all duration-300 inline-flex items-center gap-3 font-bold group"
                                        >
                                            Rip My Story Apart
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>

                                    <p className="mt-8 font-sans text-[0.6rem] text-ink/30 uppercase tracking-widest">
                                        Already know you need the full teardown?{" "}
                                        <a href={BOOKING_ACTION} className="underline hover:text-rust transition-colors">Book direct →</a>
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
                                                <span className="text-rust font-bold font-sans text-sm">03</span>
                                                <div className="flex-1 h-[1px] bg-ink/20" />
                                                <span className="font-sans text-[0.6rem] uppercase tracking-[0.2em] text-ink/40">Free</span>
                                            </div>
                                            <div className="inline-block mb-8 px-4 py-1 border border-rust text-rust text-[0.6rem] font-sans font-bold uppercase tracking-widest bg-white">
                                                Try Us Out // Free
                                            </div>
                                            <h2 className="font-display text-6xl md:text-7xl leading-[0.9] tracking-tighter text-ink mb-8">
                                                The Story<br /><span className="italic text-rust">Rip.</span>
                                            </h2>
                                            <p className="font-sans text-lg text-ink/70 leading-[1.8] mb-12 max-w-md">
                                                Answer a few questions about your brand story and we&apos;ll send you a Loom covering our first impressions and where we can help. No pitch, just architecture.
                                            </p>

                                            <div className="space-y-4 border-l-2 border-ink/10 pl-8">
                                                {[
                                                    "Asynchronous Loom video. In your inbox in 2–3 days.",
                                                    "High-level structural review of your biggest leak.",
                                                    "Actionable quick-wins you can act on immediately.",
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
                                                        We&apos;ll record your Story Rip and send it within 2–3 business days. Watch your inbox.
                                                    </p>
                                                    <p className="mt-8 font-sans text-[0.6rem] uppercase tracking-widest text-ink/30">
                                                        Want the full surgical intervention?{" "}
                                                        <a href={BOOKING_ACTION} className="underline hover:text-rust transition-colors">Book the Story Teardown →</a>
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
                                                                style={{ width: `${((step + 1) / STORY_RIP_STEPS.length) * 100}%` }}
                                                            />
                                                        </div>

                                                    <div className="p-10">
                                                        <div className="sr-only" aria-hidden="true">
                                                            <label htmlFor="companyFax">Do not fill this field</label>
                                                            <input
                                                                id="companyFax"
                                                                name="companyFax"
                                                                tabIndex={-1}
                                                                autoComplete="off"
                                                                value={honeypot}
                                                                onChange={e => setHoneypot(e.target.value)}
                                                            />
                                                        </div>

                                                        {/* Step counter + pulse */}
                                                        <div className="flex items-center justify-between mb-10">
                                                            <span className="font-sans text-[0.6rem] font-bold uppercase tracking-widest text-rust">
                                                                {String(step + 1).padStart(2, '0')}{' '}
                                                                <span className="text-ink/20 mx-1">/</span>{' '}
                                                                {String(STORY_RIP_STEPS.length).padStart(2, '0')}
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
                                                                    {TURNSTILE_SITE_KEY && (
                                                                        <div className="mb-6">
                                                                            <div
                                                                                className="cf-turnstile"
                                                                                data-sitekey={TURNSTILE_SITE_KEY}
                                                                                data-theme="light"
                                                                                data-callback="onTurnstileSuccess"
                                                                                data-expired-callback="onTurnstileExpired"
                                                                                data-error-callback="onTurnstileError"
                                                                            />
                                                                            {!turnstileToken && (
                                                                                <p className="mt-3 font-sans text-[0.6rem] uppercase tracking-widest text-ink/35">
                                                                                    Complete verification to submit.
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                    <div className="grid grid-cols-2 gap-3">
                                                                        {currentStep.options?.map(option => (
                                                                            <button
                                                                                key={option}
                                                                                type="button"
                                                                                onClick={() => void handleSubmit(option)}
                                                                                disabled={submitState === 'submitting' || (Boolean(TURNSTILE_SITE_KEY) && !turnstileToken)}
                                                                                className="px-4 py-4 border border-ink/20 font-sans text-sm text-ink hover:border-rust hover:text-rust hover:bg-rust/5 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                                                                            >
                                                                                {option}
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                    <div className="flex items-center justify-between mt-6">
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleBack}
                                                                            disabled={submitState === 'submitting'}
                                                                            className="font-sans text-[0.65rem] uppercase tracking-widest text-ink/40 hover:text-ink transition-colors"
                                                                        >
                                                                            ← Back
                                                                        </button>
                                                                        {submitState === 'submitting' && (
                                                                            <span className="font-sans text-[0.55rem] uppercase tracking-widest text-ink/40">
                                                                                Submitting...
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </>
                                                            )}

                                                            {/* ── Text / email / url inputs ── */}
                                                                    {currentStep.type !== 'textarea' && currentStep.type !== 'select' && (
                                                                        <input
                                                                            type={currentStep.type}
                                                                            value={currentFieldValue}
                                                                            onChange={e => setFormData(f => ({ ...f, [currentField]: e.target.value }))}
                                                                            onKeyDown={handleKeyDown}
                                                                            placeholder={currentStep.placeholder || ''}
                                                                            autoFocus
                                                                            className="w-full bg-transparent border-0 border-b-2 border-ink/20 font-sans text-xl px-0 py-3 focus:outline-none focus:border-rust placeholder:text-ink/30 text-ink transition-colors"
                                                                        />
                                                                    )}
                                                            {currentFieldError && currentStep.type !== 'select' && (
                                                                <p className="mt-4 font-sans text-[0.65rem] tracking-wide text-rust">
                                                                    {currentFieldError}
                                                                </p>
                                                            )}

                                                            {/* ── Navigation (all types except select) ── */}
                                                            {currentStep.type !== 'select' && (
                                                                <div className="flex items-center justify-between mt-10">
                                                                    {/* Back */}
                                                                    {step > 0 ? (
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleBack}
                                                                            disabled={submitState === 'submitting'}
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
                                                                            disabled={submitState === 'submitting' || !canProceed}
                                                                            className="bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-widest px-6 py-3 hover:bg-rust/85 transition-all duration-300 flex items-center gap-2 font-bold group disabled:opacity-30 disabled:cursor-not-allowed"
                                                                        >
                                                                            Next
                                                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {submitError && (
                                                                <p className="mt-6 font-sans text-[0.65rem] tracking-wide text-rust">
                                                                    {submitError}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <p className="mt-6 font-sans text-[0.6rem] text-ink/30 uppercase tracking-widest text-center">
                                                Already know you need the full teardown?{" "}
                                                <a href={BOOKING_ACTION} className="underline hover:text-rust transition-colors">Book direct — $1,500 →</a>
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 7 — THE FOUR LAYERS WE EXAMINE (7.8)
                    ═══════════════════════════════════════════════════════ */}
                <section className="bg-ink text-paper py-32 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)', backgroundSize: '3rem 3rem' }} />

                    <div className="max-w-5xl mx-auto px-6 relative z-10">
                        <motion.div
                            className="text-center mb-16"
                            {...FADE_UP}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={MOTION_TRANSITION}
                        >
                            <h2 className="font-display text-5xl md:text-6xl tracking-tighter text-paper mb-4">The Protagonist&apos;s Story Elements</h2>
                        </motion.div>

                        <h3 className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-8 text-white/40 flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-white/20" />
                            The Four Layers We Examine
                        </h3>
                        <div className="space-y-px border border-white/10">
                            {[
                                { num: "01", title: "The Spine", desc: "The core sentence that should anchor every conversation, every piece of marketing, every webpage." },
                                { num: "02", title: "The Script", desc: "What the audience hears: your emails, your elevator pitch, and your top content." },
                                { num: "03", title: "The Stage", desc: "Your deck, website, and anywhere a prospect first gets their first impression." },
                                { num: "04", title: "The Show", desc: "Your advertising, your distribution, and your audience's reaction." },
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

                        {/* Testimonial */}
                        <div className="mt-16 text-center">
                            <p className="font-display text-xl md:text-2xl italic text-paper/60 leading-[1.5] max-w-2xl mx-auto">
                                &ldquo;Since our audit, every pitch has been tighter, audiences are starting to talk, and the money&apos;s rolling in.&rdquo;
                            </p>
                            <p className="mt-6 font-sans text-sm text-white/40">— Series A Co-Founder</p>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 8 — CLOSING CTA (7.9)
                    "Stop guessing. Start converting."
                    ═══════════════════════════════════════════════════════ */}
                <section className="bg-ink border-t-2 border-rust py-32 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.06]" style={{
                        backgroundImage: 'linear-gradient(var(--color-paper) 1px, transparent 1px), linear-gradient(90deg, var(--color-paper) 1px, transparent 1px)',
                        backgroundSize: '4rem 4rem'
                    }} />

                    <div className="absolute right-0 top-0 bottom-0 w-[36vw] max-w-[480px] z-0 pointer-events-none">
                        <Image
                            src="/images/pages/girlfounder_conference.jpg"
                            alt=""
                            fill
                            className="object-cover grayscale contrast-110 opacity-60"
                            style={{ objectPosition: 'center top' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/25 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent pointer-events-none" />
                    </div>

                    <motion.div
                        className="max-w-5xl mx-auto px-6 relative z-10 text-center"
                        {...FADE_UP}
                        viewport={MOTION_VIEWPORT}
                        transition={{ ...MOTION_TRANSITION, duration: 0.8 }}
                    >
                        <div className="inline-block mb-10 px-4 py-1 border border-rust text-rust text-[0.6rem] font-bold uppercase tracking-widest">
                            The Decision Point
                        </div>
                        <h2 className="font-display text-6xl md:text-8xl tracking-tighter mb-8 text-paper leading-[0.9]">
                            Stop guessing.<br /><span className="italic text-rust">Start converting.</span>
                        </h2>
                        <p className="font-sans text-paper/60 text-lg max-w-xl mx-auto leading-relaxed mb-16">
                            Within 5 minutes, you&apos;ll know the story issue. Within one week, you&apos;ll know how to fix it. Either way, you&apos;ll get a story worth telling, over and over again.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a href={BOOKING_ACTION} className="group relative flex">
                                <div className="absolute inset-0 bg-black/50 transform translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                                <div className="relative bg-rust text-paper font-sans text-[0.65rem] uppercase tracking-[0.2em] font-bold px-10 py-5 flex items-center gap-3 transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    Secure Your Story Teardown
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </a>

                            <a href="#free-loom" className="font-sans text-[0.6rem] tracking-[0.15em] text-paper/30 hover:text-rust transition-colors flex items-center gap-1.5 mt-6">
                                Not ready? Get a free story rip first
                                <ArrowRight className="w-3 h-3" />
                            </a>
                        </div>

                        <p className="mt-10 font-sans text-[0.6rem] text-paper/30 uppercase tracking-widest">
                            Questions? <a href="mailto:hello@protagonist.ink" className="underline hover:text-rust transition-colors">hello@protagonist.ink</a>
                        </p>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    SECTION 9 — FAQ (7.10)
                    Updated copy and product names.
                    ═══════════════════════════════════════════════════════ */}
                <section className="pt-40 pb-8 bg-paper border-t border-ink/5 relative overflow-hidden" id="faq">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="mb-24 reveal text-center lg:text-left">
                            <h2 className="font-display text-5xl md:text-7xl italic leading-none text-ink tracking-tight mb-4">Got Questions?</h2>
                            <p className="font-sans text-ink/50 text-sm tracking-widest uppercase">A few commonalities between clients</p>
                        </div>

                        <div className="space-y-12 reveal reveal-delay-1">
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 items-start">
                                {[
                                    { q: "Who performs the audit?", a: "We do. Not contractors, not AI. We have twenty years of strategy, copywriting, and storytelling experience and we know how to turn a story around." },
                                    { q: "Why is this $1,500?", a: "You're investing in clarity that changes how you pitch, present, and sell. One story that works can move a room or close a round. That's measurable ROI." },
                                    { q: "What exactly will I walk away with?", a: "With the Story Rip, a 5-minute Loom walking you through first impressions. Great for a quick check. For the teardown, three deliverables: A Story Audit, a Red Line Blueprint, and a practical Narrative Roadmap, all pulling from the same foundation so your team, site, and fundraising speak with one voice." },
                                    { q: "How long does it take?", a: "The Story Rip takes two days. The Teardown is one business week. We'll schedule a call at our earliest mutual convenience, and send the deliverables 5–7 days from when we begin." },
                                    { q: "Will this help me raise?", a: "The #1 problem we hear from VCs and donors: they didn't understand the point of it. Investors fund clarity. If your pitch stalls at 'what do you actually do?', this process fixes that." },
                                    { q: "What's the difference between the free Story Rip and the paid Teardown?", a: "The Story Rip gives you first impressions on where your story's working, and most importantly where it's not. It's a five minute Loom that gives you insight into what the breakdown is and how we'll take care of it. The Teardown is a writer's room intervention across all four layers of your narrative, with deliverables your whole team can use." },
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
                ═══════════════════════════════════════════════════════ */}
            <div className="fixed bottom-0 left-0 w-full z-40 bg-white text-ink border-t-2 border-rust shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
                <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 md:h-24 flex items-center justify-between gap-3 md:gap-6">
                    <div className="hidden md:flex flex-col">
                        <span className="font-display font-light text-3xl tracking-tighter text-ink italic">What&apos;s your story costing you?</span>
                    </div>
                    <div className="md:hidden flex flex-col justify-center min-w-0">
                        <span className="font-display font-light text-xl tracking-tight text-ink italic truncate">What&apos;s your story costing you?</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                        <a
                            href={BOOKING_ACTION}
                            className="bg-rust hover:bg-rust/85 text-paper px-4 py-3 md:px-10 md:py-4 font-sans text-[0.58rem] md:text-[0.65rem] uppercase tracking-[0.14em] md:tracking-[0.2em] font-bold flex items-center gap-2 md:gap-4 transition-all md:hover:pr-8 shadow-sm group whitespace-nowrap"
                        >
                            Book Your Story Teardown
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                        </a>
                        <span className="text-[0.65rem] font-sans text-rust/70 italic tracking-wide">We only take a few each month.</span>
                    </div>
                </div>
            </div>
        </div>
        </MotionConfig>
    );
}
