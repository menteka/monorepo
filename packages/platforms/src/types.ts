export type Platform = {
  feedSupport: "full" | "hidden" | "none";
  feedFormulas: {
    [K in string]: {
      formula: string;
      type?: FeedType;
      isBridged?: boolean;
    };
  };
  translations: Record<
    SupportedLanguage,
    Translation & {
      feedFormulas: {
        [K in keyof Platform["feedFormulas"]]: Translation;
      };
      params: Record<
        ExtractParams<
          Platform["feedFormulas"][keyof Platform["feedFormulas"]]["formula"]
        >,
        Translation & { placeholder: string; options?: Record<string, string> }
      >;
    }
  >;
};

type NonEmptyString<T extends string> = T extends "" ? never : T;

type ExtractParams<T extends string> =
  T extends `${any}:${infer Param}/${infer Rest}`
    ? NonEmptyString<Param> | ExtractParams<Rest>
    : T extends `${any}:${infer Param}`
      ? NonEmptyString<Param>
      : never;

// Type tests
type Test1 = ExtractParams<"https://youtube.com/:channelId/feed/:type">; // "channelId" | "type"
type Test2 = ExtractParams<"https://example.com/:param">; // "param"
type Test3 = ExtractParams<"https://example.com/no-params">; // never

export type Translation = {
  name: string;
  description: string;
};

export type SupportedLanguage = "en" | "nl";

// TODO: move to generic type folder.
export type FeedType =
  | "video"
  | "newsletter"
  | "podcast"
  | "blog"
  | "social"
  | "forum"
  | "image"
  | "other";
