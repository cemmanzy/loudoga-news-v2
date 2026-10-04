import { defineField, defineType } from "sanity";

export const newsroomType = defineType({
  name: "newsroom",
  title: "Newsroom",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "socialUrl",
      title: "Social Profile URL",
      type: "url",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Lower numbers appear first on the Newsroom page.",
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "photo",
    },
  },
});