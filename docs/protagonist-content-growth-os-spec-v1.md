# PROTAGONIST INK

## Content & Growth OS

Full Product Specification — v1.0  
Prepared for Patrick Kirkland  
Internal Use Only

## 01. Overview

Protagonist Ink Content & Growth OS is an internal operating system for planning, executing, and learning from social media content across Protagonist Ink and client workspaces.

This is not a content calendar. It is a working system for moving ideas from raw thought to published post, then turning outcomes into usable intelligence. The goal is not simply to stay organized. The goal is to build momentum, reduce friction, and create a growing record of what actually performs.

The product is built for a solo operator managing multiple content pipelines at once, with room for additional collaborators later without changing the core architecture.

Core stack:

- Platform: Next.js + Vercel
- Database: Supabase (PostgreSQL + Storage)
- Auth: NextAuth with Google
- Publishing: Buffer, used as execution layer only
- Performance: LinkedIn API + Meta Graph API
- URL: `ops.protagonist.ink` (proposed)
- Access: Internal only

AI drafting is intentionally excluded from v1. The system should be structurally ready for it, but not dependent on it.

## 02. Product Principle

The OS has one job: make social content easier to make, easier to ship, and easier to learn from.

That means:

- The app owns workflow, structure, approvals, intelligence, and reporting.
- Buffer handles publishing execution, not product logic.
- Workspaces are fully isolated.
- Metrics are used to support judgment, not replace it.
- The interface should reduce drag, not create ceremony.

## 03. Workspaces

Every post, asset, metric, campaign, template, connection, and report belongs to a workspace.

Workspaces are fully isolated. Switching workspaces changes the entire operating context: content, accounts, approvals, metrics, tags, campaigns, and settings. Nothing crosses that boundary unless explicitly exported.

Default workspaces:

- Protagonist Ink: permanent default workspace, cannot be deleted
- Decoda: active client workspace, approval workflow enabled
- Future clients: created through onboarding wizard

Each workspace can support more than one destination account per platform. This matters for clients who may want to publish to a company account, founder account, Instagram account, or additional channels later. The architecture should not assume a one-account-per-platform ceiling.

Each workspace includes three layers:

- Content Pipeline
- Performance Intelligence
- Paid Media Tracking

## 04. Account Connections

Workspace connections are managed independently.

Supported v1 connections:

- Buffer
- LinkedIn
- Meta Graph API

Connection rules:

- Buffer is the publishing pipe. The OS sends schedule intent to Buffer and receives publish confirmations or failures back.
- LinkedIn and Meta are used for post-level and account-level performance data.
- Each workspace may connect multiple publishing destinations where supported.
- Instagram features require a Business or Creator account. Personal accounts are not supported.

The product must handle:

- initial connection
- token refresh
- expired or revoked tokens
- reconnect flow
- connection health status in workspace settings
- platform capability gaps surfaced clearly in the UI

## 05. Layer 1 — Content Pipeline

The pipeline is the primary working surface.

It is a Kanban system for every post in motion: idea, draft, review, approval, schedule, live history, and archive. The board is not just a visual list. It is the state machine of the product.

### Pipeline Columns

Protagonist Ink workspace:

- IDEA
- DRAFT
- READY
- SCHEDULED
- LIVE

Client workspaces with approval enabled:

- IDEA
- DRAFT
- IN REVIEW
- APPROVED
- SCHEDULED
- LIVE

Archived posts are removed from the active board but remain queryable in history.

### Post Record

Every post should carry a complete structured record, not just a block of copy.

Required core fields:

- workspace
- status
- platform
- destination account
- format
- draft copy
- campaign
- topic tag
- scheduled date/time
- timezone
- draft source
- repurpose parent/sibling link
- draft age

Structured publishing fields:

- CTA
- destination URL
- UTM parameters
- hashtags
- mentions
- first comment
- alt text

Media fields:

- attached assets
- asset type
- cover image / thumbnail where relevant
- media order
- platform-specific validation state

Support fields:

- internal notes
- review note from client when changes are requested
- version history
- publish error state
- external platform post ID / URL

The point is simple: if a post is genuinely ready to schedule, the system should have what the platform needs without forcing everything into the body copy.

### Post Actions

- create from scratch
- create from template
- quick capture into IDEA
- drag across columns to update state
- edit in modal or detail view
- duplicate
- repurpose into sibling post on another platform
- send for review
- approve
- request changes
- schedule
- reschedule
- unschedule
- archive
- mark manually published
- attach existing live post to workspace history

### Editing and History

Posts remain editable after publishing. What becomes fixed is the historical record of what version was approved and what version was ultimately published.

The system should preserve:

- draft revision history
- review request history
- approval event history
- published version snapshot
- later metadata edits without destroying the original record

### Draft Aging

Posts inactive for 14+ days are visually flagged as stale. The system surfaces drift without turning into a nagging machine.

## 06. Idea Capture

Idea capture should be permanent, visible, and frictionless.

Each pipeline view includes a persistent quick-entry field that creates a post in IDEA with the current workspace already selected.

At capture time, only raw text is required. Platform, account, tag, campaign, and format can all be blank. The purpose is to catch the thought before it disappears.

## 07. Campaigns and Content Arcs

A campaign is a named narrative or strategic arc that groups related posts over time.

Campaign fields:

- name
- description
- start date
- end date
- workspace
- active / complete status

Campaign behavior:

- any post can belong to a campaign
- repurposed siblings inherit the campaign by default
- campaign view shows all posts across statuses and platforms
- performance rolls up to campaign level

The system should make it easy to answer a better question than “which post did well?” It should answer “which arc is proving durable?”

## 08. Templates

Templates are reusable post structures built from what actually works.

A template is not generic prompt sludge. It is a scaffold: opening move, internal rhythm, close.

Template fields:

- name
- platform
- format
- tag
- template body
- source post reference

Template behavior:

- save any post as template
- create new post from template
- track performance of posts created from that template
- compare templates over time

## 09. Review and Approval

Approval is lightweight by design.

Posts in `IN REVIEW` generate a shareable review link with no client login required. The review covers the whole package:

- copy
- media
- scheduled time
- platform/account destination

Client options:

- Approve
- Request Changes

Request Changes includes a single comment box. No inline commenting in v1.

Approval rules:

- review links are tied to a specific draft version
- if the draft changes after the link is generated, the old link becomes invalid
- outdated links return a clear message that the draft has changed
- approval moves the post to `APPROVED`
- request changes moves the post back to `DRAFT` and stores the client comment in the record

The system should preserve a clean audit trail of what was approved and when.

## 10. Scheduling and Publishing

The OS is the source of truth for scheduling intent. Buffer is the execution layer.

That means:

- scheduling happens inside the OS
- the OS sends the post package to Buffer
- Buffer handles platform delivery
- the OS records success, failure, and state changes
- the OS does not depend on manual edits inside Buffer

If edits happen in Buffer, the OS may surface a sync warning, but Buffer should not become the authoritative planning interface.

### Publishing States

Distinct statuses are required. Publishing should not collapse into one generic error condition.

Suggested schedule and publishing states:

- `READY`
- `SCHEDULE_PENDING`
- `SCHEDULED`
- `SCHEDULE_FAILED`
- `PUBLISH_PENDING`
- `LIVE`
- `PUBLISH_FAILED`
- `NEEDS_RESYNC`

These may appear as card badges or sub-statuses rather than full board columns, but they should exist in the data model.

### Publishing Requirements

- schedule by workspace timezone
- support rescheduling
- support unscheduling
- support publish failure and retry
- support manual attach of a live post if something was published outside the tool
- store Buffer job identifiers and external platform post identifiers
- store publish error messages

## 11. Posting Cadence

The common failure mode is not bad content. It is dead air.

The cadence layer makes silence visible.

Required views:

- “last posted X days ago” per platform
- 30-day posting history strip
- visual gap highlights for 7+ days
- current week planning view showing empty days

Cadence is a signal, not an alarm system.

## 12. Instagram Grid Planner

Instagram is partly editorial calendar, partly storefront window. The grid planner exists to preview sequence, variety, and visual rhythm before publishing.

v1 behavior:

- 3-column grid view
- combines recent live posts and scheduled posts
- scheduled posts visibly distinguished from live posts
- drag to reorder scheduled items
- isolated per workspace

v1 uses placeholder tiles rather than full media preview where needed. Media preview can be added later, but the data model should already support attached assets and thumbnails so the product does not need to be rethought to get there.

## 13. Weekly Planning Session

The product should support a weekly planning ritual rather than just storing content.

The weekly session view answers:

- What is going out this week?
- What is still in draft?
- What needs to be created?

The session should make these actions easy:

- confirm, reschedule, or pull scheduled posts
- move strong drafts forward
- create new posts from idea or template
- fill visible cadence gaps

Mobile support for v1 only needs to handle triage. Full planning and structural editing should remain desktop-first.

## 14. Layer 2 — Performance Intelligence

Every live post should generate a performance record automatically.

This layer exists to build judgment over time, not to create a fake sense of precision.

### Performance Model

Each live post should support:

- current live totals
- Day 1 snapshot
- Day 7 snapshot

This gives both a current view and a durable comparative record. Some posts spike immediately. Others compound. Both patterns matter.

### Data Capture

Performance data is pulled through LinkedIn and Meta APIs on a recurring schedule.

The system must support:

- scheduled pulls
- retry on missed jobs
- backfill when possible
- raw data storage where useful
- snapshot storage for Day 1 and Day 7
- manual override or manual attach when data is missing or a post was published outside the main flow

### Metrics That Matter

For a business-facing social practice, v1 should prioritize metrics in this order:

1. inbound conversations, inquiries, and DMs
2. link clicks and profile-action clicks
3. saves, shares, and meaningful comments
4. engagement rate
5. follower growth at workspace/account level
6. impressions and reach

Impressions matter, but they are not the headline metric.

Follower growth should be treated as account-level trend context, not as a falsely precise per-post claim.

### Core Metrics

Store raw fields where available:

- impressions
- reach
- likes
- comments
- shares
- saves
- clicks
- profile visits
- follower change at account level

Derived fields:

- engagement count
- engagement rate
- click-through rate where supported
- performance vs workspace average
- performance vs campaign average
- performance vs template average

Inbound lead / DM should remain a manual flag in v1.

### Intelligence Layer

Over time, the system should surface:

- best-performing formats by platform
- best-performing tags
- best-performing campaigns
- best-performing templates
- best day/time patterns
- posts above personal baseline
- front-loaded vs slow-burn behavior
- repurpose sibling comparisons across platforms

Benchmarks can be used initially, but the product should progressively privilege workspace-specific performance over generic industry averages.

## 15. Reporting

The reporting layer should produce a clean performance page that can be opened anytime, not just an export artifact.

v1 reporting should support:

- workspace overview
- platform overview
- campaign overview
- recent live posts
- top-performing posts
- cadence summary
- growth summary
- paid media summary when enabled

Export support for CSV and lightweight share/export formats is useful in v1, but the primary reporting experience should be the in-app performance page.

## 16. Search, Filters, and Views

Once the content library grows, the pipeline needs retrieval, not just columns.

Required filters:

- platform
- destination account
- status
- campaign
- topic tag
- template-used
- stale posts
- scheduled date range
- awaiting approval

Search should support copy, campaign name, and tag lookup.

## 17. Layer 3 — Paid Media Tracking

Paid media belongs in v1, but with the right level of ambition.

This should be a disciplined operational layer, not a pseudo-enterprise media dashboard.

The purpose is to help Protagonist Ink make better paid media decisions, learn over time, and create a trustworthy client view when paid campaigns are in play.

### v1 Position

Paid media tracking is manual-entry first.

Live ad platform integrations are deferred. The product should support them later, but v1 should focus on clean structure and useful interpretation.

### Paid Media Record

Per campaign, store:

- workspace
- platform
- destination account
- campaign name
- objective
- audience
- creative angle
- landing page
- date range
- spend
- impressions
- clicks
- CTR
- CPC
- conversions / leads
- cost per conversion
- revenue, if attributable
- ROAS, if meaningful
- notes
- active / paused status

### Paid Media Principles

- objective must be explicit
- conversions must be defined, not implied
- ROAS should only be foregrounded when revenue attribution is credible
- in many client contexts, cost per lead or qualified inquiry volume will matter more than ROAS

### Paid Media Dashboard

Show:

- total spend
- active campaigns
- clicks
- CTR
- cost efficiency
- conversions
- spend vs results summary

The interface should help a growing operator make sane decisions, not perform mastery.

## 18. Client Onboarding

New clients are created through a setup wizard.

Setup steps:

- client name and brand
- active platforms
- destination accounts
- topic and theme tags
- approval workflow on/off
- paid media tracking on/off
- north star metrics
- connection setup
- workspace created

Instagram rule:

- personal Instagram accounts are unsupported
- Instagram features remain disabled until Business or Creator status is confirmed

## 19. Visual Direction

The product should feel like a well-lit edit suite at night: focused, durable, cinematic without becoming theatrical.

Core surface hierarchy:

- primary working surface: `#2C2C2C`
- secondary surface / cards: `#363636`
- deep surface: `#0A0A0A`
- primary text: `#FAFAFA`
- secondary text: `#9C9EA2`
- accent: `#C83C2F`

Typography:

- Cormorant Garamond for display and section headings
- Satoshi for UI labels, body copy, and metadata

Design rules:

- accent is used sparingly
- hierarchy comes from surface contrast, not gratuitous shadow
- desktop is the primary workspace
- mobile supports triage, not full production

## 20. Platform Support

v1:

- LinkedIn
- Instagram

Supported by architecture but hidden:

- Twitter / X

Deferred:

- newsletter workflows
- article-to-social workflows
- direct publishing without Buffer
- deeper client portal
- AI drafting
- native mobile app

## 21. AI Drafting Readiness

AI is out of scope for v1, but the system should be structurally prepared for it.

The post schema includes `draft_source` from day one:

- `manual`
- `ai_assisted`
- `template`

When AI arrives later, it should be workspace-aware, voice-aware, platform-aware, and format-aware. The product should not permit generic output detached from the logic of the workspace.

## 22. Build Sequence

The product should be useful after the first session, not only after the final one.

Suggested build order:

1. Foundation: app scaffold, auth, database, workspace model, pipeline, storage, Buffer integration shell
2. Post system: full post schema, assets, templates, campaigns, filters, draft history
3. Scheduling: Buffer execution, publishing states, failure handling, manual attach flow
4. Review: approval links, request-changes loop, audit trail
5. Performance: live totals, Day 1 and Day 7 snapshots, retries, reporting page foundation
6. Intelligence: baseline comparisons, template/campaign/tag insights, cadence tools
7. Instagram planning: grid planner, reorder flow, weekly planning view
8. Clients: onboarding wizard, multi-account handling, workspace settings
9. Paid media: manual campaign tracking, dashboard, reporting integration
10. Future expansion: direct publishing, ad platform APIs, AI drafting, fuller client portal

## 23. Deferred, Not Forgotten

These are intentionally outside v1 but should not be blocked by the architecture:

- deeper client-facing portal
- direct platform publishing without Buffer
- newsletter repurposing
- website / blog repurposing
- richer media preview
- hashtag library management
- multi-user collaboration
- native mobile app

## 24. Summary

Content & Growth OS is a working editorial system for social media operations across Protagonist Ink and client workspaces.

Its job is to:

- move content from idea to published post
- reduce scheduling and approval friction
- preserve a usable historical record
- show what is working
- support client work without cross-contamination
- give paid media a real operating layer without overstating certainty

The product should feel less like software for “managing social” and more like an actual studio system for keeping the work moving.
