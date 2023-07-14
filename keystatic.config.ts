import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "benborgers/jumbocode-cheat-sheets",
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
        }),
      },
    }),
  },
});
