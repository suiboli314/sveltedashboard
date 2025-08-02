<script lang="ts">
  import { page } from "$app/state";
  import github from "$lib/images/github.svg";
</script>

<header class="flex justify-between px-2">
  <div class="placeholder: w-12"></div>

  <nav class="flex justify-center">
    <ul
      class="relative m-0 flex h-12 list-none items-center justify-center bg-white/70 bg-cover p-0"
    >
      <li
        class="relative h-full"
        aria-current={page.url.pathname === "/" ? "page" : undefined}
      >
        <a href="/">Home</a>
      </li>
      <li
        class="relative h-full"
        aria-current={page.url.pathname === "/about" ? "page" : undefined}
      >
        <a href="/about">About</a>
      </li>
      <li
        class="relative h-full"
        aria-current={page.url.pathname.startsWith("/sverdle")
          ? "page"
          : undefined}
      >
        <a href="/sverdle">Sverdle</a>
      </li>
    </ul>
  </nav>

  <div class="w-12">
    <a
      class="flex h-full w-full items-center justify-center"
      href="https://github.com/suiboli314"
    >
      <img class="w-8 object-contain" src={github} alt="GitHub" />
    </a>
  </div>
</header>

<style>
  li[aria-current="page"]::before {
    --size: 6px;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--foreground);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 0.5rem;
    color: var(--color-text);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--foreground);
  }
</style>
