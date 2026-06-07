import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://sohan-dsz.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sohan D Souza — AI/ML Engineer & Software Developer",
    template: "%s | Sohan D Souza",
  },
  description:
    "Portfolio of Sohan D Souza — Software Engineer specializing in AI/ML, Data Science, Full-Stack Development, and Salesforce. Explore projects, skills, and experience.",
  keywords: [
    "Sohan D Souza",
    "AI/ML Engineer",
    "Data Scientist",
    "Salesforce Developer",
    "Full Stack Developer",
    "Machine Learning",
    "Portfolio",
    "Mangaluru",
  ],
  authors: [{ name: "Sohan D Souza" }],
  creator: "Sohan D Souza",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Sohan D Souza — AI/ML Engineer & Software Developer",
    description:
      "Software Engineer specializing in AI/ML, Data Science, Full-Stack, and Salesforce.",
    siteName: "Sohan D Souza Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sohan D Souza — AI/ML Engineer & Software Developer",
    description:
      "Software Engineer specializing in AI/ML, Data Science, Full-Stack, and Salesforce.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
