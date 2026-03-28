import Link from "next/link";
import { getCategoriesWithCount } from "@/lib/queries";

const TG_LINK = "https://t.me/+oMvBwUP3_xNmNDM8";

const DOT_COLORS = [
  "var(--c4)",
  "var(--c3)",
  "var(--c5)",
  "var(--c2)",
  "var(--c6)",
  "var(--c1)",
];

export default async function Sidebar() {
  const categoriesWithCount = await getCategoriesWithCount();

  return (
    <aside className="sidebar">
      {/* Ad Banner */}
      <div className="sb-block sb-ad">
        <div className="sb-ad-inner">
          <div className="sb-ad-label">// Spazio Pubblicitario</div>
          <div className="sb-ad-title">
            Promuovi il<br />tuo Brand Qui
          </div>
        </div>
      </div>

      {/* Categorie con contatore */}
      {categoriesWithCount.length > 0 && (
        <div className="sb-block">
          <div className="sb-head">
            <span className="slash">//</span> Categorie
          </div>
          <div className="sb-cats">
            {categoriesWithCount.map((item, i) => (
              <Link
                key={item.category.id}
                href={`/categoria/${item.category.slug}`}
                className="sb-cat-item"
              >
                <div className="sb-cat-name">
                  <div
                    className="sb-cat-dot"
                    style={{ background: DOT_COLORS[i % DOT_COLORS.length] }}
                  />
                  {item.category.name}
                </div>
                <span className="sb-cat-count">{item.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Telegram */}
      <div className="sb-block">
        <div className="tg-box">
          <div className="tg-box-title">Hub Telegram</div>
          <div className="tg-box-sub">
            Community privata · 180+ trader attivi · strategie e analisi in tempo reale
          </div>
          <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="tg-box-btn">
            Unisciti Gratis →
          </a>
        </div>
      </div>
    </aside>
  );
}
