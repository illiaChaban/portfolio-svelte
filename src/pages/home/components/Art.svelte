<script lang="ts">
import { onMount } from "svelte";
import { abortableFetch } from "../../../utils/abortableFetch";
import { loadImg, loadImgWithTimeout } from "../../../utils/loadImg";





const prepareArt = () => {
    // rendering rv and squirrel
    const $art = document.getElementById('art') as HTMLElement;
    const $rvContainer = document.getElementById('rv-squirrel-container') as HTMLElement;
    const $content = document.getElementById('content') as HTMLElement;
  
  
    const updateArtWidth = () => {
      // in case content was hidden to rerender css animations etc. use body as a fallback
      let contentWidth = $content.offsetWidth || document.body.offsetWidth;
      // set content width in pixels instead of percentage
      $art.style.setProperty( '--content-width', `${contentWidth}px`);
    };
    updateArtWidth();
    window.addEventListener('resize', updateArtWidth);
    // show squirrel and rv after css variable was updated to indicate
    // content width in pixels
    $rvContainer.classList.remove('hide'); 
  }

  const webpIsSupported = (currentImageSrc: string): boolean => {
    const l = currentImageSrc.length;
    const last4extension = currentImageSrc.slice(l-4, l);
    return last4extension === 'webp';
  };
  const getImgCurrSrc = (img: HTMLImageElement): Promise<string> | string => {
    return img.complete ? 
      img.currentSrc : 
      new Promise( resolve => {
        img.onload = () => resolve(img.currentSrc);
      });
  };
  const getBetterQualityImgSrc = async (img: HTMLImageElement) => {
    const loadedSrc = await getImgCurrSrc(img);
    const src1part = img.getAttribute('data-src');
    let src;
    // checking if .webp next gen image format is supported
    if (webpIsSupported(loadedSrc)) {
      src = src1part + '.webp';
    } else {
      const size = window.innerWidth > 650 ? '' : '-small';
      src = src1part + size + '.png';
    }
    return src;
  };
  const takeImgOutsideOfPicture = (img: HTMLImageElement, picture: Element) => {
    // remove picture element, update img src
    let container = picture.parentElement as HTMLElement;
    // rv should be removed from picture first to 
    // prevent extra img request on picture.remove()
    container.insertBefore(img, picture);
    container.removeChild(picture);
  }

  const loadBetterQualityImg = async (picture: Element, timeout: number) => {
    const img = picture.querySelector('img') as HTMLImageElement;
    const src = await getBetterQualityImgSrc(img);
    const blobUrl = await loadImgWithTimeout(src, timeout).catch((e: any) => {
      if (e.name === 'AbortError') {
        // console.log('Fetch aborted');
      } else {
        console.error(e);
      }
    });
    // prevent future img load requests on #content update
    takeImgOutsideOfPicture(img, picture); 
    if (blobUrl) {
      // trying to prevent flickering since the first blob url load might take up to 50ms
      await loadImg(blobUrl);
      img.src = blobUrl;
    }
  };
  const loadBetterQualityArt = async () => {
    const pictures = document.querySelectorAll("#art picture");
    const timeout = 5000;
    pictures.forEach( picture => loadBetterQualityImg(picture, timeout));
  };

  onMount(() => {
    prepareArt();
    loadBetterQualityArt();
  })
</script>


<div id='art-container' class='container'>
  <div class='container overflow-hidden'>
    <div id='art'>
      <div class='container'>
        <picture>
          <source srcset="imgs/mountain-small.webp" type="image/webp">
          <img id='mountain' src='imgs/mountain-smallest.png' data-src='imgs/mountain' alt='mountain'>
        </picture>
        <div id='rv-squirrel-container' class='container hide'>
          <picture>
            <source srcset="imgs/rv-small.webp" type="image/webp">
            <img id='rv' src='imgs/rv-smallest.png' alt='hippie van' data-src='imgs/rv'>
          </picture>

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


#rv, #mountain {
  position: absolute;
}

#rv {
  width: var(--rv-width);
  top: var(--rv-top);
  right: var(--rv-right); /* 44% */
}

#mountain {
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

