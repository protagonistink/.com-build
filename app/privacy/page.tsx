import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Protagonist Ink — covering LinkedIn integration, Plaid financial data, and internal tooling.',
};

export default function PrivacyPage() {
  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-trueblack pt-28 md:pt-32 pb-12 md:pb-16 border-b border-rust/40">
        <div className="max-w-[760px] mx-auto px-6">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-4">
            — Legal
          </p>
          <h1 className="font-display text-warmwhite font-normal leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}>
            Privacy Policy
          </h1>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-coolgray">
            Effective Date: March 27, 2026&nbsp;&nbsp;·&nbsp;&nbsp;Last Updated: March 27, 2026
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="bg-warmwhite text-ink">
        <div className="max-w-[760px] mx-auto px-6 py-16 md:py-20">

          {/* Section: Overview */}
          <section>
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Overview
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              What This Is
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              Protagonist Ink is a narrative strategy and brand consultancy operated by Patrick Kirkland. This privacy policy covers the tools and applications we operate internally — including our business dashboard, LinkedIn integration, and financial data connections.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              These tools are primarily used by Protagonist Ink operators for internal business purposes. We are not a consumer product. We do not sell your data. We do not run ads. This policy exists to be honest about what we collect and why.
            </p>
          </section>

          {/* Section: LinkedIn */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              LinkedIn Integration
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Data We Collect via LinkedIn
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              When LinkedIn OAuth is connected to our internal dashboard, we may access and store the following:
            </p>
            <ul className="mb-4 space-y-1.5">
              {[
                'Basic profile information (name, profile photo, headline, LinkedIn URL)',
                'Content you\'ve published on LinkedIn (posts, articles, engagement data)',
                'Analytics associated with your LinkedIn presence (impressions, engagement rates, follower data)',
                'Connection and audience data as made available through the LinkedIn API',
              ].map((item) => (
                <li key={item}
                  className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              We use this data solely to power internal content strategy and business development tooling. We do not share it with third parties, use it for advertising, or disclose it to any outside service.
            </p>
          </section>

          {/* Section: Financial Data */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Financial Data
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Data We Collect via Plaid
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              If and when financial account connections are enabled through Plaid, we may access:
            </p>
            <ul className="mb-4 space-y-1.5">
              {[
                'Account balances and transaction history',
                'Account identifiers (institution name, account type)',
                'Income and cash flow patterns for internal financial planning',
              ].map((item) => (
                <li key={item}
                  className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              Financial data is used exclusively for internal business financial management. It is never shared with third parties, never sold, and never used for any purpose beyond the internal tools of Protagonist Ink. Plaid&rsquo;s own privacy policy governs how they handle data at the connection layer — you can review it at{' '}
              <a
                href="https://plaid.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rust border-b border-rust/30 hover:border-rust transition-colors duration-200">
                plaid.com/legal/privacy-policy
              </a>.
            </p>
          </section>

          {/* Section: Usage Data */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Usage Data
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              How We Use What We Collect
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              Data collected through any connected service is used only for:
            </p>
            <ul className="mb-4 space-y-1.5">
              {[
                'Operating internal dashboards and tools',
                'Informing content strategy and business planning',
                'Understanding business performance metrics',
              ].map((item) => (
                <li key={item}
                  className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              We do not use your data to build advertising profiles, sell to third parties, train AI models, or share with any external vendor beyond the platforms explicitly named in this policy.
            </p>
          </section>

          {/* Section: Data Retention */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Data Retention
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              How Long We Keep It
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              We retain connected data only as long as it serves active operational purposes. You may request deletion of any stored data at any time by contacting us directly. Upon request, we will remove your data from our systems within 30 days.
            </p>
          </section>

          {/* Section: Third Parties */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Third Parties
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              External Services
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              Our tools connect to the following external platforms, each governed by their own privacy policies:
            </p>
            <ul className="mb-4 space-y-1.5">
              <li className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                <a
                  href="https://www.linkedin.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rust border-b border-rust/30 hover:border-rust transition-colors duration-200">
                  LinkedIn
                </a>
                {' '}— profile, content, and analytics data
              </li>
              <li className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                <a
                  href="https://plaid.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rust border-b border-rust/30 hover:border-rust transition-colors duration-200">
                  Plaid
                </a>
                {' '}— financial account connections
              </li>
            </ul>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              We do not sell data to, or purchase data from, any third-party data brokers.
            </p>
          </section>

          {/* Section: Your Rights */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Your Rights
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              What You Can Do
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              You have the right to:
            </p>
            <ul className="mb-4 space-y-1.5">
              {[
                'Request access to any data we hold associated with your account or connection',
                'Request correction of inaccurate data',
                'Request deletion of your data',
                'Revoke OAuth access at any time through LinkedIn or Plaid\'s respective account settings',
              ].map((item) => (
                <li key={item}
                  className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              To exercise any of these rights, reach out directly.
            </p>
          </section>

          {/* Section: Contact */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Contact
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Questions or Requests
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-0">
              This policy is maintained by Patrick Kirkland, Protagonist Ink.
            </p>

            {/* Contact block */}
            <div className="bg-trueblack border-l-2 border-rust px-8 py-6 mt-6">
              <p className="font-sans text-sm text-warmwhite font-medium mb-1">
                Protagonist Ink
              </p>
              <p className="font-sans text-sm text-warmwhite/70 mb-1">
                Operated by Patrick Kirkland
              </p>
              <p className="font-sans text-sm text-warmwhite/70 mb-1">
                Web:{' '}
                <a
                  href="https://protagonist.ink"
                  className="text-warmwhite border-b border-warmwhite/30 hover:border-warmwhite transition-colors duration-200">
                  protagonist.ink
                </a>
              </p>
              <p className="font-sans text-sm text-warmwhite/70">
                Email:{' '}
                <a
                  href="mailto:hello@protagonist.ink"
                  className="text-warmwhite border-b border-warmwhite/30 hover:border-warmwhite transition-colors duration-200">
                  hello@protagonist.ink
                </a>
              </p>
            </div>
          </section>

          {/* Section: Updates */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Updates
            </p>
            <h2 className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
              Changes to This Policy
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              If this policy changes in any meaningful way, we&rsquo;ll update the effective date above. For connected third-party services, we recommend reviewing their policies directly as those are outside our control.
            </p>
          </section>

        </div>
      </div>

    </main>
  );
}
