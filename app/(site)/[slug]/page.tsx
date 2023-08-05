import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import config from "../../../keystatic.config";
import { DocumentRenderer } from "@keystatic/core/renderer";

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
