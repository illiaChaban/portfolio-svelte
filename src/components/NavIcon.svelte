<script lang='ts'>
	import { Link, useLocation } from "svelte-navigator";

  const removeSlashes = (str: string) => str.replace('/', '');

  export let to: string = '';
  export let name: string = removeSlashes(to);

  export let iconName: string;
  export let iconStyle: string = '';


  const location = useLocation();
  $: active = 
    removeSlashes($location.pathname) === removeSlashes(to);

</script>

<div
  class:navicon={true}
  class:icon-to-text-on-hover={true}
  class:active
  style="--hover-text: '{name}'"

>
  <Link 
    to={to} 
    aria-label={`nav-menu-${name}`}
  >
    <i class={iconName} style={iconStyle}/>
  </Link>
</div>

<style lang="scss">

  .navicon {
    :global(a) {
      color: inherit;
    }

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


  // .icon-to-text-on-hover {
  //   position: relative;
  // }
  // .icon-to-text-on-hover i::after {
  //   content: '';
  //   font-size: 0.7rem;
  //   letter-spacing: 1px;
  //   position: absolute;
  //   display: block;

  //   top: 50%;
  //   left: 50%;

  //   -webkit-transform: translate(-50%, -50%);
  //           transform: translate(-50%, -50%);

  //   opacity: 0;
  //   color: var(--color-highlight);
  //   text-transform: uppercase;
  //   font-family: 'Inconsolata', monospace;
  //   font-weight: 100;
  // }
  // .icon-to-text-on-hover:hover i::before {
  //   opacity: 0;
  // }
  // .icon-to-text-on-hover:hover i::after {
  //   opacity: 1;
  // }

  // .icon-to-text-on-hover i::before,
  // .icon-to-text-on-hover i::after
  // {
  //   -webkit-transition: opacity .2s ease-out;
  //   transition: opacity .2s ease-out;
  // }

</style>