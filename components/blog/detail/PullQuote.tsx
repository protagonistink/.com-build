import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface PullQuoteProps {
  text: string;
}

export default function PullQuote({ text }: PullQuoteProps) {
  return (
    <ScrollRevealWrapper>
      <blockquote className="max-w-[960px] mx-auto px-6 md:px-10 py-12 md:py-16 text-center">
        <div className="w-10 h-px bg-rust mx-auto mb-8" />
        <p className="font-display italic text-2xl md:text-3xl text-ink/50 leading-snug max-w-3xl mx-auto">
          {text}
        </p>
      </blockquote>
    </ScrollRevealWrapper>
  );
}
