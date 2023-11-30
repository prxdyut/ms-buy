export const OrdersSchema = {
  name: "allOrders",
  title: "Orders",
  type: "document",
  // fieldsets: [
  //   {
  //     name: 'links12',
  //     title: 'Links12',
  //     options: {columns: 2},
  //     readOnly: true,
  //   }
  // ],
  fields: [
    {
      name: "products",
      title: "Products",
      type: "array",
      of: [
        {
          name: "product",
          title: "Product",
          type: "object",
          fields: [
            {
              name: "productReference",
              type: "reference",
              to: [{ type: "product" }],
              readOnly: true,
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              readOnly: true,
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              readOnly: true,
            },
          ],
          readOnly: true,
        },
      ],
      readOnly: true,
    },
    {
      name: "subtotal",
      title: "Subtotal",
      type: "number",
      readOnly: true,
    },
    {
      name: "tax",
      title: "Tax",
      type: "number",
      readOnly: true,
    },
    {
      name: "total",
      title: "Total",
      type: "number",
      readOnly: true,
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      readOnly: true,
    },
    {
      name: "userId",
      title: "User ID",
      type: "string",
      readOnly: true,
    },
    {
      name: "address",
      title: "Address",
      type: "text",
      readOnly: true,
    },
    {
      name: "note",
      title: "Note",
      type: "text",
      readOnly: true,
    },
    {
      name: "email",
      title: "email",
      type: "string",
      readOnly: true,
    },
    {
      name: "razorpayId",
      title: "Razorpay Id",
      type: "string",
      readOnly: true,
    },
    {
      title: "Timestamp",
      name: "timestamp",
      type: "datetime",
      readOnly: true,
    },
    {
      name: "paid",
      title: "Paid",
      type: "boolean",
      readOnly: true,
    },
    {
      name: "successfull",
      title: "Successfull",
      type: "boolean",
      readOnly: true,
    },
    {
      name: "fulfilled",
      title: "fulfilled",
      type: "boolean",
    },
  ],
};
