// components/blog/detail/EditorialFooter.tsx
import Image from 'next/image';
import Link from 'next/link';

export default function EditorialFooter() {
  return (
    <footer className="bg-trueblack texture-grain px-6 md:px-10 lg:px-12 pt-16 md:pt-20 pb-12 md:pb-16">
      <div className="max-w-[1400px] mx-auto">

        {/* Two-column CTA grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-20">

          {/* Newsletter */}
          <div>
            <p className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/40 mb-4">
              DISPATCH
            </p>
            <p className="font-serif italic text-warmwhite/60 text-lg md:text-xl mb-8 leading-snug">
              The Ink, delivered.
            </p>
            {/* TODO: wire to newsletter provider */}
            <form action="#" className="max-w-sm">
              <div className="flex items-end gap-0 border-b border-warmwhite/20 pb-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-warmwhite text-sm placeholder-warmwhite/30 focus:outline-none font-sans min-w-0"
                />
                <button
                  type="submit"
                  className="text-technical text-[11px] tracking-[0.18em] text-rust hover:text-warmwhite transition-colors duration-300 ml-4 flex-shrink-0"
                >
                  Subscribe →
                </button>
              </div>
            </form>
          </div>

          {/* Story Teardown */}
          <div>
            <p className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/40 mb-4">
              STORY TEARDOWN
            </p>
            <p className="font-serif italic text-warmwhite/60 text-lg md:text-xl mb-8 leading-snug">
              Find out exactly where your story breaks.
            </p>
            <Link
              href="/story-teardown"
              className="text-technical text-[13px] tracking-[0.18em] text-rust hover:text-warmwhite transition-colors duration-300"
            >
              protagonist.ink/story-teardown →
            </Link>
          </div>

        </div>

        {/* PI mark + copyright */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-warmwhite/[0.06]">
          <Image
            src="/images/brand/transparent_black_symbol.png"
            alt=""
            width={48}
            height={48}
            aria-hidden
            className="opacity-[0.15] invert"
          />
          <p className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/20">
            © {new Date().getFullYear()} Protagonist Ink
          </p>
        </div>

      </div>
    </footer>
  );
}
