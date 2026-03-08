import Link from 'next/link'
import Image from 'next/image'

export default function EditorialFooter() {
  return (
    <footer className="bg-trueblack texture-grain pt-16 md:pt-20 pb-12 md:pb-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Left column — DISPATCH newsletter */}
          <div>
            <span className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/40 block mb-4">
              DISPATCH
            </span>
            <span className="font-serif italic text-warmwhite/60 text-lg md:text-xl block mb-6">
              The Ink, delivered.
            </span>
            <form action="#" className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="bg-transparent border-b border-warmwhite/20 text-warmwhite placeholder-warmwhite/30 text-sm py-2 focus:outline-none focus:border-rust/50 transition-colors duration-300 w-full"
              />
              <button
                type="submit"
                className="text-technical text-[11px] tracking-[0.2em] text-rust hover:text-rust/70 transition-colors duration-300 text-left"
              >
                Subscribe →
              </button>
            </form>
          </div>

          {/* Right column — Story Teardown CTA */}
          <div>
            <span className="text-technical text-[11px] tracking-[0.24em] text-warmwhite/40 block mb-4">
              STORY TEARDOWN
            </span>
            <span className="font-serif italic text-warmwhite/60 text-lg md:text-xl block mb-6">
              Find out exactly where your story breaks.
            </span>
            <Link
              href="/story-teardown"
              className="text-technical text-[13px] tracking-[0.1em] text-rust hover:text-rust/70 transition-colors duration-300"
            >
              protagonist.ink/story-teardown
            </Link>
          </div>

        </div>

        {/* Bottom — PI mark + copyright */}
        <div className="mt-16 md:mt-20 flex flex-col items-center gap-4">
          <Image
            src="/images/brand/transparent_black_symbol.png"
            alt=""
            width={48}
            height={48}
            className="opacity-[0.15]"
            style={{ filter: 'invert(1)' }}
          />
          <span className="text-technical text-[10px] tracking-[0.2em] text-warmwhite/20">
            © {new Date().getFullYear()} Protagonist Ink
          </span>
        </div>
      </div>
    </footer>
  )
}
