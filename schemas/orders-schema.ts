export const OrdersSchema = {
  name: "allOrders",
  title: "Orders",
  type: "document",
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
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
            },
          ],
        },
      ],
    },
    {
      name: "subtotal",
      title: "Subtotal",
      type: "number",
    },
    {
      name: "tax",
      title: "Tax",
      type: "number",
    },
    {
      name: "total",
      title: "Total",
      type: "number",
    },
    {
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
    },
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "text",
    },
    {
      name: "note",
      title: "Note",
      type: "text",
    },
    {
      name: "email",
      title: "email",
      type: "string",
    },
    {
      name: "razorpayId",
      title: "Razorpay Id",
      type: "string",
      readonly: true
    },
    {
      title: "Timestamp",
      name: "timestamp",
      type: "datetime",
    },
  ],
};
