import { client } from "../lib/client";
import { siteSettingsQuery } from "../queries/siteSettings";

export interface SiteSettings {
  siteName: string;

  tagline?: string;

  description?: string;

  aboutTitle?: string;
  aboutContent?: any[];

  contactTitle?: string;
  contactContent?: any[];

  privacyTitle?: string;
  privacyContent?: any[];

  advertiseTitle?: string;
  advertiseContent?: any[];

  copyright?: string;

  email?: string;

  phone?: string;

  address?: string;

  socialLinks?: {
    platform: string;
    url: string;
  }[];

  /* =========================================
     LIVE TV
  ========================================== */

  liveEnabled?: boolean;

  liveTitle?: string;

  liveYoutubeUrl?: string;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(siteSettingsQuery);
}