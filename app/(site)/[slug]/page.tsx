import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";
import clsx from "clsx";
import Callout from "@/components/Callout";

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
      <h1 className="font-headings text-4xl text-gray-950 font-black">
        {doc.title}
      </h1>

      <div className="mt-8 w-full h-px bg-gray-950/10 ml-12" />

      <div
        className={clsx(
          "mt-8",
          "prose prose-stone max-w-none",
          "font-body",
          "prose-headings:font-headings",
          "before:prose-code:content-none after:prose-code:content-none",
          "prose-code:bg-gray-950/10 prose-code:text-gray-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
          "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
          "prose-pre:rounded-none"
        )}
      >
        <DocumentRenderer
          document={await doc.body()}
          componentBlocks={{ comment: () => null, callout: Callout }}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const docs = await reader.collections.docs.list();

  return docs.map((slug) => ({ slug }));
}
