import { Platform } from "@menteka/types";

const dev: Platform = {
  feedSupport: "hidden",
  feedFormulas: {
    userActivity: {
      formula: "https://dev.to/feed/:username",
    },
  },
  translations: {
    en: {
      name: "DEV Community",
      description:
        "DEV Community is a community of developers sharing their work and knowledge through articles, podcasts and videos.",
      feedFormulas: {
        userActivity: {
          name: "User activity",
          description:
            "This feed contains the most recent activity of a specific user or organisation.",
        },
      },
      params: {
        username: {
          name: "Username",
          description:
            "The username of the user or organisation. You will also find it in the URL of the user's profile.",
          placeholder: "devteam",
        },
      },
    },
    nl: {
      name: "DEV Community",
      description:
        "DEV Community is een community van ontwikkelaars die hun werk en kennis delen via artikelen, podcasts en video's.",
      feedFormulas: {
        userActivity: {
          name: "Gebruikersactiviteit",
          description:
            "Deze feed bevat de meest recente activiteit van een specifieke gebruiker of organisatie.",
        },
      },
      params: {
        username: {
          name: "Gebruikersnaam",
          description:
            "De gebruikersnaam van de gebruiker of organisatie. Je vindt het ook in de URL van het profiel van de gebruiker.",
          placeholder: "devteam",
        },
      },
    },
  },
} as const;

export default dev;
