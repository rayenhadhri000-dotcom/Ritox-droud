import { useState } from 'react';
import {
  ArrowDownToLine,
  CheckCircle2,
  LayoutGrid,
  List,
  PackageCheck,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import {
  CatalogItem,
  Category,
  DownloadItem,
  ItemKind,
  PackageFormat,
  PackageVersion,
  SortOption,
  ViewMode,
} from '../types/game';
import { formatFileSize } from '../data/catalog';
import { AppIcon } from './AppIcon';

interface CatalogSectionProps {
  items: CatalogItem[];
  totalCount: number;
  gamesCount: number;
  appsCount: number;
  selectedKind: ItemKind;
  onKindChange: (kind: ItemKind) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
  packageFormat: PackageFormat;
  onPackageFormatChange: (format: PackageFormat) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  onDownloadVersion: (item: CatalogItem, version: PackageVersion) => void;
  onInstallReadyItem: (downloadId: string) => void;
  onInspectItem: (item: CatalogItem) => void;
  downloadsByItemId: Map<string, DownloadItem>;
}

const GAME_CATEGORIES: Category[] = [
  'All',
  'Action & FPS',
  'RPG & Adventure',
  'Strategy & MOBA',
  'Racing & Sports',
  'Arcade & Puzzle',
];

const APP_CATEGORIES: Category[] = [
  'All',
  'Social & Chat',
  'Video & Music',
  'Photo & AI',
  'Tools & VPN',
  'Shopping & Maps',
];

const ALL_CATEGORIES: Category[] = [
  'All',
  'Action & FPS',
  'RPG & Adventure',
  'Strategy & MOBA',
  'Racing & Sports',
  'Arcade & Puzzle',
  'Social & Chat',
  'Video & Music',
  'Photo & AI',
  'Tools & VPN',
  'Shopping & Maps',
];

export function CatalogSection({
  items,
  totalCount,
  gamesCount,
  appsCount,
  selectedKind,
  onKindChange,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  packageFormat,
  onPackageFormatChange,
  sortBy,
  onSortChange,
  onResetFilters,
  onDownloadVersion,
  onInstallReadyItem,
  onInspectItem,
  downloadsByItemId,
}: CatalogSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [visibleLimit, setVisibleLimit] = useState(24);

  const availableCategories =
    selectedKind === 'game'
      ? GAME_CATEGORIES
      : selectedKind === 'app'
        ? APP_CATEGORIES
        : ALL_CATEGORIES;

  const isFiltered =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'All' ||
    selectedKind !== 'all' ||
    packageFormat !== 'ALL';

  const visibleItems = isFiltered ? items : items.slice(0, visibleLimit);

  const handleActionClick = (item: CatalogItem, latest: PackageVersion, dl?: DownloadItem) => {
    if (dl?.status === 'ready') {
      onInstallReadyItem(dl.id);
    } else {
      onDownloadVersion(item, latest);
    }
  };

  const getButtonLabel = (latest: PackageVersion, dl?: DownloadItem) => {
    if (!dl) return `Get ${latest.format}`;
    if (dl.status === 'downloading') return `${Math.round(dl.progress)}%`;
    if (dl.status === 'verifying') return 'Verify...';
    if (dl.status === 'ready') return `Install ${latest.format}`;
    if (dl.status === 'installing') return 'Installing...';
    if (dl.status === 'installed') return 'Installed';
    if (dl.status === 'paused') return 'Paused';
    return `Get ${latest.format}`;
  };

  return (
    <section id="catalog" className="py-16 border-b border-white/[0.08]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header + Search, Sort & Layout Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium tracking-wide text-[#4ADE80] mb-2">
              Verified Android Repository · {gamesCount} Games & {appsCount} Apps
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#ECF2EE] text-balance">
              APK & XAPK Download Catalog
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-80">
              <Search
                className="w-4 h-4 text-[#9BA8A0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search TikTok, PUBG, com.whatsapp..."
                aria-label="Search games, apps, or package names"
                className="w-full py-2.5 pl-10 pr-9 rounded-lg bg-[#0E1310] border border-white/[0.1] text-sm text-[#ECF2EE] placeholder:text-[#6F7C74] focus:outline-none focus:border-[#22C55E] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#9BA8A0] hover:text-[#ECF2EE] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex items-center">
                <SlidersHorizontal
                  className="w-3.5 h-3.5 text-[#9BA8A0] absolute left-3 pointer-events-none"
                  strokeWidth={1.75}
                />
                <select
                  aria-label="Sort catalog"
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value as SortOption)}
                  className="py-2.5 pl-8 pr-7 rounded-lg bg-[#0E1310] border border-white/[0.1] text-sm text-[#ECF2EE] focus:outline-none focus:border-[#22C55E] cursor-pointer"
                >
                  <option value="popular">Most Downloaded</option>
                  <option value="rating">Highest Rated</option>
                  <option value="size">Smallest Size</option>
                  <option value="name">Name (A to Z)</option>
                </select>
              </div>

              <div
                role="group"
                aria-label="Switch catalog layout"
                className="inline-flex items-center p-1 rounded-lg bg-[#0E1310] border border-white/[0.1]"
              >
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                  aria-pressed={viewMode === 'grid'}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-[#18221C] text-[#4ADE80]'
                      : 'text-[#9BA8A0] hover:text-[#ECF2EE]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  aria-label="Compact list view"
                  aria-pressed={viewMode === 'compact'}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'compact'
                      ? 'bg-[#18221C] text-[#4ADE80]'
                      : 'text-[#9BA8A0] hover:text-[#ECF2EE]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All / Games / Apps + Format Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div
            role="tablist"
            aria-label="Filter by games or apps"
            className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0E1310] border border-white/[0.08] self-start"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedKind === 'all'}
              onClick={() => {
                onKindChange('all');
                onCategoryChange('All');
              }}
              className={`py-1.5 px-4 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                selectedKind === 'all'
                  ? 'bg-[#22C55E] text-[#040705] font-semibold'
                  : 'text-[#9BA8A0] hover:text-[#ECF2EE]'
              }`}
            >
              All ({totalCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedKind === 'game'}
              onClick={() => {
                onKindChange('game');
                onCategoryChange('All');
              }}
              className={`py-1.5 px-4 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                selectedKind === 'game'
                  ? 'bg-[#22C55E] text-[#040705] font-semibold'
                  : 'text-[#9BA8A0] hover:text-[#ECF2EE]'
              }`}
            >
              Games ({gamesCount})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedKind === 'app'}
              onClick={() => {
                onKindChange('app');
                onCategoryChange('All');
              }}
              className={`py-1.5 px-4 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                selectedKind === 'app'
                  ? 'bg-[#22C55E] text-[#040705] font-semibold'
                  : 'text-[#9BA8A0] hover:text-[#ECF2EE]'
              }`}
            >
              Apps ({appsCount})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#9BA8A0]">Package Type</span>
            <div
              role="group"
              aria-label="Filter package format"
              className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0E1310] border border-white/[0.08]"
            >
              {(['ALL', 'APK', 'XAPK'] as PackageFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onPackageFormatChange(fmt)}
                  className={`py-1.5 px-3 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    packageFormat === fmt
                      ? 'bg-[#18221C] text-[#ECF2EE] border border-white/[0.1]'
                      : 'text-[#9BA8A0] hover:text-[#ECF2EE] border border-transparent'
                  }`}
                >
                  {fmt === 'ALL' ? 'All Formats' : fmt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="pb-8 mb-8 border-b border-white/[0.08] flex flex-wrap items-center gap-1.5">
          {availableCategories.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onCategoryChange(category)}
                className={`py-1.5 px-3.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#18231C] border-[#22C55E]/50 text-[#4ADE80]'
                    : 'bg-[#0E1310] border-white/[0.08] text-[#9BA8A0] hover:text-[#ECF2EE] hover:border-white/[0.18]'
                }`}
              >
                {category === 'All' ? 'All Categories' : category}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {items.length === 0 ? (
          <div className="py-16 px-6 rounded-xl bg-[#0E1310] border border-white/[0.08] text-center">
            <p className="text-base font-medium text-[#ECF2EE] mb-2">
              No APK or XAPK packages match your current filters.
            </p>
            <p className="text-sm text-[#9BA8A0] mb-6">
              Try clearing your search query or switching back to all formats.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="py-2.5 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#040705] text-sm font-semibold transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {visibleItems.map((item) => {
                  const latest = item.versions[0];
                  const dl = downloadsByItemId.get(item.id);
                  const isInstalled = dl?.status === 'installed';
                  const isReady = dl?.status === 'ready';

                  return (
                    <article
                      key={item.id}
                      className="group flex flex-col justify-between p-5 rounded-xl bg-[#0E1310] border border-white/[0.08] transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-white/[0.18] gap-5"
                    >
                      <div>
                        <div className="flex items-start gap-3.5 mb-3">
                          <button
                            type="button"
                            onClick={() => onInspectItem(item)}
                            className="cursor-pointer focus-visible:outline-2 focus-visible:outline-[#22C55E] rounded-[14px]"
                          >
                            <AppIcon
                              iconKey={item.iconKey}
                              title={item.title}
                              accentColor={item.accentColor}
                              size="lg"
                            />
                          </button>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2 text-xs text-[#9BA8A0] mb-0.5">
                              <span className="truncate">
                                {item.category} · {latest.format}
                              </span>
                              <span className="font-mono tabular-nums text-[#7E8C83] shrink-0">
                                v{latest.version}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => onInspectItem(item)}
                              className="text-left w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#22C55E]"
                            >
                              <h3 className="text-base font-semibold text-[#ECF2EE] group-hover:text-[#4ADE80] transition-colors truncate">
                                {item.title}
                              </h3>
                            </button>

                            <p className="text-[11px] font-mono text-[#6F7C74] truncate">
                              {item.packageName}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-[#9BA8A0] leading-relaxed line-clamp-2">
                          {item.tagline}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-xs text-[#B7C7BD] font-mono tabular-nums">
                          <span>{formatFileSize(latest.sizeMB)}</span>
                          <span aria-hidden="true" className="text-[#56635B]">·</span>
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#4ADE80] fill-[#4ADE80]" />
                            {item.rating.toFixed(1)}
                          </span>
                          <span aria-hidden="true" className="text-[#56635B]">·</span>
                          <span className="text-[#9BA8A0]">{item.downloadsLabel}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => onInspectItem(item)}
                            className="py-2 px-3 rounded-lg text-xs font-medium text-[#B7C7BD] hover:text-[#ECF2EE] hover:bg-white/[0.05] transition-colors whitespace-nowrap cursor-pointer"
                          >
                            Versions
                          </button>
                          <button
                            type="button"
                            onClick={() => handleActionClick(item, latest, dl)}
                            className={`inline-flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                              isInstalled
                                ? 'bg-[#14231A] text-[#4ADE80] border border-[#22C55E]/40'
                                : isReady
                                  ? 'bg-[#22C55E] hover:bg-[#16A34A] text-[#040705]'
                                  : dl
                                    ? 'bg-[#17241C] text-[#4ADE80] border border-[#22C55E]/40'
                                    : 'bg-[#22C55E] hover:bg-[#16A34A] text-[#040705]'
                            }`}
                          >
                            {isInstalled ? (
                              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} />
                            ) : isReady ? (
                              <PackageCheck className="w-3.5 h-3.5" strokeWidth={2} />
                            ) : (
                              <ArrowDownToLine className="w-3.5 h-3.5" strokeWidth={2} />
                            )}
                            <span>{getButtonLabel(latest, dl)}</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              /* APKPure Compact Package Table */
              <div className="rounded-xl bg-[#0E1310] border border-white/[0.08] divide-y divide-white/[0.08]">
                {visibleItems.map((item) => {
                  const latest = item.versions[0];
                  const dl = downloadsByItemId.get(item.id);
                  const isInstalled = dl?.status === 'installed';
                  const isReady = dl?.status === 'ready';

                  return (
                    <div
                      key={item.id}
                      className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <button
                          type="button"
                          onClick={() => onInspectItem(item)}
                          className="cursor-pointer shrink-0 rounded-[12px]"
                        >
                          <AppIcon
                            iconKey={item.iconKey}
                            title={item.title}
                            accentColor={item.accentColor}
                            size="md"
                          />
                        </button>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onInspectItem(item)}
                              className="text-sm font-semibold text-[#ECF2EE] hover:text-[#4ADE80] transition-colors truncate cursor-pointer"
                            >
                              {item.title}
                            </button>
                            <span className="text-[11px] font-mono text-[#6F7C74] hidden md:inline truncate">
                              {item.packageName}
                            </span>
                          </div>
                          <p className="text-xs text-[#9BA8A0] truncate">
                            {item.category} · {latest.format} v{latest.version} ·{' '}
                            {item.developer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="flex items-center gap-3 text-xs font-mono tabular-nums text-[#B7C7BD]">
                          <span>{formatFileSize(latest.sizeMB)}</span>
                          <span className="inline-flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-[#4ADE80] fill-[#4ADE80]" />
                            {item.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onInspectItem(item)}
                            className="py-1.5 px-3 rounded-lg text-xs font-medium text-[#B7C7BD] hover:text-[#ECF2EE] hover:bg-white/[0.05] transition-colors cursor-pointer"
                          >
                            Versions
                          </button>
                          <button
                            type="button"
                            onClick={() => handleActionClick(item, latest, dl)}
                            className={`inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer tabular-nums ${
                              isInstalled
                                ? 'bg-[#14231A] text-[#4ADE80] border border-[#22C55E]/40'
                                : isReady
                                  ? 'bg-[#22C55E] hover:bg-[#16A34A] text-[#040705]'
                                  : dl
                                    ? 'bg-[#17241C] text-[#4ADE80] border border-[#22C55E]/40'
                                    : 'bg-[#22C55E] hover:bg-[#16A34A] text-[#040705]'
                            }`}
                          >
                            <ArrowDownToLine className="w-3.5 h-3.5" strokeWidth={2} />
                            <span>{getButtonLabel(latest, dl)}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Progressive Load More / Show All 156 */}
            {!isFiltered && items.length > visibleLimit && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setVisibleLimit((prev) => prev + 36)}
                  className="py-2.5 px-6 rounded-lg bg-[#0E1310] hover:bg-[#141B16] border border-white/[0.12] hover:border-[#22C55E]/50 text-sm font-medium text-[#ECF2EE] transition-colors cursor-pointer tabular-nums"
                >
                  Load More ({items.length - visibleLimit} remaining)
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleLimit(items.length)}
                  className="py-2.5 px-5 rounded-lg bg-transparent hover:bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-[#9BA8A0] hover:text-[#ECF2EE] transition-colors cursor-pointer tabular-nums"
                >
                  Show All {items.length}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
