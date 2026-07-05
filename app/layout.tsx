import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingContact from './components/widgets/FloatingContact';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ernest Industry Maritime Services | Marine Lighting & Ship Supply in Douala , Kribi & Limbe",
    template: "%s | Ernest Industry Maritime Services",
  },
  description:
    "Ernest Industry Maritime Services (EIMS) supplies the full range of marine bulbs — navigation, deck, underwater and interior lighting — plus complete ship provisions. Trusted ship chandler serving Douala, Kribi and Limbe ports in Cameroon.",
  keywords: [
    "marine lighting Cameroon",
    "ship chandler Douala",
    "marine bulbs supplier",
    "navigation lights",
    "ship provisions",
    "ship supply Kribi Limbe",
    "Supply and installation of tire fenders for anchorage",
    "Paint & chemical supply",
    "Ernest Industry",
  ],
  openGraph: {
    title: "Ernest Industry Maritime Services",
    description:
      "Marine lighting and ship supply  navigation, deck, underwater lighting and full provisions. Serving Douala, Kribi and Limbe ports.",
    type: "website",
    locale: "en_US",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
