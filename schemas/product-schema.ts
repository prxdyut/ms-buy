export const ProductSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: "active",
      title: "Active",
      type: "boolean",
      initialValue: true,
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of Product',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'mrp',
      title: 'MRP',
      type: 'number',
    },
    {
      name: 'instock',
      title: 'In Stock',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of:[{type: 'block'}]
    },
    {
      name: 'badge',
      title: 'Badge',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Product Category',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'galleryImage' }],
      options: {
        maxLength: 3,
      },
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'object',
      fields: [
        {
          name: 'rate',
          title: 'Rate',
          type: 'number',
        },
        {
          name: 'count',
          title: 'Count',
          type: 'number',
        },
      ],
    },
  ],
};
