import { Platform } from "@menteka/types";

const neocities: Platform = {
  feedSupport: "full",
  feedFormulas: {
    siteUpdates: {
      formula: "https://neocities.org/site/:siteName.rss",
    },
  },
  translations: {
    en: {
      name: "Neocities",
      description:
        "Neocities is a free web hosting service that allows users to create and host websites. It is a spiritual successor to GeoCities. Users create custom websites in HTML using the built-in code editor. While there is a very basic automatic feed, Neocities also offers documentation on how users can create their own RSS feeds. See the [Neocities RSS guide](https://rssguide.neocities.org/).",
      feedFormulas: {
        siteUpdates: {
          name: "Site updates",
          description:
            "A simple list of the last 10 times the site was updated.",
        },
      },
      params: {
        siteName: {
          name: "Site name",
          description:
            "The name of the Neocities site. If the user is hosting their site inside neocities, it will be at siteName.neocities.org.",
          placeholder: "pixalina",
        },
      },
    },
    nl: {
      name: "Neocities",
      description:
        "Neocities is een gratis webhostingdienst waar gebruikers websites kunnen maken en hosten. Het is een spirituele opvolger van GeoCities. Gebruikers kunnen hun eigen websites in HTML maken met behulp van de ingebouwde code-editor. Hoewel er een zeer eenvoudige automatische feed is, biedt Neocities ook documentatie over hoe gebruikers hun eigen RSS-feeds kunnen maken. Zie de [Neocities RSS-gids (Engelstalige link)](https://rssguide.neocities.org/).",
      feedFormulas: {
        siteUpdates: {
          name: "Site-updates",
          description:
            "Een eenvoudige lijst van de laatste 10 keer dat de site is bijgewerkt.",
        },
      },
      params: {
        siteName: {
          name: "Sitenaam",
          description:
            "De naam van de Neocities-site. Als de gebruiker zijn site host op neocities, zal deze te vinden zijn op sitenaam.neocities.org.",
          placeholder: "freckleskies",
        },
      },
    },
  },
} as const;

export default neocities;
