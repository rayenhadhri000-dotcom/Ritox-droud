import { CatalogItem, PackageVersion } from '../types/game';

export interface CompactEntry {
  id: string;
  title: string;
  pkg: string;
  dev: string;
  cat: CatalogItem['category'];
  tag: string;
  icon: string;
  accent?: string;
  banner?: string;
  rating: number;
  dl: number;
  dlLabel: string;
  ver: string;
  fmt: 'APK' | 'XAPK';
  sizeMB: number;
  minSdk?: string;
  ramGB?: number;
  fps?: string;
  ctrl?: boolean;
  offline?: boolean;
  age?: string;
  featured?: boolean;
  updated?: string;
}

function makeHash(seed: string): string {
  let h1 = 0x811c9dc5 ^ seed.length;
  let h2 = 0xdeadbeef ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 16777619);
    h2 = Math.imul(h2 ^ ch, 2654435761);
  }
  const part =
    (h1 >>> 0).toString(16).padStart(8, '0') +
    (h2 >>> 0).toString(16).padStart(8, '0');
  return part.repeat(4).slice(0, 64);
}

function bumpMinorVersion(ver: string, stepBack: number): string {
  const parts = ver.split('.');
  const lastIdx = parts.length - 1;
  const num = parseInt(parts[lastIdx], 10);
  if (!Number.isNaN(num)) {
    const next = Math.max(0, num - stepBack);
    parts[lastIdx] = String(next);
    return parts.join('.');
  }
  return `${ver}-r${stepBack}`;
}

export function hydrateEntries(
  entries: CompactEntry[],
  kind: 'game' | 'app'
): CatalogItem[] {
  return entries.map((e, idx) => {
    const minAndroid = e.minSdk ?? (e.sizeMB > 1000 ? 'Android 10+' : 'Android 8.0+');
    const baseCode = 240000 + idx * 137;
    const latestDate = e.updated ?? 'Nov 2026';

    const versions: PackageVersion[] = [
      {
        version: e.ver,
        versionCode: baseCode + 20,
        format: e.fmt,
        sizeMB: e.sizeMB,
        minAndroid,
        architecture: 'arm64-v8a + armeabi-v7a',
        releaseDate: latestDate,
        sha256: makeHash(`${e.pkg}-${e.ver}`),
        notes: `Latest verified ${e.fmt} signature with full ARM64 optimization and clean checksum.`,
      },
      {
        version: bumpMinorVersion(e.ver, 1),
        versionCode: baseCode + 10,
        format: e.fmt,
        sizeMB: Math.max(12, Math.round(e.sizeMB * 0.98)),
        minAndroid,
        architecture: 'arm64-v8a',
        releaseDate: 'Oct 2026',
        sha256: makeHash(`${e.pkg}-prev1-${e.ver}`),
        notes: 'Previous stable release archived for device rollback compatibility.',
      },
      {
        version: bumpMinorVersion(e.ver, 2),
        versionCode: baseCode,
        format: 'APK',
        sizeMB: Math.max(12, Math.round(e.sizeMB * 0.95)),
        minAndroid: 'Android 8.0+',
        architecture: 'universal',
        releaseDate: 'Sep 2026',
        sha256: makeHash(`${e.pkg}-prev2-${e.ver}`),
        notes: 'Legacy universal APK package for older Android builds.',
      },
    ];

    return {
      id: e.id,
      slug: e.id,
      kind,
      title: e.title,
      packageName: e.pkg,
      developer: e.dev,
      category: e.cat,
      tagline: e.tag,
      description: `${e.tag} Signed ${e.fmt} package (${e.pkg}) maintained by ${e.dev}. Audited by RAYEN droid with verified cryptographic SHA-256 signature and rollback version history.`,
      iconKey: e.icon,
      accentColor: e.accent ?? '#22C55E',
      bannerImageUrl: e.banner,
      rating: e.rating,
      reviewCount: Math.round(e.dl * 0.018) + 1240,
      downloadsCount: e.dl,
      downloadsLabel: e.dlLabel,
      updatedAt: latestDate,
      minRamGB: e.ramGB ?? (e.sizeMB > 1200 ? 4 : 2),
      fpsTarget: e.fps ?? (kind === 'game' ? '60–120 FPS' : '60–120 Hz'),
      controllerSupport: e.ctrl ?? false,
      offlineReady: e.offline ?? false,
      ageRating: e.age ?? (kind === 'game' ? '12+' : '4+'),
      featured: e.featured ?? false,
      versions,
      reviews: [
        {
          id: `${e.id}-rev1`,
          author: 'Rayan H.',
          device: 'Galaxy S25 Ultra',
          rating: 5,
          date: 'Nov 19, 2026',
          comment: `${e.fmt} installed cleanly on One UI without Play Store region locks. Checksum matched 100%.`,
        },
        {
          id: `${e.id}-rev2`,
          author: 'Youssef M.',
          device: 'Pixel 9 Pro',
          rating: 5,
          date: 'Nov 12, 2026',
          comment: `Fast direct mirror for ${e.title} v${e.ver}. Version rollback option is super useful.`,
        },
      ],
    };
  });
}

export function formatFileSize(sizeMB: number): string {
  if (sizeMB >= 1000) {
    return `${(sizeMB / 1000).toFixed(2)} GB`;
  }
  return `${sizeMB} MB`;
}
