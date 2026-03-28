import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Col 1 — Brand */}
          <div>
            <div className="footer-logo-main">
              Guadagno Smart<span className="pro">Pro</span>
            </div>
            <div className="footer-logo-slogan">Strategie reali · Zero guru · Solo numeri</div>
            <p className="footer-desc">
              Portale indipendente su business online, trading e finanza personale. Zero conflitti di
              interesse, solo contenuti verificati.
            </p>
          </div>

          {/* Col 2 — Link */}
          <div>
            <div className="footer-col-title">Navigazione</div>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/archivio">Archivio</Link></li>
              <li><Link href="/cerca">Cerca</Link></li>
            </ul>
          </div>

          {/* Col 3 — Community */}
          <div>
            <div className="footer-col-title">Community</div>
            <ul className="footer-links">
              <li><a href="https://t.me/+oMvBwUP3_xNmNDM8" target="_blank" rel="noopener noreferrer">Hub Telegram</a></li>
              <li><a href="https://guadagnosmartpro.com" target="_blank" rel="noopener noreferrer">GuadagnoSmartPro.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">© {year} GuadagnoSmartPro.com — Tutti i diritti riservati</div>
      </div>
    </footer>
  );
}
