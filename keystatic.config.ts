import React from "react";
import {
  config,
  fields,
  singleton,
  collection,
  component,
} from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "benborgers/jumbocode-cheat-sheets",
  },
  singletons: {
    home: singleton({
      label: "Home",
      schema: {
        body: fields.document({
          label: "Body",
          formatting: true,
          links: true,
        }),
      },
    }),
  },
  collections: {
    docs: collection({
      label: "Docs",
      slugField: "title",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        body: fields.document({
          label: "Body",
          formatting: true,
          links: true,
          dividers: true,
          tables: true,
          images: {
            directory: "public/docs",
            publicPath: "/docs",
          },
          componentBlocks: {
            callout: component({
              label: "Callout",
              preview: ({ fields }) =>
                React.createElement("div", null, fields.content.element),
              schema: {
                content: fields.child({
                  kind: "block",
                  placeholder: "...",
                  formatting: "inherit",
                  links: "inherit",
                }),
              },
            }),
            comment: component({
              label: "Internal Comment",
              preview: ({ fields }) =>
                React.createElement("div", null, fields.content.element),
              schema: {
                content: fields.child({
                  placeholder: "...",
                  kind: "block",
                  links: "inherit",
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
