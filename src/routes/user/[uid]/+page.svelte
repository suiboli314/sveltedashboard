<script lang="ts">
  import type { PageServerData } from "./$types";

  import * as Sidebar from "$lib/components/ui/sidebar";
  import AppSidebar from "$lib/components/sidebar/appSidebar.svelte";
  import SiteHeader from "$lib/components/siteHeader/siteHeader.svelte";
  import SectionCards from "$lib/components/sectionCards.svelte";
  import ChartAreaInteractive from "$lib/components/chart/chartAreaInteractive.svelte";
  import DataTable from "$components/dataTable/dataTable.svelte";

  import Tdata from "./data";

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="User Dashboard" />
</svelte:head>

<Sidebar.Provider
  style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
  <AppSidebar variant="inset" user={data.user} />
  <Sidebar.Inset>
    <SiteHeader />
    <div class="flex flex-1 flex-col">
      <div class="@container/main flex flex-1 flex-col gap-2">
        <div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div class="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={Tdata} />
        </div>
      </div>
    </div>
  </Sidebar.Inset>
</Sidebar.Provider>
