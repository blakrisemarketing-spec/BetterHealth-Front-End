import { GUIDE_DISCLAIMER } from "../../data/guides";

// Renders guide sections in the order every surface uses (page + PDF):
// paragraphs -> table(s) -> list -> after -> callout.

function Table({ table }) {
  const fillIn = Boolean(table.fillIn);
  return (
    <figure className="my-4">
      {table.caption && (
        <figcaption className="text-[12px] font-semibold text-text-secondary mb-2">
          {table.caption}
        </figcaption>
      )}
      <div className="overflow-x-auto rounded-card border border-border bg-card">
        <table className="w-full border-collapse text-[13px] text-text-primary">
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  scope="col"
                  className="bg-section-alt text-left font-bold text-[12px] px-3 py-2 border-b border-border whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, r) => (
              <tr key={r} className="border-b border-border last:border-b-0">
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`px-3 py-2 align-top leading-snug border-r border-border last:border-r-0 ${
                      fillIn ? "h-11 min-w-[72px]" : ""
                    } ${c === 0 ? "font-semibold" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

export function GuideSection({ section, index }) {
  const ListTag = section.ordered ? "ol" : "ul";
  const tables = section.tables || (section.table ? [section.table] : []);
  return (
    <section className="mb-8" id={`section-${index}`}>
      <h2 className="text-[1.15rem] sm:text-[1.3rem] font-extrabold text-text-primary font-heading tracking-tight mb-3">
        {section.heading}
      </h2>
      {section.paragraphs?.map((p, i) => (
        <p key={i} className="text-[15px] text-text-secondary leading-relaxed mb-3">
          {p}
        </p>
      ))}
      {tables.map((t, i) => (
        <Table key={i} table={t} />
      ))}
      {section.list && (
        <ListTag
          className={`${section.ordered ? "list-decimal" : "list-disc"} pl-5 mb-3 space-y-1.5 text-[15px] text-text-secondary leading-relaxed`}
        >
          {section.list.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ListTag>
      )}
      {section.after?.map((p, i) => (
        <p key={i} className="text-[15px] text-text-secondary leading-relaxed mb-3">
          {p}
        </p>
      ))}
      {section.callout && (
        <div className="rounded-card border-l-4 border-primary bg-primary-bg px-4 py-3 text-[14px] text-text-primary leading-relaxed">
          {section.callout}
        </div>
      )}
    </section>
  );
}

export function GuideSources({ sources }) {
  if (!sources?.length) return null;
  return (
    <section className="mb-8">
      <h2 className="text-[1.05rem] font-extrabold text-text-primary font-heading tracking-tight mb-2">
        Sources
      </h2>
      <ul className="list-disc pl-5 space-y-1 text-[13px] text-text-secondary leading-relaxed">
        {sources.map((s, i) => (
          <li key={i}>
            {s.url ? (
              <a href={s.url} className="text-primary font-semibold hover:text-primary-dark">
                {s.label}
              </a>
            ) : (
              s.label
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GuideDisclaimer() {
  return (
    <p className="text-[13px] text-text-muted italic border-t border-border pt-4">
      {GUIDE_DISCLAIMER}
    </p>
  );
}

export default function GuideContent({ sections, sources, from = 0, to }) {
  const slice = sections.slice(from, to);
  return (
    <div>
      {slice.map((s, i) => (
        <GuideSection key={from + i} section={s} index={from + i} />
      ))}
      {to === undefined && (
        <>
          <GuideSources sources={sources} />
          <GuideDisclaimer />
        </>
      )}
    </div>
  );
}
