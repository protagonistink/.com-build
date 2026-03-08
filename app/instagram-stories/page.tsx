import Script from "next/script";

export default function InstagramStoriesPage() {
  const stories = [
    {
      id: "01",
      title: "Narrative debt =\nbrand plot holes.",
      body:
        "It is the gap between what your brand claims and what your brand proves.",
      kicker: "Text-only variation",
      mode: "text",
    },
    {
      id: "02",
      title: "Patch by patch,\nthings drift.",
      body:
        "Mission statement, website, content, ads. The brand still 'works' but the message misses, wrong-fit clients show up, and you keep re-explaining what you do.",
      kicker: "Diagnosis variation",
      mode: "image",
    },
    {
      id: "03",
      title: "Better copy won't\nfix bad structure.",
      body:
        "Messaging is what you say. Story is the architecture underneath it. Fix the structure first, then the words. Get a Teardown at protagonist.ink/story-teardown.",
      kicker: "CTA variation",
      mode: "cta",
    },
  ] as const;

  return (
    <>
      <Script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async />
      <main className="min-h-screen bg-[#1f1f1f] px-6 py-12 md:px-10">
        <header className="mx-auto mb-10 max-w-7xl text-[#f7f4ef]">
        <p className="font-sans text-xs tracking-[0.22em] uppercase text-[#c8b9a7]">
          Protagonist Ink
        </p>
        <h1 className="mt-2 font-serif text-4xl leading-[0.92] md:text-5xl">
          Instagram Story Concepts
        </h1>
        <p className="mt-3 max-w-2xl font-sans text-sm text-[#d8d2c8]">
          Derived from the &quot;Narrative Debt&quot; post theme. Three directions, including one text-only frame.
        </p>
        </header>

        <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.id}
              className="relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-[28px] border border-[#ffffff1a] bg-[#242424] shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
            >
              {story.mode !== "text" ? (
                <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_0%,#c83c2f_0%,#5d2620_28%,#1f1f1f_70%)] opacity-90" />
              ) : (
                <div className="absolute inset-0 bg-[linear-gradient(155deg,#1f1f1f_20%,#2f2d2d_58%,#161616_100%)]" />
              )}

              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0,transparent_2px,rgba(255,255,255,0.018)_3px)]" />

              <div className="relative z-10 flex h-full flex-col justify-between p-10 text-[#faf7f2]">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-[#f0d2c5]">
                    {story.kicker}
                  </p>
                  <h2 className="mt-6 whitespace-pre-line font-serif text-[53px] leading-[0.92] tracking-[-0.02em]">
                    {story.title}
                  </h2>
                  <p className="mt-8 max-w-[32ch] font-sans text-[21px] leading-[1.3] text-[#f4ece3]">
                    {story.body}
                  </p>
                </div>

                <div className="flex items-end justify-between">
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#f0d2c5]">
                    @protagonistink
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#f0d2c5]">
                    {story.id} / 03
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
