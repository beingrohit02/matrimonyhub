import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: { default: "MatrimonyHub - Find Your Perfect Match", template: "%s | MatrimonyHub" },
  description: "Free matrimonial platform to find your perfect life partner. Register free, search profiles, connect with matches.",
  keywords: ["matrimony", "marriage", "matchmaking", "life partner", "shaadi", "matrimonial"],
  authors: [{ name: "MatrimonyHub" }],
  creator: "MatrimonyHub",
  publisher: "MatrimonyHub",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://matrimonyhub.com",
    siteName: "MatrimonyHub",
    title: "MatrimonyHub - Find Your Perfect Match",
    description: "Free matrimonial platform to find your perfect life partner.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "MatrimonyHub" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "MatrimonyHub - Find Your Perfect Match",
    description: "Free matrimonial platform to find your perfect life partner.",
    images: ["/og-image.png"]
  },
  verification: { google: "google-site-verification-code" }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
