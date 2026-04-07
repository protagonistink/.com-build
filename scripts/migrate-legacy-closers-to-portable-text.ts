import {getCliClient} from 'sanity/cli'

type LegacyCloser = {
  _id: string
  title?: string
  closers?: Array<{
    _key: string
    text?: string
    body?: unknown
  }>
}

const client = getCliClient({
  apiVersion: '2026-03-02',
})

function toPortableText(text: string) {
  return [
    {
      _key: `closer-${Math.random().toString(36).slice(2, 10)}`,
      _type: 'block',
      style: 'normal',
      children: [
        {
          _key: `span-${Math.random().toString(36).slice(2, 10)}`,
          _type: 'span',
          text,
        },
      ],
    },
  ]
}

async function main() {
  const documents = await client.fetch<LegacyCloser[]>(`
    *[_type == "caseStudy" && count(sections[_type == "closer" && defined(text) && !defined(body)]) > 0]{
      _id,
      title,
      "closers": sections[_type == "closer" && defined(text) && !defined(body)]{
        _key,
        text,
        body
      }
    }
  `)

  if (!documents.length) {
    console.log('No legacy closers found.')
    return
  }

  for (const document of documents) {
    let patch = client.patch(document._id)
    let didPatch = false

    for (const closer of document.closers || []) {
      const text = closer.text?.trim()
      if (!text || closer.body) continue

      patch = patch
        .set({
          [`sections[_key=="${closer._key}"].body`]: toPortableText(text),
        })
        .unset([`sections[_key=="${closer._key}"].text`])
      didPatch = true
    }

    if (!didPatch) continue

    await patch.commit()
    console.log(`Migrated closers in ${document.title || document._id}`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
