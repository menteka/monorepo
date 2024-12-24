import { Platform } from "@menteka/types";

const github: Platform = {
  feedSupport: "hidden",
  feedFormulas: {
    userActivity: {
      formula: "https://github.com/:username.atom",
    },
    releases: {
      formula: "https://github.com/:owner/:repo/releases.atom",
    },
    commits: {
      formula: "https://github.com/:owner/:repo/commits.atom",
    },
    tags: {
      formula: "https://github.com/:owner/:repo/tags.atom",
    },
    newsFeed: {
      formula: "https://github.com/:username.private.atom?token=:token",
    },
  },
  translations: {
    en: {
      name: "GitHub",
      description:
        "GitHub is a platform for developers to host and review code, manage projects, and build software. It is a social platform that allows developers to collaborate and contribute to open-source projects.",
      feedFormulas: {
        userActivity: {
          name: "User activity",
          description:
            "This feed contains the most recent activity of a specific user.",
        },
        releases: {
          name: "Releases",
          description:
            "This feed contains the most recent releases of a specific repository.",
        },
        commits: {
          name: "Commits",
          description:
            "This feed contains the most recent commits of a specific repository.",
        },
        tags: {
          name: "Tags",
          description:
            "This feed contains the most recent tags of a specific repository.",
        },
        newsFeed: {
          name: "News feed",
          description:
            "This feed contains the activity of the projects and users you are following. It requires passing an authentication token, which you can generate in your GitHub settings.",
        },
      },
      params: {
        username: {
          name: "Username",
          description:
            "The username of the user. You will also find it in the URL of the user's profile.",
          placeholder: "leekeh",
        },
        owner: {
          name: "Owner",
          description:
            "The owner of the repository. You will also find it in the URL of the repository.",
          placeholder: "kovidgoyal",
        },
        repo: {
          name: "Repository",
          description:
            "The name of the repository. You will also find it in the URL of the repository.",
          placeholder: "calibre",
        },
        token: {
          name: "Token",
          description:
            "The token required to access the private feed. You can create a token in your GitHub settings.",
          placeholder: "your token here",
        },
      },
    },
    nl: {
      name: "GitHub",
      description:
        "GitHub is een platform voor ontwikkelaars om code te hosten, projecten te beheren en software te bouwen. Het is een sociaal platform dat ontwikkelaars in staat stelt om samen te werken en bij te dragen aan open-source projecten.",
      feedFormulas: {
        userActivity: {
          name: "Gebruikersactiviteit",
          description:
            "Deze feed bevat de meest recente activiteit van een specifieke gebruiker.",
        },
        releases: {
          name: "Releases",
          description:
            "Deze feed bevat de meest recente releases van een specifiek repository.",
        },
        commits: {
          name: "Commits",
          description:
            "Deze feed bevat de meest recente commits van een specifiek repository.",
        },
        tags: {
          name: "Tags",
          description:
            "Deze feed bevat de meest recente tags van een specifiek repository.",
        },
        newsFeed: {
          name: "Nieuwsfeed",
          description:
            "Deze feed bevat de activiteit van de projecten en gebruikers die je volgt. Het vereist het doorgeven van een authenticatietoken, die je kunt genereren in je GitHub-instellingen.",
        },
      },
      params: {
        username: {
          name: "Gebruikersnaam",
          description:
            "De gebruikersnaam van de gebruiker. Je vindt het ook in de URL van het profiel van de gebruiker.",
          placeholder: "leekeh",
        },
        owner: {
          name: "Eigenaar",
          description:
            "De eigenaar van het repository. Je vindt het ook in de URL van het repository.",
          placeholder: "kovidgoyal",
        },
        repo: {
          name: "Repository",
          description:
            "De naam van het repository. Je vindt het ook in de URL van het repository.",
          placeholder: "calibre",
        },
        token: {
          name: "Token",
          description:
            "Het token dat nodig is om toegang te krijgen tot de privéfeed. Je kunt een token aanmaken in je GitHub-instellingen.",
          placeholder: "jouw token hier",
        },
      },
    },
  },
} as const;

export default github;
