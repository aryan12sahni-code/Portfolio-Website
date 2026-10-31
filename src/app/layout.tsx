import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Aryan Sahni — Product Operations & Industrial AI",
  description:
    "Portfolio of Aryan Sahni — product operations, analytics, and AI for industrial applications. Based in Nürnberg, Germany.",
  openGraph: {
    title: "Aryan Sahni — Product Operations & Industrial AI",
    description:
      "Turning messy product data into decisions teams ship. Product ops, analytics, and industrial AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--void)] font-sans text-white">
        {children}
      </body>
    </html>
  );
}
