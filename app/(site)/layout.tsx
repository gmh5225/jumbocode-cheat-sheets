import "./global.css";
import type { Metadata } from "next";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "JumboCode Cheat Sheets",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "font-sans antialiased text-gray-700",
          "max-w-screen-sm mx-auto p-4 pt-8 pb-24"
        )}
      >
        {children}
      </body>
    </html>
  );
}
