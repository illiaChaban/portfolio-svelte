<script lang="ts">
  import { onMount } from "svelte";
  import CachedImg from "../../../components/cached-img/CachedImg.svelte";

  let artRef: HTMLElement
  let rvContainerRef: HTMLElement

  const prepareArt = () => {  
    const updateArtWidth = () => {
      // in case content was hidden to rerender css animations etc. use body as a fallback
      const contentWidth = document.body.offsetWidth;
      // set content width in pixels instead of percentage
      artRef.style.setProperty( '--content-width', `${contentWidth}px`);
    };
    updateArtWidth();
    window.addEventListener('resize', updateArtWidth);
    // show squirrel and rv after css variable was updated to indicate
    // content width in pixels
    rvContainerRef.classList.remove('hide'); 
  }

  onMount(prepareArt)
</script>


<div id='art-container' class='container'>
  <div class='container overflow-hidden'>
    <div id='art' bind:this={artRef} >
      <div class='container'>
        <CachedImg 
          key={'mountain'} 
          props={{
            id: 'mountain',
            alt: 'mountain'
          }}
          urls={{
            initial: {png: 'imgs/mountain-smallest.png', webp: 'imgs/mountain-small.webp'},
            mobile: {png: 'imgs/mountain-small.png', webp: 'imgs/mountain-small.webp'},
            main: {png: 'imgs/mountain.png', webp: 'imgs/mountain.webp'}
          }} 
        />
        <div id='rv-squirrel-container' class='container hide' bind:this={rvContainerRef} >
          <CachedImg 
            key={'bus'} 
            props={{
              id: 'rv',
              alt: 'hippie van'
            }}
            urls={{
              initial: {png: 'imgs/rv-smallest.png', webp: 'imgs/rv-small.webp'},
              mobile: {png: 'imgs/rv-small.png', webp: 'imgs/rv-small.webp'},
              main: {png: 'imgs/rv.png', webp: 'imgs/rv.webp'}
            }} 
          />
          <div class="squirrel animate-squirrel"></div>
        </div>
      </div>
    </div>
  </div>

</div>

<style lang="scss">

/* ********************************************************** */
/* ********************************************************** */
/* ************************** art *************************** */

#art-container {
  position: absolute;
  right: 0;
  z-index: -2;
  height: calc( 100% - var(--top-offset, 0px) );

  opacity: .8;
}



#art {
  --content-width: 100%; /* must be in pixels, will be updated with JS */
  --content-to-art-width-ratio: 0.95;
  --art-width: calc( var(--content-width) * var(--content-to-art-width-ratio));

  --mountain-width-to-height-ratio: calc(1058 / 433);
  --rv-width-to-height-ratio: calc(500 / 309);
  --mountain-height: calc(var(--art-width) / var(--mountain-width-to-height-ratio));
  
  --rv-width: calc( var(--art-width) * 0.7);
  --rv-height: calc( var(--rv-width) / var(--rv-width-to-height-ratio));
  --rv-top: 28%;
  --rv-right: 9%;
  --rv-width-to-squirrel-height-ratio: 7;
  --squirrel-width: calc( var(--rv-width) / 5.25);
  --squirrel-height: calc( var(--rv-width) / var(--rv-width-to-squirrel-height-ratio));

  /* --actual-art-height: calc( var(--mountain-height) * var(--rv-top) + var(--rv-height) ); */

  /* z-index: -1; */
  position: absolute;
  top: 60px;
  right: 0px;
  width: var(--art-width);
  height: var(--mountain-height); /* mountain height */
}


// :global() #mountain {
//   position: absolute;
// }

:global(#rv)  {
  position: absolute;

  width: var(--rv-width);
  top: var(--rv-top);
  right: var(--rv-right); /* 44% */
}

:global(#mountain ) {
  position: absolute;

  width: 100%;
  right: 0px;
  opacity: 0.8;
}


.squirrel {
  position: absolute;
  top: 28%;
  right: 48%;

  /* determines how long is squirrel's jump */
  width: var(--squirrel-width);
  height: var(--squirrel-height);
  /* bug occurs here if --squirrel-height is in percentage */
  background-size: calc( var(--squirrel-height) * 1.2 );
  background-repeat: no-repeat;
  background-image: url('../imgs/squirrel.svg');
  /* border: 1px solid black; */
  transform: scaleX(-1); /* "mirror" effect on squirrel */
}


@-webkit-keyframes animatedSquirrel {
  0% {
    background-position: left top;
  }

  15% {
    top: 29%;
  }

  30% {
    top: 32%;
  }

  75% {
    top: 46%;
    right: 55%;
    background-position-x: 100%;
  }

  100% {
    background-position: 100% bottom;
    top: 46%;
    right: 55%;
  }
}

@keyframes animatedSquirrel {
  0% {
    background-position: left top;
  }

  15% {
    top: 29%;
  }

  30% {
    top: 32%;
  }

  75% {
    top: 46%;
    right: 55%;
    background-position-x: 100%;
  }

  100% {
    background-position: 100% bottom;
    top: 46%;
    right: 55%;
  }
}

.animate-squirrel {
  /* animation-name: animatedSquirrel;
  animation-duration: 1s;
  animation-delay: 2s;
  animation-timing-function: steps(9);
  animation-fill-mode: forwards; */

  -webkit-animation: animatedSquirrel 1s steps(9) 2s forwards;
          animation: animatedSquirrel 1s steps(9) 2s forwards;

}

@media (min-width: 850px) {
  #art {
    --content-to-art-width-ratio: 0.9;
    top: 80px;
  }
}


@media (min-width: 961px) {
  #art {

    --starting-top: 160px;
    --content-diff: calc( var(--content-width) - 960px);
    --ratio: calc( (1320 - 960) / 120 );
    top: calc( var(--starting-top)  - var(--content-diff) / var(--ratio) );

    /* cut off right side */
    right: calc( var(--art-width) * -0.1);
    --content-to-art-width-ratio: 0.80;
  }
}

@media (min-width: 1320px) {
  #art {
    top: 0px;
  }
}

@media (max-width: 660px) {
  #art {
    top: 0px;
  }
}
</style>

