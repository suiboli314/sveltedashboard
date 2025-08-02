<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";

  let { children } = $props();
</script>

<div class="h-dvh">
  <ModeWatcher />

  <main class="@container/main">
    {@render children()}
  </main>

  <footer>
    <p></p>
  </footer>
</div>

<style>
</style>
