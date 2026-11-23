import { useState } from 'react';
import { ArrowDownToLine, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CatalogItem, PackageVersion } from '../types/game';
import { formatFileSize } from '../data/catalog';
import { AppIcon } from './AppIcon';

interface TopChartsAndStandardsProps {
  items: CatalogItem[];
  onDownloadVersion: (item: CatalogItem, version: PackageVersion) => void;
  onInspectItem: (item: CatalogItem) => void;
}

export function TopChartsAndStandards({
  items,
  onDownloadVersion,
  onInspectItem,
}: TopChartsAndStandardsProps) {
  const [chartTab, setChartTab] = useState<'game' | 'app'>('game');

  const topTen = items
    .filter((item) => item.kind === chartTab)
    .sort((a, b) => b.downloadsCount - a.downloadsCount)
    .slice(0, 8);

  const recentUpdates = [...items].slice(0, 4);

  return (
    <section className="py-16 border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Top 8 Velocity Charts */}
        <div id="top-charts" className="lg:col-span-7 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-medium tracking-wide text-[#4ADE80] mb-2">
                Global Android Charts
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#ECF2EE]">
                Top Downloaded Packages
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Chart type"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0E1310] border border-white/[0.08] self-start"
            >
              <button
                type="button"
                role="tab"
                aria-selected={chartTab === 'game'}
                onClick={() => setChartTab('game')}
                className={`py-1.5 px-3.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  chartTab === 'game'
                    ? 'bg-[#22C55E] text-[#040705] font-semibold'
                    : 'text-[#9BA8A0] hover:text-[#ECF2EE]'
                }`}
              >
                Top Games
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={chartTab === 'app'}
                onClick={() => setChartTab('app')}
                className={`py-1.5 px-3.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  chartTab === 'app'
                    ? 'bg-[#22C55E] text-[#040705] font-semibold'
                    : 'text-[#9BA8A0] hover:text-[#ECF2EE]'
                }`}
              >
                Top Apps
              </button>
            </div>
          </div>

          <div className="rounded-xl bg-[#0E1310] border border-white/[0.08] divide-y divide-white/[0.08]">
            {topTen.map((item, index) => {
              const latest = item.versions[0];
              const rank = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={item.id}
                  className="p-4 sm:px-5 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-sm font-mono tabular-nums text-[#4ADE80] w-7 shrink-0">
                      {rank}.
                    </span>

                    <button
                      type="button"
                      onClick={() => onInspectItem(item)}
                      className="cursor-pointer shrink-0 rounded-[12px] focus-visible:outline-2 focus-visible:outline-[#22C55E]"
                    >
                      <AppIcon
                        iconKey={item.iconKey}
                        title={item.title}
                        accentColor={item.accentColor}
                        size="md"
                      />
                    </button>

                    <div className="min-w-0">
                      <button
                        type="button"
                        onClick={() => onInspectItem(item)}
                        className="text-left block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#22C55E]"
                      >
                        <h3 className="text-sm font-semibold text-[#ECF2EE] hover:text-[#4ADE80] transition-colors truncate">
                          {item.title}
                        </h3>
                      </button>
                      <p className="text-xs text-[#9BA8A0] truncate">
                        {item.category} · {item.downloadsLabel} ·{' '}
                        <span className="font-mono tabular-nums">
                          {latest.format} {formatFileSize(latest.sizeMB)}
                        </span>
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDownloadVersion(item, latest)}
                    className="inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg bg-[#141B16] hover:bg-[#22C55E] text-[#ECF2EE] hover:text-[#040705] border border-white/[0.1] hover:border-[#22C55E] text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#22C55E]"
                  >
                    <ArrowDownToLine className="w-3.5 h-3.5" strokeWidth={1.75} />
                    <span>{latest.format}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: RAYEN droid Verification Standard & Recent Releases */}
        <div className="lg:col-span-5 space-y-8">
          <div
            id="curator-standard"
            className="p-6 rounded-xl bg-[#0E1310] border border-white/[0.08] scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 text-[#4ADE80] mb-3">
              <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
              <span className="text-xs font-medium tracking-wide">
                RAYEN droid Security Standard
              </span>
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-[#ECF2EE] mb-3 text-balance">
              Pure signed APK & XAPK packages with full version history.
            </h2>
            <p className="text-sm text-[#9BA8A0] leading-relaxed mb-5">
              Every build distributed on RAYEN droid retains its original developer
              cryptographic signature. Whether you need the latest release or an
              archived rollback build, every package includes verifiable SHA-256 hashes.
            </p>
            <ul className="space-y-2.5 text-sm text-[#B7C7BD]">
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#4ADE80] mt-0.5 shrink-0"
                  strokeWidth={1.75}
                />
                <span>Original developer APK & XAPK+OBB bundles—zero tampering.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#4ADE80] mt-0.5 shrink-0"
                  strokeWidth={1.75}
                />
                <span>Archived previous versions ready for immediate downgrade.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2
                  className="w-4 h-4 text-[#4ADE80] mt-0.5 shrink-0"
                  strokeWidth={1.75}
                />
                <span>Built-in XAPK & Split-APK installer queue manager.</span>
              </li>
            </ul>
          </div>

          <div
            id="releases"
            className="p-6 rounded-xl bg-[#0E1310] border border-white/[0.08] scroll-mt-24"
          >
            <p className="text-xs font-medium tracking-wide text-[#4ADE80] mb-2">
              Fresh Releases
            </p>
            <h3 className="text-base font-semibold text-[#ECF2EE] mb-4">
              Latest Signed Package Updates
            </h3>
            <div className="space-y-4 divide-y divide-white/[0.06]">
              {recentUpdates.map((item, idx) => {
                const latest = item.versions[0];
                return (
                  <div key={item.id} className={idx > 0 ? 'pt-4' : ''}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <button
                        type="button"
                        onClick={() => onInspectItem(item)}
                        className="text-sm font-medium text-[#ECF2EE] hover:text-[#4ADE80] transition-colors text-left cursor-pointer"
                      >
                        {item.title}
                      </button>
                      <span className="text-xs font-mono tabular-nums text-[#9BA8A0]">
                        {latest.format} v{latest.version}
                      </span>
                    </div>
                    <p className="text-xs text-[#9BA8A0] leading-relaxed">
                      {item.packageName} · {latest.architecture}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
