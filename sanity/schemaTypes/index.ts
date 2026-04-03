import {caseStudy} from './caseStudy';
import {closer} from './caseStudy/blocks/closer';
import {climax} from './caseStudy/blocks/climax';
import {deliverables} from './caseStudy/blocks/deliverables';
import {legacyShowcase} from './caseStudy/blocks/legacyShowcase';
import {prologue} from './caseStudy/blocks/prologue';
import {showcaseFilmStrip} from './caseStudy/blocks/showcaseFilmStrip';
import {showcaseFullBleed} from './caseStudy/blocks/showcaseFullBleed';
import {showcaseSplit} from './caseStudy/blocks/showcaseSplit';
import {showcaseStat} from './caseStudy/blocks/showcaseStat';
import {videoEmbed} from './caseStudy/blocks/videoEmbed';
import {category} from './category';
import {post} from './post';
import {siteSettings} from './siteSettings';

export const schemaTypes = [
  post,
  category,
  caseStudy,
  prologue,
  showcaseSplit,
  showcaseFullBleed,
  showcaseFilmStrip,
  showcaseStat,
  legacyShowcase,
  climax,
  videoEmbed,
  deliverables,
  closer,
  siteSettings,
];
