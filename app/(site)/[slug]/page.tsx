import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";

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

      <DocumentRenderer document={await doc.body()} />
    </div>
  );
}

export async function generateStaticParams() {
  const docs = await reader.collections.docs.list();

  return docs.map((slug) => ({ slug }));
}
