import { Platform } from "../types";

const substack: Platform = {
  feedSupport: "full",
  feedFormulas: {
    publicationUpdates: {
      formula: "https://:publicationName.substack.com/feed",
      type: "newsletter",
    },
    customDomainUpdates: {
      formula: ":customDomain/feed",
      type: "newsletter",
    },
  },
  translations: {
    en: {
      name: "Substack",
      description:
        "Substack is a platform that allows writers to publish newsletters. They document full feed support for their publications on [Publications 101](https://support.substack.com/hc/en-us/articles/360038239391-Is-there-an-RSS-feed-for-my-publication).",
      feedFormulas: {
        publicationUpdates: {
          name: "Publication updates",
          description:
            "This feed contains the 20 most recent entries of a Substack publication.",
        },
        customDomainUpdates: {
          name: "Publication updates (custom domain)",
          description:
            "This feed contains the 20 most recent entries of a Substack publication hosted on a custom domain.",
        },
      },
      params: {
        publicationName: {
          name: "Publication name",
          description:
            "The name of the Substack publication. It is the part of the URL after https:// and before .substack.com.",
          placeholder: "fionabeckett",
        },
        customDomain: {
          name: "Custom domain",
          description: "The custom domain of the Substack publication.",
          placeholder: "https://blog.bytebytego.com",
        },
      },
    },
    nl: {
      name: "Substack",
      description:
        "Substack is een platform voor nieuwsbrieven. Ze documenteren volledige feed-ondersteuning voor hun publicaties op [Publications 101 (Engelstalig)](https://support.substack.com/hc/en-us/articles/360038239391-Is-there-an-RSS-feed-for-my-publication).",
      feedFormulas: {
        publicationUpdates: {
          name: "Publicatie-updates",
          description:
            "Deze feed bevat de 20 meest recente nieuwsbrieven van een Substack-publicatie.",
        },
        customDomainUpdates: {
          name: "Publicatie-updates (eigen domein)",
          description:
            "Deze feed bevat de 20 meest recente nieuwsbrieven van een Substack-publicatie die wordt gehost op een eigen domein.",
        },
      },
      params: {
        publicationName: {
          name: "Publicatienaam",
          description:
            "De naam van de Substack-publicatie. Het is het deel van de URL na https:// en voor .substack.com.",
          placeholder: "allegeschiedenisooit",
        },
        customDomain: {
          name: "Eigen domein",
          description: "Het eigen domein van de Substack-publicatie.",
          placeholder: "https://www.klopping.nl",
        },
      },
    },
  },
} as const;

export default substack;
