import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { AmbientBackground } from "@/components/visual/ambient-background";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "INNERA · спокойная ясность о состоянии",
  description:
    "Карта паттернов, заметки о самочувствии и маршрут к сессии: структурированный цифровой опыт с терапевтической дисциплиной и приватным хранением в браузере.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={ibmPlexSans.variable}>
      <body>
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}
