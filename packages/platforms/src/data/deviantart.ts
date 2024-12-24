import { Platform } from "@menteka/types";

//TODO this one needs some more research, there are a lot of options.
const deviantart: Platform = {
  feedSupport: "full",
  feedFormulas: {
    userDeviations: {
      formula:
        "https://backend.deviantart.com/rss.xml?type=deviation&q=by%3:username+sort%3Atime+meta%3Aall",
    },
    query: {
      formula:
        "https://backend.deviantart.com/rss.xml?type=deviation&q=boost%3Apopular+in%3Adigitalart%2Fdrawings+:query",
    },
  },
  translations: {
    en: {
      name: "DeviantArt",
      description:
        "DeviantArt is an online platform for artists. It enables users to share their artwork with others and receive feedback. DeviantArt offers extensive support for RSS feeds, it is possible to query in various different ways. The official documentation for their feeds can be found on their [developers RSS documentation](https://www.deviantart.com/developers/rss).",
      feedFormulas: {
        userDeviations: {
          name: "User deviations",
          description: `This feed contains the **deviations**, i.e. posts of a DeviantArt user.`,
        },
        query: {
          name: "Query",
          description:
            "This feed contains the most popular deviations in a specific category.",
        },
      },
      params: {
        username: {
          name: "Username",
          description: "The username of the DeviantArt user.",
          placeholder: "loish",
        },
        query: {
          name: "Query",
          description: "The category of the posts.",
          placeholder: "frogs",
        },
      },
    },
    nl: {
      name: "DeviantArt",
      description:
        "DeviantArt is een online platform voor kunstenaars. Gebruikers kunnen verschillende kunstvormen delen en onderling communiceren. De officiële documentatie voor hun feeds is te vinden op hun [developers RSS-documentatie (alleen in het Engels)](https://www.deviantart.com/developers/rss).",
      feedFormulas: {
        userDeviations: {
          name: "Gebruikersupdates",
          description: `Deze feed bevat de laatste uploads van een DeviantArt-gebruiker.`,
        },
        query: {
          name: "Zoekopdracht",
          description:
            "Deze feed bevat de meest populaire uploads in een specifieke categorie.",
        },
      },
      params: {
        username: {
          name: "Gebruikersnaam",
          description: "De gebruikersnaam van de DeviantArt-gebruiker.",
          placeholder: "loish",
        },
        query: {
          name: "Zoekopdracht",
          description: "De categorie van de uploads.",
          placeholder: "kikkers",
        },
      },
    },
  },
} as const;

export default deviantart;
