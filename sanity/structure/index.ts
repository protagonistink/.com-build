import {FolderOpenDot, Newspaper, Settings2, Tags, BookOpen, Eye} from 'lucide-react';
import type {StructureResolver} from 'sanity/structure';
import {WritersGuide} from '../studio/WritersGuide';
import {PreviewPane} from '../studio/PreviewPane';

function documentList(
  S: Parameters<StructureResolver>[0],
  schemaType: 'post' | 'category',
  title: string,
  icon: React.ComponentType,
) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .schemaType(schemaType)
    .child(
      S.documentTypeList(schemaType)
        .title(title)
        .canHandleIntent((intentName, params) =>
          ['create', 'edit'].includes(intentName) && params.type === schemaType,
        ),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Protagonist Ink')
    .items([
      S.listItem()
        .title("Writer's Guide")
        .icon(BookOpen)
        .child(
          S.component(WritersGuide)
            .id('writers-guide')
            .title("Writer's Guide"),
        ),
      S.divider(),
      S.listItem()
        .title('Site Settings')
        .icon(Settings2)
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),

      S.listItem()
        .title('Case Studies')
        .icon(FolderOpenDot)
        .child(
          S.documentTypeList('caseStudy')
            .title('Case Studies')
            .defaultOrdering([{field: '_updatedAt', direction: 'desc'}])
            .canHandleIntent((intentName, params) =>
              ['create', 'edit'].includes(intentName) && params.type === 'caseStudy',
            )
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('caseStudy')
                .views([
                  S.view.form(),
                  S.view.component(PreviewPane).title('Published').icon(Eye),
                ]),
            ),
        ),
      S.divider(),
      documentList(S, 'post', 'Blog', Newspaper),
      documentList(S, 'category', 'Taxonomy', Tags),
    ]);
