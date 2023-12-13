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
      title: "Email",
      name: "email",
      type: "string",
    },
  ],
};
