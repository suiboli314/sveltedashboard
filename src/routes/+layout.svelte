<script lang="ts">
  import Header from "./Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="h-dvh">
  <Header />

  <main class="@container/main">
    {@render children()}
  </main>

  <footer>
    <p></p>
  </footer>
</div>

<style>
</style>
