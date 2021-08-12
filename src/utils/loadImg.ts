import { abortableFetch } from "./abortableFetch";

export const loadImg = (src: string) => {
  let img = new Image();
  let promise = new Promise( (resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  })
  img.src = src;
  return promise;
};

export const loadImgWithTimeout = (url: any, timeout: number | undefined) => {
  let promiseUrl;
  try { // making sure fetch abort is supported
    let fetched = abortableFetch(url);
    setTimeout( fetched.abort, timeout );
    promiseUrl = fetched.ready
      .then( res => res.blob() )
      .then( blob => URL.createObjectURL(blob))
  } catch(e) {
    console.log('Abortable fetch is not supported');
    promiseUrl = loadImg(url).then( () => url );
  }
  return promiseUrl;
};