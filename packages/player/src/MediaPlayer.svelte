<!-- MediaPlayer.svelte -->
<script>
  import { onMount, onDestroy } from "svelte";

  // Props
  export let src = "";
  export let type = "video"; // 'video' | 'audio' | 'youtube'
  export let transcript = null;
  export let onNext = () => {};
  export let onPrev = () => {};

  // State
  let mediaElement;
  let container;
  let isPlaying = false;
  let duration = 0;
  let currentTime = 0;
  let volume = 1;
  let playbackRate = 1;
  let isFullscreen = false;
  let isMuted = false;
  let isLoading = true;
  let buffered = 0;
  let youtubePlayer = null;

  // Constants
  const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.5, 2];
  const CACHE_KEY = `media-cache-${src}`;

  // Reactive statements
  $: isAudioOnly = type === "audio" || (type === "video" && !hasVideo());
  $: showAnimation = isAudioOnly && isPlaying;

  onMount(async () => {
    if (type === "youtube") {
      await initYoutubePlayer();
    } else {
      await tryLoadFromCache();
    }

    setupMediaEvents();
  });

  onDestroy(() => {
    if (youtubePlayer) {
      youtubePlayer.destroy();
    }
  });

  async function initYoutubePlayer() {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);

      await new Promise((resolve) => {
        window.onYouTubeIframeAPIReady = resolve;
      });
    }

    const videoId = extractYoutubeId(src);
    youtubePlayer = new window.YT.Player("youtube-player", {
      videoId,
      events: {
        onReady: () => {
          isLoading = false;
        },
        onStateChange: handleYoutubeStateChange,
      },
    });
  }

  function extractYoutubeId(url) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  }

  async function tryLoadFromCache() {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const blob = await fetch(cachedData).then((r) => r.blob());
        mediaElement.src = URL.createObjectURL(blob);
      } else {
        // Implement chunked download
        const response = await fetch(src);
        const reader = response.body.getReader();
        const contentLength = +response.headers.get("Content-Length");

        let receivedLength = 0;
        const chunks = [];

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          chunks.push(value);
          receivedLength += value.length;
          buffered = receivedLength / contentLength;
        }

        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);
        localStorage.setItem(CACHE_KEY, url);
        mediaElement.src = url;
      }
    } catch (error) {
      console.error("Error loading media:", error);
      mediaElement.src = src; // Fallback to direct source
    }
  }

  function setupMediaEvents() {
    if (!mediaElement) return;

    mediaElement.addEventListener("loadedmetadata", () => {
      duration = mediaElement.duration;
      isLoading = false;
    });

    mediaElement.addEventListener("timeupdate", () => {
      currentTime = mediaElement.currentTime;
    });

    mediaElement.addEventListener("ended", () => {
      isPlaying = false;
    });
  }

  function togglePlay() {
    if (type === "youtube") {
      isPlaying ? youtubePlayer.pauseVideo() : youtubePlayer.playVideo();
    } else {
      isPlaying ? mediaElement.pause() : mediaElement.play();
    }
    isPlaying = !isPlaying;
  }

  function handleYoutubeStateChange(event) {
    isPlaying = event.data === window.YT.PlayerState.PLAYING;
  }

  function setPlaybackRate(rate) {
    if (type === "youtube") {
      youtubePlayer.setPlaybackRate(rate);
    } else {
      mediaElement.playbackRate = rate;
    }
    playbackRate = rate;
  }

  function setVolume(value) {
    if (type === "youtube") {
      youtubePlayer.setVolume(value * 100);
    } else {
      mediaElement.volume = value;
    }
    volume = value;
  }

  function toggleMute() {
    if (type === "youtube") {
      isMuted ? youtubePlayer.unMute() : youtubePlayer.mute();
    } else {
      mediaElement.muted = !mediaElement.muted;
    }
    isMuted = !isMuted;
  }

  function toggleFullscreen() {
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen();
      isFullscreen = true;
    } else {
      document.exitFullscreen();
      isFullscreen = false;
    }
  }

  function hasVideo() {
    if (!mediaElement) return false;
    return mediaElement.videoWidth > 0;
  }

  function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h ? h + ":" : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }
</script>

<div class="media-player" bind:this={container}>
  {#if isLoading}
    <div class="loading">Loading...</div>
  {/if}

  {#if type === "youtube"}
    <div id="youtube-player"></div>
  {:else if type === "video"}
    <video bind:this={mediaElement} class="media-element" preload="metadata" />
  {:else}
    <audio bind:this={mediaElement} class="media-element" preload="metadata" />

    {#if showAnimation}
      <div class="audio-animation">
        <!-- Simple audio wave animation -->
        <div class="bar" style="--delay: 0s"></div>
        <div class="bar" style="--delay: 0.1s"></div>
        <div class="bar" style="--delay: 0.2s"></div>
        <div class="bar" style="--delay: 0.3s"></div>
      </div>
    {/if}
  {/if}

  <div class="controls">
    <button on:click={() => onPrev()} class="control-button"> ⏮️ </button>

    <button on:click={togglePlay} class="control-button">
      {isPlaying ? "⏸️" : "▶️"}
    </button>

    <button on:click={() => onNext()} class="control-button"> ⏭️ </button>

    <div class="time-display">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>

    <input
      type="range"
      min="0"
      max={duration}
      bind:value={currentTime}
      class="progress-bar"
    />

    <div class="volume-control">
      <button on:click={toggleMute} class="control-button">
        {isMuted ? "🔇" : "🔊"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        bind:value={volume}
        class="volume-slider"
      />
    </div>

    <select
      bind:value={playbackRate}
      on:change={(e) => setPlaybackRate(e.target.value)}
      class="speed-select"
    >
      {#each PLAYBACK_SPEEDS as speed}
        <option value={speed}>{speed}x</option>
      {/each}
      <option value="custom">Custom</option>
    </select>

    {#if type === "video"}
      <button on:click={toggleFullscreen} class="control-button">
        {isFullscreen ? "↙️" : "↗️"}
      </button>
    {/if}
  </div>

  {#if transcript}
    <div class="transcript">
      <h3>Transcript</h3>
      <div class="transcript-content">
        {transcript}
      </div>
    </div>
  {/if}
</div>

<style>
  .media-player {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    background: #000;
    color: #fff;
  }

  .media-element {
    width: 100%;
    height: auto;
  }

  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .control-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
  }

  .progress-bar {
    flex-grow: 1;
  }

  .volume-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .volume-slider {
    width: 100px;
  }

  .audio-animation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    height: 200px;
    background: #333;
  }

  .bar {
    width: 4px;
    background: #fff;
    animation: wave 1s ease-in-out infinite;
    animation-delay: var(--delay);
  }

  @keyframes wave {
    0%,
    100% {
      height: 20px;
    }
    50% {
      height: 100px;
    }
  }

  .transcript {
    padding: 1rem;
    background: #333;
    margin-top: 1rem;
    max-height: 200px;
    overflow-y: auto;
  }

  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
  }
</style>
