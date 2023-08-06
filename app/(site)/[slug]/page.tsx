import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import clsx from "clsx";
import Document from "@/components/Document";

// We know all params to start, so all others can 404.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const doc = await reader.collections.docs.read(params.slug);
  return {
    title: (doc ? doc.title : "") + " - JumboCode Cheat Sheets",
  };
}

const reader = createReader(process.cwd(), config);

export default async function DocPage({
  params,
}: {
  params: { slug: string };
}) {
  const doc = await reader.collections.docs.read(params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <div>
      <div className="py-32 px-4 border-b border-gray-950/5 bg-gray-950/[3%]">
        <Link
          href="/"
          className={clsx(
            "block font-headings font-semibold text-center",
            "max-w-max mx-auto",
            "text-lg text-teal-600 underline decoration-teal-600/50",
            "whitespace-pre" // To preserve double space for nicer spacing.
          )}
        >
          &larr;{"  "}JumboCode Cheat Sheets
        </Link>
        <h1 className="mt-4 font-headings text-5xl sm:text-6xl text-gray-950 font-black text-center">
          {doc.title}
        </h1>
      </div>

      <div className={clsx("mt-12 px-4", "max-w-screen-sm mx-auto")}>
        <Document document={await doc.body()} />
      </div>

      {/* Spacer at end of page */}
      <div className="h-48" />
    </div>
  );
}

export async function generateStaticParams() {
  const docs = await reader.collections.docs.list();

  return docs.map((slug) => ({ slug }));
}
