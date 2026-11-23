import { useEffect, useState } from 'react';
import {
  ArrowDownToLine,
  Check,
  Copy,
  Cpu,
  Gamepad2,
  HardDrive,
  History,
  ShieldCheck,
  Smartphone,
  Star,
  WifiOff,
  X,
} from 'lucide-react';
import { CatalogItem, PackageVersion } from '../types/game';
import { formatFileSize } from '../data/catalog';
import { GameImage } from './GameImage';
import { AppIcon } from './AppIcon';

interface GameDetailModalProps {
  item: CatalogItem | null;
  onClose: () => void;
  onDownloadVersion: (item: CatalogItem, version: PackageVersion) => void;
}

const ANDROID_DEVICES = [
  { id: 's25', name: 'Samsung Galaxy S25 Ultra', ram: 12, sdk: 'Android 15', abi: 'arm64-v8a' },
  { id: 'pixel9', name: 'Google Pixel 9 Pro', ram: 16, sdk: 'Android 15', abi: 'arm64-v8a' },
  { id: 'rog9', name: 'ASUS ROG Phone 9', ram: 16, sdk: 'Android 15', abi: 'arm64-v8a' },
  { id: 'xiaomi15', name: 'Xiaomi 15 Ultra', ram: 16, sdk: 'Android 15', abi: 'arm64-v8a' },
  { id: 'oneplus13', name: 'OnePlus 13', ram: 12, sdk: 'Android 15', abi: 'arm64-v8a' },
  { id: 'poco', name: 'POCO F6 Pro', ram: 8, sdk: 'Android 14', abi: 'arm64-v8a' },
];

export function GameDetailModal({
  item,
  onClose,
  onDownloadVersion,
}: GameDetailModalProps) {
  const [selectedVersionIdx, setSelectedVersionIdx] = useState(0);
  const [copiedHash, setCopiedHash] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState('s25');

  useEffect(() => {
    setSelectedVersionIdx(0);
    setCopiedHash(false);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose]);

  if (!item) return null;

  const activeVersion = item.versions[selectedVersionIdx] || item.versions[0];
  const device =
    ANDROID_DEVICES.find((d) => d.id === selectedDeviceId) || ANDROID_DEVICES[0];
  const ramPass = device.ram >= item.minRamGB;
  const estSeconds = Math.max(1, Math.round(activeVersion.sizeMB / 78));

  const handleCopyChecksum = async () => {
    try {
      await navigator.clipboard.writeText(activeVersion.sha256);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    } catch {
      setCopiedHash(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/78 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="game-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B0F0D] border border-white/[0.12] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#0B0F0D]/95 backdrop-blur-md border-b border-white/[0.08]">
          <div className="flex items-center gap-3.5 min-w-0">
            <AppIcon
              iconKey={item.iconKey}
              title={item.title}
              accentColor={item.accentColor}
              size="md"
            />
            <div className="min-w-0">
              <p className="text-xs text-[#4ADE80] font-medium truncate">
                {item.category} · {item.developer} · {item.downloadsLabel}
              </p>
              <h2
                id="game-modal-title"
                className="text-xl font-semibold text-[#ECF2EE] truncate"
              >
                {item.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close package details"
            className="p-2 rounded-lg text-[#9BA8A0] hover:text-[#ECF2EE] hover:bg-white/[0.06] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#22C55E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-6">
            {item.bannerImageUrl && (
              <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#0E1310] border border-white/[0.08]">
                <GameImage
                  src={item.bannerImageUrl}
                  alt={`${item.title} banner`}
                  title={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-[#ECF2EE] mb-2">
                Package Summary
              </h3>
              <p className="text-sm text-[#9BA8A0] leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Uptodown / APKPure Version History Table */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-sm font-semibold text-[#ECF2EE] inline-flex items-center gap-2">
                  <History className="w-4 h-4 text-[#4ADE80]" />
                  <span>Previous & Latest Versions</span>
                </h3>
                <span className="text-xs text-[#7E8C83]">
                  Select to inspect or download
                </span>
              </div>

              <div className="rounded-xl bg-[#0E1310] border border-white/[0.08] divide-y divide-white/[0.06]">
                {item.versions.map((ver, idx) => {
                  const selected = idx === selectedVersionIdx;
                  return (
                    <div
                      key={ver.versionCode}
                      className={`p-3.5 flex items-center justify-between gap-3 transition-colors ${
                        selected ? 'bg-[#141E18]' : 'hover:bg-white/[0.02]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedVersionIdx(idx)}
                        className="text-left min-w-0 flex-1 cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium text-[#ECF2EE]">
                          <span className="font-mono tabular-nums">
                            v{ver.version}
                          </span>
                          <span className="text-xs text-[#4ADE80]">
                            {ver.format}
                          </span>
                          {idx === 0 && (
                            <span className="text-xs text-[#9BA8A0]">
                              · Latest
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#7E8C83] font-mono tabular-nums mt-0.5">
                          {ver.releaseDate} · {formatFileSize(ver.sizeMB)} · {ver.minAndroid}
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onDownloadVersion(item, ver);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#18221C] hover:bg-[#22C55E] text-[#4ADE80] hover:text-[#040705] border border-[#22C55E]/30 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <ArrowDownToLine className="w-3.5 h-3.5" />
                        <span>{ver.format}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Device Compatibility Check */}
            <div className="p-4 rounded-xl bg-[#0E1310] border border-white/[0.08] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#ECF2EE] inline-flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#4ADE80]" />
                  Android Device Compatibility
                </span>
                <select
                  aria-label="Select Android device"
                  value={selectedDeviceId}
                  onChange={(e) => setSelectedDeviceId(e.target.value)}
                  className="py-1.5 px-3 rounded-lg bg-[#060807] border border-white/[0.1] text-xs text-[#ECF2EE] focus:outline-none focus:border-[#22C55E] cursor-pointer"
                >
                  {ANDROID_DEVICES.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.ram} GB RAM)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/[0.06] text-xs">
                <div>
                  <span className="text-[#7E8C83] block mb-0.5">ABI & RAM</span>
                  <span className="font-medium text-[#4ADE80]">
                    {ramPass ? `${device.abi} Ready` : 'Low RAM'}
                  </span>
                </div>
                <div>
                  <span className="text-[#7E8C83] block mb-0.5">Target Refresh</span>
                  <span className="font-mono tabular-nums text-[#ECF2EE]">
                    {item.fpsTarget}
                  </span>
                </div>
                <div>
                  <span className="text-[#7E8C83] block mb-0.5">Est. Mirror Time</span>
                  <span className="font-mono tabular-nums text-[#ECF2EE]">
                    ~{estSeconds}s @ 78 MB/s
                  </span>
                </div>
              </div>
            </div>

            {/* Community Reviews */}
            <div className="pt-4 border-t border-white/[0.08]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-[#ECF2EE]">
                  Verified User Reports
                </h3>
                <span className="text-xs font-mono tabular-nums text-[#B7C7BD] inline-flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#4ADE80] fill-[#4ADE80]" />
                  {item.rating.toFixed(1)} ({item.reviewCount.toLocaleString()})
                </span>
              </div>

              <div className="space-y-3">
                {item.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 rounded-xl bg-[#0E1310] border border-white/[0.08]"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                      <span className="font-medium text-[#ECF2EE]">
                        {review.author} ·{' '}
                        <span className="text-[#9BA8A0] font-normal">
                          {review.device}
                        </span>
                      </span>
                      <span className="text-[#9BA8A0]">{review.date}</span>
                    </div>
                    <p className="text-sm text-[#B7C7BD] leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Package Metadata & Install CTA */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-20 p-5 rounded-xl bg-[#0E1310] border border-white/[0.08] space-y-5">
              <div>
                <p className="text-xs font-medium text-[#4ADE80] mb-1">
                  Selected Build
                </p>
                <p className="text-base font-semibold text-[#ECF2EE] font-mono tabular-nums">
                  {activeVersion.format} · v{activeVersion.version}
                </p>
                <p className="text-xs text-[#9BA8A0] mt-1 leading-relaxed">
                  {activeVersion.notes}
                </p>
              </div>

              <div className="divide-y divide-white/[0.06] text-xs">
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#9BA8A0]">Package ID</span>
                  <span className="font-mono text-[#ECF2EE] truncate max-w-[180px]">
                    {item.packageName}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#9BA8A0] inline-flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5" />
                    File Size
                  </span>
                  <span className="font-mono tabular-nums text-[#ECF2EE]">
                    {formatFileSize(activeVersion.sizeMB)}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#9BA8A0] inline-flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    Android SDK
                  </span>
                  <span className="font-mono tabular-nums text-[#ECF2EE]">
                    {activeVersion.minAndroid} · {item.minRamGB} GB RAM
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#9BA8A0] inline-flex items-center gap-1.5">
                    <Gamepad2 className="w-3.5 h-3.5" />
                    Controls
                  </span>
                  <span className="text-[#ECF2EE]">
                    {item.controllerSupport ? 'Gamepad + Touch' : 'Touch Native'}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-2">
                  <span className="text-[#9BA8A0] inline-flex items-center gap-1.5">
                    <WifiOff className="w-3.5 h-3.5" />
                    Offline Support
                  </span>
                  <span className="text-[#ECF2EE]">
                    {item.offlineReady ? 'Available' : 'Online Only'}
                  </span>
                </div>
              </div>

              {/* SHA-256 Checksum */}
              <div className="p-3 rounded-lg bg-[#060807] border border-white/[0.08]">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-medium text-[#4ADE80] inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SHA-256 Signature
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyChecksum}
                    className="inline-flex items-center gap-1 text-xs text-[#9BA8A0] hover:text-[#ECF2EE] transition-colors cursor-pointer"
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4ADE80]" />
                        <span className="text-[#4ADE80]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-[11px] text-[#9BA8A0] break-all leading-relaxed">
                  {activeVersion.sha256}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onDownloadVersion(item, activeVersion);
                  onClose();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#040705] text-sm font-semibold transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4ADE80]"
              >
                <ArrowDownToLine className="w-4 h-4" strokeWidth={2} />
                <span>
                  Download {activeVersion.format} ·{' '}
                  {formatFileSize(activeVersion.sizeMB)}
                </span>
              </button>

              <p className="text-[11px] text-[#7E8C83] text-center">
                {activeVersion.architecture} · Rated {item.ageRating} · Direct RAYEN droid Mirror
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
