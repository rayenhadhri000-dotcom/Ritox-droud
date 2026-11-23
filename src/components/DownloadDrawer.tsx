import { useEffect } from 'react';
import {
  CheckCircle2,
  Download,
  FileCheck2,
  PackageCheck,
  Pause,
  Play,
  ShieldCheck,
  Trash2,
  X,
} from 'lucide-react';
import { DownloadItem } from '../types/game';
import { formatFileSize } from '../data/catalog';
import { AppIcon } from './AppIcon';

interface DownloadDrawerProps {
  isOpen: boolean;
  items: DownloadItem[];
  onClose: () => void;
  onTogglePause: (id: string) => void;
  onInstallItem: (id: string) => void;
  onInstallAllReady: () => void;
  onRemoveItem: (id: string) => void;
  onClearInstalled: () => void;
}

export function DownloadDrawer({
  isOpen,
  items,
  onClose,
  onTogglePause,
  onInstallItem,
  onInstallAllReady,
  onRemoveItem,
  onClearInstalled,
}: DownloadDrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeItems = items.filter(
    (item) =>
      item.status === 'downloading' ||
      item.status === 'paused' ||
      item.status === 'verifying'
  );
  const readyItems = items.filter(
    (item) => item.status === 'ready' || item.status === 'installing'
  );
  const installedItems = items.filter((item) => item.status === 'installed');

  const handleSaveApkReceipt = (item: DownloadItem) => {
    const ext = item.format.toLowerCase();
    const manifest = {
      installer: 'RAYEN droid Package Manager',
      title: item.title,
      packageName: item.packageName,
      developer: item.developer,
      format: item.format,
      version: item.version,
      filename: `${item.packageName}-v${item.version}.${ext}`,
      sizeMB: item.sizeMB,
      sha256: item.sha256,
      status: item.status,
      verifiedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.itemId}-v${item.version}-${ext}-receipt.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="RAYEN droid APK Installer"
      onClick={onClose}
    >
      <aside
        className="w-full max-w-md h-full bg-[#080B09] border-l border-white/[0.1] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-[#ECF2EE]">
              RAYEN droid Installer
            </h2>
            <p className="text-xs text-[#9BA8A0] tabular-nums">
              {activeItems.length} downloading · {readyItems.length} ready ·{' '}
              {installedItems.length} installed
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close installer"
            className="p-2 rounded-lg text-[#9BA8A0] hover:text-[#ECF2EE] hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <Download
                className="w-8 h-8 text-[#4ADE80]/50 mx-auto mb-3"
                strokeWidth={1.5}
              />
              <p className="text-sm font-medium text-[#ECF2EE] mb-1">
                No APK or XAPK packages queued.
              </p>
              <p className="text-xs text-[#9BA8A0] max-w-xs mx-auto leading-relaxed">
                Pick any of the 156 games and apps in RAYEN droid to download,
                verify its SHA-256 signature, and install it cleanly.
              </p>
            </div>
          ) : (
            <>
              {/* Active Downloads & Signature Verification */}
              {activeItems.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-medium text-[#9BA8A0]">
                    Downloading & Verifying
                  </h3>
                  {activeItems.map((item) => {
                    const downloadedMB = Math.round((item.progress / 100) * item.sizeMB);
                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-[#0E1310] border border-white/[0.08] space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <AppIcon
                              iconKey={item.iconKey}
                              title={item.title}
                              accentColor={item.accentColor}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-[#ECF2EE] truncate">
                                {item.title}
                              </p>
                              <p className="text-xs text-[#9BA8A0] font-mono tabular-nums">
                                {item.format} v{item.version} ·{' '}
                                {formatFileSize(downloadedMB)} /{' '}
                                {formatFileSize(item.sizeMB)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {item.status !== 'verifying' && (
                              <button
                                type="button"
                                onClick={() => onTogglePause(item.id)}
                                aria-label={
                                  item.status === 'paused'
                                    ? 'Resume download'
                                    : 'Pause download'
                                }
                                className="p-1.5 rounded-md text-[#B7C7BD] hover:text-[#ECF2EE] hover:bg-white/[0.06] transition-colors cursor-pointer"
                              >
                                {item.status === 'paused' ? (
                                  <Play className="w-4 h-4 text-[#4ADE80]" />
                                ) : (
                                  <Pause className="w-4 h-4" />
                                )}
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.id)}
                              aria-label="Cancel download"
                              className="p-1.5 rounded-md text-[#9BA8A0] hover:text-red-400 hover:bg-white/[0.06] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div>
                          <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                            <div
                              className="h-full bg-[#22C55E] transition-[width] duration-200 ease-out"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                          <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono tabular-nums text-[#9BA8A0]">
                            <span>
                              {item.status === 'verifying'
                                ? 'Checking SHA-256 signature...'
                                : item.status === 'paused'
                                  ? 'Paused'
                                  : `${item.speedMBps.toFixed(1)} MB/s`}
                            </span>
                            <span>{Math.round(item.progress)}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Ready to Install Packages */}
              {readyItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-medium text-[#4ADE80]">
                      Ready to Install ({readyItems.length})
                    </h3>
                    {readyItems.some((i) => i.status === 'ready') && (
                      <button
                        type="button"
                        onClick={onInstallAllReady}
                        className="text-xs font-semibold text-[#4ADE80] hover:underline cursor-pointer"
                      >
                        Install All Ready
                      </button>
                    )}
                  </div>

                  {readyItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#0E1310] border border-[#22C55E]/30 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <AppIcon
                            iconKey={item.iconKey}
                            title={item.title}
                            accentColor={item.accentColor}
                            size="sm"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#ECF2EE] truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-[#4ADE80] inline-flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>
                                Signed {item.format} v{item.version} ·{' '}
                                {formatFileSize(item.sizeMB)}
                              </span>
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Delete downloaded package"
                          className="p-1.5 rounded-md text-[#9BA8A0] hover:text-red-400 hover:bg-white/[0.06] transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={item.status === 'installing'}
                          onClick={() => onInstallItem(item.id)}
                          className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] disabled:opacity-70 text-[#040705] text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <PackageCheck className="w-3.5 h-3.5" />
                          <span>
                            {item.status === 'installing'
                              ? `Staging ${item.format}...`
                              : `Install ${item.format}`}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveApkReceipt(item)}
                          title="Save Package Receipt"
                          className="py-2 px-3 rounded-lg bg-[#141B16] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-[#B7C7BD] cursor-pointer"
                        >
                          <FileCheck2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Installed Apps & Games */}
              {installedItems.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-medium text-[#9BA8A0]">
                      Installed on Device ({installedItems.length})
                    </h3>
                    <button
                      type="button"
                      onClick={onClearInstalled}
                      className="text-xs text-[#9BA8A0] hover:text-[#ECF2EE] transition-colors cursor-pointer"
                    >
                      Clear List
                    </button>
                  </div>

                  {installedItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#0E1310] border border-white/[0.08] space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <AppIcon
                            iconKey={item.iconKey}
                            title={item.title}
                            accentColor={item.accentColor}
                            size="sm"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-[#ECF2EE] truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-[#4ADE80] inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>
                                Installed · v{item.version} ({item.format})
                              </span>
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label="Uninstall package"
                          className="text-xs text-[#9BA8A0] hover:text-red-400 transition-colors cursor-pointer py-1 px-2"
                        >
                          Uninstall
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleSaveApkReceipt(item)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-[#141B16] hover:bg-[#1A251E] border border-white/[0.08] text-[#B7C7BD] hover:text-[#ECF2EE] text-xs font-medium transition-colors cursor-pointer"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-[#4ADE80]" />
                        <span>Export Package Receipt (.json)</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </div>
  );
}
