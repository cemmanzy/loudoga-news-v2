import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type=="siteSettings"][0]{

    siteName,

    tagline,

    description,

    aboutTitle,
    aboutContent,

    contactTitle,
    contactContent,

    privacyTitle,
    privacyContent,

    advertiseTitle,
    advertiseContent,

    copyright,

    email,

    phone,

    address,

    socialLinks[]{
      platform,
      url
    },

    liveEnabled,
    liveTitle,
    liveYoutubeUrl

  }
`;