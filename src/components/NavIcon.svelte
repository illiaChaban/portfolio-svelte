<script lang='ts'>
	import { link, useLocation } from "svelte-navigator";

  const removeSlashes = (str: string) => str.replace('/', '');

  export let to: string = '';
  export let name: string = removeSlashes(to);

  export let iconName: string;
  export let iconStyle: string = '';

  const location = useLocation();
  $: active = 
    removeSlashes($location.pathname) === removeSlashes(to);

</script>

<a 
  href={to} 
  aria-label={`nav-menu-${name}`}
  class:icon-to-text-on-hover={true}
  class:active
  style="--hover-text: '{name}'"
  use:link
>
  <i class={iconName} style={iconStyle}/>
</a>

<style lang="scss">

  a {
    color: inherit;
    &.active {
      color: var(--color-highlight, orange);
    }
  }
  
  .icon-to-text-on-hover {
    position: relative;

    i {
      &::after {
        content: var(--hover-text, 'navigate');
        font-size: 0.7rem;
        letter-spacing: 1px;
        position: absolute;
        display: block;

        top: 50%;
        left: 50%;

        -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);

        opacity: 0;
        color: var(--color-highlight);
        text-transform: uppercase;
        font-family: 'Inconsolata', monospace;
        font-weight: 100;
      }

      &::before,
      &::after
      {
        -webkit-transition: opacity .2s ease-out;
        transition: opacity .2s ease-out;
      }

    }

    &:hover i {
      &::before {
        opacity: 0;
      }
      &::after {
        opacity: 1;
      }
    }

  }
</style>