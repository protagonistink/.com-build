import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, url, miss, stage } = body;

    // Validate required fields
    if (!name || !email || !url) {
      return NextResponse.json(
        { error: 'Name, email, and review URL are required.' },
        { status: 400 }
      );
    }

    const notionToken = process.env.NOTION_TOKEN;
    const notionDatabase = process.env.NOTION_DATABASE_ID;

    if (!notionToken || !notionDatabase) {
      console.error('Missing Notion credentials in environment variables');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: notionDatabase },
        properties: {
          Name: {
            title: [{ text: { content: name } }],
          },
          Email: {
            email: email,
          },
          'Company & One-liner': {
            rich_text: [{ text: { content: company || '' } }],
          },
          'Review URL': {
            url: url,
          },
          'What Prospects Miss': {
            rich_text: [{ text: { content: miss || '' } }],
          },
          Stage: {
            select: { name: stage || 'Other' },
          },
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Notion API error:', errorBody);
      return NextResponse.json(
        { error: 'Failed to submit to Notion.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('loom-submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
