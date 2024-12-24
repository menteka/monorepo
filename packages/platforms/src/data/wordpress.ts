import { Platform } from "@menteka/types";

const wordpress: Platform = {
  feedSupport: "full",
  feedFormulas: {
    sitePosts: {
      formula: ":siteUrl/feed",
    },
    comments: {
      formula: ":siteUrl/comments/feed",
    },
    categoryPosts: {
      formula: ":siteUrl/category/:category/feed",
    },
    tagPosts: {
      formula: ":siteUrl/tag/:tag/feed",
    },
    authorPosts: {
      formula: ":siteUrl/author/:author/feed",
    },
  },
  translations: {
    en: {
      name: "WordPress.com",
      description:
        "WordPress is a free and open-source blogging tool and website builder. It is the most popular content management system (CMS) on the web. WordPress offers full RSS feed support for their feeds, which they detail in their [support page](https://wordpress.com/support/feeds/). A lot of websites that you use might be powered by WordPress, so you can use this platform to follow their feeds.",
      feedFormulas: {
        sitePosts: {
          name: "Site posts",
          description:
            "This feed contains the most recent posts from the site.",
        },
        comments: {
          name: "Comments",
          description:
            "This feed contains the most recent comments from the site.",
        },
        categoryPosts: {
          name: "Category posts",
          description:
            "This feed contains the most recent posts from a specific category.",
        },
        tagPosts: {
          name: "Tag posts",
          description:
            "This feed contains the most recent posts from a specific tag.",
        },
        authorPosts: {
          name: "Author posts",
          description:
            "This feed contains the most recent posts from a specific author.",
        },
      },
      params: {
        siteUrl: {
          name: "Site URL",
          description: "The URL of the WordPress site.",
          placeholder: "https://wordpress.org",
        },
        category: {
          name: "Category",
          description: "The name of the category on the WordPress site.",
          placeholder: "technology",
        },
        tag: {
          name: "Tag",
          description: "The name of the tag on the WordPress site.",
          placeholder: "javascript",
        },
        author: {
          name: "Author",
          description: "The username of the author on the WordPress site.",
          placeholder: "matt",
        },
      },
    },
    nl: {
      name: "WordPress.com",
      description:
        "WordPress is een gratis en open-source blogtool en websitebouwer. Het is het meest populaire contentmanagementsysteem (CMS) op het web. WordPress biedt volledige RSS-feedondersteuning voor hun feeds, die ze gedetailleerd beschrijven in hun [ondersteuningspagina](https://wordpress.com/support/feeds/). Veel websites die je gebruikt, worden mogelijk aangedreven door WordPress, dus je kunt dit platform gebruiken om hun feeds te volgen.",
      feedFormulas: {
        sitePosts: {
          name: "Artikelen",
          description:
            "Deze feed bevat de meest recente artikelen van de site.",
        },
        comments: {
          name: "Reacties",
          description: "Deze feed bevat de meest recente reacties van de site.",
        },
        categoryPosts: {
          name: "Artikelen (per categorie)",
          description:
            "Deze feed bevat de meest recente artikelen van een specifieke categorie.",
        },
        tagPosts: {
          name: "Artikelen (per tag)",
          description:
            "Deze feed bevat de meest recente berichten van een specifieke tag.",
        },
        authorPosts: {
          name: "Auteursartikelen",
          description:
            "Deze feed bevat de meest recente artikelen van een specifieke auteur.",
        },
      },
      params: {
        siteUrl: {
          name: "Site-URL",
          description: "De URL van de WordPress-site.",
          placeholder: "https://wordpress.org",
        },
        category: {
          name: "Categorie",
          description: "De naam van de categorie op de WordPress-site.",
          placeholder: "technologie",
        },
        tag: {
          name: "Tag",
          description: "De naam van de tag op de WordPress-site.",
          placeholder: "javascript",
        },
        author: {
          name: "Auteur",
          description: "De gebruikersnaam van de auteur op de WordPress-site.",
          placeholder: "matt",
        },
      },
    },
  },
};

export default wordpress;
