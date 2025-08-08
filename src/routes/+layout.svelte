<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner";

  let { children } = $props();
</script>

<div class="h-dvh">
  <ModeWatcher />
  <Toaster />

  <main class="@container/main">
    {@render children()}
  </main>

  <footer>
    <p></p>
  </footer>
</div>

<style>
</style>
