import { PortableText } from "@portabletext/react";

import Container from "@/components/ui/Container";
import { getSiteSettings } from "@/sanity/loaders/siteSettings";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <Container className="py-16">

      <h1 className="mb-10 text-5xl font-black">
        {settings?.contactTitle ?? "Contact Us"}
      </h1>

      <article className="prose prose-lg max-w-none">
        <PortableText value={settings?.contactContent ?? []} />
      </article>

      <div className="mt-12 rounded-xl border bg-gray-50 p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Contact Information
        </h2>

        <div className="space-y-3">

          {settings?.email && (
            <p>
              <strong>Email:</strong> {settings.email}
            </p>
          )}

          {settings?.phone && (
            <p>
              <strong>Phone:</strong> {settings.phone}
            </p>
          )}

          {settings?.address && (
            <p>
              <strong>Address:</strong> {settings.address}
            </p>
          )}

        </div>

      </div>

    </Container>
  );
}