import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="page-404">
        <div className="page-404-inner">
          <div className="page-404-num">404</div>
          <div className="page-404-title">Pagina non trovata</div>
          <p className="page-404-desc">
            La pagina che cerchi non esiste o è stata spostata. Torna alla homepage o cerca un articolo.
          </p>
          <Link href="/" className="btn-home">
            ← Torna alla Homepage
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
