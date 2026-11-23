import { Package } from 'lucide-react';

interface HeaderProps {
  activeDownloadsCount: number;
  readyCount: number;
  installedCount: number;
  onOpenDrawer: () => void;
}

export function Header({
  activeDownloadsCount,
  readyCount,
  installedCount,
  onOpenDrawer,
}: HeaderProps) {
  const totalCount = activeDownloadsCount + readyCount + installedCount;

  const buttonLabel =
    activeDownloadsCount > 0
      ? `Installer (${activeDownloadsCount} active)`
      : readyCount > 0
        ? `Installer (${readyCount} ready)`
        : totalCount > 0
          ? `My Apps (${installedCount})`
          : 'Installer';

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#060807]/92 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 text-lg font-semibold tracking-tight text-[#ECF2EE] hover:text-[#4ADE80] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22C55E]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 text-[#22C55E] shrink-0"
            aria-hidden="true"
          >
            <polygon
              points="12,2.5 20.5,7.5 20.5,16.5 12,21.5 3.5,16.5 3.5,7.5"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path d="M9.5 8.5 16 12l-6.5 3.5V8.5Z" fill="currentColor" />
          </svg>
          <span>RAYEN droid</span>
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9BA8A0]"
        >
          <a
            href="#top"
            className="hover:text-[#ECF2EE] hover:underline underline-offset-4 decoration-[#22C55E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22C55E]"
          >
            Featured
          </a>
          <a
            href="#catalog"
            className="hover:text-[#ECF2EE] hover:underline underline-offset-4 decoration-[#22C55E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22C55E]"
          >
            APK Catalog
          </a>
          <a
            href="#top-charts"
            className="hover:text-[#ECF2EE] hover:underline underline-offset-4 decoration-[#22C55E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22C55E]"
          >
            Top Charts
          </a>
          <a
            href="#curator-standard"
            className="hover:text-[#ECF2EE] hover:underline underline-offset-4 decoration-[#22C55E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#22C55E]"
          >
            Verification
          </a>
        </nav>

        {/* Zone 3: Single primary action button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-[#0E1310] border border-white/[0.12] hover:border-[#22C55E]/60 hover:bg-[#141B16] text-sm font-medium text-[#ECF2EE] transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
          >
            <Package className="w-4 h-4 text-[#4ADE80]" strokeWidth={1.75} />
            <span>{buttonLabel}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
