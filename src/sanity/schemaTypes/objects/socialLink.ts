import { defineField, defineType } from "sanity";

export const socialLinkType = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",

  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Facebook", value: "facebook" },
          { title: "X (Twitter)", value: "x" },
          { title: "Instagram", value: "instagram" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "YouTube", value: "youtube" },
          { title: "TikTok", value: "tiktok" },
        ],
      },
    }),

    defineField({
      name: "url",
      title: "URL",
      type: "url",
    }),
  ],

  preview: {
    select: {
      title: "platform",
      subtitle: "url",
    },
  },
});