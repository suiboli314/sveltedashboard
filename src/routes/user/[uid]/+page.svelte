<script lang="ts">
  import { enhance } from "$app/forms";
  import type { PageServerData } from "./$types";

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="User Dashboard" />
</svelte:head>

<h1>Hi, {data.user.username}!</h1>
<p>Your user ID is {data.user.id}.</p>
<form method="post" action="/login?/logout" use:enhance>
  <button>Sign out</button>
</form>
