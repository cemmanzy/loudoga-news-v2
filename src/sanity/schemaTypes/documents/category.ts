import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: "category",
  title: "Categories",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    defineField({
      name: "color",
      title: "Theme Color",
      type: "string",
    }),
  ],

  preview: {
    select: {
      title: "title",
    },
  },
});