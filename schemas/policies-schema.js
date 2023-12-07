export const Policies = {
  name: "policies",
  title: "Policies",
  type: "document",
  fields: [
    {
      title: "Privacy Policy",
      name: "privacy_policy",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Terms Of Use",
      name: "terms_of_use",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Return Policy",
      name: "return_policy",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Cancellation Policy",
      name: "cancellation_policy",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "FAQ",
      name: "faq",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      title: "Contact Us",
      name: "contact_us",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
};
