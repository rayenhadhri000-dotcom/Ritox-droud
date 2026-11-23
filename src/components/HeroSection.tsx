import { useState } from 'react';
import { ArrowDownToLine, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CatalogItem, PackageVersion } from '../types/game';
import { formatFileSize } from '../data/catalog';
import { GameImage } from './GameImage';
import { AppIcon } from './AppIcon';
import { PWAInstallControl } from './PWAInstallControl';

interface HeroSectionProps {
  spotlights: CatalogItem[];
  onDownloadVersion: (item: CatalogItem, version: PackageVersion) => void;
  onQueueBundle: (ids: string[], bundleLabel: string) => void;
  onInspectItem: (item: CatalogItem) => void;
}

const STARTER_PACKS = [
  {
    id: 'social-pack',
    title: 'Social & Chat Pack',
    subtitle: 'TikTok · Instagram · WhatsApp · Facebook · Telegram',
    itemIds: ['tiktok', 'instagram', 'whatsapp', 'facebook', 'telegram'],
  },
  {
    id: 'fps-pack',
    title: 'Battle Royale & FPS',
    subtitle: 'PUBG MOBILE · COD Mobile · Free Fire MAX · Warzone',
    itemIds: ['pubg-mobile', 'call-of-duty-mobile', 'free-fire-max', 'warzone-mobile'],
  },
  {
    id: 'media-pack',
    title: 'Streaming & Creator',
    subtitle: 'YouTube · Spotify · Netflix · CapCut · ChatGPT',
    itemIds: ['youtube', 'spotify', 'netflix', 'capcut', 'chatgpt'],
  },
  {
    id: 'tools-pack',
    title: 'Android Power Tools',
    subtitle: 'Brave · Proton VPN · ZArchiver · Bitwarden · VLC',
    itemIds: ['brave-browser', 'proton-vpn', 'zarchiver', 'bitwarden', 'vlc-android'],
  },
];

export function HeroSection({
  spotlights,
  onDownloadVersion,
  onQueueBundle,
  onInspectItem,
}: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const featured = spotlights[activeIndex] || spotlights[0];
  const latest = featured.versions[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + spotlights.length) % spotlights.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % spotlights.length);
  };

  return (
    <section id="top" className="pt-10 pb-14 border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Asymmetric Split Hero Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-between py-1">
            <div>
              <div className="flex items-center justify-between gap-4 mb-5">
                <p className="text-xs font-medium tracking-wide text-[#4ADE80]">
                  RAYEN droid · {featured.developer}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous spotlight"
                    className="p-1.5 rounded-md bg-[#0E1310] border border-white/[0.08] text-[#9BA8A0] hover:text-[#ECF2EE] hover:border-white/[0.2] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next spotlight"
                    className="p-1.5 rounded-md bg-[#0E1310] border border-white/[0.08] text-[#9BA8A0] hover:text-[#ECF2EE] hover:border-white/[0.2] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={featured.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-center gap-4 mb-3.5">
                    <AppIcon
                      iconKey={featured.iconKey}
                      title={featured.title}
                      accentColor={featured.accentColor}
                      size="lg"
                    />
                    <div className="min-w-0">
                      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#ECF2EE] leading-[1.08] text-balance truncate">
                        {featured.title}
                      </h1>
                      <p className="text-xs font-mono text-[#7E8C83] truncate mt-1">
                        {featured.packageName}
                      </p>
                    </div>
                  </div>

                  <p className="text-base text-[#9BA8A0] leading-relaxed max-w-md mb-5">
                    {featured.tagline}
                  </p>

                  {/* Clean unboxed metadata row */}
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#9BA8A0] tabular-nums mb-7">
                    <span className="text-[#ECF2EE] font-medium">{latest.format}</span>
                    <span aria-hidden="true">·</span>
                    <span>v{latest.version}</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatFileSize(latest.sizeMB)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{latest.minAndroid}</span>
                    <span aria-hidden="true">·</span>
                    <span>{featured.downloadsLabel}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onDownloadVersion(featured, latest)}
                className="inline-flex items-center gap-2.5 py-3 px-6 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#040705] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80]"
              >
                <ArrowDownToLine className="w-4 h-4" strokeWidth={2} />
                <span>
                  Download {latest.format} ({formatFileSize(latest.sizeMB)})
                </span>
              </button>
              <button
                type="button"
                onClick={() => onInspectItem(featured)}
                className="inline-flex items-center gap-1.5 py-3 px-4 rounded-lg bg-[#0E1310] hover:bg-[#141B16] border border-white/[0.1] text-[#ECF2EE] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
              >
                <span>Versions</span>
                <ChevronRight className="w-4 h-4 text-[#9BA8A0]" strokeWidth={1.75} />
              </button>
              <PWAInstallControl />
            </div>
          </div>

          {/* Right Column: Spotlight Banner + 5-tab Selector */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => onInspectItem(featured)}
              className="group relative w-full flex-1 min-h-[250px] lg:min-h-[350px] rounded-xl overflow-hidden bg-[#0E1310] border border-white/[0.1] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={featured.id}
                  initial={{ opacity: 0.35 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.35 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full"
                >
                  <GameImage
                    src={
                      featured.bannerImageUrl ||
                      '/src/assets/images/hero_ashen_frontier_1795277495421.jpg'
                    }
                    alt={`${featured.title} Android package banner`}
                    title={featured.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                  />
                </motion.div>
              </AnimatePresence>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#060807]/90 via-[#060807]/25 to-transparent"
              />
              <div className="absolute bottom-0 inset-x-0 p-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium text-[#4ADE80] mb-1">
                    Signed {latest.format} · SHA-256 Verified
                  </p>
                  <p className="text-sm text-[#ECF2EE]/90 max-w-md">
                    {featured.category} · {featured.rating.toFixed(1)} Rating ·{' '}
                    {featured.fpsTarget}
                  </p>
                </div>
                <span className="hidden sm:inline-block text-xs font-mono text-[#B7C7BD] tabular-nums whitespace-nowrap shrink-0">
                  {latest.architecture}
                </span>
              </div>
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {spotlights.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#141B16] border-[#22C55E]/60 text-[#ECF2EE]'
                        : 'bg-[#0E1310] border-white/[0.08] text-[#9BA8A0] hover:text-[#ECF2EE] hover:border-white/[0.18]'
                    }`}
                  >
                    <AppIcon
                      iconKey={item.iconKey}
                      title={item.title}
                      accentColor={item.accentColor}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold truncate">{item.title}</p>
                      <p className="text-[11px] text-[#7E8C83] truncate">
                        {item.versions[0].format}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column One-Tap APK/XAPK Installer Packs */}
        <div className="mt-10 pt-8 border-t border-white/[0.08]">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-xs font-medium tracking-wide text-[#4ADE80]">
              One-Tap Android Starter Packs
            </h2>
            <span className="text-xs text-[#9BA8A0] hidden sm:inline">
              Batch download and install essential APK & XAPK packages
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STARTER_PACKS.map((pack) => (
              <button
                key={pack.id}
                type="button"
                onClick={() => onQueueBundle(pack.itemIds, pack.title)}
                className="group p-4 rounded-xl bg-[#0E1310] hover:bg-[#141B16] border border-white/[0.08] hover:border-[#22C55E]/50 text-left transition-colors cursor-pointer flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#ECF2EE] group-hover:text-[#4ADE80] transition-colors">
                      {pack.title}
                    </span>
                    <Layers
                      className="w-3.5 h-3.5 text-[#4ADE80] shrink-0"
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="text-xs text-[#9BA8A0] leading-relaxed">
                    {pack.subtitle}
                  </p>
                </div>
                <span className="text-xs font-medium text-[#4ADE80]">
                  Install {pack.itemIds.length} packages →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
