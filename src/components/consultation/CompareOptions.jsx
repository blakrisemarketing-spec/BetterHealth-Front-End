import { Check } from "lucide-react";
import Fade from "./Fade";
import { COMPARISON } from "../../data/wellness-consultation";

/**
 * The three things somebody in this position can actually do.
 *
 * The middle column is BetterHealth's own book-a-test funnel, stated fairly
 * rather than strawmanned — the reader has met that column, and pretending it
 * doesn't exist reads as evasion. It's here because the campaign's whole thesis
 * is that picking a panel off a price list is a decision most people aren't
 * equipped to make on their own.
 *
 * Renders as cards on mobile and a table on desktop: a five-row, three-column
 * table at 375px is unreadable no matter how it's styled.
 */
export default function CompareOptions() {
  const { columns, rows, recommend } = COMPARISON;

  return (
    <div className="mx-auto max-w-[1120px]">
      <Fade>
        <h2 className="mb-2 text-center font-heading text-[1.75rem] font-extrabold leading-[1.1] tracking-tight text-text-primary sm:text-[2.35rem]">
          Three things you could do from here
        </h2>
      </Fade>
      <Fade delay={0.06}>
        <p className="mx-auto mb-9 max-w-[560px] text-center text-[16.5px] leading-relaxed text-text-secondary">
          Two of them are fine. One of them costs nothing and still leaves you with something.
        </p>
      </Fade>

      {/* Desktop: table */}
      <Fade delay={0.1}>
        <div className="hidden overflow-hidden rounded-card border border-border bg-card shadow-card lg:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[24%] border-b border-border px-6 py-4" />
                {columns.map((col, i) => (
                  <th
                    key={col}
                    className={`border-b border-border px-6 py-4 font-heading text-[15px] font-extrabold ${
                      i === recommend
                        ? "bg-primary-bg text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {col}
                    {i === recommend && (
                      <span className="ml-2 inline-flex items-center rounded-pill bg-primary px-2 py-0.5 align-middle text-[10px] font-bold uppercase tracking-wider text-white">
                        Free
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, r) => (
                <tr key={row.label}>
                  <th
                    scope="row"
                    className={`px-6 py-4 align-top text-[13px] font-bold uppercase tracking-[0.08em] text-text-muted ${
                      r < rows.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={`${row.label}-${columns[i]}`}
                      className={`px-6 py-4 align-top text-[15px] leading-snug ${
                        r < rows.length - 1 ? "border-b border-border" : ""
                      } ${
                        i === recommend
                          ? "bg-primary-bg font-bold text-text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      {i === recommend ? (
                        <span className="flex items-start gap-2">
                          <Check size={16} className="mt-0.5 shrink-0 text-primary" />
                          {cell}
                        </span>
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Fade>

      {/* Mobile: one card per option */}
      <div className="flex flex-col gap-4 lg:hidden">
        {columns.map((col, i) => (
          <Fade key={col} delay={0.1 + i * 0.06}>
            <div
              className={`rounded-card border p-5 ${
                i === recommend
                  ? "border-primary bg-primary-bg shadow-card"
                  : "border-border bg-card"
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                <h3
                  className={`font-heading text-[17px] font-extrabold ${
                    i === recommend ? "text-primary" : "text-text-primary"
                  }`}
                >
                  {col}
                </h3>
                {i === recommend && (
                  <span className="inline-flex items-center rounded-pill bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                    Free
                  </span>
                )}
              </div>
              <dl className="flex flex-col gap-2.5">
                {rows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <dt className="text-[13px] leading-snug text-text-muted">{row.label}</dt>
                    <dd
                      className={`shrink-0 basis-1/2 text-right text-[14px] leading-snug ${
                        i === recommend
                          ? "font-bold text-text-primary"
                          : "text-text-secondary"
                      }`}
                    >
                      {row.cells[i]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}
