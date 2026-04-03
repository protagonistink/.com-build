import React from 'react';
import {Card, Stack, Text, Heading} from '@sanity/ui';

export function WritersGuide() {
  return (
    <Card padding={5} sizing="border">
      <Stack space={5}>
        <Stack space={3}>
          <Heading as="h1" size={3}>
            Welcome to the Studio
          </Heading>
          <Text size={2} muted>
            Everything you need to know to write case files without breaking anything.
          </Text>
        </Stack>

        <Card padding={4} radius={3} tone="positive" border>
          <Stack space={3}>
            <Text size={2} weight="semibold">
              You can't break the live site from here.
            </Text>
            <Text size={1} muted>
              Everything saves as a draft first. Nothing goes live until the status is set to
              "Published." Save as often as you want — messy drafts are expected and encouraged.
            </Text>
          </Stack>
        </Card>

        <Stack space={3}>
          <Heading as="h2" size={1}>
            What makes a case file?
          </Heading>
          <Stack space={2}>
            <Text size={1}>
              <strong>Hero tab</strong> — Title, subtitle, client name, hero image. This is the
              opening frame visitors see first.
            </Text>
            <Text size={1}>
              <strong>Story tab</strong> — The beats of the case file. When you create a new one,
              you'll pick a template that gives you a skeleton to fill in.
            </Text>
            <Text size={1}>
              <strong>Publishing tab</strong> — Status and publish date. Patrick handles this part —
              you can skip it.
            </Text>
            <Text size={1}>
              <strong>SEO tab</strong> — Search engine details. Also Patrick's territory.
            </Text>
          </Stack>
        </Stack>

        <Stack space={3}>
          <Heading as="h2" size={1}>
            Quick start
          </Heading>
          <Stack space={2}>
            <Text size={1}>1. Go to <strong>Case Files → Drafts</strong></Text>
            <Text size={1}>2. Click <strong>+</strong> and pick a story shape</Text>
            <Text size={1}>3. Fill in the <strong>Hero</strong> tab (title + client name is enough to start)</Text>
            <Text size={1}>4. Switch to the <strong>Story</strong> tab and fill in the blocks</Text>
            <Text size={1}>5. Save anytime. Come back anytime. That's it.</Text>
          </Stack>
        </Stack>

        <Stack space={3}>
          <Heading as="h2" size={1}>
            Things you can safely ignore
          </Heading>
          <Stack space={2}>
            <Text size={1}>
              <strong>Settings</strong> inside story blocks — those are visual toggles (dark/light
              background, labels). They have sensible defaults. Leave them alone unless Patrick asks
              you to change one.
            </Text>
            <Text size={1}>
              <strong>SEO fields</strong> — meta titles, descriptions, canonical URLs. Not your job.
            </Text>
            <Text size={1}>
              <strong>Slug</strong> — auto-generated from your title. Don't touch it.
            </Text>
          </Stack>
        </Stack>

        <Card padding={4} radius={3} tone="transparent" border style={{borderStyle: 'dashed'}}>
          <Stack space={2}>
            <Text size={1} weight="semibold">
              Stuck?
            </Text>
            <Text size={1} muted>
              Every field has a description underneath it that tells you what goes there. The
              gray placeholder text inside empty fields shows you an example. If you're still
              unsure, just write something rough — it's a draft, not a tattoo.
            </Text>
          </Stack>
        </Card>
      </Stack>
    </Card>
  );
}
