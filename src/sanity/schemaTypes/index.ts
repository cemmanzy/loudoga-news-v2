import { type SchemaTypeDefinition } from "sanity";

import { articleType } from "./documents/article";
import { authorType } from "./documents/author";
import { categoryType } from "./documents/category";
import { tagType } from "./documents/tag";
import { subscriberType } from "./subscriber";
import { newsletterType } from "./newsletter";

import { seoType } from "./objects/seo";
import { socialLinkType } from "./objects/socialLink";
import { imageWithCaptionType } from "./objects/imageWithCaption";
import { siteSettingsType } from "./documents/siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    articleType,
    authorType,
    categoryType,
    tagType,

    // Objects
    seoType,
    socialLinkType,
    imageWithCaptionType,
    siteSettingsType,

    //Email Subscriber
    subscriberType,


    // Newsletter
    newsletterType, 
  ],
};