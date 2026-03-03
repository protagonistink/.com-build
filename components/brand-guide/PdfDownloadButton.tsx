'use client';

export function PdfDownloadButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-sm border border-ink/25 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-ink/70 transition hover:border-rust/70 hover:text-rust print:hidden"
    >
      Download PDF
    </button>
  );
}
