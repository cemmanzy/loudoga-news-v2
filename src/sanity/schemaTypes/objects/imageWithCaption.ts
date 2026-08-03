import { defineField, defineType } from "sanity";

export const imageWithCaptionType = defineType({
  name: "imageWithCaption",
  title: "Image With Caption",
  type: "object",

  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),

    defineField({
      name: "photoCredit",
      title: "Photo Credit",
      type: "string",
    }),

    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for accessibility.",
    }),
  ],

  preview: {
    select: {
      title: "caption",
      media: "image",
    },
  },
});