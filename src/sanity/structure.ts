import type { StructureResolver } from "sanity/structure";

import { GenerateNewsletterDraft } from "./components/GenerateNewsletterDraft";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Generate Newsletter Draft")
        .id("generate-newsletter-draft")
        .child(
          S.component(GenerateNewsletterDraft)
            .title("Generate Newsletter Draft")
        ),

      ...S.documentTypeListItems(),
    ]);