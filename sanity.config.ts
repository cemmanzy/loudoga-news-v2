'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { dashboardTool } from '@sanity/dashboard'
import { NewsletterAnalytics } from "./src/sanity/dashboard/NewsletterAnalytics";
import { ArticleAnalytics } from "./src/sanity/dashboard/ArticleAnalytics";

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { SendNewsletterAction } from './src/sanity/actions/SendNewsletterAction'

export default defineConfig({
  basePath: '/studio',

  projectId,

  dataset,

  schema,

  plugins: [
    structureTool({ structure }),

   dashboardTool({
  widgets: [
    {
      name: "newsletter-analytics",
      component: NewsletterAnalytics,
    },
    {
      name: "article-analytics",
      component: ArticleAnalytics,
    },
  ],
}),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],

  document: {
    actions: (previousActions, context) => {
      if (context.schemaType === 'newsletter') {
        return [
          ...previousActions,
          SendNewsletterAction,
        ]
      }

      return previousActions
    },
  },
})