import { useState } from 'react';
import { Smartphone, WifiOff, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function PWAInstallControl() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);

  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else {
      setShowGuideModal(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="inline-flex items-center gap-2 py-3 px-4 rounded-lg bg-[#0E1310] hover:bg-[#141E18] border border-[#22C55E]/35 text-[#4ADE80] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22C55E]"
      >
        <Smartphone className="w-4 h-4" strokeWidth={1.75} />
        <span>{isIOS ? 'Add to iPhone' : 'Install RAYEN droid'}</span>
      </button>

      {showGuideModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Install RAYEN droid app"
          onClick={() => setShowGuideModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-[#0B0F0D] border border-white/[0.12] p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-[#4ADE80] mb-1">
                  Install Storefront App
                </p>
                <h3 className="text-lg font-semibold text-[#ECF2EE]">
                  Install RAYEN droid on Your Phone
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                aria-label="Close install instructions"
                className="p-1.5 rounded-lg text-[#9BA8A0] hover:text-[#ECF2EE] hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="space-y-2.5 text-sm text-[#B7C7BD] list-decimal list-inside">
                <li>
                  Tap <strong className="text-[#ECF2EE]">Share</strong> in Safari.
                </li>
                <li>
                  Select{' '}
                  <strong className="text-[#ECF2EE]">Add to Home Screen</strong>.
                </li>
                <li>
                  Tap <strong className="text-[#ECF2EE]">Add</strong> to launch RAYEN
                  droid full-screen.
                </li>
              </ol>
            ) : (
              <ol className="space-y-2.5 text-sm text-[#B7C7BD] list-decimal list-inside">
                <li>
                  Open RAYEN droid in{' '}
                  <strong className="text-[#ECF2EE]">Chrome</strong> on Android.
                </li>
                <li>
                  Tap <strong className="text-[#ECF2EE]">⋮</strong> →{' '}
                  <strong className="text-[#ECF2EE]">Install app</strong> or{' '}
                  <strong className="text-[#ECF2EE]">Add to Home screen</strong>.
                </li>
                <li>
                  Launch directly from your Android app drawer with offline support.
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2.5 px-4 rounded-lg bg-[#22C55E] hover:bg-[#16A34A] text-[#040705] text-sm font-semibold transition-colors cursor-pointer"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 py-2 px-3.5 rounded-lg bg-[#0E1310] border border-amber-500/40 text-xs font-medium text-amber-300 shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5" />
      <span>Offline mode · Cached catalog ready</span>
    </div>
  );
}
