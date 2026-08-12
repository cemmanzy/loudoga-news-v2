import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const newsletterType = defineType({
  name: "newsletter",
  title: "Newsletters",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "sending",
      title: "Sending",
    },
    {
      name: "generation",
      title: "Generation",
    },
  ],

  fields: [
    // ==========================
    // CONTENT
    // ==========================

    defineField({
      name: "subject",
      title: "Email Subject",
      type: "string",
      group: "content",
      validation: (Rule) =>
        Rule.required().max(150),
    }),

    defineField({
      name: "previewText",
      title: "Preview Text",
      type: "string",
      description:
        "Short text that may appear beside the subject in the recipient's inbox.",
      group: "content",
      validation: (Rule) =>
        Rule.max(200),
    }),

    defineField({
      name: "content",
      title: "Newsletter Content",
      type: "array",
      group: "content",
      validation: (Rule) =>
        Rule.required(),
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),

    // ==========================
    // SENDING
    // ==========================

    defineField({
      name: "status",
      title: "Newsletter Status",
      type: "string",
      group: "sending",
      initialValue: "draft",
      options: {
        list: [
          {
            title: "Draft",
            value: "draft",
          },
          {
            title: "Sending",
            value: "sending",
          },
          {
            title: "Sent",
            value: "sent",
          },
        ],
      },
      validation: (Rule) =>
        Rule.required(),
    }),

    defineField({
      name: "sentAt",
      title: "Sent At",
      type: "datetime",
      group: "sending",
      readOnly: true,
    }),

    defineField({
      name: "recipientCount",
      title: "Recipient Count",
      type: "number",
      group: "sending",
      readOnly: true,
    }),

    // ==========================
    // GENERATION
    // ==========================

    defineField({
      name: "generatedFromArticles",
      title: "Generated From Articles",
      description:
        "Articles used to automatically generate this newsletter.",
      type: "array",
      group: "generation",
      readOnly: true,
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "article" }],
        }),
      ],
    }),

    defineField({
      name: "generatedAt",
      title: "Generated At",
      type: "datetime",
      group: "generation",
      readOnly: true,
    }),
  ],

  preview: {
    select: {
      title: "subject",
      subtitle: "status",
    },
  },
});