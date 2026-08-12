"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Flex,
  Grid,
  Stack,
  Text,
} from "@sanity/ui";

import { client } from "../lib/client";

interface ArticleStats {
  totalArticles: number;
  publishedArticles: number;
  articlesWithViews: number;
  totalViews: number;
}

interface Article {
  _id: string;
  title: string;
  slug?: string;
  views?: number | null;
  publishedAt?: string;
  featured?: boolean;
  trending?: boolean;
}

interface ArticleAnalyticsResult {
  totalArticles: number;
  publishedArticles: number;
  articlesWithViews: number;
  viewCounts?: Array<number | null>;
  topArticles?: Article[];
  recentArticles?: Article[];
}

const initialStats: ArticleStats = {
  totalArticles: 0,
  publishedArticles: 0,
  articlesWithViews: 0,
  totalViews: 0,
};

export function ArticleAnalytics() {
  const [stats, setStats] =
    useState<ArticleStats>(initialStats);

  const [topArticles, setTopArticles] =
    useState<Article[]>([]);

  const [recentArticles, setRecentArticles] =
    useState<Article[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data =
          await client.fetch<ArticleAnalyticsResult>(
            `{
              "totalArticles":
                count(
                  *[_type == "article"]
                ),

              "publishedArticles":
                count(
                  *[
                    _type == "article" &&
                    defined(publishedAt)
                  ]
                ),

              "articlesWithViews":
                count(
                  *[
                    _type == "article" &&
                    views > 0
                  ]
                ),

              "viewCounts":
                *[
                  _type == "article"
                ].views,

              "topArticles":
                *[
                  _type == "article"
                ]
                | order(views desc)[0...5]{
                  _id,
                  title,
                  "slug": slug.current,
                  views,
                  publishedAt,
                  featured,
                  trending
                },

              "recentArticles":
                *[
                  _type == "article"
                ]
                | order(publishedAt desc)[0...5]{
                  _id,
                  title,
                  "slug": slug.current,
                  views,
                  publishedAt,
                  featured,
                  trending
                }
            }`
          );

        const totalViews =
          (data.viewCounts ?? []).reduce<number>(
            (total, views) =>
              total +
              (typeof views === "number"
                ? views
                : 0),
            0
          );

        setStats({
          totalArticles:
            data.totalArticles ?? 0,

          publishedArticles:
            data.publishedArticles ?? 0,

          articlesWithViews:
            data.articlesWithViews ?? 0,

          totalViews,
        });

        setTopArticles(
          data.topArticles ?? []
        );

        setRecentArticles(
          data.recentArticles ?? []
        );
      } catch (error) {
        console.error(
          "Failed to load article analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <Card padding={4} radius={2} shadow={1}>
        <Text>
          Loading article analytics...
        </Text>
      </Card>
    );
  }

  const formatDate = (
    date?: string
  ) => {
    if (!date) {
      return "No publication date";
    }

    return new Date(
      date
    ).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const statCards = [
    {
      title: "Total Articles",
      value: stats.totalArticles,
    },
    {
      title: "Published Articles",
      value: stats.publishedArticles,
    },
    {
      title: "Articles With Views",
      value: stats.articlesWithViews,
    },
    {
      title: "Total Article Views",
      value: stats.totalViews,
    },
  ];

  return (
    <Stack space={5}>
      {/* ==========================
          HEADER
      ========================== */}

      <Stack space={2}>
        <Text
          size={3}
          weight="bold"
        >
          Article Analytics
        </Text>

        <Text
          size={1}
          muted
        >
          Overview of article performance
          across Loudoga News.
        </Text>
      </Stack>

      {/* ==========================
          STATISTICS
      ========================== */}

      <Grid
        columns={[1, 2, 4]}
        gap={3}
      >
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            padding={4}
            radius={2}
            shadow={1}
          >
            <Stack space={3}>
              <Text
                size={1}
                muted
              >
                {stat.title}
              </Text>

              <Text
                size={4}
                weight="bold"
              >
                {stat.value}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>

      {/* ==========================
          TOP ARTICLES
      ========================== */}

      <Card
        padding={4}
        radius={2}
        shadow={1}
      >
        <Stack space={4}>
          <Stack space={2}>
            <Text
              size={3}
              weight="bold"
            >
              Most Read Articles
            </Text>

            <Text
              size={1}
              muted
            >
              Your five most viewed articles.
            </Text>
          </Stack>

          {topArticles.length === 0 ? (
            <Text muted>
              No articles found.
            </Text>
          ) : (
            <Stack space={3}>
              {topArticles.map(
                (article, index) => (
                  <Card
                    key={article._id}
                    padding={3}
                    radius={2}
                    tone="default"
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      gap={3}
                    >
                      <Flex
                        align="center"
                        gap={3}
                      >
                        <Text
                          size={2}
                          weight="bold"
                        >
                          #{index + 1}
                        </Text>

                        <Stack space={2}>
                          <Text weight="bold">
                            {article.title}
                          </Text>

                          <Text
                            size={1}
                            muted
                          >
                            {formatDate(
                              article.publishedAt
                            )}
                          </Text>
                        </Stack>
                      </Flex>

                      <Text
                        size={2}
                        weight="bold"
                      >
                        {article.views ?? 0} views
                      </Text>
                    </Flex>
                  </Card>
                )
              )}
            </Stack>
          )}
        </Stack>
      </Card>

      {/* ==========================
          RECENT ARTICLES
      ========================== */}

      <Card
        padding={4}
        radius={2}
        shadow={1}
      >
        <Stack space={4}>
          <Stack space={2}>
            <Text
              size={3}
              weight="bold"
            >
              Recent Articles
            </Text>

            <Text
              size={1}
              muted
            >
              Your five most recently published
              articles.
            </Text>
          </Stack>

          {recentArticles.length === 0 ? (
            <Text muted>
              No articles found.
            </Text>
          ) : (
            <Stack space={3}>
              {recentArticles.map(
                (article) => (
                  <Card
                    key={article._id}
                    padding={3}
                    radius={2}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      gap={3}
                    >
                      <Stack space={2}>
                        <Text weight="bold">
                          {article.title}
                        </Text>

                        <Text
                          size={1}
                          muted
                        >
                          {formatDate(
                            article.publishedAt
                          )}
                        </Text>
                      </Stack>

                      <Text
                        size={2}
                        weight="bold"
                      >
                        {article.views ?? 0} views
                      </Text>
                    </Flex>
                  </Card>
                )
              )}
            </Stack>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}