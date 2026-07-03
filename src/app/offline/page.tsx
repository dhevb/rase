import type { Metadata } from "next";
import OfflineRetryButton from "@/components/pwa/OfflineRetryButton";

export const metadata: Metadata = {
  title: "Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center"
    >
      <h1 className="text-2xl font-bold text-brand-navy md:text-3xl">You are offline</h1>
      <p className="mt-3 max-w-md text-slate-600">
        Reconnect to browse Shiksha Mahakumbh schedules, registration, and updates.
      </p>
      <OfflineRetryButton />
    </main>
  );
}
