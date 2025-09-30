import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Samy Alliche | Portfolio",
  description: "Full stack developer portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="dark">
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
