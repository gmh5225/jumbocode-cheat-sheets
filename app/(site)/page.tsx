import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import clsx from "clsx";
import config from "../../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";

const reader = createReader(process.cwd(), config);

export default async function Home() {
  const doc = await reader.singletons.home.read();

  if (!doc) {
    notFound();
  }

  return (
    <div>
      <div className="py-32 px-4 border-b border-gray-950/5 bg-gray-950/[3%]">
        <div className="flex items-center justify-center gap-x-2">
          <span className="text-xs font-body uppercase font-semibold bg-teal-600 text-white px-1.5 py-0.5 h-max -rotate-2">
            New!
          </span>
          <p className="font-headings font-semibold text-lg text-gray-500">
            Written for 2023–2024
          </p>
        </div>
        <h1 className="mt-4 font-headings text-6xl text-gray-950 font-black text-center">
          JumboCode Cheat Sheets
        </h1>
      </div>

      <div
        className={clsx(
          "mt-12 py-4",
          "max-w-screen-sm mx-auto",
          "prose prose-stone max-w-none sm:prose-lg",
          "font-body",
          "prose-headings:font-headings"
        )}
      >
        <DocumentRenderer document={await doc.body()} />
      </div>

      {/* Spacer at end of page */}
      <div className="h-48" />
    </div>
  );
}
