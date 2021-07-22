const pageMatcher = /([a-z]+)(?:\.html)?$/;;
const parser = new DOMParser();

const dependancies = {
  skills: [
    ["js/other/tagcanvas.min.js", 'script'],
    ["js/skills.js", 'script'],
    ['css/about.css', 'css'],
  ],
  projects: [
    ['https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js', 'script'],
    ['js/projects.js', 'script'],
    ['css/projects.css', 'css'],
  ],
  home: [
    ['https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js', 'script'],
    ['js/home.js', 'script'],
    ['css/home.css', 'css'],
  ],
  contact: [
    ['js/contact.js', 'script'],
    ['css/contact.css', 'css'],
  ],
  about: [
    ['js/about.js', 'script'],
    ['css/about.css', 'css']
  ]
};
let loadedFonts = {};
let loadedScripts = {};
let loadedCss = {};
let cachedContent = {};


const loadResource = (hrefOrName, type) => {
  const switcher = {
    'font' : loadFont,
    'script': loadScript,
    'css': loadCss
  };
  let loader = switcher[type];
  return loader(hrefOrName); 
};
const loadDependacies = (pageName) => {
  if ( !(pageName in dependancies)) return Promise.resolve();
  let deps = dependancies[pageName].map(([link, type]) => loadResource(link, type) );
  return Promise.all( deps );
}
// const initPage = (pageName) => {
//   return loadDependacies(pageName)
//           .then( () => {
//             let initialize = window.init[pageName];
//             initialize && initialize();
//             // console.log("Lazy loading, initialized " + pageName);
//           }).catch( console.error );
// };

// has a bug. If loading 2 fonts asynchronously in a row the second promise isn't being resolved
const loadFont = (familyName) => {
  // starting to load the font and returning a promise
  if ( !(familyName in loadedFonts) ) {
    let escapedSpaceFont = familyName.replace(/\s/g, "+");
    let fontSyncLoaded = document.querySelector(`link[href*="fonts.googleapis.com"][href*="${escapedSpaceFont}"]`);
    if (fontSyncLoaded) {
      loadedFonts[familyName] = Promise.resolve();
      // console.log("Font was sync loaded -- " + familyName);
    } else {
      loadedFonts[familyName] = new Promise( async (resolve,reject) => {
        // adjustment for slow network or not existing font family
        setTimeout( () => reject("loading cancelled - slow network or bad request"), 3000 );
        await loadScript("https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js");

        WebFont.load({
          google: {
            families: [ familyName ]
          },
          active() {
            resolve(true);
            // clearTimeout(timeout);
            // console.log("Font was async loaded -- " + familyName);
          },
          inactive: () => reject("inactive")
        });
      }).catch( (e) => (console.warn(`Failed to load font ${familyName} --`, e), e) );
    }
  }
  return loadedFonts[familyName];
};
const loadScript = ( src ) => {
  if ( !(src in loadedScripts) ) {
    loadedScripts[src] = new Promise( (resolve,reject) => {
      let s = document.createElement('script');
      s.setAttribute('src', src);
      s.setAttribute('type', 'text/javascript');
      s.onload = () => {
        // console.log("LOADED SCRIPT src = " + src)
        resolve(true)
      };
      s.onerror = reject;
      document.querySelector('body').appendChild(s);
    })
  }
  return loadedScripts[src];
};
const loadCss = (src) => {
  if ( !(src in loadedCss) ) {
    if (document.querySelector(`link[href='${src}']:not([rel="preload"])`)) {
      loadedCss[src] = Promise.resolve();
      // console.log("CSS src = " + src + " was sync loaded");
    } else {
      loadedCss[src] = new Promise( (resolve,reject) => {
        let s = document.createElement('link');
        s.setAttribute('href', src);
        s.setAttribute('rel', 'stylesheet');
        s.setAttribute('type', 'text/css')
        s.onload = () => {
          // console.log("LOADED CSS src = " + src);
          // console.log(s.sheet.cssRules[0].cssText)
          resolve(true);
        };
        s.onerror = reject;
        document.querySelector('head').appendChild(s);
      });
    }
  }
  return loadedCss[src];
};

const found = {};
const find = (selector) => {
  if ( !(selector in found) ) {
    found[selector] = document.querySelector(selector);
  }
  return found[selector];
}

// const updateContent = async (href) => {
//   showLoadingWindow();

//   let $content = find('#content');

//   let requestedPage = getPageName(href);

//   loadDependacies(requestedPage);

//   let content = await getContent(requestedPage);
//   $content.innerHTML = ''; //remove current content
//   $content.append( ...content);

//   initPage(requestedPage).then( hideLoadingWindow );
// };

// caching values to avoid executing the function with the same
// arguments multiple times
let cachedPageNames = {}; 
const getPageName = (href) => {
  if ( !(href in cachedPageNames)) {
    let path = href.split("/");
    let lastPath = path[path.length-1];
    cachedPageNames[href] = lastPath === '' ? 
      'index':
      href.match( pageMatcher )[1];
  }
  return cachedPageNames[href];
};
const getCurrPageName = () => getPageName(document.location.pathname);
const cacheCurrContent = () => {
  let page = getCurrPageName();
  let contents = [...find('#content').childNodes];
  cachedContent[page] = Promise.resolve(contents);
};

// const getContent = (pageName) => {
//   if ( !(pageName in cachedContent)) {
//     cachedContent[pageName] = new Promise( async (resolve, reject) => {
//       try {
//         let doc = await loadParsedHtml(pageName);
//         // transforming from HTMLCollection to array to be able to cache elements
//         // HTMLCollection/NodeList gets updated on .innerHTML = '' and elements get removed
//         let content = [...doc.getElementById('content').childNodes];
//         resolve(content);
//       } catch(e) {
//         // resolve(['network error']);
//         console.error(e);
//       }
//     })
//   }
//   return cachedContent[pageName];
// };
const loadParsedHtml = async (href) => {
  let html = await fetch(href).then( res => res.text() );    
  let doc = parser.parseFromString(html, "text/html");
  return doc;
};

const showLoadingWindow = () => {
  find('#loading').classList.remove('hide');
  find('#content').classList.add('hide');
};
const hideLoadingWindow = () => {
  find('#loading').classList.add('hide');
  find('#content').classList.remove('hide');
  fadeInContent();
};
const fadeInContent = () => {
  let c = find('#content').classList;
  let f1 = 'fadeIn';
  let f2 = 'fadeIn2';
  // toggle between fadeIn & fadeIn2 classes (identical)
  // to force animation to execute
  c.replace(f1, f2) || c.replace(f2, f1) || c.add(f1);
}

let activeLink = null;
const highlightActiveMenu = (href=document.location.pathname) => {
  const $nav = document.getElementById('nav');
  let pageName = getPageName(href);
  let currLink = $nav.querySelector(`a[href^=${pageName}]`);
  if (activeLink) activeLink.classList.remove('active');
  if (currLink) {
    currLink.classList.add('active');
    activeLink = currLink;
  }
};

// const navigateToPage = (href, updateUrl=true) => {
//   updateContent(href);
//   highlightActiveMenu(href);

//   // updating location.href without reloading
//   updateUrl && window.history.pushState(null, "", href);
//   gtagSetPath();
// };



const loadImg = (src) => {
  let img = new Image();
  let promise = new Promise( (resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  })
  img.src = src;
  return promise;
};

const loadedImgs = {};
const loadSvg = src => {
  if ( !(src in loadedImgs) ) {
    loadedImgs[src] = new Promise( async (resolve, reject) => {
      try {
        let svgText = await fetch(src).then( res => res.text() );
        const parsed = parser.parseFromString(svgText, 'image/svg+xml');
        const svgEl = parsed.querySelector('svg');
        resolve(svgEl);
      } catch(e) {
        console.warn(e);
        reject();
      }
    })
  }
  return loadedImgs[src];
};

const onDocumentReady = ( callback ) => {
  // console.log("ON DOCUMENT READY CALLED", document.readyState, {cb: callback.toString()})
  document.readyState === 'loading' ? 
    window.addEventListener('DOMContentLoaded', callback ) :
    callback();
};



// const bindLinkButton = (() => {
//   return (buttonId) => {
//     document
//       .getElementById(buttonId)
//       .addEventListener('click', navigateToPageFromLink ); 
//   };

//   function navigateToPageFromLink(e) {
//     e.preventDefault();
//     let href = e.target.getAttribute('href');
//     navigateToPage(href);
//   };
// })();

// vanilla JS window width and height
// getWindowWidthHeight = () => {
// 	var w=window,
// 	d=document,
// 	e=d.documentElement,
// 	g=d.getElementsByTagName('body')[0],
// 	x=w.innerWidth||e.clientWidth||g.clientWidth,
// 	y=w.innerHeight||e.clientHeight||g.clientHeight;
// 	return [x,y];
// };

const getCssVariable = (name) => {
  const bodyStyle = getComputedStyle(document.body);
  const value = bodyStyle.getPropertyValue(name).trim();
  return value;
};

const calledOnce = new Map();
const callOnce = (...functions) => {
  for( let func of functions) {
    if (calledOnce.has(func)) continue;
    try {
      func();
    } catch(e) {
      console.error(e);
    }
    calledOnce.set(func, true);
  }
};

const spinnerHTML = `
  <div class="spinner">
    <div class="blob top"></div>
    <div class="blob bottom"></div>
    <div class="blob left"></div>
    <div class="blob move-blob"></div>
  </div>  
`;
const showSpinner = (parentEl) => {
  removeSpinner(parentEl);
  parentEl.insertAdjacentHTML('afterbegin', spinnerHTML);
};
const removeSpinner = (parentEl) => {
  parentEl.querySelectorAll('.spinner').forEach( x => parentEl.removeChild(x));
}


const abortableFetch = function(url) {
  const controller = new AbortController();
  const signal = controller.signal;
  return {
    ready: fetch( url, {signal}),
    abort: () => controller.abort()
  };
};
const loadImgWithTimeout = (url, timeout) => {
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

export const lazy = {
  // loadScript,
  getCssVariable,
}


// TODO: add gtagSetPath on page navigation