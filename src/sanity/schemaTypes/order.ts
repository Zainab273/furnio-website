import { defineType } from "sanity";

export const order = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "customer",
      title: "Customer Details",
      type: "object",
      fields: [
        { 
          name: "firstName", 
          type: "string", 
          title: "First Name", 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: "lastName", 
          type: "string", 
          title: "Last Name", 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: "email", 
          type: "string", 
          title: "Email", 
          validation: (Rule) => Rule.required().email() 
        },
        { 
          name: "phone", 
          type: "string", 
          title: "Phone Number" 
        },
        { 
          name: "address", 
          type: "string", 
          title: "Address", 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: "city", 
          type: "string", 
          title: "City", 
          validation: (Rule) => Rule.required() 
        },
        { 
          name: "zipCode", 
          type: "string", 
          title: "ZIP Code", 
          validation: (Rule) => Rule.required() 
        },
      ],
    },
    {
      name: "products",
      title: "Ordered Products",
      type: "array",
      of: [
        { 
          type: "object", 
          fields: [
            { 
              name: "title", 
              type: "string", 
              title: "Product Title", 
              validation: (Rule) => Rule.required() 
            },
            { 
              name: "price", 
              type: "number", 
              title: "Price", 
              validation: (Rule) => Rule.required() 
            },
            { 
              name: "quantity", 
              type: "number", 
              title: "Quantity", 
              validation: (Rule) => Rule.required().min(1) 
            }
          ]
        }
      ]
    },
    { 
      name: "total", 
      title: "Total Amount", 
      type: "number", 
      validation: (Rule) => Rule.required() 
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        layout: "radio",
      },
      initialValue: "Pending",
    },
    {
      name: "createdAt",
      title: "Order Date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
});
