interface SectionDividerProps {
  variant?: 'rule' | 'marker' | 'space';
  marker?: string;
}

export default function SectionDivider({ variant = 'rule', marker = '§' }: SectionDividerProps) {
  if (variant === 'space') return <div className="py-6 md:py-10" />;

  if (variant === 'marker')
    return (
      <div className="max-w-[680px] mx-auto px-6 md:px-10 py-8 md:py-12 text-center">
        <span className="text-technical text-[11px] tracking-[0.2em] text-ink/15">{marker}</span>
      </div>
    );

  return (
    <div className="max-w-[680px] mx-auto px-6 md:px-10 py-8 md:py-12">
      <div className="h-px bg-ink/10" />
    </div>
  );
}
