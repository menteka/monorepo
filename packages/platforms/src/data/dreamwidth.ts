import { Platform } from "../types";

//TODO: verify validity/consistency.
const dreamwidth: Platform = {
  feedSupport: "full",
  feedFormulas: {
    journalUpdates: {
      formula: "https://:journal.dreamwidth.org/data/:format",
    },
  },
  translations: {
    en: {
      name: "Dreamwidth",
      description:
        "Dreamwidth is a writing-focused platform where users create journals. It is based off of LiveJournal but highlights open access, transparency, freedom and respect. Most pages on Dreamwidth have an RSS and Atom feed, including journals. There will be a link to the feed in the sidebar of the journal.",
      feedFormulas: {
        journalUpdates: {
          name: "Journal updates",
          description:
            "This feed contains the 25 most recent posts of a journal.",
        },
      },
      params: {
        journal: {
          name: "Journal",
          description:
            "The name of the Dreamwidth journal. It is the name under which the posts appear on your Dreamwidth homepage, and it is also the part of the url before dreamwidth.org when you visit the journal.",
          placeholder: "100words",
        },
        format: {
          name: "Format",
          description:
            "The format of the feed. In practice, most feed readers support both Atom and RSS.",
          placeholder: "RSS",
          options: {
            atom: "Atom",
            rss: "RSS",
          },
        },
      },
    },
    nl: {
      name: "Dreamwidth",
      description: `Dreamwidth is een platform gericht op schrijven van "journals", dat zijn digitale tijdschriften en/of dagboeken. Het is gebaseerd op LiveJournal, maar benadrukt open toegang, transparantie, vrijheid en respect. De meeste pagina's op Dreamwidth hebben een RSS- en Atom-feed. Er staat meestal een link naar de feed aan de zijkant van de pagina.`,
      feedFormulas: {
        journalUpdates: {
          name: "Blad updates",
          description:
            "Deze feed bevat de 20 meest recente berichten van een blad.",
        },
      },
      params: {
        journal: {
          name: "Journal",
          description:
            "De naam van het Dreamwidth-journal. Dit is de naam waaronder de berichten op je Dreamwidth-startpagina verschijnen, en het is ook het deel van de url voor dreamwidth.org wanneer je het journal bezoekt.",
          placeholder: "100words",
        },
        format: {
          name: "Formaat",
          description: "Het formaat van de feed.",
          placeholder: "RSS",
          options: {
            atom: "Atom",
            rss: "RSS",
          },
        },
      },
    },
  },
} as const;

export default dreamwidth;
