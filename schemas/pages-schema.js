export const Pages = {
  name: "pages",
  title: "Pages",
  type: "document",
  fields: [
    {
      title: "Slug",
      name: "slug",
      type: "slug",
    },
    {
      title: "Content",
      name: "content",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
