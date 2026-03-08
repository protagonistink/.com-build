import type { CaseStudy } from '@/types/work';

export const PROJECTS: CaseStudy[] = [
  {
    id: 1,
    slug: 'the-silent-whisper',
    scene: 'SCENE 01',
    ref: 'CASE-01',
    title: 'The Silent Whisper',
    subtitle: 'Nature vs. science. One doctrine, not two.',
    client: 'Aesop',
    sector: 'Beauty & Wellness',
    engagementType: 'Narrative Architecture',
    year: '2024',
    image: '/images/work/scene-01.png',
    imageAlt: 'A nocturnal study of texture and restraint',

    // Beat 1 — Cold Open
    coldOpen:
      'Aesop had earned its reputation through formulation rigor and retail atmosphere. But beneath the amber bottles and considered typography, the brand story was quietly fracturing — different teams telling different versions of the same belief system, none of them wrong, none of them complete.',

    // Beat 2 — Story Problem
    internalStory:
      'Inside the company, product teams described Aesop through botanical science. Retail teams described it through sensory ritual. Marketing bridged neither. Three valid narratives competing for the same brand, with no shared architecture to hold them.',
    externalPerception:
      'Customers experienced Aesop as refined but interchangeable with any premium skincare brand that used the word "botanical." The distinctiveness lived in the store, not in the story.',
    consequences:
      'Without a unifying narrative doctrine, every new product launch required reinventing the brand rationale. Expansion into new markets amplified the inconsistency. The brand was growing, but its meaning was thinning.',

    // Beat 3 — The World
    mentors: [
      {
        name: 'Head of Product Development',
        observation: 'Our formulations are arguments — each ingredient is there to prove something. But we never tell anyone what we are trying to prove.',
      },
      {
        name: 'Regional Retail Director',
        observation: 'The store experience converts people. But when they leave, they cannot articulate why they chose us over anyone else.',
      },
    ],
    villains: [
      {
        name: 'Category Convention',
        observation: 'Premium skincare defaults to aspiration and self-care language that flattens every brand into the same emotional territory.',
      },
      {
        name: 'Internal Fragmentation',
        observation: 'Each department had optimized its own version of the story. Alignment felt like loss of autonomy, so no one pursued it.',
      },
    ],

    // Beat 4 — The Reframe
    reframe:
      'Aesop is not a skincare brand that values nature. It is a company that treats daily routine as a practice — a deliberate, repeatable relationship with attention itself.',
    reframeAnnotation:
      'This reframe collapsed the nature-vs-science tension by elevating both into a single organizing principle: the practice of paying attention. Formulation rigor and sensory ritual became two expressions of the same belief.',

    // Beat 5 — Narrative Architecture
    artifacts: [
      {
        src: '/images/work/scene-01.png',
        alt: 'Doctrine system overview',
        label: 'FIG. 01',
        description: 'The Practice Doctrine — a single-page narrative architecture mapping formulation, retail, and messaging to one strategic spine.',
      },
      {
        src: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=2600',
        alt: 'Retail narrative surface',
        label: 'FIG. 02',
        description: 'Copy system applied to retail signage — translating the doctrine into the physical space without losing precision.',
      },
      {
        src: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=2600',
        alt: 'Product narrative framework',
        label: 'FIG. 03',
        description: 'Product description framework — each SKU positioned as evidence of the practice, not as a standalone benefit claim.',
      },
    ],

    // Beat 6 — Execution
    executionSurfaces: [
      {
        surface: 'Brand Narrative Doctrine',
        description: 'A foundational document that unified product, retail, and marketing language under one strategic spine. Distributed as a reference system, not a brand book.',
      },
      {
        surface: 'Product Copy System',
        description: 'Rewritten descriptions for 40+ SKUs, each structured to connect formulation rationale to the practice-of-attention framework.',
      },
    ],

    // Beat 7 — The Shift
    shifts: [
      {
        dimension: 'Internal Alignment',
        change: 'Three competing narratives collapsed into one shared doctrine that each department could extend without contradiction.',
      },
      {
        dimension: 'Customer Articulation',
        change: 'Post-purchase surveys showed customers could now describe why they chose Aesop in language that matched the brand\'s own positioning.',
      },
      {
        dimension: 'Launch Efficiency',
        change: 'New product launches no longer required narrative reinvention — the doctrine provided a repeatable framework for positioning.',
      },
    ],
    metrics: [
      {
        label: 'Narrative alignment score',
        value: '34% to 91% across departments',
      },
      {
        label: 'Product launch brief cycle time',
        value: 'Reduced from 6 weeks to 2 weeks',
      },
    ],

    // SEO + Listing
    description: 'Nature versus science, reframed into one coherent system of belief.',
    category: 'Narrative Architecture',
    tagline: 'Nature vs. science. One doctrine, not two.',
  },
  {
    id: 2,
    slug: 'midnight-oil',
    scene: 'SCENE 02',
    ref: 'CASE-02',
    title: 'Midnight Oil',
    subtitle: 'Algorithm vs. intention. Scale that remembers why.',
    client: 'Spotify',
    sector: 'Technology',
    engagementType: 'Strategic Messaging',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2600',
    imageAlt: 'A motion-heavy frame study designed to hold noise, rhythm, and editorial restraint',

    // Beat 1 — Cold Open
    coldOpen:
      'Spotify had won the access war. Seventy million songs, available anywhere, anytime. But winning access created a new problem: when everything is available, nothing feels chosen. The platform that democratized music was quietly eroding the act of caring about it.',

    // Beat 2 — Story Problem
    internalStory:
      'Product teams optimized for engagement metrics — time-on-platform, skip rates, playlist saves. These numbers moved, but they measured consumption, not connection. The internal story was about scale. Nobody was measuring meaning.',
    externalPerception:
      'Artists saw Spotify as a distribution channel, not a partner. Listeners described it as convenient but forgettable — a utility, not a relationship. The brand was everywhere and about nothing.',
    consequences:
      'Without a narrative that connected algorithmic scale to human intention, Spotify was vulnerable to any competitor that could tell a better story about why music matters — even with inferior technology.',

    // Beat 3 — The World
    mentors: [
      {
        name: 'VP of Creator Partnerships',
        observation: 'Artists do not want more listeners. They want listeners who stay. We have the data to enable that relationship, but we have never framed it as our purpose.',
      },
      {
        name: 'Senior Product Designer',
        observation: 'Every feature we build makes discovery easier. None of them make commitment easier. We are optimizing the wrong moment in the listener journey.',
      },
    ],
    villains: [
      {
        name: 'The Convenience Trap',
        observation: 'Streaming platforms compete on access and ease. This frames music as a commodity and the platform as infrastructure — invisible and replaceable.',
      },
      {
        name: 'Metric Myopia',
        observation: 'Engagement metrics rewarded passive listening. Active choice, repeat commitment, and artist loyalty were unmeasured and therefore unvalued.',
      },
    ],

    // Beat 4 — The Reframe
    reframe:
      'Spotify is not where you find music. It is where discovery becomes commitment — for listeners and for artists.',
    reframeAnnotation:
      'This reframe repositioned the algorithm from a convenience engine to a commitment engine. It gave product, marketing, and creator teams a shared definition of success: not just plays, but returns.',

    // Beat 5 — Narrative Architecture
    artifacts: [
      {
        src: 'https://images.unsplash.com/photo-1514525253361-bee8a187499b?auto=format&fit=crop&q=80&w=2600',
        alt: 'Commitment framework overview',
        label: 'FIG. 01',
        description: 'The Commitment Framework — a narrative model connecting listener behavior, artist value, and platform positioning around the concept of return visits.',
      },
      {
        src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=2600',
        alt: 'Creator trust messaging',
        label: 'FIG. 02',
        description: 'Creator Trust Messaging — language system for artist-facing communications that frames Spotify as a partner in listener commitment, not just distribution.',
      },
    ],

    // Beat 6 — Execution
    executionSurfaces: [
      {
        surface: 'Cross-Functional Messaging Framework',
        description: 'A strategic narrative reset delivered to product, marketing, and creator partnership teams. Unified the internal vocabulary around commitment rather than consumption.',
      },
      {
        surface: 'Creator Communication Templates',
        description: 'Rewritten outreach and reporting templates for artist relations, repositioning data insights as evidence of listener commitment rather than raw play counts.',
      },
    ],

    // Beat 7 — The Shift
    shifts: [
      {
        dimension: 'Brand Perception',
        change: 'Shifted from "convenient music utility" to "the platform where listeners and artists build lasting relationships."',
      },
      {
        dimension: 'Internal Language',
        change: 'Cross-functional teams adopted "commitment" as a shared success metric, replacing the fragmented vocabulary of engagement, retention, and growth.',
      },
      {
        dimension: 'Creator Sentiment',
        change: 'Artist satisfaction with platform communications improved measurably within two quarters of the messaging reset.',
      },
    ],
    metrics: [
      {
        label: 'Creator partnership response rate',
        value: 'Up 28% post-messaging reset',
      },
      {
        label: 'Internal narrative alignment',
        value: '5 teams using one framework (previously 5 separate narratives)',
      },
    ],

    // SEO + Listing
    description: 'Where algorithmic scale and human intention stop competing.',
    category: 'Strategic Messaging',
    tagline: 'Algorithm vs. intention. Scale that remembers why.',
  },
];

export function getProjectBySlug(slug: string): CaseStudy | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}
