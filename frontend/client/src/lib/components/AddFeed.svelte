<script lang="ts">
  import { Input, Textarea, Toggle } from "@menteka/ui";
  import { supportedFeedTypes } from "@menteka/schemas";
  type Props = {
    defaultURL?: string;
    defaultTitle?: string;
    defaultDescription?: string;
    defaultLink?: string;
    defaultCopyright?: string;
    defaultType?: string;
  };

  let {
    defaultURL,
    defaultTitle,
    defaultDescription,
    defaultLink,
    defaultCopyright,
    defaultType,
  }: Props = $props();

  let url = $state(defaultURL ?? "");
  let title = $state(defaultTitle ?? "");
  let description = $state(defaultDescription ?? "");
  let link = $state(defaultLink ?? "");
  let copyright = $state(defaultCopyright ?? "");
  let type = $state(defaultType ?? "");
  let sensitive = $state(false);
  let aiGenerated = $state(false);
  let allowDiscovery = $state(true);
</script>

<form>
  <label>
    URL (required)
    <Input
      bind:value={url}
      type="text"
      placeholder="URL from which the feed is fetched"
    />
  </label>
  <label>
    title (required)
    <Input bind:value={title} type="text" placeholder="Title of the feed" />
  </label>
  <label>
    description
    <Textarea
      rows="4"
      bind:value={description}
      placeholder="Description of the feed"
    />
  </label>
  <label>
    link
    <Input
      bind:value={link}
      type="text"
      placeholder="Enter a URL or search term"
    />
  </label>
  <label>
    copyright
    <Input
      bind:value={copyright}
      type="text"
      placeholder="Enter a URL or search term"
    />
  </label>

  <div style="display: grid; grid-template-columns: 1fr;">
    <label>
      Contains sensitive content
      <Toggle bind:checked={sensitive} />
    </label>
    <label>
      Contains AI-generated content
      <Toggle bind:checked={aiGenerated} />
    </label>

    <label>
      Allow others to find this feed
      <Toggle bind:checked={allowDiscovery} />
    </label>
  </div>
  <label>
    Type of feed
    <select bind:value={type}>
      <option value=""></option>
      {#each supportedFeedTypes as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
  </label>
</form>

<style>
  form {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 2rem;
    border: 2px solid black;
  }
</style>
