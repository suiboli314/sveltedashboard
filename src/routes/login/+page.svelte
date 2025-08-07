<script lang="ts">
  import LoginForm from "$components/loginForm.svelte";
  import type { ActionData } from "./$types";

  let { form }: { form: ActionData } = $props();
  let formError = $derived(form?.message ?? "");
</script>

<svelte:head>
  <title>Login Page</title>
  <meta name="description" content="Login to your account" />
</svelte:head>

<div
  class="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10"
>
  <div class="w-full max-w-sm md:max-w-3xl">
    <LoginForm {formError} />
  </div>
</div>
