"use client";

export default function OfflineRetryButton() {
  const handleRetry = async () => {
    try {
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((reg) => reg.unregister()));
      }
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((key) => caches.delete(key)));
      }
    } catch {
      /* best-effort cleanup */
    }
    window.location.href = `/?_=${Date.now()}`;
  };

  return (
    <button
      type="button"
      onClick={() => void handleRetry()}
      className="mt-8 inline-flex min-h-[44px] items-center rounded-xl bg-brand-saffron px-6 py-3 font-bold text-brand-navy shadow-lg transition hover:bg-brand-saffron-dark"
    >
      Try again
    </button>
  );
}
