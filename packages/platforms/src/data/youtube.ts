import { Platform } from "../types";

const youtube: Platform = {
  feedSupport: "hidden",
  feedFormulas: {
    channelUploads: {
      formula: "https://www.youtube.com/feeds/videos.xml?channel_id=:channelId",
      type: "video",
    },
  },
  translations: {
    en: {
      name: "YouTube",
      description: "YouTube is a free video sharing platform owned by Google.",
      feedFormulas: {
        channelUploads: {
          name: "Channel feed",
          description:
            "This feed contains the 15 most recently uploaded videos of a channel.",
        },
      },
      params: {
        channelId: {
          name: "Channel ID",
          description: `The ID of the YouTube channel. This is different from the channel name or the url of a channel. In order to retrieve the channel ID, you can go to the channel page, press **more links** to view the channel details, then go to **Share channel** and there will be an option **Copy channel ID**. If you own your own channel, you can find the channel ID in the advanced settings of your channel.`,
          placeholder: "UC4eYXhJI4-7wSWc8UNRwD4A",
        },
      },
    },
    nl: {
      name: "YouTube",
      description: "YouTube is een gratis videoplatform van Google.",
      feedFormulas: {
        channelUploads: {
          name: "Kanaalfeed",
          description:
            "Deze feed bevat de 15 meest recent geüploade video's van een kanaal.",
        },
      },
      params: {
        channelId: {
          name: "Kanaal-ID",
          description: `Het ID van het YouTube-kanaal. Dit is anders dan de kanaalnaam of de url van een kanaal. Om het kanaal-ID op te achterhalen kan je naar de kanaalpagina gaan, op **en nog x links** drukken om de kanaaldetails te bekijken. Daarin ga je naar **Kanaal delen** en er zal een optie **Kanaal-ID kopiëren** zijn. Als je zelf een kanaal hebt, kun je het kanaal-ID ook vinden in de geavanceerde instellingen van je kanaal.`,
          placeholder: "UCf63l7Wp_wX7T-5ChM_Km9Q",
        },
      },
    },
  },
} as const;

export default youtube;
