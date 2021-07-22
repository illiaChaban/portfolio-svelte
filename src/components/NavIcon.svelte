<script lang='ts'>
	import { Link } from "svelte-navigator";

  export let to: string = '';
  export let name: string = to.replace("/", '');

  export let iconName: string;
  export let iconStyle: string = '';
</script>

<Link 
  to={to} 
  class='icon-to-text-on-hover'
  style="--hover-text: '{name}'"
  aria-label={`menu-${name}`}
>
  <i class={iconName} style={iconStyle}/>
</Link>

<style lang="scss">
 
    :global(.icon-to-text-on-hover) {
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