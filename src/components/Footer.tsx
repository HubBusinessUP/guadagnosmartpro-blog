export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-logo-main">
          Guadagno Smart<span className="pro">Pro</span>
        </div>
        <div className="footer-logo-slogan">Strategie reali · Zero guru · Solo numeri</div>
        <p className="footer-desc">
          Portale indipendente su business online, trading e finanza personale. Zero conflitti di
          interesse, solo contenuti verificati.
        </p>
        <div className="footer-bottom">© {year} GuadagnoSmartPro.com — Tutti i diritti riservati</div>
      </div>
    </footer>
  );
}
