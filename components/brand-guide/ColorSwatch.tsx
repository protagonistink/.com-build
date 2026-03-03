interface ColorSwatchProps {
  name: string;
  hex: string;
  cssVar: string;
  alias?: string;
  role: string;
  onDark?: boolean;
}

export function ColorSwatch({ name, hex, cssVar, alias, role, onDark }: ColorSwatchProps) {
  return (
    <div className="bg-warmwhite overflow-hidden">
      <div
        className="h-28 flex items-end px-4 pb-3"
        style={{ background: hex }}
      >
        <span
          className="font-mono text-xs tracking-wider"
          style={{ color: onDark ? "rgba(250,250,250,0.5)" : "rgba(44,44,44,0.5)" }}
        >
          {hex}
        </span>
      </div>
      <div className="px-5 py-4">
        <p className="text-sm font-semibold text-ink mb-0.5">{name}</p>
        {alias && (
          <p className="text-xs text-rust mb-2 tracking-wide">alias: {alias}</p>
        )}
        <p className="text-xs font-mono text-coolgray mb-2">{cssVar}</p>
        <p className="text-xs text-coolgray leading-relaxed">{role}</p>
      </div>
    </div>
  );
}
