<script lang="ts">
  import { onMount } from "svelte";
  import { getCssVariable } from "../../utils/getCssVariable";
  import { initParticles } from "./initParticles";

  const containerId = 'particles';

  onMount(async () => {
    const colorHighlight = getCssVariable('--color-highlight');
    await initParticles(containerId, colorHighlight);
  });
  
</script>

<div 
  id={containerId} 
  class="particles-container"
></div>

<style>
  .particles-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    /* padding-left: var(--menu-offset); */
    z-index: -10;
    position: fixed;
    overflow: hidden;
    top: 0;
  }
</style>