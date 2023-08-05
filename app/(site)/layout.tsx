import "./global.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "JumboCode Cheat Sheets",
};

const tasaOrbiter = localFont({
  src: [
    {
      path: "../../fonts/tasa-orbiter/TASAOrbiterDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/tasa-orbiter/TASAOrbiterDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/tasa-orbiter/TASAOrbiterDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../fonts/tasa-orbiter/TASAOrbiterDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/tasa-orbiter/TASAOrbiterDisplay-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-tasa-orbiter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          tasaOrbiter.variable,
          "bg-[hsl(60,18%,92%)]",
          "font-sans antialiased text-gray-700"
        )}
      >
        {children}
      </body>
    </html>
  );
}
