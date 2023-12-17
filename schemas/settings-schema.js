export const Settings = {
  name: "settings",
  title: "Settings",
  type: "document",
  fields: [
    {
      title: "Logo",
      name: "logo",
      type: "object",
      fields: [
        {
          title: "Header",
          name: "header",
          type: "image",
        },
        {
          title: "Footer",
          name: "footer",
          type: "image",
        },
      ],
    },
    {
      title: "Extra Product Info",
      name: "productInfo",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
