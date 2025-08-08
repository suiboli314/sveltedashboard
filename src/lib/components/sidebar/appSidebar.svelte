<script lang="ts">
  import {
    Camera,
    ChartBar,
    CircleGauge,
    Database,
    File,
    FileText,
    Folder,
    MessageCircleQuestionMark,
    List,
    Search,
    Settings,
    Users
  } from "@lucide/svelte";
  import NavDocuments from "./navDocument.svelte";
  import NavMain from "./navMain.svelte";
  import NavSecondary from "./navSecondary.svelte";
  import NavUser from "./navUser.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar";
  import type { ComponentProps } from "svelte";
  const data = {
    navMain: [
      { title: "Dashboard", url: "#", icon: CircleGauge },
      { title: "Lifecycle", url: "#", icon: List },
      { title: "Analytics", url: "#", icon: ChartBar },
      { title: "Projects", url: "#", icon: Folder },
      { title: "Team", url: "#", icon: Users }
    ],
    navClouds: [
      {
        title: "Capture",
        icon: Camera,
        isActive: true,
        url: "#",
        items: [
          { title: "Active Proposals", url: "#" },
          { title: "Archived", url: "#" }
        ]
      },
      {
        title: "Proposal",
        icon: FileText,
        url: "#",
        items: [
          { title: "Active Proposals", url: "#" },
          { title: "Archived", url: "#" }
        ]
      },
      {
        title: "Prompts",
        icon: File,
        url: "#",
        items: [
          { title: "Active Proposals", url: "#" },
          { title: "Archived", url: "#" }
        ]
      }
    ],
    navSecondary: [
      { title: "Settings", url: "#", icon: Settings },
      { title: "Get Help", url: "#", icon: MessageCircleQuestionMark },
      { title: "Search", url: "#", icon: Search }
    ],
    documents: [{ name: "Data Library", url: "#", icon: Database }]
  };
  let {
    user,
    ...restProps
  }: { user: App.Locals["user"] } & ComponentProps<typeof Sidebar.Root> =
    $props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
          {#snippet child({ props })}
            <a href="##" {...props}>
              <span class="text-base font-semibold">hola mundo</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={data.navMain} />
    <NavDocuments items={data.documents} />
    <NavSecondary items={data.navSecondary} class="mt-auto" />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser {user} />
  </Sidebar.Footer>
</Sidebar.Root>
