<script lang="ts">
  import DOMPurify from "dompurify";

  let { content }: { content: string } = $props();

  function mapContent() {
    let result = content;

    //Add anchor tags to any links
    result = content.replace(
      /<a\b[^>]*>.*?<\/a>|(\b(?:https?:\/\/|www\.)[^\s<>]+\b)/gi,
      (match, url) => {
        if (url) {
          return `<a href='${url}' target='_blank'>${url}</a>`;
        }
        return match;
      }
    );
    //Add email links to any email
    result = content.replace(
      /<a\b[^>]*>.*?<\/a>|(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/g,
      (match, email) => {
        if (email) {
          return `<a href='mailto:${email}'>${email}</a>`;
        }
        return match;
      }
    );
    //Add phone links to any phone nr
    result = content.replace(
      /<a\b[^>]*>.*?<\/a>|(\+?\d{1,3}[-\s]?\d{1,3}[-\s]?\d{4,10})/g,
      (match, phone) => {
        if (phone) {
          // Clean the phone number by removing spaces and dashes
          const cleanPhone = phone.replace(/[-\s]/g, "");
          return `<a href='tel:${cleanPhone}'>${phone}</a>`;
        }
        return match;
      }
    );

    return DOMPurify.sanitize(result);
  }
</script>

<section>{@html mapContent()}</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
