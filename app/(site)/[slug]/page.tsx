import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";
import clsx from "clsx";
import Callout from "@/components/Callout";
import Code from "@/components/Code";

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

      <div
        className={clsx(
          "mt-12 px-4",
          "max-w-screen-sm mx-auto",
          "prose prose-stone max-w-none",
          "font-body",
          "prose-headings:font-headings",
          "before:prose-code:content-none after:prose-code:content-none",
          "prose-code:bg-gray-950/[8%] prose-code:text-gray-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
          "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
          "prose-pre:rounded-none"
        )}
      >
        <DocumentRenderer
          document={await doc.body()}
          renderers={{
            // @ts-ignore
            block: { code: Code },
          }}
          componentBlocks={{ comment: () => null, callout: Callout }}
        />
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
