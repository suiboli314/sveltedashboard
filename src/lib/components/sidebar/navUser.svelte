<script lang="ts">
  import { enhance } from "$app/forms";
  import {
    CreditCard,
    EllipsisVertical,
    LogOut,
    MessageSquareDot,
    CircleUserRound
  } from "@lucide/svelte";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Sidebar from "$lib/components/ui/sidebar";
  let { user }: { user: App.Locals["user"] } = $props();
  const sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton
            {...props}
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          >
            <Avatar.Root class="size-8 rounded-lg grayscale">
              <Avatar.Image src={user?.avatar} alt={user?.username} />
              <Avatar.Fallback class="rounded-lg">
                {user?.username.slice(0, 1)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user?.username}</span>
              <span class="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
            <EllipsisVertical class="ml-auto size-4" />
          </Sidebar.MenuButton>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        side={sidebar.isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar.Root class="size-8 rounded-lg">
              <Avatar.Image src={user?.avatar} alt={user?.username} />
              <Avatar.Fallback class="rounded-lg">
                {user?.username.slice(0, 1)}
              </Avatar.Fallback>
            </Avatar.Root>
            <div class="grid flex-1 text-left text-sm leading-tight">
              <span class="truncate font-medium">{user?.username}</span>
              <span class="truncate text-xs text-muted-foreground">
                {user?.email}
              </span>
            </div>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <CircleUserRound />
            Account
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CreditCard />
            Billing
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <MessageSquareDot />
            Notifications
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <form method="post" action="/login?/logout" use:enhance>
            <button class="flex items-center gap-2 text-sm">
              <LogOut />
              Log out
            </button>
          </form>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
