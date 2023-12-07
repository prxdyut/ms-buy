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
      name: "shipping",
      title: "Shipping Price",
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
      name: "userId",
      title: "User ID",
      type: "string",
      readOnly: true,
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    },
    {
      name: "firstname",
      title: "First Name",
      type: "string",
      readOnly: true,
    },
    {
      name: "lastname",
      title: "Last Name",
      type: "string",
      readOnly: true,
    },
    {
      title: "Phone Number 1",
      name: "phone1",
      type: "string",
      readOnly: true,
    },
    {
      title: "Phone Number 2",
      name: "phone2",
      type: "string",
      readOnly: true,
    },
    {
      name: "address1",
      title: "Address Line 1",
      type: "string",
      readOnly: true,
    },
    {
      name: "address2",
      title: "Address Line 2",
      type: "string",
      readOnly: true,
    },
    {
      name: "city",
      title: "City",
      type: "string",
      readOnly: true,
    },
    {
      name: "state",
      title: "State",
      type: "string",
      readOnly: true,
    },
    {
      name: "country",
      title: "Country",
      type: "string",
      readOnly: true,
    },
    {
      name: "pincode",
      title: "Pincode",
      type: "string",
      readOnly: true,
    },
    {
      name: "instructions",
      title: "Delivery Instructions",
      type: "text",
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
      name: "trackingCode",
      title: "Tracking Code",
      type: "string",
      initialValue: '123456789123'
    },
    {
      name: "fulfilled",
      title: "fulfilled",
      type: "boolean",
      initialValue: false,
    },
  ],
};
