import { Platform } from "@menteka/types";

const bluesky: Platform = {
  feedSupport: "full",
  feedFormulas: {
    userUpdates: {
      formula: "https://bsky.app/profile/:username/rss",
    },
  },
  translations: {
    en: {
      name: "Bluesky",
      description:
        "Bluesky is a social media platform where users can post short messages. It is similar to Twitter but includes enhanced customizability for algorithms and more options for developers to build on top of the platform.",
      feedFormulas: {
        userUpdates: {
          name: "User updates",
          description:
            "This feed contains the most recent posts/skeets from a specific user.",
        },
      },
      params: {
        username: {
          name: "Username",
          description:
            "The username of the user. Should not include the @. You will also find it in the URL of the user's profile.",
          placeholder: "hankgreen.bsky.social",
        },
      },
    },
    nl: {
      name: "Bluesky",
      description:
        "Bluesky is een sociaalmediaplatform waar gebruikers korte berichten kunnen plaatsen. Het is vergelijkbaar met Twitter, maar biedt meer aanpasbaarheid betreft algoritmes en meer mogelijkheden voor ontwikkelaars om bovenop het platform te bouwen.",
      feedFormulas: {
        userUpdates: {
          name: "Gebruikersupdates",
          description:
            "Deze feed bevat de meest recente berichten/skeets van een specifieke gebruiker.",
        },
      },
      params: {
        username: {
          name: "Gebruikersnaam",
          description:
            "De gebruikersnaam van de gebruiker, exclusief het apestaartje (@). Je vindt het ook in de URL van het profiel van de gebruiker.",
          placeholder: "dietukkerfries.bsky.social",
        },
      },
    },
  },
} as const;

export default bluesky;
