import { Platform } from "../types";

const lemmy: Platform = {
  feedSupport: "full",
  feedFormulas: {
    serverAll: {
      formula: ":serverUrl/feeds/all.xml?sort=:sort",
    },
    communityUpdates: {
      formula: ":serverUrl/feeds/c/:community.xml?sort=:sort",
    },
  },
  translations: {
    en: {
      name: "Lemmy",
      description:
        "Lemmy is a federated link aggregator and discussion platform similar to Reddit. They offer full RSS feed support for their feeds. When you are on a page you will find a link to the RSS feed indicated by the RSS icon next to the sorting options.",
      feedFormulas: {
        serverAll: {
          name: "Server feed",
          description:
            "This feed contains 20 posts from the server, sorted by the selected option.",
        },
        communityUpdates: {
          name: "Community feed",
          description:
            "This feed contains 20 posts from a specific community on the server, sorted by the selected option.",
        },
      },
      params: {
        serverUrl: {
          name: "Server URL",
          description: "The URL of the Lemmy server.",
          placeholder: "https://lemm.ee",
        },
        community: {
          name: "Community",
          description: "The name of the community on the Lemmy server.",
          placeholder: "cassettefuturism",
        },
        sort: {
          name: "Sort",
          description: "The sorting option of the feed.",
          placeholder: "Active",
          options: {
            Active: "Active",
            Scaled: "Scaled",
            Hot: "Hot",
            Controversial: "Controversial",
            New: "New",
            Old: "Old",
            MostComments: "Most comments",
            NewComments: "New comments",
            TopHour: "Top hour",
            TopSixHours: "Top six hours",
            TopTwelveHour: "Top twelve hours",
            TopDay: "Top day",
            TopWeek: "Top week",
            TopMonth: "Top month",
            TopThreeMonths: "Top three months",
            TopSixMonths: "Top six months",
            TopNineMonths: "Top nine months",
            TopYear: "Top year",
            TopAll: "Top all",
          },
        },
      },
    },
    nl: {
      name: "Lemmy",
      description:
        "Lemmy is een linkverzamelplatform en discussieforum, vergelijkbaar met Reddit. Ze bieden volledige RSS-feedondersteuning voor hun feeds. Wanneer je op een pagina bent, vind je de link naar de RSS-feed door te klikken op het RSS-pictogram naast de sorteeropties.",
      feedFormulas: {
        serverAll: {
          name: "Server feed",
          description:
            "Deze feed bevat 20 posts van de server, gesorteerd op de geselecteerde optie.",
        },
        communityUpdates: {
          name: "Community feed",
          description:
            "Deze feed bevat 20 posts van een specifieke community op de server, gesorteerd op de geselecteerde optie.",
        },
      },
      params: {
        serverUrl: {
          name: "Server URL",
          description: "De URL van de Lemmy server.",
          placeholder: "https://feddit.nl",
        },
        community: {
          name: "Community",
          description: "De naam van de community op de Lemmy server.",
          placeholder: "theNetherlands",
        },
        sort: {
          name: "Sorteer",
          description: "Hoe de feed gesorteerd moet worden.",
          placeholder: "Actief",
          options: {
            Active: "Actief",
            Scaled: "Geschaald",
            Hot: "Populair",
            Controversial: "Controversieel",
            New: "Nieuw",
            Old: "Oud",
            MostComments: "Meeste reacties",
            NewComments: "Nieuwe reacties",
            TopHour: "Top uur",
            TopSixHours: "Top zes uur",
            TopTwelveHour: "Top twaalf uur",
            TopDay: "Top dag",
            TopWeek: "Top week",
            TopMonth: "Top maand",
            TopThreeMonths: "Top drie maanden",
            TopSixMonths: "Top zes maanden",
            TopNineMonths: "Top negen maanden",
            TopYear: "Top jaar",
            TopAll: "Top alles",
          },
        },
      },
    },
  },
} as const;

export default lemmy;
