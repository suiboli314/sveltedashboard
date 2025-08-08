<script lang="ts">
  import type { Icon } from "@lucide/svelte";
  import type { Component } from "svelte";
  import { CirclePlus, Mail } from "@lucide/svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Sidebar from "$lib/components/ui/sidebar";
  let {
    items
  }: { items: { title: string; url: string; icon?: Component<Icon> }[] } =
    $props();
</script>

<Sidebar.Group>
  <Sidebar.GroupContent class="flex flex-col gap-2">
    <Sidebar.Menu>
      <Sidebar.MenuItem class="flex items-center gap-2">
        <Sidebar.MenuButton
          class="min-w-8 bg-primary text-primary-foreground duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
          tooltipContent="Quick create"
        >
          <CirclePlus />
          <span>Quick Create</span>
        </Sidebar.MenuButton>
        <Button
          size="icon"
          class="size-8 group-data-[collapsible=icon]:opacity-0"
          variant="outline"
        >
          <Mail />
          <span class="sr-only">Inbox</span>
        </Button>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
    <Sidebar.Menu>
      {#each items as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton tooltipContent={item.title}>
            {#if item.icon}
              <item.icon />
            {/if}
            <span>{item.title}</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
