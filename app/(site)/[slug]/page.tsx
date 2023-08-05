import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";
import clsx from "clsx";

// We know all params to start, so all others can 404.
export const dynamicParams = false;

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
      <h1>{doc.title}</h1>
      <div
        className={clsx(
          "prose prose-stone max-w-none",
          "font-body",
          "prose-headings:font-headings",
          "before:prose-code:content-none after:prose-code:content-none",
          "prose-code:bg-rose-100 prose-code:text-rose-700 prose-code:px-1.5 prose-code:rounded-md",
          "[&_pre_code]:bg-red-500"
        )}
      >
        <DocumentRenderer document={await doc.body()} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const docs = await reader.collections.docs.list();

  return docs.map((slug) => ({ slug }));
}
