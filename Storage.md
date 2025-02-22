# Storage

This file outlines the way data is stored for menteka. The data is stored in two places: remote storage and local storage. Local storage ensures that this application can be used offline.

## Remote storage

Each entity represents a row in a table.

```mermaid
erDiagram
    Feed {
        string name
        string description
        bool isNSFW
        bool isAI
        SupportedPlatform platformType
        jsonString platformParams
        FeedType type
        string language
        string url
        csvString tags
    }

    Profile {
        int id
        string name
        string description
        csvString tags
        jsonString links
    }

    View {
        int id
        int userId
        csvString tags
        csvString feeds
        jsonString views
    }

    List {
        int id
        string name
        int userId
    }

    User {
        int id
        string email
        string password
        string name
    }

    Profile_feed {
        int profileId
        int feedId
    }

    Feed_subscription {
        int userId
        string feedUrl
        boolean notify
        string viewMode
    }

    List_subscription {
        int userId
        int listId
    }

    View_subscription {
        int userId
        int viewId
    }

    User_settings {
        int userId
        string key
        string value
    }

    User_saved_item {
        int userId
        string feedUrl
        json content
    }

        Feed ||--o{ Feed_subscription : ""
        User ||--o{ User_saved_item : manages
        User ||--|| User_settings : manages
        User ||--o{ View : manages
        User ||--o{ Feed_subscription : has
        List ||--o{ Feed : contains
        User ||--o{ List : manages
        List ||--o{ List_subscription : has
        User ||--o{ List_subscription : has
        User ||--o{ View_subscription : has
        View ||--o{ View_subscription : has
        Profile ||--o{ Profile_feed : has
        Feed ||--o{ Profile_feed : has

```

## Local storage

### Local Database

A local database exists to keep track of the user's subscriptions and views.

```mermaid
erDiagram

    FEED {
        string name
        string description
        bool isNSFW
        bool isAI
        string platformType
        string platformParams
        string type
        float score
        string language
        string url
        string[] tags
    }

    PROFILE {
        string name
        string description
        float score
        string[] tags
    }

    VIEW {
        int userId
        int feedId
        int timestamp
        string[] tags
    }

        USER_SAVED_ITEM {
        int userId
        int feedId
        json content
    }
```

### Local Store

The store is used to keep track of the user's preferences.

Store (Local key-value store)

| Key          | Description  |
| ------------ | ------------ |
| mode         | light/dark   |
| theme        | string theme |
| syncSettings | boolean      |

## Syncing

When mutations are made to the local storage, they are synced with the remote storage. If the remote storage is not available, the mutations are stored in a queue and are synced when the remote storage is available.
