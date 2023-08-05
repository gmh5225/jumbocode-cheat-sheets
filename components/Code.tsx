import React from "react";
import shiki from "shiki";

export default async function Code(props: {
  language: string;
  children: string;
}) {
  const highlighter = await shiki.getHighlighter({ theme: "nord" });
  const html = highlighter.codeToHtml(props.children, { lang: props.language });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
