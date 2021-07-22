<script lang="ts">
  import { onMount } from "svelte";
  import {lazy} from "../utils/lazy";
  // import {particlesJS} from "tsparticles";

  const containerId = 'particles';

  // onMount(() => {
  //   const colorHighlight = lazy.getCssVariable('--color-highlight');
  
  //   particlesJS(
  //     containerId, 
  //     {
  //       "particles": {
  //         "number": {
  //           "value": 80,
  //           "density": {
  //             "enable": true,
  //             "value_area": 1026
  //           }
  //         },
  //         "color": {
  //           "value": colorHighlight
  //         },
  //         "shape": {
  //           "type": "circle",
  //         },
  //         "opacity": {
  //           "value": 0.3, //.3
  //           "random": false,
  //           "anim": {
  //             "enable": false,
  //             "speed": 1,
  //             "opacity_min": 0.1,
  //             "sync": false
  //           }
  //         },
  //         "size": {
  //           "value": 1.5, //circle size
  //           "random": false,
  //           "anim": {
  //             "enable": false,
  //             "speed": 20,
  //             "size_min": 0.1,
  //             "sync": true
  //           }
  //         },
  //         "line_linked": {
  //           "enable": true,
  //           "distance": 120,
  //           "color": colorHighlight, 
  //           "opacity": 0.6, // .4
  //           "width": 1
  //         },
  //         "move": {
  //           "enable": true,
  //           "speed": 0.5, // .4 - .8
  //           "direction": "none",
  //           "random": false,
  //           "straight": false,
  //           "out_mode": "bounce",
  //           "attract": {
  //             "enable": false,
  //             "rotateX": 600,
  //             "rotateY": 1200
  //           }
  //         }
  //       },
  //       "interactivity": {
  //         "detect_on": "window",
  //         "events": {
  //           "onhover": {
  //             "enable": true,
  //             "mode": "grab"
  //           },
  //           "onclick": {
  //             "enable": false,
  //             "mode": "push"
  //           },
  //           "resize": true
  //         },
  //         "modes": {
  //           "grab": {
  //             "distance": 130,
  //             "line_linked": {
  //               "opacity": 0.8 //.7
  //             }
  //           },
  //         }
  //       },
  //       "retina_detect": true,
  //     },
  //   );

  // });

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
  }
</style>