"use client";

import { useEffect, useState, type ReactNode } from "react";
import { computeVisitorDisplayTotal } from "@/lib/analytics/visitor-ids";

type VisitorStatsResponse = {
  success?: boolean;
  daily: number;
  total: number;
  displayTotal: number;
  activeUsers?: number;
  source?: string;
  degraded?: boolean;
};

const FALLBACK: VisitorStatsResponse = {
  daily: 0,
  total: 0,
  displayTotal: computeVisitorDisplayTotal(0),
  activeUsers: 0,
};

const STAT_CARD =
  "rounded-xl border border-brand-saffron/20 bg-white px-3 py-3 text-center shadow-sm shadow-brand-saffron/5 md:px-4 md:py-3.5";

function CounterSkeleton() {
  return (
    <span
      className="inline-block h-7 w-14 animate-pulse rounded bg-brand-saffron/20"
      aria-hidden
    />
  );
}

type StatItem = {
  label: string;
  value: ReactNode;
  emphasize?: boolean;
};

function StatGrid({ items, loading }: { items: StatItem[]; loading: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      {items.map((item) => (
        <div key={item.label} className={STAT_CARD}>
          <p
            className={`font-extrabold tabular-nums text-brand-saffron ${
              item.emphasize ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            }`}
          >
            {loading ? <CounterSkeleton /> : item.value}
          </p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function FooterVisitorCounter() {
  const [dailyVisitors, setDailyVisitors] = useState<number | null>(null);
  const [displayTotal, setDisplayTotal] = useState<number | null>(null);
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    async function loadCounts() {
      try {
        const res = await fetch("/api/v2/analytics/stats", { cache: "no-store" });
        const data = (await res.json()) as VisitorStatsResponse;
        if (cancelled) return;

        const isDegraded =
          !res.ok || data.source === "fallback" || data.degraded === true;
        setDegraded(isDegraded);

        if (isDegraded) {
          setDailyVisitors(FALLBACK.daily);
          setDisplayTotal(FALLBACK.displayTotal);
          setActiveUsers(0);
        } else {
          setDailyVisitors(data.daily ?? FALLBACK.daily);
          setDisplayTotal(data.displayTotal ?? FALLBACK.displayTotal);
          setActiveUsers(data.activeUsers ?? 0);
        }
      } catch (error) {
        console.error("Footer visitor counter:", error);
        if (!cancelled) {
          setDegraded(true);
          setDailyVisitors(FALLBACK.daily);
          setDisplayTotal(FALLBACK.displayTotal);
          setActiveUsers(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCounts();
    intervalId = setInterval(loadCounts, 60_000);

    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  const items: StatItem[] = [
    { label: "Today (IST)", value: dailyVisitors },
    {
      label: "All-Time Visitors",
      value: displayTotal?.toLocaleString("en-IN"),
      emphasize: true,
    },
    { label: "Active Now", value: activeUsers },
  ];

  return (
    <section
      className="mt-4 border-t border-brand-saffron/15 pt-4"
      aria-live="polite"
      aria-label="Live visitor statistics"
    >
      <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-brand-blue sm:text-xs">
        Live Site Traffic
      </p>
      {degraded && !loading && (
        <p className="mb-3 text-center text-xs text-amber-700" role="status">
          Live counts temporarily unavailable — showing last known values
        </p>
      )}
      <StatGrid items={items} loading={loading} />
      <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
        All-time total includes historical visits through 2025
      </p>
    </section>
  );
}
