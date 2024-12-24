import { Platform } from "@menteka/types";

const ao3: Platform = {
  feedSupport: "full",
  feedFormulas: {
    tagUpdates: {
      formula: "https://archiveofourown.org/tags/:tagId/feed.atom",
    },
  },
  translations: {
    en: {
      name: "Archive of Our Own -z AO3",
      description:
        "Archive of Our Own is an online platform for creative writing, predominantly focused on **fanfiction*. They have some support of RSS feeds documented in their [FAQ](https://archiveofourown.org/faq/subscriptions-and-feeds?language_id=en#subscribefeed).",

      feedFormulas: {
        tagUpdates: {
          name: "Tag updates",
          description:
            "This feed contains the 25 most recent works for a specific tag.",
        },
      },
      params: {
        tagId: {
          name: "Tag ID",
          description: "The ID of the tag.",
          placeholder: "13052407",
        },
      },
    },
    nl: {
      name: "Archive of Our Own - AO3 (Ons Eigen Archief)",
      description:
        "Archive of Our Own is een online platform voor creatief schrijven, voornamelijk gericht op **fanfictie**. Ze hebben enige ondersteuning voor RSS-feeds gedocumenteerd in hun [FAQ](https://archiveofourown.org/faq/subscriptions-and-feeds?language_id=nl#subscribefeed).",
      feedFormulas: {
        tagUpdates: {
          name: "Tag updates",
          description:
            "Deze feed bevat de 25 meest recente werken voor een specifieke tag.",
        },
      },
      params: {
        tagId: {
          name: "Tag ID",
          description: "De ID van de tag.",
          placeholder: "13052407",
        },
      },
    },
  },
} as const;

export default ao3;
