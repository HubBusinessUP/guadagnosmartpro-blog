import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-GPJMM0JHQP";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.guadagnosmartpro.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GuadagnoSmartPro - Guadagna online in modo intelligente",
    template: "%s | GuadagnoSmartPro",
  },
  description:
    "Analisi concrete, strategie testate e strumenti verificati per chi vuole costruire reddito online senza bullshit.",
  keywords: [
    "guadagnare online",
    "business online",
    "trading matematico",
    "reddito passivo",
    "prop firm",
    "affitti brevi",
  ],
  authors: [{ name: "Antonio", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "/",
    siteName: "GuadagnoSmartPro",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        {/* Iubenda Cookie Banner */}
        <Script id="iubenda-cs" strategy="afterInteractive">
          {`
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "siteId": 4475193,
              "cookiePolicyId": 3228861,
              "lang": "it",
              "storage": { "useSiteId": true }
            };
          `}
        </Script>
        <Script
          src="https://cs.iubenda.com/autoblocking/4475193/stub.js"
          strategy="afterInteractive"
        />
        <Script
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          strategy="afterInteractive"
          async
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
