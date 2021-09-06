import type { BlobUrl } from "../types/generic";
import { abortableFetch } from "./abortableFetch";

export const loadImg = (src: string): Promise<HTMLImageElement> => {
  let img = new Image();
  let promise = new Promise<HTMLImageElement>( (resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  })
  img.src = src;
  return promise;
};

export const loadImgWithTimeout = (url: string, timeout: number): Promise<HTMLImageElement> => {
  let img: Promise<HTMLImageElement>;
  try { // making sure fetch abort is supported
    let fetched = abortableFetch(url);
    setTimeout( fetched.abort, timeout );
    img = fetched.ready
      .then( res => res.blob() )
      .then( blob => URL.createObjectURL(blob) )
      .then( url => loadImg(url) )
  } catch(e) {
    console.log('Abortable fetch is not supported.');
    img = loadImg(url)
  }
  return img;
};

export type ImageProps = Pick<HTMLImageElement, 'alt' | 'id'>
export const assignProps = (img: HTMLImageElement, props: Record<keyof ImageProps, string>) => {
  Object.entries(props).forEach(([key, value]) => img[key as keyof ImageProps] = value)
}