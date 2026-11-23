export function Footer() {
  return (
    <footer className="py-10 bg-[#060807]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#7E8C83]">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-[#ECF2EE]">RAYEN droid</span>
          <span aria-hidden="true">·</span>
          <span>Verified Android APK & XAPK Storefront</span>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <a href="#catalog" className="hover:text-[#ECF2EE] transition-colors">
            APK Catalog
          </a>
          <a href="#top-charts" className="hover:text-[#ECF2EE] transition-colors">
            Top Charts
          </a>
          <a href="#curator-standard" className="hover:text-[#ECF2EE] transition-colors">
            Security Standard
          </a>
          <span>© 2026 RAYEN droid</span>
        </div>
      </div>
    </footer>
  );
}
