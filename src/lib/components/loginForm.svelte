<script lang="ts">
  import { cn } from "$lib/utils";
  import { enhance } from "$app/forms";
  import type { HTMLAttributes } from "svelte/elements";
  import { m } from "$lib/paraglide/messages";

  import * as Card from "$components/ui/card";
  import { Label } from "$components/ui/label";
  import {
    Input,
    usernameAttribute,
    passwordAttribute,
    confirmPasswordAttribute
  } from "$components/ui/input";
  import { Button } from "$components/ui/button";

  import { Eye, EyeClosed } from "@lucide/svelte";
  import { Skeleton } from "$lib/components/ui/skeleton";

  // import google from "$lib/images/google.svg";
  // import apple from "$lib/images/apple.svg";
  // import github from "$lib/images/github.svg";

  type DivPropsWithMessage = HTMLAttributes<HTMLDivElement> & {
    formError?: string;
  };

  let {
    class: className,
    formError,
    ...restProps
  }: DivPropsWithMessage = $props();
  const id = $props.id();

  let signup = $state(false);
  let password = $state("");
  let confirmPassword = $state("");
  let showPassword = $state(false);

  let message = $derived.by(() => {
    if (signup && password && confirmPassword && password !== confirmPassword)
      return m.password_mismatch();
    else if (formError) return formError;
    else return "";
  });
</script>

{#snippet showPasswordIcon(props: { isHidden: boolean; toggle: () => void })}
  {#if props.isHidden}
    <Eye
      class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-all duration-200"
      onclick={props.toggle}
    />
  {:else}
    <EyeClosed
      class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer transition-all duration-200"
      onclick={props.toggle}
    />
  {/if}
{/snippet}

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
  <Card.Root class="overflow-hidden p-0">
    <Card.Content class="grid p-0 md:grid-cols-2">
      <form
        class="p-6 md:p-8"
        method="post"
        action={signup ? "?/register" : "?/login"}
        use:enhance
      >
        <div class="flex flex-col gap-6">
          <div class="flex flex-col items-center text-center">
            <h1 class="flex text-2xl font-bold">
              {signup ? m.new_user_slogan() : m.welcome_slogan()}
            </h1>
            <p class="text-balance text-muted-foreground">
              {signup ? m.new_user_desc() : m.login_desc()}
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <Label class="text-sm" for="username-{id}">
              {m.username_label()}
            </Label>
            <Input {...usernameAttribute(id)} />
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center">
              <Label class="text-sm" for="password-{id}">
                {m.password_label()}
              </Label>
              <Button
                variant="link"
                class={cn(
                  "ml-auto h-fit cursor-pointer p-0 underline hover:no-underline",
                  { hidden: signup }
                )}
              >
                {m.forgot_password_desc()}
              </Button>
            </div>
            <div class="relative">
              <Input
                bind:value={password}
                {...passwordAttribute(id, signup, showPassword)}
              />
              {@render showPasswordIcon({
                isHidden: showPassword,
                toggle: () => (showPassword = !showPassword)
              })}
            </div>
          </div>
          {#if signup}
            <div class="flex flex-col gap-3">
              <Label class="text-sm" for="confirm-password-{id}">
                {m.confirm_password_label()}
              </Label>
              <div class="relative">
                <Input
                  bind:value={confirmPassword}
                  {...confirmPasswordAttribute(id, showPassword)}
                />
                {@render showPasswordIcon({
                  isHidden: showPassword,
                  toggle: () => (showPassword = !showPassword)
                })}
              </div>
            </div>
          {/if}
          <Button
            type="submit"
            class="w-full"
            disabled={signup && password !== confirmPassword}
          >
            {signup ? m.register_button() : m.login_button()}
          </Button>
          <!-- <div
            class="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"
          >
            <span class="relative z-10 bg-card px-2 text-muted-foreground">
              {m.third_party_hint()}
            </span>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <Button variant="outline" type="button" class="w-full">
              <img class="w-6 object-contain" src={apple} alt="Apple" />
              <span class="sr-only">{m.login_thrid_party({ provider: "Apple" })}</span>
            </Button>
            <Button variant="outline" type="button" class="w-full">
              <img class="w-6 object-contain" src={google} alt="Google" />
              <span class="sr-only">{m.login_thrid_party({ provider: "Google" })}</span>
            </Button>
            <Button variant="outline" type="button" class="w-full">
              <img class="w-6 object-contain" src={github} alt="GitHub" />
              <span class="sr-only">{m.login_thrid_party({ provider: "GitHub" })}</span>
            </Button>
          </div> -->
          <div class="text-center text-sm">
            {signup ? m.sign_in_hint() : m.sign_up_hint()}
            <Button
              variant="link"
              class="p-0 underline hover:cursor-pointer hover:no-underline"
              onclick={() => (signup = !signup)}
            >
              {signup ? m.back() : m.sign_up_link()}
            </Button>
          </div>
        </div>
        <div class="h-5">
          {#if message}
            <p class="text-center text-sm text-red-500">{message}</p>
          {/if}
        </div>
      </form>
      <div class="relative hidden bg-muted md:block">
        <Skeleton class="absolute inset-0" data-slot="login-image-skeleton" />
      </div>
    </Card.Content>
  </Card.Root>
  <div
    class="text-center text-xs text-balance text-muted-foreground *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary"
  >
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html m.agreement({
      terms: `<a href="##">${m.terms()}</a>`,
      privacy: `<a href="##">${m.privacy()}</a>`
    })}
  </div>
</div>
