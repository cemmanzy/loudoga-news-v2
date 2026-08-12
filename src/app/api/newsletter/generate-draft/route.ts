import { NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";
import { recentArticlesForNewsletterQuery } from "@/sanity/queries/articles";
import { siteConfig } from "@/config/site";

interface NewsletterBlock {
  _type: "block";
  _key: string;
  style: "normal" | "h2";
  markDefs: Array<{
    _key: string;
    _type: "link";
    href: string;
  }>;
  children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: string[];
  }>;
}

interface Article {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  categories?: {
    title: string;
  }[];
}

interface ExistingNewsletter {
  _id: string;
  generatedFromArticles?: {
    _ref: string;
  }[];
}

export async function POST() {
  try {
    // Get the 5 most recent articles.
    const articles = await client.fetch<Article[]>(
      recentArticlesForNewsletterQuery
    );

    if (!articles.length) {
      return NextResponse.json(
        {
          message:
            "No published articles were found to generate a newsletter.",
        },
        {
          status: 400,
        }
      );
    }

    const articleIds = articles.map(
      (article) => article._id
    );

    const writeClient = client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      useCdn: false,
    });

    // Check for existing unsent generated newsletters.
    const existingNewsletters =
      await client.fetch<ExistingNewsletter[]>(
        `*[
          _type == "newsletter" &&
          status == "draft" &&
          defined(generatedFromArticles)
        ]{
          _id,
          generatedFromArticles
        }`
      );

    // Check whether a draft already uses exactly
    // the same articles.
    const existingNewsletter =
      existingNewsletters.find((newsletter) => {
        const existingArticleIds =
          newsletter.generatedFromArticles
            ?.map((article) => article._ref)
            .sort() ?? [];

        const currentArticleIds =
          [...articleIds].sort();

        return (
          existingArticleIds.length ===
            currentArticleIds.length &&
          existingArticleIds.every(
            (id, index) =>
              id === currentArticleIds[index]
          )
        );
      });

    // Return the existing draft instead of creating
    // a duplicate.
    if (existingNewsletter) {
      return NextResponse.json({
        success: true,
        alreadyExists: true,
        message:
          "A newsletter draft already exists for these latest articles.",
        newsletterId: existingNewsletter._id,
      });
    }

    const newsletterContent: NewsletterBlock[] = [
      {
        _type: "block",
        _key: "intro",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "intro-text",
            text: "Here are some of the latest stories from Loudoga News.",
            marks: [],
          },
        ],
      },

      ...articles.flatMap(
        (article, index): NewsletterBlock[] => {
          const articleUrl =
            `${siteConfig.url}/news/${article.slug}`;

          return [
            {
              _type: "block",
              _key: `title-${index}`,
              style: "h2",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: `title-text-${index}`,
                  text: article.title,
                  marks: [],
                },
              ],
            },

            {
              _type: "block",
              _key: `excerpt-${index}`,
              style: "normal",
              markDefs: [],
              children: [
                {
                  _type: "span",
                  _key: `excerpt-text-${index}`,
                  text: article.excerpt,
                  marks: [],
                },
              ],
            },

            {
              _type: "block",
              _key: `link-${index}`,
              style: "normal",
              markDefs: [
                {
                  _key: `link-mark-${index}`,
                  _type: "link",
                  href: articleUrl,
                },
              ],
              children: [
                {
                  _type: "span",
                  _key: `link-text-${index}`,
                  text: "Read the full story →",
                  marks: [`link-mark-${index}`],
                },
              ],
            },
          ];
        }
      ),
    ];

    const today = new Date().toLocaleDateString(
      "en-US",
      {
        month: "long",
        day: "numeric",
        year: "numeric",
      }
    );

    // Create the new newsletter draft.
    const newsletter = await writeClient.create({
      _type: "newsletter",

      subject:
        `Latest Stories from Loudoga News — ${today}`,

      previewText:
        "Catch up on the latest stories and updates from Loudoga News.",

      content: newsletterContent,

      status: "draft",

      // Save the articles used to generate
      // this newsletter.
      generatedFromArticles: articleIds.map(
        (articleId) => ({
          _type: "reference",
          _ref: articleId,
        })
      ),

      generatedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        alreadyExists: false,
        message:
          "Newsletter draft created successfully.",
        newsletterId: newsletter._id,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Newsletter draft generation error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to generate newsletter draft. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}