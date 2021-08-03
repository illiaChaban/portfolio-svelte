<script lang="ts">

  export let onClick: () => void;

  type MousePosition = {x: number, y: number};
  let mousePosition: MousePosition  = {x: 0, y: 0};
  const trackMousePosition = (e: MouseEvent) => {
    mousePosition = {x: e.offsetX, y: e.offsetY};
  };
  
</script>

<button 
  class="main-btn"
  on:mousemove={trackMousePosition}
  on:click={onClick}
  style={`
    --mouse-pos-x: ${mousePosition.x}px; 
    --mouse-pos-y: ${mousePosition.y}px;
  `}
>
  <slot></slot>
</button>

<style lang="scss">
  .main-btn {
    --mouse-pos-x: 0px;
    --mouse-pos-y: 0px;
    --btn-color: var(--color-highlight);

    box-shadow: 0 0 10px var(--btn-color);
    text-decoration: none;
    color: var(--btn-color);
    background: transparent;
    font-weight: 100;

    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid var(--btn-color);
    
    font-family: 'Saira', Helvetica, Arial, sans-serif; 
    font-size: 1.5rem;

    display: inline-block;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
  }

  .main-btn:focus {
    box-shadow: 0 0 20px 1px var(--color-highlight);
  }

  .main-btn:hover {
    color: var(--body-background-color);
    /* font-weight: 900;  */ /* changes btn width on firefox */
    background: orange;
    background: radial-gradient(circle at var(--mouse-pos-x) var(--mouse-pos-y), var(--btn-color) 50%,rgba(0,0,0,0) 100%);
  }
</style>