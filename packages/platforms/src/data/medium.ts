import { Platform } from "@menteka/types";

const medium: Platform = {
  feedSupport: "full",
  feedFormulas: {
    userPosts: {
      formula: "medium.com/feed/:username",
    },
    customDomainPosts: {
      formula: ":customdomain/feed",
    },
    publicationPosts: {
      formula: "medium.com/feed/:publication",
    },
    publicationTags: {
      formula: "medium.com/feed/:publication/tagged/:tagName",
    },
    tagUpdates: {
      formula: "medium.com/feed/tag/:tagName",
    },
  },
  translations: {
    en: {
      name: "Medium",
      description: `Medium is an online platform for professional and amateur writers to publish articles. It is also a social platform where users can follow each other and recommend articles.`,
      documentationUrl:
        "https://help.medium.com/hc/en-us/articles/214874118-RSS-feeds",
      feedFormulas: {
        userPosts: {
          name: "User posts",
          description: `This feed contains the most recent posts of a Medium user.`,
        },
        customDomainPosts: {
          name: "User posts (custom domain)",
          description: `This feed contains the most recent posts of a Medium user on a custom domain.`,
        },
        publicationPosts: {
          name: "Publication posts",
          description: `This feed contains the most recent posts of a Medium publication.`,
        },
        publicationTags: {
          name: "Publication tags",
          description: `This feed contains the most recent posts of a Medium publication with a specific tag.`,
        },
        tagUpdates: {
          name: "Tag updates",
          description: `This feed contains the most recent posts with a specific tag.`,
        },
      },
      params: {
        username: {
          name: "Username",
          description: `The username of the Medium user. It is the part of the URL after medium.com/@.`,
          placeholder: "creativecommons",
        },
        customdomain: {
          name: "Custom domain",
          description: `The custom domain of the Medium user.`,
          placeholder: "https://danny.fyi",
        },
        publication: {
          name: "Publication",
          description: `The publication name of the Medium publication. It is the part of the URL after medium.com/.`,
          placeholder: "making-sharing-meaningful",
        },
        tagName: {
          name: "Tag name",
          description: `The tag name of the Medium posts.`,
          placeholder: "writing",
        },
      },
    },
    nl: {
      name: "Medium",
      description: `Medium is een online platform voor professionele en amateur schrijvers om artikelen te publiceren. Het is ook een sociaal platform waar gebruikers elkaar kunnen volgen en artikelen kunnen aanbevelen.`,
      documentationUrl:
        "https://help.medium.com/hc/en-us/articles/214874118-RSS-feeds",
      feedFormulas: {
        userPosts: {
          name: "Gebruikersupdates",
          description: `Deze feed bevat de meest recente uploads van een Medium-gebruiker.`,
        },
        customDomainPosts: {
          name: "Gebruikersupdates (eigen domein)",
          description: `Deze feed bevat de meest recente uploads van een Medium-gebruiker op een eigen domein.`,
        },
        publicationPosts: {
          name: "Publicatie-updates",
          description: `Deze feed bevat de meest recente uploads van een Medium-publicatie.`,
        },
        publicationTags: {
          name: "Publicatie-updates",
          description: `Deze feed bevat de meest recente uploads van een Medium-publicatie met een specifieke tag/categorie.`,
        },
        tagUpdates: {
          name: "Tag-updates",
          description: `Deze feed bevat de meest recente uploads met een specifieke tag/categorie.`,
        },
      },
      params: {
        username: {
          name: "Gebruikersnaam",
          description: `De gebruikersnaam van de Medium-gebruiker. Het is het deel van de URL na medium.com/@.`,
          placeholder: "nos-digital",
        },
        customdomain: {
          name: "Eigen domein",
          description: `Het eigen domein van de Medium-gebruiker.`,
          placeholder: "https://updates.dasmag.nl/",
        },
        publication: {
          name: "Publicatie",
          description: `De publicatienaam van de Medium-publicatie. Het is het deel van de URL na medium.com/.`,
          placeholder: "better-marketing",
        },
        tagName: {
          name: "Tag-naam",
          description: `De tag-naam van de Medium-uploads.`,
          placeholder: "writing",
        },
      },
    },
  },
} as const;

export default medium;
