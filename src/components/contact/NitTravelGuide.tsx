import {
  NIT_TRAVEL_AIR,
  NIT_TRAVEL_BUS,
  NIT_TRAVEL_CHANDIGARH,
  NIT_TRAVEL_DISCLAIMER,
  NIT_TRAVEL_JALANDHAR,
  NIT_TRAVEL_RAILWAY,
} from "@/data/nit-travel-guide";
import { CANONICAL_ROUTES } from "@/constants/canonical-routes";
import Link from "next/link";

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function NitTravelGuide() {
  return (
    <section aria-labelledby="nit-travel-heading" className="mt-14 border-t border-slate-100 pt-12">
      <h2 id="nit-travel-heading" className="text-xl font-bold text-brand-navy md:text-2xl">
        How to Reach NIT Hamirpur
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Travel guide for Shiksha Mahakumbh 6.0 delegates. For venue queries, see{" "}
        <Link href={CANONICAL_ROUTES.about.nitHamirpur} className="font-semibold text-brand-navy underline">
          About NIT Hamirpur
        </Link>
        .
      </p>
      <p className="mt-3 rounded-xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-xs text-amber-900">
        {NIT_TRAVEL_DISCLAIMER}
      </p>

      <div className="mt-8 space-y-10">
        <article>
          <h3 className="text-lg font-bold text-brand-navy">{NIT_TRAVEL_RAILWAY.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{NIT_TRAVEL_RAILWAY.intro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-surface text-xs font-bold uppercase tracking-wider text-brand-navy">
                <tr>
                  <th className="px-4 py-3">Train option</th>
                  <th className="px-4 py-3">Indicative timing</th>
                  <th className="px-4 py-3">Useful note</th>
                </tr>
              </thead>
              <tbody>
                {NIT_TRAVEL_RAILWAY.trains.map((row) => (
                  <tr key={row.train} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-brand-navy">{row.train}</td>
                    <td className="px-4 py-3 text-slate-700">{row.timing}</td>
                    <td className="px-4 py-3 text-slate-600">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BulletList items={NIT_TRAVEL_RAILWAY.bullets} />
        </article>

        <article>
          <h3 className="text-lg font-bold text-brand-navy">{NIT_TRAVEL_BUS.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{NIT_TRAVEL_BUS.intro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-surface text-xs font-bold uppercase tracking-wider text-brand-navy">
                <tr>
                  <th className="px-4 py-3">Starting point</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Indicative journey</th>
                </tr>
              </thead>
              <tbody>
                {NIT_TRAVEL_BUS.routes.map((row) => (
                  <tr key={`${row.from}-${row.to}`} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-brand-navy">{row.from}</td>
                    <td className="px-4 py-3 text-slate-700">{row.to}</td>
                    <td className="px-4 py-3 text-slate-600">{row.journey}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BulletList items={NIT_TRAVEL_BUS.bullets} />
        </article>

        <article>
          <h3 className="text-lg font-bold text-brand-navy">{NIT_TRAVEL_AIR.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{NIT_TRAVEL_AIR.intro}</p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-brand-surface text-xs font-bold uppercase tracking-wider text-brand-navy">
                <tr>
                  <th className="px-4 py-3">Airport</th>
                  <th className="px-4 py-3">Best use</th>
                  <th className="px-4 py-3">Road connection to NIT Hamirpur</th>
                </tr>
              </thead>
              <tbody>
                {NIT_TRAVEL_AIR.airports.map((row) => (
                  <tr key={row.airport} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-medium text-brand-navy">{row.airport}</td>
                    <td className="px-4 py-3 text-slate-700">{row.bestUse}</td>
                    <td className="px-4 py-3 text-slate-600">{row.roadConnection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <BulletList items={NIT_TRAVEL_AIR.bullets} />
        </article>

        <article>
          <h3 className="text-lg font-bold text-brand-navy">{NIT_TRAVEL_CHANDIGARH.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{NIT_TRAVEL_CHANDIGARH.intro}</p>
          <BulletList items={NIT_TRAVEL_CHANDIGARH.bullets} />
        </article>

        <article>
          <h3 className="text-lg font-bold text-brand-navy">{NIT_TRAVEL_JALANDHAR.title}</h3>
          <p className="mt-2 text-sm text-slate-700">{NIT_TRAVEL_JALANDHAR.intro}</p>
          <BulletList items={NIT_TRAVEL_JALANDHAR.bullets} />
        </article>
      </div>
    </section>
  );
}
