import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import clsx from "clsx";
import config from "../../keystatic.config";
import { File, Folder } from "../../components/Icons";

const reader = createReader(process.cwd(), config);

export default async function Home() {
  const doc = await reader.singletons.home.read();

  if (!doc) {
    notFound();
  }

  const list = (await doc.body())[0];

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
          "mt-12 py-4 px-6",
          "max-w-screen-sm mx-auto",
          "bg-white/30 border border-gray-200 shadow",
          "font-body sm:text-lg"
        )}
      >
        <Node node={list as NodeType} />
      </div>

      {/* Spacer at end of page */}
      <div className="h-48" />
    </div>
  );
}

type NodeType =
  | {
      type: "unordered-list" | "list-item" | "list-item-content";
      children: NodeType[];
    }
  | {
      type: "link";
      href: string;
      children: NodeType[];
    }
  | {
      text: string;
    };

const Node = ({ node, level = -1 }: { node: NodeType; level?: number }) => {
  if ("text" in node) {
    if (!node.text) {
      return null;
    }

    return <p>{node.text}</p>;
  }

  if (node.type === "link") {
    return (
      <a href={node.href}>
        {node.children.map((child, i) => (
          <Node key={i} node={child} level={level} />
        ))}
      </a>
    );
  }

  if (node.type === "unordered-list") {
    return (
      <div className={clsx(level >= 0 && "ml-6")}>
        {node.children.map((child, i) => (
          <Node key={i} node={child} level={level} />
        ))}
      </div>
    );
  }

  if (node.type === "list-item") {
    return (
      <div className="flex items-start gap-x-1.5 mt-2">
        {node.children.length === 1 ? (
          <File weight="bold" className="text-gray-400 mt-[0.3rem]" />
        ) : (
          <Folder weight="bold" className="text-gray-400 mt-[0.3rem]" />
        )}
        <div>
          {node.children.map((child, i) => (
            <Node key={i} node={child} level={level + 1} />
          ))}
        </div>
      </div>
    );
  }

  if (node.type === "list-item-content") {
    return node.children.map((child, i) => (
      <Node key={i} node={child} level={level} />
    ));
  }
};
