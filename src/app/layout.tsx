import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { UIProvider } from "@/contexts/UIContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Victor Acosta - Portfolio",
  description: "Professional portfolio and CV of Victor Acosta. Software Engineer & Web Developer.",
  keywords: ["Victor Acosta", "Portfolio", "Software Engineer", "Web Developer", "React", "Next.js"],
  authors: [{ name: "Victor Acosta" }],
  openGraph: {
    title: "Victor Acosta - Portfolio",
    description: "Discover the professional projects and skills of Victor Acosta.",
    type: "website",
    locale: "es_ES",
    siteName: "Victor Acosta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Victor Acosta - Portfolio",
    description: "Professional portfolio and CV of Victor Acosta",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { var t = localStorage.getItem('theme'); if (!t) { t = 'dark'; } document.documentElement.setAttribute('data-theme', t); } catch (e) {} })();`,
          }}
        />
        <LanguageProvider>
          <UIProvider>
            <a href="#main" className="skip-link">Saltar al contenido</a>
            <main id="main" className="pt-0">
              {children}
            </main>
          </UIProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

