<script lang="ts" context="module">
  import { assignProps, loadImgWithTimeout } from '../../utils/image';

  type Urls = {png: string, webp: string}
  type AllUrls = {initial: Urls, mobile?: Urls, main: Urls}

  const getImgCurrSrc = async (img: HTMLImageElement): Promise<string> => {
    return img.complete ? 
      img.currentSrc : 
      new Promise(resolve => {
        img.addEventListener('load', () => resolve(img.currentSrc))
      });
  };
  const webpIsSupported = (currentImageSrc: string): boolean => {
    const l = currentImageSrc.length;
    const last4extension = currentImageSrc.slice(l-4, l);
    return last4extension === 'webp';
  };
  const loadBetterImg = async (imgRef: HTMLImageElement, urls: AllUrls, props: ImageProps): Promise<HTMLImageElement> => {
    const src = await getImgCurrSrc(imgRef)
    const format = webpIsSupported(src) ? 'webp' : 'png'
    const isMobile = window.innerWidth < 650
    const betterQualitySrc = isMobile 
      ? (urls.mobile?.[format] ?? urls.main[format])
      : urls.main[format];

    const isSameUrl = src.slice(-betterQualitySrc.length) === betterQualitySrc
    if (isSameUrl) {
      return imgRef
    }

    const img = await loadImgWithTimeout(betterQualitySrc, 5000)
    assignProps(img, props)

    return img
  }
</script>

<script lang="ts">
  import { images$ } from './cached-imgs.store'
  import type { ImageStoreKeys } from './cached-imgs.store'
  import { onMount } from 'svelte';

  import type { ImageProps } from '../../utils/image';
  import { replace } from '../../actions/replace';

  export let urls: {initial: Urls, mobile?: Urls, main: Urls}
  export let key: ImageStoreKeys
  export let props: ImageProps

  let imgRef: HTMLImageElement

  const cachedImage$ = images$.get(key)
  $: cachedImg = $cachedImage$

  onMount(async () => {
    if (cachedImg) return;
    const img = await loadBetterImg(imgRef, urls, props)
    images$.set(key, img)
  })

</script>

{#if cachedImg}
  <div use:replace={cachedImg} />
{:else}
  <picture> 
    <source srcset={urls.initial.webp} type="image/webp">
    <img 
      bind:this={imgRef} 
      src={urls.initial.png} 
      {...props} 
      alt={props.alt} 
    />
  </picture>
{/if}
