import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Figma Library Board",
  robots: {
    index: false,
    follow: false,
  },
};

type ColorToken = {
  name: string;
  style: string;
  value: string;
  role: string;
  textClass: string;
};

const colorTokens: ColorToken[] = [
  { name: "Ink", style: "Color/Brand/Ink", value: "#2C2C2C", role: "Primary", textClass: "text-paper" },
  { name: "Warm White", style: "Color/Brand/WarmWhite", value: "#FAFAFA", role: "Surface", textClass: "text-ink" },
  { name: "Rust", style: "Color/Brand/Rust", value: "#C83C2F", role: "Accent", textClass: "text-paper" },
  { name: "Indigo", style: "Color/Brand/Indigo", value: "#2E2B5F", role: "Secondary Accent", textClass: "text-paper" },
  { name: "Cool Gray", style: "Color/Brand/CoolGray", value: "#9B9EA4", role: "Muted UI", textClass: "text-ink" },
  { name: "True Black", style: "Color/Brand/TrueBlack", value: "#0A0A0A", role: "Depth", textClass: "text-paper" },
];

const typeStyles = [
  {
    name: "Display/Hero",
    style: "Text/Display/Hero",
    family: "Cormorant Garamond",
    spec: "300 · 96/0.88 · -2.5%",
    sample: "Where stories get their edge.",
  },
  {
    name: "H1/Editorial",
    style: "Text/Heading/H1",
    family: "Cormorant Garamond",
    spec: "300 · 64/0.92 · -1.5%",
    sample: "Narrative clarity over decorative noise.",
  },
  {
    name: "H2/Section",
    style: "Text/Heading/H2",
    family: "Cormorant Garamond",
    spec: "400 · 40/1.0 · -1%",
    sample: "Strategic tension holds attention.",
  },
  {
    name: "Body/Default",
    style: "Text/Body/Default",
    family: "Satoshi",
    spec: "400 · 18/1.6 · +1%",
    sample: "Direct, precise, soberly confident prose that trusts the reader.",
  },
  {
    name: "Label/Technical",
    style: "Text/Label/Technical",
    family: "Satoshi",
    spec: "500 · 11/1.2 · +20% uppercase",
    sample: "COLOR SYSTEM",
  },
  {
    name: "Caption/Meta",
    style: "Text/Caption/Meta",
    family: "Satoshi",
    spec: "400 · 12/1.5 · +12% uppercase",
    sample: "Updated March 2026",
  },
];

const spacing = ["4", "8", "12", "16", "24", "32", "48", "64", "96", "128"];

export default function FigmaLibraryPage() {
  return (
    <main id="figma-library-root" className="bg-[#FAFAFA] text-[#2C2C2C] min-h-screen">
      <section className="mx-auto max-w-[1600px] px-12 py-12 border-b border-ink/10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-rust">Protagonist Ink Library v2</p>
        <h1 className="mt-3 font-display text-[58px] leading-[0.9] tracking-[-0.02em] text-ink">Styles + Components Source</h1>
        <p className="mt-4 max-w-[72ch] font-sans text-[15px] leading-[1.6] text-ink/72">
          Clean extraction board for Figma styles and components. Everything below is intentionally flat and systematic to keep publishing clean.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-12 py-12 border-b border-ink/10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-rust mb-6">Color Styles</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorTokens.map((token) => (
            <div key={token.name} className="border border-ink/10 overflow-hidden">
              <div className={`h-28 px-4 py-3 flex flex-col justify-between ${token.textClass}`} style={{ backgroundColor: token.value }}>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-80">{token.role}</span>
                <span className="font-sans text-[12px] tracking-[0.06em]">{token.value}</span>
              </div>
              <div className="bg-paper px-4 py-3 border-t border-ink/10">
                <p className="font-sans text-[12px] text-ink/82">{token.style}</p>
                <p className="font-sans text-[11px] text-ink/50 mt-1">{token.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-12 py-12 border-b border-ink/10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-rust mb-6">Text Styles</p>
        <div className="border border-ink/10 divide-y divide-ink/10">
          {typeStyles.map((style: { name: string; style: string; family: string; spec: string; sample: string }) => (
            <div key={style.name} className="grid grid-cols-12 gap-5 p-6 items-center">
              <div className="col-span-3">
                <p className="font-sans text-[12px] text-ink/85">{style.style}</p>
                <p className="font-sans text-[11px] text-ink/50 mt-1">{style.spec}</p>
              </div>
              <div className="col-span-2">
                <p className="font-sans text-[11px] uppercase tracking-[0.12em] text-rust">{style.family}</p>
              </div>
              <div className="col-span-7">
                <p
                  className={style.family === "Satoshi" ? "font-sans text-[18px] leading-[1.5]" : "font-display text-[38px] leading-[1] tracking-[-0.01em]"}
                >
                  {style.sample}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-12 py-12 border-b border-ink/10">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-rust mb-6">Spacing Scale</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {spacing.map((step) => (
            <div key={step} className="border border-ink/10 p-4">
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink/55">Space/{step}</p>
              <div className="mt-3 bg-rust/85" style={{ width: `${step}px`, height: "12px" }} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-12 py-12">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-rust mb-6">Component Seeds</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="border border-ink/10 p-5 space-y-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink/60">Component/Button</p>
            <div className="flex flex-col gap-3">
              <button type="button" className="bg-rust text-paper px-5 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-left">
                Primary CTA
              </button>
              <button type="button" className="border border-ink/30 text-ink px-5 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-left">
                Secondary
              </button>
              <button type="button" className="text-rust border-b border-rust/40 pb-1 font-sans text-[11px] uppercase tracking-[0.2em] w-fit">
                Text Link
              </button>
            </div>
          </div>

          <div className="border border-ink/10 p-5 space-y-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink/60">Component/Tag</p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center border border-rust/35 text-rust px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em]">
                Diagnostic
              </span>
              <span className="inline-flex items-center border border-indigo/30 text-indigo px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em]">
                Narrative
              </span>
              <span className="inline-flex items-center border border-coolgray/35 text-ink/65 px-3 py-1.5 font-sans text-[11px] uppercase tracking-[0.18em]">
                Archive
              </span>
            </div>
          </div>

          <div className="border border-ink/10 p-5 space-y-4">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-ink/60">Component/Card</p>
            <div className="border border-ink/10 overflow-hidden">
              <div className="bg-ink text-paper p-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-rust">Card/Hero/Dark</p>
                <h3 className="mt-2 font-display text-[30px] leading-[0.95]">Every business has a story problem.</h3>
                <p className="mt-3 font-sans text-[14px] leading-[1.55] text-paper/75">
                  High-tension narrative block with one clear CTA.
                </p>
              </div>
            </div>
            <div className="border border-ink/10 overflow-hidden">
              <div className="bg-paper p-5">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-rust">Card/Editorial/Light</p>
                <h3 className="mt-2 font-display text-[28px] leading-[0.98] text-ink">No fluff. No urgency theater.</h3>
                <p className="mt-3 font-sans text-[14px] leading-[1.55] text-ink/75">
                  Editorial surface for proposals, stories, and case intros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
