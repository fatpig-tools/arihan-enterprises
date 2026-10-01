import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.documentTypeListItem("page").title("Pages"),
      S.divider(),
      S.documentTypeListItem("crane").title("Fleet"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("industry").title("Industries"),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("client").title("Clients"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      S.documentTypeListItem("faq").title("FAQs"),
      S.documentTypeListItem("jobRole").title("Job roles"),
      S.divider(),
      S.documentTypeListItem("quoteRequest").title("Quote requests"),
    ]);
