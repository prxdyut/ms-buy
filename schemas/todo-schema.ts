export const todoSchema = {
    name: "todo",
    title: "Todo",
    type: "document",
    fields: [
      {
        name: "text",
        title: "Todo Text",
        type: "string",
      },
      {
        name: "createdAt",
        title: "Created at",
        type: "datetime",
      },
      {
        name: "dueDate",
        title: "Due date",
        type: "datetime",
      },
      {
        name: "isCompleted",
        title: "Is completed?",
        type: "boolean",
      },
      {
        name: "completedAt",
        title: "Completed At",
        type: "datetime",
      },
      {
        name: "userEmail",
        title: "User Email",
        type: "string",
      },
    ],
  };

