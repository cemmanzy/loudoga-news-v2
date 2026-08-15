import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",

  fields: [

    /* =========================================
       GENERAL SITE INFORMATION
    ========================================== */

    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "Footer Description",
      type: "text",
      rows: 5,
    }),

    /* =========================================
       ABOUT PAGE
    ========================================== */

    defineField({
      name: "aboutTitle",
      title: "About Page Title",
      type: "string",
    }),

    defineField({
      name: "aboutContent",
      title: "About Page Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),

    /* =========================================
       COPYRIGHT
    ========================================== */

    defineField({
      name: "copyright",
      title: "Copyright",
      type: "string",
    }),

    /* =========================================
       CONTACT INFORMATION
    ========================================== */

    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),

    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),

    /* =========================================
       SOCIAL MEDIA
    ========================================== */

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

    /* =========================================
       CONTACT PAGE
    ========================================== */

    defineField({
      name: "contactTitle",
      title: "Contact Page Title",
      type: "string",
    }),

    defineField({
      name: "contactContent",
      title: "Contact Page Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),

    /* =========================================
       PRIVACY POLICY
    ========================================== */

    defineField({
      name: "privacyTitle",
      title: "Privacy Policy Title",
      type: "string",
    }),

    defineField({
      name: "privacyContent",
      title: "Privacy Policy",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),

    /* =========================================
       ADVERTISE PAGE
    ========================================== */

    defineField({
      name: "advertiseTitle",
      title: "Advertise Page Title",
      type: "string",
    }),

    defineField({
      name: "advertiseContent",
      title: "Advertise Page Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),

    /* =========================================
       LIVE TV
    ========================================== */

    defineField({
      name: "liveEnabled",
      title: "Enable Live TV Popup",
      type: "boolean",
      initialValue: false,
    }),

    defineField({
      name: "liveTitle",
      title: "Live TV Title",
      type: "string",
      initialValue: "Loud Oga News Live",
    }),

    defineField({
      name: "liveYoutubeUrl",
      title: "YouTube Live URL",
      type: "url",
      description: "Paste the YouTube live stream URL here.",
    }),

  ],
});