import { Platform } from "@menteka/types";

const pinterest: Platform = {
  feedSupport: "hidden",
  feedFormulas: {
    boardPins: {
      formula: "https://nl.pinterest.com/:username/:boardId.rss",
      type: "image",
    },
  },
  translations: {
    en: {
      name: "Pinterest",
      description: `Pinterest is a social media platform that allows users to discover and save ideas. It is a visual platform where users can create boards and pin images to them. While they don't document their RSS feeds, it is possible to get a feed of a user's pins on a specific board. For business users, it is also possible to [use RSS feeds to automatically publish new pins to a board](https://help.pinterest.com/en/business/article/auto-publish-pins-from-your-rss-feed).`,
      feedFormulas: {
        boardPins: {
          name: "Board feed",
          description: `This feed contains the 25 most recent pins of a board.`,
        },
      },
      params: {
        username: {
          name: "Username",
          description: `The username of the Pinterest user. If you visit the page of the user, the username is the part of the url after pinterest.com. It will also be under the title of the user's profile.`,
          placeholder: "rosannechan",
        },
        boardId: {
          name: "Board ID",
          description: `The ID of the board. If you visit the board, the name is the part of the url after pinterest.com/username/. The name will be the same of the title, but all special characters will be removed and spaces will be replaced with dashes.`,
          placeholder: "packaging-food",
        },
      },
    },
    nl: {
      name: "Pinterest",
      description: `Pinterest is een sociaalnetwerksite waar gebruikers ideeën kunnen ontdekken en opslaan op een digitaal prikbord. Hoewel ze hun RSS-feeds niet documenteren, is het mogelijk om de pins van een gebruiker op een specifiek bord te volgen. Voor zakelijke gebruikers is het ook mogelijk om [RSS-feeds te gebruiken om nieuwe pins automatisch te publiceren op een bord](https://help.pinterest.com/nl/business/article/auto-publish-pins-from-your-rss-feed).`,
      feedFormulas: {
        boardPins: {
          name: "Bordfeed",
          description: `Deze feed bevat de 25 meest recente pins op een bord.`,
        },
      },
      params: {
        username: {
          name: "Gebruikersnaam",
          description: `De gebruikersnaam van de Pinterest-gebruiker. Als je de pagina van de gebruiker bezoekt, is de gebruikersnaam het deel van de url na pinterest.com. Het zal ook onder de titel van het profiel van de gebruiker staan.`,
          placeholder: "vtwonen",
        },
        boardId: {
          name: "Bord-ID",
          description: `Het ID van het bord. Als je het bord bezoekt, is het ID het deel van de url na pinterest.com/gebruikersnaam/. De naam zal hetzelfde zijn als de titel, maar alle speciale tekens zullen worden verwijderd en spaties zullen worden vervangen door streepjes.`,
          placeholder: "tuin",
        },
      },
    },
  },
} as const;

export default pinterest;
