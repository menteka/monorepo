import { Platform } from "../types";

const mastodon: Platform = {
  feedSupport: "hidden",
  feedFormulas: {
    userPosts: {
      formula: ":instanceUrl/@:username.rss",
    },
  },
  translations: {
    en: {
      name: "Mastodon",
      description:
        "Mastodon is a decentralized social network where users can post, follow, and interact with others. Instead of one central server, Mastodon consists of different servers, each with their own character. To discover servers, you can for example look at [joinmastodon.org](https://joinmastodon.org/servers).",
      feedFormulas: {
        userPosts: {
          name: "User posts",
          description: "This feed contains the 20 most recent posts of a user.",
        },
      },
      params: {
        instanceUrl: {
          name: "Instance URL",
          description:
            "The URL of the Mastodon server or instance. As Mastodon is a decentralized platform, there is not one central server that contains all users. You can find the URL of the server on the user's profile page, under the display name it will say @username@instanceurl.",
          placeholder: "universeodon.com",
        },
        username: {
          name: "Username",
          description: "The username of the Mastodon user.",
          placeholder: "georgetakei",
        },
      },
    },
    nl: {
      name: "Mastodon",
      description: `Mastodon is een gedecentraliseerd sociaal netwerk-platform waar gebruikers berichten kunnen plaatsen, anderen kunnen volgen en met elkaar kunnen communiceren. In plaats van één centrale server, bestaat Mastodon uit verschillende servers die ieder hun eigen karakter hebben. Om servers te vinden, kan je bijvoorbeeld kijken op [joinmastodon.org](https://joinmastodon.org/nl-NL/servers).`,
      feedFormulas: {
        userPosts: {
          name: "Gebruikersberichten",
          description: `Deze feed bevat de 20 meest recente berichten van een gebruiker.`,
        },
      },
      params: {
        instanceUrl: {
          name: "Server URL",
          description: `De URL van de Mastodon server/instantie. Omdat Mastodon een gedecentraliseerd platform is, is er niet één centrale server die alle gebruikers bevat. Je kunt de URL van de server vinden op de profielpagina van de gebruiker, onder de weergavenaam staat @gebruikersnaam@serverUrl.`,
          placeholder: "https://mastodon.nl",
        },
        username: {
          name: "Gebruikersnaam",
          description: `De gebruikersnaam van de Mastodon-gebruiker.`,
          placeholder: "opennl",
        },
      },
    },
  },
} as const;

export default mastodon;
