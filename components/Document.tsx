import clsx from "clsx";
import Link from "next/link";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { DocumentElement } from "@keystatic/core";
import Callout from "./Callout";
import Code from "./Code";

export default function Document({
  document,
  className = "",
}: {
  document: DocumentElement[];
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "prose prose-stone max-w-none",
        "font-body",
        "prose-headings:font-headings",
        "before:prose-code:content-none after:prose-code:content-none",
        "prose-code:bg-gray-950/[8%] prose-code:text-gray-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "prose-pre:rounded-none",
        className
      )}
    >
      <DocumentRenderer
        document={document}
        renderers={{
          // @ts-ignore
          block: { code: Code },
          inline: {
            link: (props) => {
              if (props.href.startsWith("/")) {
                return <Link {...props} />;
              }

              return <a {...props} target="_blank" />;
            },
          },
        }}
        componentBlocks={{ comment: () => null, callout: Callout }}
      />
    </div>
  );
}
