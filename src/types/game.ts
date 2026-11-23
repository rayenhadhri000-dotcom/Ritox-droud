export type ItemKind = 'all' | 'game' | 'app';

export type Category =
  | 'All'
  | 'Action & FPS'
  | 'RPG & Adventure'
  | 'Strategy & MOBA'
  | 'Racing & Sports'
  | 'Arcade & Puzzle'
  | 'Social & Chat'
  | 'Video & Music'
  | 'Photo & AI'
  | 'Tools & VPN'
  | 'Shopping & Maps';

export type PackageFormat = 'ALL' | 'APK' | 'XAPK';

export type SortOption = 'popular' | 'rating' | 'updated' | 'size' | 'name';

export type ViewMode = 'grid' | 'compact';

export interface PackageVersion {
  version: string;
  versionCode: number;
  format: 'APK' | 'XAPK';
  sizeMB: number;
  minAndroid: string;
  architecture: string;
  releaseDate: string;
  sha256: string;
  notes: string;
}

export interface UserReview {
  id: string;
  author: string;
  device: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CatalogItem {
  id: string;
  slug: string;
  kind: 'game' | 'app';
  title: string;
  packageName: string;
  developer: string;
  category: Exclude<Category, 'All'>;
  tagline: string;
  description: string;
  iconKey: string;
  accentColor: string;
  bannerImageUrl?: string;
  rating: number;
  reviewCount: number;
  downloadsCount: number;
  downloadsLabel: string;
  updatedAt: string;
  minRamGB: number;
  fpsTarget: string;
  controllerSupport: boolean;
  offlineReady: boolean;
  ageRating: string;
  featured?: boolean;
  versions: PackageVersion[];
  reviews: UserReview[];
}

export type InstallStatus =
  | 'downloading'
  | 'paused'
  | 'verifying'
  | 'ready'
  | 'installing'
  | 'installed';

export interface DownloadItem {
  id: string;
  itemId: string;
  title: string;
  packageName: string;
  developer: string;
  iconKey: string;
  accentColor: string;
  version: string;
  format: 'APK' | 'XAPK';
  sizeMB: number;
  sha256: string;
  progress: number;
  status: InstallStatus;
  speedMBps: number;
  startedAt: number;
}
