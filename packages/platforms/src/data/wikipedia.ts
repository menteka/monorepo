import { Platform } from "@menteka/types";

const wikipedia: Platform = {
  feedSupport: "full",
  feedFormulas: {
    articleUpdates: {
      formula:
        "https://:lang.wikipedia.org/w/index.php?title=:articleID&action=history&feed=rss ",
    },
    newPages: {
      formula:
        "https://:lang.wikipedia.org/w/index.php?title=Special:NewPages&feed=rss",
    },
    watchList: {
      formula:
        "https://:lang.wikipedia.org/w/api.php?action=feedwatchlist&wlowner=:username&wltoken=:authToken",
    },
    userContributions: {
      formula:
        "https://:lang.wikipedia.org/w/api.php?action=feedcontributions&user=:username",
    },
  },
  translations: {
    en: {
      name: "Wikipedia",
      description:
        "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation. Wikipedia offers RSS feeds for recent changes, new pages, watchlists, and user contributions. They provide official documentation for their feeds on their [Syndication page](https://en.wikipedia.org/wiki/Wikipedia:Syndication).",
      feedFormulas: {
        articleUpdates: {
          name: "Article updates",
          description:
            "This feed contains the revision history of a Wikipedia article.",
        },
        newPages: {
          name: "New pages",
          description: "This feed contains the newest pages on Wikipedia.",
        },
        watchList: {
          name: "Watchlist",
          description:
            "This feed contains the changes on your [watchlist](https://en.wikipedia.org/wiki/Help:Watchlist). You need to authenticate to access this feed.",
        },
        userContributions: {
          name: "User contributions",
          description:
            "This feed contains the contributions of a Wikipedia user.",
        },
      },
      params: {
        lang: {
          name: "Language",
          description: "The language code of the Wikipedia site.",
          placeholder: "en",
        },
        articleID: {
          name: "Article ID",
          description: "The ID of the Wikipedia article.",
          placeholder: "User_error",
        },
        username: {
          name: "Username",
          description: "The Wikipedia username.",
          placeholder: "GreenC",
        },
        authToken: {
          name: "Auth token",
          description:
            "The authorization token for the username you entered. You can find your token in your Wikipedia preferences under **Watchlist**.",
          placeholder: "Insert your token here",
        },
      },
    },
    nl: {
      name: "Wikipedia",
      description:
        "Wikipedia is een gratis online encyclopedie, gemaakt en bewerkt door vrijwilligers van over de hele wereld en gehost door de Wikimedia Foundation. Wikipedia biedt RSS-feeds voor recente wijzigingen, nieuwe pagina's, volglijsten en gebruikersbijdragen. Ze bieden officiële documentatie voor hun feeds op hun [Syndication-pagina (niet beschikbaar in het Nederlands)](https://en.wikipedia.org/wiki/Wikipedia:Syndication).",
      feedFormulas: {
        articleUpdates: {
          name: "Artikelupdates",
          description:
            "Deze feed bevat de versiegeschiedenis van een Wikipedia-artikel.",
        },
        newPages: {
          name: "Nieuwe pagina's",
          description: "Deze feed bevat de nieuwste pagina's op Wikipedia.",
        },
        watchList: {
          name: "Volglijst",
          description: "Deze feed bevat de wijzigingen op je volglijst.",
        },
        userContributions: {
          name: "Gebruikersbijdragen",
          description:
            "Deze feed bevat de bijdragen van een Wikipedia-gebruiker.",
        },
      },
      params: {
        lang: {
          name: "Taal",
          description: "De taalcode van de Wikipedia-site.",
          placeholder: "nl",
        },
        articleID: {
          name: "Artikel-ID",
          description: "Het ID van het Wikipedia-artikel.",
          placeholder: "Johan_de_Witt",
        },
        username: {
          name: "Gebruikersnaam",
          description: "De Wikipedia-gebruikersnaam.",
          placeholder: "Happytravels",
        },
        authToken: {
          name: "Authenticatietoken",
          description:
            "Het autorisatietoken voor de gebruikersnaam die u heeft ingevoerd. U kunt uw token vinden in uw Wikipedia-voorkeuren onder **Volglijst**.",
          placeholder: "Voer hier uw token in",
        },
      },
    },
  },
} as const;

export default wikipedia;
