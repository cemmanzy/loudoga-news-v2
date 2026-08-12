"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Flex,
  Grid,
  Stack,
  Text,
} from "@sanity/ui";

import { client } from "../lib/client";

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  inactiveSubscribers: number;
  totalNewsletters: number;
  sentNewsletters: number;
  draftNewsletters: number;
  totalRecipientsReached: number;
  latestSentAt?: string;
}

interface RecentNewsletter {
  _id: string;
  subject: string;
  status: "draft" | "sending" | "sent";
  recipientCount?: number | null;
  sentAt?: string;
  generatedAt?: string;
}

interface AnalyticsQueryResult {
  totalSubscribers: number;
  activeSubscribers: number;
  inactiveSubscribers: number;
  totalNewsletters: number;
  sentNewsletters: number;
  draftNewsletters: number;
  recipientCounts?: Array<number | null>;
  latestSentAt?: string;
  recentNewsletters?: RecentNewsletter[];
}

const initialStats: NewsletterStats = {
  totalSubscribers: 0,
  activeSubscribers: 0,
  inactiveSubscribers: 0,
  totalNewsletters: 0,
  sentNewsletters: 0,
  draftNewsletters: 0,
  totalRecipientsReached: 0,
};

export function NewsletterAnalytics() {
  const [stats, setStats] =
    useState<NewsletterStats>(initialStats);

  const [recentNewsletters, setRecentNewsletters] =
    useState<RecentNewsletter[]>([]);

  const [loading, setLoading] = useState(true);

  const [generatingDraft, setGeneratingDraft] =
    useState(false);

  const [actionMessage, setActionMessage] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data =
          await client.fetch<AnalyticsQueryResult>(
            `{
              "totalSubscribers": count(
                *[_type == "subscriber"]
              ),

              "activeSubscribers": count(
                *[
                  _type == "subscriber" &&
                  status == "active"
                ]
              ),

              "inactiveSubscribers": count(
                *[
                  _type == "subscriber" &&
                  status != "active"
                ]
              ),

              "totalNewsletters": count(
                *[_type == "newsletter"]
              ),

              "sentNewsletters": count(
                *[
                  _type == "newsletter" &&
                  status == "sent"
                ]
              ),

              "draftNewsletters": count(
                *[
                  _type == "newsletter" &&
                  status == "draft"
                ]
              ),

              "recipientCounts":
                *[
                  _type == "newsletter" &&
                  status == "sent"
                ].recipientCount,

              "latestSentAt":
                *[
                  _type == "newsletter" &&
                  status == "sent" &&
                  defined(sentAt)
                ]
                | order(sentAt desc)[0].sentAt,

              "recentNewsletters":
                *[_type == "newsletter"]
                | order(
                  coalesce(
                    sentAt,
                    generatedAt,
                    _createdAt
                  ) desc
                )[0...5]{
                  _id,
                  subject,
                  status,
                  recipientCount,
                  sentAt,
                  generatedAt
                }
            }`
          );

        const totalRecipientsReached =
          (data.recipientCounts ?? []).reduce<number>(
            (total, count) =>
              total +
              (typeof count === "number"
                ? count
                : 0),
            0
          );

        setStats({
          totalSubscribers:
            data.totalSubscribers ?? 0,

          activeSubscribers:
            data.activeSubscribers ?? 0,

          inactiveSubscribers:
            data.inactiveSubscribers ?? 0,

          totalNewsletters:
            data.totalNewsletters ?? 0,

          sentNewsletters:
            data.sentNewsletters ?? 0,

          draftNewsletters:
            data.draftNewsletters ?? 0,

          totalRecipientsReached,

          latestSentAt:
            data.latestSentAt,
        });

        setRecentNewsletters(
          data.recentNewsletters ?? []
        );
      } catch (error) {
        console.error(
          "Failed to load newsletter analytics:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  async function generateNewsletterDraft() {
    try {
      setGeneratingDraft(true);
      setActionMessage(null);

      const response = await fetch(
        "/api/newsletter/generate-draft",
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ??
            "Unable to generate newsletter draft."
        );
      }

      setActionMessage(
        data.alreadyExists
          ? "A newsletter draft already exists for the latest articles."
          : "Newsletter draft generated successfully."
      );
    } catch (error) {
      setActionMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while generating the draft."
      );
    } finally {
      setGeneratingDraft(false);
    }
  }

  const openSubscribers = () => {
    window.location.href =
      "/studio/structure/subscriber";
  };

  const openNewsletters = () => {
    window.location.href =
      "/studio/structure/newsletter";
  };

  if (loading) {
    return (
      <Card padding={4} radius={2} shadow={1}>
        <Text>
          Loading newsletter analytics...
        </Text>
      </Card>
    );
  }

  const formatDate = (date?: string) => {
    if (!date) {
      return "No newsletter sent yet";
    }

    return new Date(date).toLocaleString();
  };

  const statsCards = [
    {
      title: "Total Subscribers",
      value: stats.totalSubscribers,
    },
    {
      title: "Active Subscribers",
      value: stats.activeSubscribers,
    },
    {
      title: "Inactive Subscribers",
      value: stats.inactiveSubscribers,
    },
    {
      title: "Total Newsletters",
      value: stats.totalNewsletters,
    },
    {
      title: "Sent Newsletters",
      value: stats.sentNewsletters,
    },
    {
      title: "Draft Newsletters",
      value: stats.draftNewsletters,
    },
    {
      title: "Total Recipients Reached",
      value: stats.totalRecipientsReached,
    },
  ];

  return (
    <Stack space={5}>
      {/* ==========================
          HEADER
      ========================== */}

      <Stack space={2}>
        <Text size={3} weight="bold">
          Newsletter Analytics
        </Text>

        <Text size={1} muted>
          Overview of your Loudoga News newsletter
          performance.
        </Text>
      </Stack>

      {/* ==========================
          STATISTICS
      ========================== */}

      <Grid columns={[1, 2, 3]} gap={3}>
        {statsCards.map((stat) => (
          <Card
            key={stat.title}
            padding={4}
            radius={2}
            shadow={1}
          >
            <Stack space={3}>
              <Text size={1} muted>
                {stat.title}
              </Text>

              <Text size={4} weight="bold">
                {stat.value}
              </Text>
            </Stack>
          </Card>
        ))}
      </Grid>

      {/* ==========================
          LATEST NEWSLETTER
      ========================== */}

      <Card padding={4} radius={2} shadow={1}>
        <Flex
          direction="column"
          gap={2}
        >
          <Text size={1} muted>
            Latest Newsletter Sent
          </Text>

          <Text size={2} weight="bold">
            {formatDate(stats.latestSentAt)}
          </Text>
        </Flex>
      </Card>

      {/* ==========================
          RECENT ACTIVITY
      ========================== */}

      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={3} weight="bold">
              Recent Newsletter Activity
            </Text>

            <Text size={1} muted>
              Your 5 most recent newsletter records.
            </Text>
          </Stack>

          {recentNewsletters.length === 0 ? (
            <Text muted>
              No newsletters found.
            </Text>
          ) : (
            <Stack space={3}>
              {recentNewsletters.map(
                (newsletter) => {
                  const activityDate =
                    newsletter.sentAt ??
                    newsletter.generatedAt;

                  const tone =
                    newsletter.status === "sent"
                      ? "positive"
                      : newsletter.status ===
                          "sending"
                        ? "caution"
                        : "default";

                  return (
                    <Card
                      key={newsletter._id}
                      padding={3}
                      radius={2}
                      tone={tone}
                    >
                      <Flex
                        justify="space-between"
                        align="center"
                        gap={3}
                      >
                        <Stack space={2}>
                          <Text weight="bold">
                            {newsletter.subject}
                          </Text>

                          <Text
                            size={1}
                            muted
                          >
                            {activityDate
                              ? new Date(
                                  activityDate
                                ).toLocaleString()
                              : "No date available"}
                          </Text>
                        </Stack>

                        <Stack
                          space={2}
                          style={{
                            textAlign: "right",
                          }}
                        >
                          <Text
                            size={1}
                            weight="bold"
                          >
                            {newsletter.status.toUpperCase()}
                          </Text>

                          <Text
                            size={1}
                            muted
                          >
                            {newsletter.status ===
                            "sent"
                              ? `${
                                  newsletter.recipientCount ??
                                  0
                                } recipient(s)`
                              : newsletter.status ===
                                  "sending"
                                ? "Sending..."
                                : "Not sent yet"}
                          </Text>
                        </Stack>
                      </Flex>
                    </Card>
                  );
                }
              )}
            </Stack>
          )}
        </Stack>
      </Card>

      {/* ==========================
          QUICK ACTIONS
      ========================== */}

      <Card padding={4} radius={2} shadow={1}>
        <Stack space={4}>
          <Stack space={2}>
            <Text size={3} weight="bold">
              Quick Actions
            </Text>

            <Text size={1} muted>
              Manage your newsletter from one place.
            </Text>
          </Stack>

          <Grid columns={[1, 1, 3]} gap={3}>
            <Button
              text={
                generatingDraft
                  ? "Generating Draft..."
                  : "Generate Newsletter Draft"
              }
              tone="primary"
              disabled={generatingDraft}
              onClick={generateNewsletterDraft}
            />

            <Button
              text="View Subscribers"
              mode="ghost"
              onClick={openSubscribers}
            />

            <Button
              text="View Newsletters"
              mode="ghost"
              onClick={openNewsletters}
            />
          </Grid>

          {actionMessage && (
            <Card
              padding={3}
              radius={2}
              tone="transparent"
            >
              <Text size={1}>
                {actionMessage}
              </Text>
            </Card>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}