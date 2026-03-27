const TG_LINK = "https://t.me/+oMvBwUP3_xNmNDM8";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sb-block sb-ad">
        <div className="sb-ad-inner">
          <div className="sb-ad-label">// Spazio Pubblicitario</div>
          <div className="sb-ad-title">
            Promuovi il<br />tuo Brand Qui
          </div>
        </div>
      </div>

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
