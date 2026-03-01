// components/blog/detail/Prose.tsx
export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[680px] mx-auto px-6 md:px-10 space-y-6 md:space-y-8 text-base md:text-lg leading-relaxed md:leading-[1.8] text-ink/80">
      {children}
    </div>
  );
}
