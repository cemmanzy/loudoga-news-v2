import { defineField, defineType } from "sanity";

export const subscriberType = defineType({
  name: "subscriber",
  title: "Newsletter Subscribers",
  type: "document",

  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) =>
        Rule.required().email(),
    }),

    defineField({
      name: "unsubscribeToken",
      title: "Unsubscribe Token",
      type: "string",
      readOnly: true,
    }),

    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () =>
        new Date().toISOString(),
      readOnly: true,
    }),

    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "active",
      options: {
        list: [
          {
            title: "Active",
            value: "active",
          },
          {
            title: "Unsubscribed",
            value: "unsubscribed",
          },
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: "email",
      subtitle: "status",
    },
  },
});