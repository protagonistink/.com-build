import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for Protagonist Ink — governing use of protagonist.ink and internal tools.',
};

export default function TermsPage() {
  return (
    <main>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-trueblack pt-28 md:pt-32 pb-12 md:pb-16 border-b border-rust/40">
        <div className="max-w-[760px] mx-auto px-6">
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-4">
            — Legal
          </p>
          <h1
            className="font-display text-warmwhite font-normal leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)' }}
          >
            Terms of Service
          </h1>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-coolgray">
            Effective Date: March 28, 2026&nbsp;&nbsp;·&nbsp;&nbsp;Last Updated: March 28, 2026
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
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              What This Is
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              Protagonist Ink is a narrative strategy and brand consultancy operated by Patrick Kirkland. These terms govern your use of protagonist.ink and any internal tools we operate, including thecontinental.protagonist.ink.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              By accessing either, you agree to these terms. If you don&apos;t agree, don&apos;t use the site or tools.
            </p>
          </section>

          {/* Section: Services */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Services
            </p>
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              What We Do
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              Protagonist Ink provides narrative strategy, brand consultancy, content development, and internal business tooling. Our public website at protagonist.ink is informational. Our client dashboard at thecontinental.protagonist.ink is a private tool for active engagements.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              Access to the dashboard is by invitation only and governed by your client engagement agreement. Nothing on the public site constitutes an offer of services or creates a client relationship.
            </p>
          </section>

          {/* Section: Acceptable Use */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Acceptable Use
            </p>
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              What You Can and Can&apos;t Do
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              You may use our site and tools for lawful purposes. You may not:
            </p>
            <ul className="mb-4 space-y-1.5">
              {[
                'Scrape, copy, or reproduce our content without permission',
                'Reverse-engineer or attempt to access systems you aren\'t authorized to use',
                'Impersonate Protagonist Ink or its principals',
                'Use our tools to harass, harm, or deceive others',
                'Access workspaces or data that hasn\'t been explicitly granted to you',
              ].map((item) => (
                <li
                  key={item}
                  className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              We reserve the right to revoke access for violations without notice.
            </p>
          </section>

          {/* Section: Intellectual Property */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Intellectual Property
            </p>
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Who Owns What
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              All content on protagonist.ink — including copy, design, strategy frameworks, and brand assets — is owned by Protagonist Ink LLC. Nothing on this site transfers any intellectual property rights to you.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              Work product created for clients is governed by the applicable client agreement. If no agreement addresses ownership, all work product remains the property of Protagonist Ink LLC until full payment is received.
            </p>
          </section>

          {/* Section: Third-Party Services */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Third-Party Services
            </p>
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              What We Connect To
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              Our tools connect to third-party services to operate. Your use of those services is governed by their own terms and privacy policies:
            </p>
            <ul className="mb-4 space-y-1.5">
              {[
                'Google — authentication and workspace access',
                'LinkedIn — content and analytics integrations',
                'Meta (Facebook, Instagram) — content publishing and insights',
                'Plaid — financial account connections',
                'Buffer — content scheduling',
              ].map((item) => (
                <li
                  key={item}
                  className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              We are not responsible for the availability, conduct, or terms of any third-party service.
            </p>
          </section>

          {/* Section: Disclaimer */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Disclaimer
            </p>
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              No Warranties
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              The site and tools are provided as-is. Protagonist Ink makes no warranties — express or implied — about uptime, accuracy, completeness, or fitness for a particular purpose.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              We do our best work, but we can&apos;t guarantee that our tools will be available at all times or that results from our strategy work will meet any specific outcome. Use them at your own discretion.
            </p>
          </section>

          {/* Section: Limitation of Liability */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Limitation of Liability
            </p>
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Our Liability Is Limited
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              To the fullest extent permitted by law, Protagonist Ink LLC and its principals are not liable for any indirect, incidental, special, or consequential damages arising from your use of this site or our tools — including loss of data, revenue, or business opportunity.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85">
              Our total liability for any claim is limited to the amount you&apos;ve paid Protagonist Ink in the three months preceding the claim. If you haven&apos;t paid us anything, our liability is zero.
            </p>
          </section>

          {/* Section: Governing Law & Contact */}
          <section className="border-t border-ink/10 mt-14 pt-14">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
              Governing Law
            </p>
            <h2
              className="font-display font-medium leading-tight text-ink mb-5"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Legal Stuff
            </h2>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
              These terms are governed by the laws of the State of Georgia, without regard to conflict of law principles. Any disputes will be resolved in the courts of DeKalb County, Georgia.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-0">
              If any provision of these terms is found unenforceable, the remaining provisions stay in effect. These terms may be updated at any time — continued use of the site constitutes acceptance.
            </p>

            <div className="bg-trueblack border-l-2 border-rust px-8 py-6 mt-6">
              <p className="font-sans text-sm text-warmwhite font-medium mb-1">
                Protagonist Ink
              </p>
              <p className="font-sans text-sm text-warmwhite/70 mb-1">
                Operated by Patrick Kirkland
              </p>
              <p className="font-sans text-sm text-warmwhite/70">
                Email:{' '}
                <a
                  href="mailto:hello@protagonist.ink"
                  className="text-warmwhite border-b border-warmwhite/30 hover:border-warmwhite transition-colors duration-200"
                >
                  hello@protagonist.ink
                </a>
              </p>
            </div>
          </section>

        </div>
      </div>

    </main>
  );
}
