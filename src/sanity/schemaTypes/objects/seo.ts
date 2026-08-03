import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",

  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      validation: (Rule) => Rule.max(60),
      description: "Recommended maximum of 60 characters.",
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160),
      description: "Recommended maximum of 160 characters.",
    }),

    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
    }),

    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      description: "Prevent search engines from indexing this page.",
    }),

    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "SEO",
      };
    },
  },
});