import { PortableText } from "@portabletext/react";

import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/sanity/loaders/siteSettings";

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <Container className="py-16">

      <h1 className="mb-10 text-5xl font-black">
        {settings?.aboutTitle ?? "About Us"}
      </h1>

      <article className="prose prose-lg max-w-none">
        <PortableText value={settings?.aboutContent ?? []} />
      </article>

    </Container>
  );
}