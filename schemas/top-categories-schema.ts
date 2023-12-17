export const FeaturedProductsAndCategories = {
  name: "featuredProductsAndCategories",
  title: "Featured",
  type: "document",
  fields: [
    {
      name: "topTexts",
      title: "Top Texts",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "banner1",
      title: "Banner 1",
      type: "array",
      of: [
        {
          type: "galleryImage",
        },
      ],
    },
    {
      name: "mostSellingProducts",
      title: "Most Selling Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    },
    {
      name: "banner2",
      title: "Banner 2",
      type: "array",
      of: [
        {
          type: "galleryImage",
        },
      ],
    },
    {
      name: "bestDeals",
      title: "Best Deals",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    },
    {
      name: "banner3",
      title: "Banner 3",
      type: "array",
      of: [
        {
          type: "galleryImage",
        },
      ],
    },
    {
      name: "topCategories",
      title: "Top Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    },
  ],
};
