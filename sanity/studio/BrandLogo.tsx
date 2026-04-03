import {Box, Card, Flex, Stack, Text} from '@sanity/ui';

export function BrandLogo() {
  return (
    <Card padding={2} radius={3} tone="transparent">
      <Flex align="center" gap={3}>
        <Box
          style={{
            width: 10,
            height: 10,
            borderRadius: '999px',
            background: '#C83C2F',
            boxShadow: '0 0 0 1px rgba(200, 60, 47, 0.18)',
          }}
        />
        <Stack space={1}>
          <Text size={1} weight="medium">
            Protagonist Ink
          </Text>
          <Text size={0} muted>
            Case Files
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}
