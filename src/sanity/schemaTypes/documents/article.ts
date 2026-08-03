import {
  defineArrayMember,
  defineField,
  defineType,
} from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Articles",
  type: "document",

  groups: [
    {
      name: "content",
      title: "Content",
      default: true,
    },
    {
      name: "editorial",
      title: "Editorial",
    },
    {
      name: "publishing",
      title: "Publishing",
    },
    {
      name: "analytics",
      title: "Analytics",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],

  fields: [
    // ==========================
    // CONTENT
    // ==========================

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) =>
        Rule.required().min(10).max(150),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 4,
      group: "content",
      validation: (Rule) =>
        Rule.required().max(300),
    }),

    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "imageWithCaption",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      validation: (Rule) => Rule.required(),
      of: [
        defineArrayMember({
          type: "block",
        }),
        defineArrayMember({
          type: "image",
          options: {
            hotspot: true,
          },
        }),
      ],
    }),

    // ==========================
    // EDITORIAL
    // ==========================

    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "editorial",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "editorial",
      validation: (Rule) =>
        Rule.required().min(1),
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "category" }],
        }),
      ],
    }),

    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "editorial",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "tag" }],
        }),
      ],
    }),

    defineField({
      name: "featured",
      title: "Featured Story",
      type: "boolean",
      group: "editorial",
      initialValue: false,
    }),

    defineField({
      name: "heroStory",
      title: "Hero Story",
      type: "boolean",
      group: "editorial",
      initialValue: false,
    }),

    defineField({
      name: "breaking",
      title: "Breaking News",
      type: "boolean",
      group: "editorial",
      initialValue: false,
    }),

    defineField({
      name: "editorsPick",
      title: "Editor's Pick",
      type: "boolean",
      group: "editorial",
      initialValue: false,
    }),

    defineField({
      name: "trending",
      title: "Trending",
      type: "boolean",
      group: "editorial",
      initialValue: false,
    }),

    defineField({
      name: "exclusive",
      title: "Exclusive",
      type: "boolean",
      group: "editorial",
      initialValue: false,
    }),

    // ==========================
    // PUBLISHING
    // ==========================

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "publishing",
      initialValue: () =>
        new Date().toISOString(),
    }),

    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      group: "publishing",
    }),

    defineField({
      name: "readTime",
      title: "Reading Time (minutes)",
      type: "number",
      group: "publishing",
    }),

    // ==========================
    // ANALYTICS
    // ==========================

    defineField({
      name: "views",
      title: "Views",
      type: "number",
      group: "analytics",
      initialValue: 0,
      readOnly: true,
    }),

    // ==========================
    // SEO
    // ==========================

    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "author.name",
      media: "featuredImage.image",
    },
  },
});