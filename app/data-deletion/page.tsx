import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Data Deletion',
  description: 'Request deletion of your data from Protagonist Ink tools and connected social accounts.',
};

export default async function DataDeletionPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;

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
            Data Deletion
          </h1>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-coolgray">
            Your data. Your call.
          </p>
        </div>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div className="bg-warmwhite text-ink">
        <div className="max-w-[760px] mx-auto px-6 py-16 md:py-20">

          {code ? (
            /* ── Status view: confirmation code present ── */
            <section>
              <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
                Request Received
              </p>
              <h2
                className="font-display font-medium leading-tight text-ink mb-5"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                Your deletion request is being processed.
              </h2>
              <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
                All associated data will be removed within 30 days. Keep the confirmation code below for your records.
              </p>

              {/* Confirmation code block */}
              <div className="bg-trueblack border-l-2 border-rust px-8 py-6 mt-6 mb-6">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-2">
                  Confirmation Code
                </p>
                <p className="font-mono text-warmwhite text-sm tracking-widest break-all">
                  {code}
                </p>
              </div>

              <p className="font-sans text-[15px] leading-relaxed text-ink/85">
                If you have questions, contact{' '}
                <a
                  href="mailto:hello@protagonist.ink"
                  className="text-rust border-b border-rust/30 hover:border-rust transition-colors duration-200"
                >
                  hello@protagonist.ink
                </a>.
              </p>
            </section>

          ) : (
            /* ── Default view: policy copy ── */
            <>

              {/* Section: What we store */}
              <section>
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
                  What We Store
                </p>
                <h2
                  className="font-display font-medium leading-tight text-ink mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  Data connected to your account
                </h2>
                <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
                  If you&rsquo;ve connected a social account or logged in through a third-party service (like Facebook or Instagram) while working with Protagonist Ink, here&rsquo;s what we collect and what you can do about it.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
                  When you authorize a social connection through this dashboard, we may retain:
                </p>
                <ul className="mb-4 space-y-1.5">
                  {[
                    'Your name and email address',
                    'Profile information from connected accounts',
                    'Content you\'ve created or scheduled through the dashboard',
                    'Basic usage data (what was posted, when, from which account)',
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
                  We don&rsquo;t sell this data. We don&rsquo;t share it with third parties outside of the integrations you explicitly authorize. It lives in our system to do one job: help manage the content work we&rsquo;ve agreed to do together.
                </p>
              </section>

              {/* Section: Requesting deletion */}
              <section className="border-t border-ink/10 mt-14 pt-14">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
                  Requesting Deletion
                </p>
                <h2
                  className="font-display font-medium leading-tight text-ink mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  How to remove your data
                </h2>
                <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
                  If you want your data removed — all of it — send a request to{' '}
                  <a
                    href="mailto:hello@protagonist.ink?subject=Data%20Deletion%20Request"
                    className="text-rust border-b border-rust/30 hover:border-rust transition-colors duration-200"
                  >
                    hello@protagonist.ink
                  </a>{' '}
                  with the subject line <strong className="font-medium text-ink">Data Deletion Request</strong>.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
                  Include the name and email address associated with your account or social connection. We&rsquo;ll confirm receipt within 48 hours and complete the deletion within 30 days.
                </p>
                <p className="font-sans text-[15px] leading-relaxed text-ink/85">
                  When the request is fulfilled, you&rsquo;ll receive a confirmation with a tracking code for your records.
                </p>
              </section>

              {/* Section: Revoking social access */}
              <section className="border-t border-ink/10 mt-14 pt-14">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
                  Revoking Access
                </p>
                <h2
                  className="font-display font-medium leading-tight text-ink mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  Disconnect Facebook or Instagram
                </h2>
                <p className="font-sans text-[15px] leading-relaxed text-ink/85 mb-4">
                  You can revoke Protagonist Ink&rsquo;s access to your Facebook or Instagram accounts directly through Meta&rsquo;s settings at any time:
                </p>
                <ul className="mb-4 space-y-1.5">
                  <li className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                    <a
                      href="https://www.facebook.com/settings?tab=applications"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rust border-b border-rust/30 hover:border-rust transition-colors duration-200"
                    >
                      Facebook Apps and Websites Settings
                    </a>
                  </li>
                  <li className="relative pl-5 font-sans text-[15px] leading-relaxed text-ink/85
                    before:content-['—'] before:absolute before:left-0 before:text-rust before:font-light">
                    <a
                      href="https://www.instagram.com/accounts/manage_access/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rust border-b border-rust/30 hover:border-rust transition-colors duration-200"
                    >
                      Instagram Authorized Apps
                    </a>
                  </li>
                </ul>
                <p className="font-sans text-[15px] leading-relaxed text-ink/85">
                  Revoking access stops future data collection. If you also want existing data removed, follow the deletion request process above.
                </p>
              </section>

              {/* Section: Questions */}
              <section className="border-t border-ink/10 mt-14 pt-14">
                <p className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-rust mb-3">
                  Questions
                </p>
                <h2
                  className="font-display font-medium leading-tight text-ink mb-5"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                >
                  Get in touch
                </h2>
                <div className="bg-trueblack border-l-2 border-rust px-8 py-6">
                  <p className="font-sans text-sm text-warmwhite font-medium mb-1">
                    Protagonist Ink
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

            </>
          )}

        </div>
      </div>

    </main>
  );
}
