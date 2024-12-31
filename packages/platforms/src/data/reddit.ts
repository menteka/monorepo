import { Platform } from "@menteka/types";

// TODO: I don't think we are covering everything yet
const reddit: Platform = {
  feedSupport: "full",
  feedFormulas: {
    homepage: {
      formula: "https://www.reddit.com/.rss",
    },
    homepageSorted: {
      formula: "https://www.reddit.com/:sort/.rss",
    },
    subreddit: {
      formula: "https://www.reddit.com/r/:subreddit/.rss",
    },
    subredditSorted: {
      formula: "https://www.reddit.com/r/:subreddit/:sort/",
    },
    userUpdates: {
      formula: "https://www.reddit.com/user/:username/.rss",
    },
    userPosts: {
      formula: "https://www.reddit.com/user/:username/submitted/.rss",
    },
    userComments: {
      formula: "https://www.reddit.com/user/:username/comments/.rss",
    },
    subredditCombination: {
      formula: "https://www.reddit.com/r/:subreddit+:subreddit2/.rss",
    },
    subredditCombinationSorted: {
      formula: "https://www.reddit.com/r/:subreddit+:subreddit2/:sort/.rss",
    },
    domainUpdates: {
      formula: "https://www.reddit.com/domain/:domain/.rss",
    },
    domainUpdatesSorted: {
      formula: "https://www.reddit.com/domain/:domain/:sort/.rss",
    },
  },
  translations: {
    en: {
      name: "Reddit",
      description: `Reddit is a social news aggregation, web content rating, and discussion website. It is a platform where registered members can submit content, such as text posts or direct links to other platforms.`,
      documentationUrl: "https://www.reddit.com/wiki/rss",
      feedFormulas: {
        homepage: {
          name: "Homepage",
          description: `This feed contains the most recent posts from the Reddit homepage.`,
        },
        homepageSorted: {
          name: "Homepage sorted",
          description: `This feed contains the most recent posts from the Reddit homepage, sorted by a specific parameter.`,
        },
        subreddit: {
          name: "Subreddit",
          description: `This feed contains the most recent posts from a specific subreddit.`,
        },
        subredditSorted: {
          name: "Subreddit sorted",
          description: `This feed contains the most recent posts from a specific subreddit, sorted by a specific parameter.`,
        },
        userUpdates: {
          name: "User updates",
          description: `This feed contains the most recent updates from a Reddit user.`,
        },
        userPosts: {
          name: "User posts",
          description: `This feed contains the most recent posts from a Reddit user.`,
        },
        userComments: {
          name: "User comments",
          description: `This feed contains the most recent comments from a Reddit user.`,
        },
        subredditCombination: {
          name: "Subreddit combination",
          description: `This feed contains the most recent posts from a combination of subreddits.`,
        },
        subredditCombinationSorted: {
          name: "Subreddit combination sorted",
          description: `This feed contains the most recent posts from a combination of subreddits, sorted by a specific parameter.`,
        },
        domainUpdates: {
          name: "Domain updates",
          description: `This feed contains the most recent posts from a specific domain.`,
        },
        domainUpdatesSorted: {
          name: "Domain updates sorted",
          description: `This feed contains the most recent posts from a specific domain, sorted by a specific parameter.`,
        },
      },
      params: {
        subreddit: {
          name: "Subreddit",
          description: `The name of the subreddit. It is the part of the URL after reddit.com/r/.`,
          placeholder: "worldnews",
        },
        sort: {
          name: "Sort",
          description: `The sorting parameter for the feed. It can be hot, new, rising, controversial, or top.`,
          placeholder: "hot",
          options: {
            hot: "Hot",
            new: "New",
            rising: "Rising",
            controversial: "Controversial",
            top: "Top",
          },
        },
        username: {
          name: "Username",
          description: `The username of the Reddit user.`,
          placeholder: "spez",
        },
        subreddit2: {
          name: "Subreddit 2",
          description: `The name of the second subreddit for the combination feed.`,
          placeholder: "programming",
        },
        domain: {
          name: "Domain",
          description: `The domain name of the posts.`,
          placeholder: "youtube.com",
        },
      },
    },
    nl: {
      name: "Reddit",
      description: `Reddit is een sociaal nieuwsaggregatie-, webcontentbeoordelings- en discussiewebsite. Het is een platform waar geregistreerde leden inhoud kunnen indienen, zoals tekstberichten of directe links naar andere platforms.`,
      documentationUrl: "https://www.reddit.com/wiki/rss",
      feedFormulas: {
        homepage: {
          name: "Homepage",
          description: `Deze feed bevat de meest recente berichten van de Reddit-startpagina.`,
        },
        homepageSorted: {
          name: "Homepage gesorteerd",
          description: `Deze feed bevat de meest recente berichten van de Reddit-startpagina, gesorteerd op een specifieke parameter.`,
        },
        subreddit: {
          name: "Subreddit",
          description: `Deze feed bevat de meest recente berichten van een specifieke subreddit.`,
        },
        subredditSorted: {
          name: "Subreddit gesorteerd",
          description: `Deze feed bevat de meest recente berichten van een specifieke subreddit, gesorteerd op een specifieke parameter.`,
        },
        userUpdates: {
          name: "Gebruikersupdates",
          description: `Deze feed bevat de meest recente updates van een Reddit-gebruiker.`,
        },
        userPosts: {
          name: "Gebruikersberichten",
          description: `Deze feed bevat de meest recente berichten van een Reddit-gebruiker.`,
        },
        userComments: {
          name: "Gebruikersreacties",
          description: `Deze feed bevat de meest recente reacties van een Reddit-gebruiker.`,
        },
        subredditCombination: {
          name: "Subredditcombinatie",
          description: `Deze feed bevat de meest recente berichten van een combinatie van subreddits.`,
        },
        subredditCombinationSorted: {
          name: "Subredditcombinatie gesorteerd",
          description: `Deze feed bevat de meest recente berichten van een combinatie van subreddits, gesorteerd op een specifieke parameter.`,
        },
        domainUpdates: {
          name: "Domeinupdates",
          description: `Deze feed bevat de meest recente berichten van een specifiek domein.`,
        },
        domainUpdatesSorted: {
          name: "Domeinupdates gesorteerd",
          description: `Deze feed bevat de meest recente berichten van een specifiek domein, gesorteerd op een specifieke parameter.`,
        },
      },
      params: {
        subreddit: {
          name: "Subreddit",
          description: `De naam van de subreddit. Het is het deel van de URL na reddit.com/r/.`,
          placeholder: "thenetherlands",
        },
        sort: {
          name: "Sorteren",
          description: `De sorteermethode voor de feed. Het kan hot, nieuw, stijgend, controversieel of top zijn.`,
          placeholder: "hot",
          options: {
            hot: "Populair",
            new: "Nieuw",
            rising: "Stijgend",
            controversial: "Controversieel",
            top: "Top",
          },
        },
        username: {
          name: "Gebruikersnaam",
          description: `De gebruikersnaam van de Reddit-gebruiker.`,
          placeholder: "kn0thing",
        },
        subreddit2: {
          name: "Subreddit 2",
          description: `De naam van de tweede subreddit voor de combinatiefeed.`,
          placeholder: "thenetherlands",
        },
        domain: {
          name: "Domein",
          description: `De domeinnaam van de berichten.`,
          placeholder: "youtube.com",
        },
      },
    },
  },
} as const;

export default reddit;
