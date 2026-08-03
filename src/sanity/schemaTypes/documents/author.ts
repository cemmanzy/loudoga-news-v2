import { defineArrayMember, defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Authors",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "position",
      title: "Position",
      type: "string",
    }),

    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 5,
    }),

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "socialLink",
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "photo",
    },
  },
});