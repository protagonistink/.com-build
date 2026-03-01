import type { BlogPost } from '@/types/blog';
import Prose from '@/components/blog/detail/Prose';
import PullQuote from '@/components/blog/detail/PullQuote';
import FullBleedImage from '@/components/blog/detail/FullBleedImage';
import SectionDivider from '@/components/blog/detail/SectionDivider';

export const BLOG_CATEGORIES = [
  'Narrative Architecture',
  'Founder Psychology',
  'AI & Human Craft',
  'Field Notes',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Architecture of a Narrative',
    slug: 'architecture-of-narrative',
    publishedAt: '2026-02-28',
    excerpt:
      'How structural engineering principles apply to storytelling in the modern digital age.',
    category: 'Narrative Architecture',
    mainImage: 'https://picsum.photos/seed/architecture/1920/1080',
    readTime: '7 min read',
    body: (
      <>
        <Prose>
          <p className="drop-cap">
            There is a moment in every building's life when it stops being a
            collection of materials and starts being a structure. Steel becomes
            skeleton. Glass becomes skin. Concrete becomes the quiet confidence
            that holds everything aloft. The same phase transition happens in
            storytelling — and most brands miss it entirely.
          </p>
          <p>
            We talk about brand narratives as though they are decorative. A coat
            of paint. A tagline bolted on at the last minute. But narrative is
            load-bearing. It is the invisible framework that determines whether a
            brand can support a single product or an entire portfolio, whether it
            can survive a market correction or collapse at the first sign of
            pressure.
          </p>
        </Prose>

        <PullQuote text="Narrative is load-bearing. It determines whether a brand can survive a market correction or collapse at the first sign of pressure." />

        <Prose>
          <p>
            Consider the difference between a house and a cathedral. Both provide
            shelter. Both have walls and roofs. But a cathedral tells you
            something the moment you step inside: you are small, and the thing
            you have entered is vast. That feeling is not an accident. It is
            engineered through proportion, light, and the deliberate arrangement
            of negative space.
          </p>
          <p>
            The brands that endure — the ones we study decades later — have
            cathedral architecture. They do not merely shelter a product. They
            create an experience of scale that makes the customer feel they have
            entered something larger than a transaction.
          </p>
        </Prose>

        <SectionDivider variant="marker" marker="§" />

        <Prose>
          <p>
            Structural engineering has a concept called the moment of inertia: a
            measure of an object's resistance to bending. The higher the moment,
            the more force required to deform the structure. Brand narratives
            have their own moment of inertia. A well-constructed story resists
            distortion. It holds its shape under competitive pressure, under
            changing consumer sentiment, under the relentless entropy of a
            market that forgets everything within eighteen months.
          </p>
          <p>
            The secret is redundancy — not in the pejorative sense, but in the
            engineering sense. A good structure has multiple load paths. If one
            element fails, the forces redistribute through the remaining
            framework. Similarly, a resilient brand narrative does not depend on
            a single message. It has layers: a founding myth, a set of
            principles, a visual language, a tone that persists even when
            specific campaigns expire.
          </p>
        </Prose>

        <FullBleedImage
          src="https://picsum.photos/seed/blueprint/1920/1080"
          alt="Architectural blueprint detail"
          caption="The blueprint phase: where story meets structure"
        />

        <Prose>
          <p>
            We begin every engagement at Protagonist Ink with what we call the
            structural audit. Before we write a single headline, before we
            choose a typeface or a color palette, we map the load paths. Where
            does meaning enter the system? Where does it accumulate? Where are
            the stress concentrations — the points where a single failure could
            bring the whole narrative down?
          </p>
          <p>
            Most of the time, the answer is uncomfortable. The load paths run
            through the founder's personal story, and the founder has never
            articulated it. Or the brand has accumulated contradictory messages
            over the years, and the structure is riddled with micro-fractures
            that no one has bothered to inspect.
          </p>
        </Prose>

        <SectionDivider variant="rule" />

        <Prose>
          <p>
            There is nothing romantic about structural work. It is painstaking.
            It requires patience with ambiguity and a willingness to sit with
            incomplete information. But the reward is a narrative that does not
            merely communicate — it supports. It carries weight. It lets the
            brand build upward with confidence, knowing the foundation can hold
            whatever comes next.
          </p>
          <p>
            Architecture is not what a building looks like. Architecture is what
            a building does. The same is true of narrative. The question is never
            "does this story sound good?" The question is: "can this story bear
            the load?"
          </p>
        </Prose>
      </>
    ),
  },
  {
    id: '2',
    title: 'Shadows in the System',
    slug: 'shadows-in-the-system',
    publishedAt: '2026-02-15',
    excerpt:
      'Identifying the unseen forces that shape user behavior and brand perception.',
    category: 'Founder Psychology',
    mainImage: null,
    readTime: '5 min read',
    body: (
      <>
        <Prose>
          <p className="drop-cap">
            Every system has shadows — the unexamined assumptions, the inherited
            biases, the invisible forces that shape outcomes without anyone
            noticing. In brand work, these shadows are the gap between what a
            company says and what a customer feels.
          </p>
          <p>
            Identifying them requires a different kind of attention. Not the
            sharp focus of a strategist hunting for competitive advantage, but
            the peripheral vision of someone willing to notice what everyone
            else has learned to ignore.
          </p>
        </Prose>
      </>
    ),
  },
  {
    id: '3',
    title: 'Precision Over Persuasion',
    slug: 'precision-over-persuasion',
    publishedAt: '2026-01-30',
    excerpt:
      'Why the era of marketing fluff is dead, and exactitude is the new currency.',
    category: 'AI & Human Craft',
    mainImage: 'https://picsum.photos/seed/noir2/1600/900',
    readTime: '6 min read',
    body: (
      <>
        <Prose>
          <p className="drop-cap">
            The marketing industry built its empire on persuasion — the art of
            making people want things they did not know they needed. But
            persuasion has a half-life, and we have reached the point of decay.
            Audiences are inoculated. They can smell the pitch before it arrives.
          </p>
          <p>
            What replaces persuasion is not its opposite but its evolution:
            precision. The ability to say exactly the right thing, to exactly the
            right person, at exactly the right moment. Not louder. Not cleverer.
            Just more exact.
          </p>
        </Prose>
      </>
    ),
  },
  {
    id: '4',
    title: 'The Geometry of Trust',
    slug: 'geometry-of-trust',
    publishedAt: '2026-01-12',
    excerpt:
      'Mapping the coordinates where brand promises meet consumer reality.',
    category: 'Narrative Architecture',
    mainImage: null,
    readTime: '4 min read',
    body: (
      <>
        <Prose>
          <p className="drop-cap">
            Trust is not a feeling. It is a geometry — a set of coordinates
            where promises, actions, and perceptions intersect. When these
            coordinates align, trust feels effortless. When they diverge, no
            amount of messaging can close the gap.
          </p>
          <p>
            The most common mistake in brand strategy is treating trust as
            something you earn through repetition. Say it enough times and they
            will believe you. But trust is not a volume game. It is a precision
            game, and the measurements must be exact.
          </p>
        </Prose>
      </>
    ),
  },
  {
    id: '5',
    title: 'Echoes in the Void',
    slug: 'echoes-in-the-void',
    publishedAt: '2025-12-05',
    excerpt:
      'When a brand speaks but no one listens: diagnosing the silent disconnect.',
    category: 'Founder Psychology',
    mainImage: 'https://picsum.photos/seed/noir5/1400/900',
    readTime: '5 min read',
    body: (
      <>
        <Prose>
          <p className="drop-cap">
            There is a particular kind of silence that follows a brand launch
            into an indifferent market. It is not the silence of failure — that
            at least has the dignity of a clear signal. It is the silence of
            irrelevance, and it is the most dangerous sound in business.
          </p>
          <p>
            The void does not mean your message was wrong. It means your message
            never arrived. The frequency was off, the timing was late, or the
            channel was so crowded that your signal dissolved into noise before
            it reached a single ear.
          </p>
        </Prose>
      </>
    ),
  },
  {
    id: '6',
    title: 'Calculated Risks',
    slug: 'calculated-risks',
    publishedAt: '2025-11-20',
    excerpt: 'A mathematical approach to creative leaps and brand evolution.',
    category: 'Field Notes',
    mainImage: 'https://picsum.photos/seed/noir3/1200/800',
    readTime: '3 min read',
    body: (
      <>
        <Prose>
          <p className="drop-cap">
            Every creative decision is a bet. The color you choose, the word you
            lead with, the silence you leave in the white space — each one is a
            wager against the audience's attention and the market's memory. The
            question is never whether to take risks, but which risks to take.
          </p>
          <p>
            Mathematics offers a useful frame. Expected value is not about any
            single outcome but the average of all possible outcomes weighted by
            their probability. The best creative work maximizes expected value
            by taking many small, intelligent risks rather than one catastrophic
            gamble.
          </p>
        </Prose>
      </>
    ),
  },
];
