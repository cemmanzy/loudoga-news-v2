import { notFound } from "next/navigation";
import Image from "next/image";

import { getAuthor } from "@/sanity/loaders/author";
import { urlFor } from "@/sanity/lib/image";

import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import RelatedArticleCard from "@/components/cards/RelatedArticleCard";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AuthorPage({
  params,
}: Props) {
  const { slug } = await params;

  const author = await getAuthor(slug);

  if (!author) {
    notFound();
  }

  return (
    <Container className="py-16">

      <div className="flex flex-col items-center text-center">

        {author.photo && (
          <Image
            src={urlFor(author.photo).width(300).url()}
            alt={author.name}
            width={180}
            height={180}
            className="rounded-full object-cover"
          />
        )}

        <h1 className="mt-6 text-5xl font-black">

          {author.name}

        </h1>

        {author.position && (
          <p className="mt-2 text-lg font-semibold text-[#C8102E]">

            {author.position}

          </p>
        )}

        {author.bio && (
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

            {author.bio}

          </p>
        )}

      </div>

      <section className="mt-20">

        <SectionTitle>

          Latest Articles

        </SectionTitle>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {author.articles.map((article) => (

            <RelatedArticleCard
              key={article._id}
              article={article}
            />

          ))}

        </div>

      </section>

    </Container>
  );
}