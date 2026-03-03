interface TypeSpecimenProps {
  name: string;
  cssVar: string;
  sampleText: string;
  style?: React.CSSProperties;
  usage: string;
  specs: string;
}

export function TypeSpecimen({ name, cssVar, sampleText, style, usage, specs }: TypeSpecimenProps) {
  return (
    <div className="border border-ink/8 bg-warmwhite">
      <div className="px-6 py-8 border-b border-ink/8 min-h-32 flex items-end">
        <p
          className="leading-tight"
          style={{ fontFamily: `var(${cssVar})`, ...style }}
        >
          {sampleText}
        </p>
      </div>
      <div className="px-6 py-5">
        <p className="text-xs font-semibold tracking-widest uppercase text-ink mb-1">{name}</p>
        <p className="font-mono text-xs text-coolgray mb-3">{cssVar}</p>
        <p className="text-xs text-coolgray leading-relaxed mb-1">{usage}</p>
        <p className="font-mono text-xs text-coolgray/70">{specs}</p>
      </div>
    </div>
  );
}
