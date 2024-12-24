import { Platform } from "@menteka/types";

const tumblr: Platform = {
  feedSupport: "hidden",
  feedFormulas: {
    blogUpdates: {
      formula: "https://:blogName.tumblr.com/rss",
    },
    customDomainUpdates: {
      formula: ":customDomain/rss",
    },
  },
  translations: {
    en: {
      name: "Tumblr",
      description:
        "Tumblr is a microblogging platform and social networking website. It allows users to post multimedia and other content to a short-form blog.",
      feedFormulas: {
        blogUpdates: {
          name: "Blog updates",
          description: "This feed contains the 20 most recent posts of a blog.",
        },
        customDomainUpdates: {
          name: "Blog updates (custom domain)",
          description:
            "This feed contains the 20 most recent posts of a blog hosted on a custom domain.",
        },
      },
      params: {
        blogName: {
          name: "Blog name",
          description:
            "The name of the Tumblr blog. It is the name under which the posts appear on your Tumblr homepage, and it is also the part of the url before tumblr.com when you visit the blog.",
          placeholder: "everydaylouie",
        },
        customDomain: {
          name: "Custom domain",
          description:
            "The custom domain of the Tumblr blog. This is for blogs that do not have a tumblr.com url, but are hosted on a custom domain.",
          placeholder: "https://example.com/",
        },
      },
    },
    nl: {
      name: "Tumblr",
      description:
        "Tumblr is een microbloggingplatform en sociaalnetwerksite. Gebruikers kunnen allerlei korte inhoude delen op hun blog, zoals tekst, afbeeldingen, links en video's.",
      feedFormulas: {
        blogUpdates: {
          name: "Blog updates",
          description:
            "Deze feed bevat de 20 meest recente berichten van een blog.",
        },
        customDomainUpdates: {
          name: "Blog updates (eigen domein)",
          description:
            "Deze feed bevat de 20 meest recente berichten van een blog die op een eigen domein wordt gehost.",
        },
      },
      params: {
        blogName: {
          name: "Blognaam",
          description:
            "De naam van de Tumblr-blog. Dit is de naam die staat boven de berichten die op je Tumblr tijdlijn verschijnen, en het is ook het deel van de url voor tumblr.com wanneer je de blog bezoekt.",
          placeholder: "humans-of-amsterdam",
        },
        customDomain: {
          name: "Eigen domein",
          description:
            "Het eigen domein van de Tumblr-blog. Dit is voor blogs die geen tumblr.com-url hebben, maar worden gehost op een eigen domein.",
          placeholder: "https://example.com/",
        },
      },
    },
  },
} as const;

export default tumblr;
