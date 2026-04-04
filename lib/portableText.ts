import type { PortableTextBlock, PortableTextValue } from '@/types/portableText';

export function portableTextToPlainText(blocks?: PortableTextValue | null) {
  if (!Array.isArray(blocks)) return '';

  return blocks
    .map((block) =>
      Array.isArray(block.children)
        ? block.children
            .filter((child): child is NonNullable<PortableTextBlock['children']>[number] => child?._type === 'span')
            .map((child) => child.text)
            .join('')
        : '',
    )
    .join('\n')
    .trim();
}

export function hasPortableTextContent(blocks?: PortableTextValue | null) {
  return portableTextToPlainText(blocks).length > 0;
}

export function normalizePortableTextOrString<T extends PortableTextValue | string | undefined>(value: T) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return (trimmed || undefined) as T | undefined;
  }

  if (!Array.isArray(value)) return undefined;

  return hasPortableTextContent(value) ? value : undefined;
}
