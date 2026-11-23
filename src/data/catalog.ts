import { CatalogItem } from '../types/game';
import { APPS_LIST } from './appsCatalog';
import { GAMES_LIST } from './gamesCatalog';

export { formatFileSize } from './catalogHelpers';

export const GAMES_CATALOG: CatalogItem[] = GAMES_LIST;
export const APPS_CATALOG: CatalogItem[] = APPS_LIST;
export const CATALOG_ITEMS: CatalogItem[] = [...GAMES_LIST, ...APPS_LIST];

const SPOTLIGHT_IDS = [
  'pubg-mobile',
  'tiktok',
  'genshin-impact',
  'asphalt-legends-unite',
  'call-of-duty-mobile',
];

export const HERO_SPOTLIGHTS: CatalogItem[] = SPOTLIGHT_IDS.map((id) =>
  CATALOG_ITEMS.find((item) => item.id === id)
).filter((item): item is CatalogItem => Boolean(item));
