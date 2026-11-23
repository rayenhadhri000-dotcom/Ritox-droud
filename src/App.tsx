import { useEffect, useMemo, useState } from 'react';
import { Package } from 'lucide-react';
import { CATALOG_ITEMS, HERO_SPOTLIGHTS } from './data/catalog';
import {
  CatalogItem,
  Category,
  DownloadItem,
  ItemKind,
  PackageFormat,
  PackageVersion,
  SortOption,
} from './types/game';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CatalogSection } from './components/CatalogSection';
import { TopChartsAndStandards } from './components/TopChartsAndStandards';
import { GameDetailModal } from './components/GameDetailModal';
import { DownloadDrawer } from './components/DownloadDrawer';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/PWAInstallControl';

export default function App() {
  const [selectedKind, setSelectedKind] = useState<ItemKind>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [packageFormat, setPackageFormat] = useState<PackageFormat>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [inspectedItem, setInspectedItem] = useState<CatalogItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const gamesCount = useMemo(
    () => CATALOG_ITEMS.filter((item) => item.kind === 'game').length,
    []
  );
  const appsCount = useMemo(
    () => CATALOG_ITEMS.filter((item) => item.kind === 'app').length,
    []
  );

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = CATALOG_ITEMS.filter((item) => {
      const latest = item.versions[0];
      const matchesKind = selectedKind === 'all' || item.kind === selectedKind;
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesFormat =
        packageFormat === 'ALL' || latest.format === packageFormat;
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.packageName.toLowerCase().includes(query) ||
        item.developer.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.tagline.toLowerCase().includes(query);
      return matchesKind && matchesCategory && matchesFormat && matchesQuery;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'size') {
        return a.versions[0].sizeMB - b.versions[0].sizeMB;
      }
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return b.downloadsCount - a.downloadsCount;
    });
  }, [selectedKind, searchQuery, selectedCategory, packageFormat, sortBy]);

  // Simulate Download -> SHA-256 Verification -> Ready to Install -> Installing -> Installed
  useEffect(() => {
    const hasPending = downloads.some(
      (item) =>
        item.status === 'downloading' ||
        item.status === 'verifying' ||
        item.status === 'installing'
    );
    if (!hasPending) return;

    const timer = window.setInterval(() => {
      setDownloads((prev) =>
        prev.map((item) => {
          if (item.status === 'downloading') {
            const incrementMB = item.speedMBps * 0.48;
            const progressDelta = (incrementMB / item.sizeMB) * 100;
            const nextProgress = Math.min(100, item.progress + progressDelta);

            if (nextProgress >= 100) {
              return { ...item, progress: 100, status: 'verifying' };
            }
            return { ...item, progress: nextProgress };
          }

          if (item.status === 'verifying') {
            return { ...item, status: 'ready' };
          }

          if (item.status === 'installing') {
            return { ...item, status: 'installed' };
          }

          return item;
        })
      );
    }, 320);

    return () => window.clearInterval(timer);
  }, [downloads]);

  useEffect(() => {
    if (!toastMessage) return;
    const timeout = window.setTimeout(() => setToastMessage(null), 3200);
    return () => window.clearTimeout(timeout);
  }, [toastMessage]);

  const enqueueVersion = (item: CatalogItem, version: PackageVersion) => {
    setDownloads((prev) => {
      const existingIdx = prev.findIndex((d) => d.itemId === item.id);
      if (existingIdx !== -1) {
        const existing = prev[existingIdx];
        if (existing.status === 'paused') {
          return prev.map((d, i) =>
            i === existingIdx ? { ...d, status: 'downloading' } : d
          );
        }
        return prev;
      }

      const newItem: DownloadItem = {
        id: `${item.id}-${version.versionCode}`,
        itemId: item.id,
        title: item.title,
        packageName: item.packageName,
        developer: item.developer,
        iconKey: item.iconKey,
        accentColor: item.accentColor,
        version: version.version,
        format: version.format,
        sizeMB: version.sizeMB,
        sha256: version.sha256,
        progress: 10,
        status: 'downloading',
        speedMBps: 72 + Math.random() * 24,
        startedAt: Date.now(),
      };
      return [newItem, ...prev];
    });
  };

  const handleDownloadVersion = (item: CatalogItem, version: PackageVersion) => {
    enqueueVersion(item, version);
    setToastMessage(`Downloading ${item.title} (${version.format} v${version.version})`);
  };

  const handleQueueBundle = (ids: string[], bundleLabel: string) => {
    const matched = CATALOG_ITEMS.filter((item) => ids.includes(item.id));
    if (matched.length === 0) return;
    for (const item of matched) {
      enqueueVersion(item, item.versions[0]);
    }
    setToastMessage(`Queued ${bundleLabel} (${matched.length} packages)`);
    setIsDrawerOpen(true);
  };

  const handleTogglePause = (id: string) => {
    setDownloads((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        if (item.status === 'downloading') return { ...item, status: 'paused' };
        if (item.status === 'paused') return { ...item, status: 'downloading' };
        return item;
      })
    );
  };

  const handleInstallItem = (id: string) => {
    const target = downloads.find((d) => d.id === id);
    setDownloads((prev) =>
      prev.map((item) =>
        item.id === id && item.status === 'ready'
          ? { ...item, status: 'installing' }
          : item
      )
    );
    if (target) {
      setToastMessage(`Installing ${target.title} (${target.format})`);
    }
  };

  const handleInstallAllReady = () => {
    setDownloads((prev) =>
      prev.map((item) =>
        item.status === 'ready' ? { ...item, status: 'installing' } : item
      )
    );
    setToastMessage('Installing all verified packages');
  };

  const handleRemoveDownload = (id: string) => {
    setDownloads((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearInstalled = () => {
    setDownloads((prev) => prev.filter((item) => item.status !== 'installed'));
  };

  const handleResetFilters = () => {
    setSelectedKind('all');
    setSearchQuery('');
    setSelectedCategory('All');
    setPackageFormat('ALL');
    setSortBy('popular');
  };

  const activeDownloadsCount = downloads.filter(
    (item) => item.status === 'downloading' || item.status === 'verifying'
  ).length;
  const readyCount = downloads.filter((item) => item.status === 'ready').length;
  const installedCount = downloads.filter(
    (item) => item.status === 'installed'
  ).length;

  const downloadsByItemId = useMemo(() => {
    const map = new Map<string, DownloadItem>();
    for (const d of downloads) {
      map.set(d.itemId, d);
    }
    return map;
  }, [downloads]);

  return (
    <div className="min-h-screen bg-[#060807] text-[#ECF2EE] flex flex-col">
      <Header
        activeDownloadsCount={activeDownloadsCount}
        readyCount={readyCount}
        installedCount={installedCount}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          spotlights={HERO_SPOTLIGHTS}
          onDownloadVersion={handleDownloadVersion}
          onQueueBundle={handleQueueBundle}
          onInspectItem={setInspectedItem}
        />

        <CatalogSection
          items={filteredItems}
          totalCount={CATALOG_ITEMS.length}
          gamesCount={gamesCount}
          appsCount={appsCount}
          selectedKind={selectedKind}
          onKindChange={setSelectedKind}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          packageFormat={packageFormat}
          onPackageFormatChange={setPackageFormat}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onResetFilters={handleResetFilters}
          onDownloadVersion={handleDownloadVersion}
          onInstallReadyItem={handleInstallItem}
          onInspectItem={setInspectedItem}
          downloadsByItemId={downloadsByItemId}
        />

        <TopChartsAndStandards
          items={CATALOG_ITEMS}
          onDownloadVersion={handleDownloadVersion}
          onInspectItem={setInspectedItem}
        />
      </main>

      <Footer />

      <GameDetailModal
        item={inspectedItem}
        onClose={() => setInspectedItem(null)}
        onDownloadVersion={handleDownloadVersion}
      />

      <DownloadDrawer
        isOpen={isDrawerOpen}
        items={downloads}
        onClose={() => setIsDrawerOpen(false)}
        onTogglePause={handleTogglePause}
        onInstallItem={handleInstallItem}
        onInstallAllReady={handleInstallAllReady}
        onRemoveItem={handleRemoveDownload}
        onClearInstalled={handleClearInstalled}
      />

      {toastMessage && !isDrawerOpen && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2.5 py-3 px-4 rounded-xl bg-[#0E1310] border border-[#22C55E]/45 text-xs font-medium text-[#ECF2EE] shadow-xl hover:bg-[#141B16] transition-colors cursor-pointer"
          >
            <Package className="w-4 h-4 text-[#4ADE80]" />
            <span>{toastMessage}</span>
            <span className="text-[#4ADE80] font-semibold ml-1">Open</span>
          </button>
        </div>
      )}

      <OfflineIndicator />
    </div>
  );
}
