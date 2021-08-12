<script lang="ts">
import { onMount } from "svelte";



// const wrapEveryLetterInSpan = (selector) => {
//     let elements = document.querySelectorAll(selector);
//     elements.forEach(el => {
//       el.innerHTML = el.textContent.replace(/(\w|,|')/g, "<span class='letter'>$&</span>");
//     })
//   };


//   let animations = [];
//   const prepareAnimations = () => {

//     wrapEveryLetterInSpan('.ml3');
//     document.querySelectorAll('.ml3 .letter').forEach( l => {
//       l.style.opacity = 0;
//     });
//     let headerFadeIn = anime.timeline({loop: false})
//       .add({
//         targets: '.ml3 .letter',
//         opacity: [0,1],
//         easing: "easeInOutQuad",
//         duration: 250,
//         delay: function(el, i) {
//           return 50 * (i+1)
//         }
//       });

  
//     // HI
//     // document.querySelector(".ml8").classList.remove('hide');
//     let hiAnimation = anime.timeline({loop: false}).add({
//       targets: '.ml8 .circle-white',
//       scale: [0, 3],
//       opacity: [1, 0],
//       easing: "easeInOutExpo",
//       rotateZ: 360,
//       duration: 1100
//     })
//     .add({
//       targets: '.ml8 .circle-container',
//       scale: [0, 1],
//       duration: 1100,
//       easing: "easeInOutExpo",
//       offset: '-=1000'
//     })
//     .add({
//       targets: '.ml8 .circle-dark',
//       scale: [0, 1],
//       duration: 1100,
//       easing: "easeOutExpo",
//       offset: '-=600'
//     })
//     .add({
//       targets: '.ml8 .letters-left',
//       scale: [0, 1],
//       translateY: ['38%', '38%'], //centering letters
//       duration: 1200,
//       offset: '-=550'
//     })
//     .add({
//       targets: '.ml8 .bang',
//       scale: [0, 1],
//       translateY: ['38%', '38%'], //centering letters
//       opacity: [0,1],
//       rotateZ: [45, 15],
//       duration: 1200,
//       offset: '-=1000'
//     })
//     .add({}); // fixes "!" bug

//     animations.push( headerFadeIn );
//     animations.push( hiAnimation );
//   };
//   const runTextAnimation = () => {
//     if (!animations.length) { 
//       prepareAnimations();
//     } else {
//       animations.forEach( a => a.restart() );
//     }
//   };

  onMount(() => {
    // runTextAnimation();
    console.log('hello')
  })
</script>

<h1 class="ml8">
  <span class="letters-container">
    <span class="letters letters-left">Hi</span>
    <span class="letters bang">!</span>
  </span>
  <span class="circle circle-white"></span>
  <span class="circle circle-dark"></span>
  <span class="circle circle-container"><span class="circle circle-dark-dashed"></span></span>
</h1>

<h1 class="header ml3">I'm Illia,</h1>
<h1 class="header ml3">I build things</h1>

<style lang="scss">

/* ********************************************************** */
/* ********************************************************** */
/* ******************* text animations ********************** */

/* HI! */
.ml8 {
  font-weight: 900;
  width: 3em;
  height: 3em;
  position: relative;
  margin: 0;
  /* aligning HI to the rest of the header */
  transform: translate( -25px, 15px);
  z-index: -1;

}

.ml8 .letters-container {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
  height: 1em;
  text-align: center; /* centering text */
}

.ml8 .letters {
  position: relative;
  z-index: 2;
  display: inline-block;
  line-height: 0.7em;
  right: -0.12em;
  top: -0.2em;
}

.ml8 .bang {
  /* font-size: 1.4em; */
  top: auto;
  left: -0.06em;
}

.ml8 .circle {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 0;
  bottom: 0;
}

.ml8 .circle-white {
  width: 3em;
  height: 3em;
  border: 2px dashed var(--color-main, white);
  border-radius: 2em;
}

.ml8 .circle-dark {
  width: 2.2em;
  height: 2.2em;
  background-color: #4f7b86;
  border-radius: 3em;
  z-index: 1;
}

.ml8 .circle-dark-dashed {
  border-radius: 2.4em;
  background-color: transparent;
  border: 2px dashed var(--color-highlight);
  width: 2.3em;
  height: 2.3em;
  /* animation-name: rotate360;
  animation-duration: 8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear; */

  -webkit-animation: rotate360 8s linear infinite;
          animation: rotate360 8s linear infinite;
}


@-webkit-keyframes rotate360 {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}

@keyframes rotate360 {
  from {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(360deg);
  }
}

</style>