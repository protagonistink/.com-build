import {revalidatePath} from 'next/cache';
import {NextRequest, NextResponse} from 'next/server';

interface SanityWebhookBody {
  _type?: string;
  slug?: {
    current?: string;
  };
}

export async function POST(request: NextRequest) {
  const secret =
    request.headers.get('x-revalidate-secret') || request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.SANITY_REVALIDATE_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({message: 'Invalid revalidation secret'}, {status: 401});
  }

  const body = (await request.json().catch(() => ({}))) as SanityWebhookBody;
  const slug = body.slug?.current;
  const type = body._type;

  revalidatePath('/');
  revalidatePath('/work');

  if (type === 'caseStudy' && slug) {
    revalidatePath(`/work/${slug}`);
  }

  if (type === 'post') {
    revalidatePath('/blog');

    if (slug) {
      revalidatePath(`/blog/${slug}`);
    }
  }

  return NextResponse.json({
    revalidated: true,
    type: type || null,
    slug: slug || null,
  });
}
