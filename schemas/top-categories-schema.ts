export const FeaturedProductsAndCategories = {
  name: "featuredProductsAndCategories",
  title: "Featured",
  type: "document",
  fields: [
    {
      name: "banner1",
      title: "Banner 1",
      description: "Upload 16x9 Image Only.",
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
      description: "Upload 3x2 Image Only.",
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
    {
      name: "banner3",
      title: "Banner 3",
      description: "Upload 16x9 Image Only.",
      type: "array",
      of: [
        {
          type: "galleryImage",
        },
      ],
      options: { max: 3 },
    },
  ],
};
