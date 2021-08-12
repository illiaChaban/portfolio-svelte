<script lang="ts">
  import { navigate } from "svelte-navigator";
  import Button from "../../components/Button.svelte";
  import Greeting from "./components/Greeting.svelte";

  // const c = cButton
</script>

<div>
  <div class='home-text padding-15 body-tags'>
    <div class="div-tags text-container">
      <Greeting />
      <h2 class='subtle'>Full Stack | TS | Angular | React Native | C# | .Net</h2>
      
      <div id="btn-container">
        <Button 
          onClick={() => navigate("about")}
        >More About Me</Button>
      </div>
 
    </div>
  </div>
  
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
</div>

<style lang="scss">

.home-text {
  color: var(--color-main);
  font-size: 2rem;
  font-family: 'Special Elite', cursive;
  font-weight:900;

  min-height: 400px;
  position: relative;

  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  overflow: hidden;
}

.home-text .text-container {
  margin-left: 5%;
}

@media (max-width: 960px) {
  .home-text {
    margin-left: 0;
  }
}

@media (max-width: 480px) {
  .home-text {
    font-size: 1.8rem;
    /* margin-top: 100px; */
  }
}

h1.header {
  text-align: left;
  letter-spacing: 2px;
  line-height: 1.2em;
  margin: 0;
}

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

  .home-text .text-container {
    margin-top: 70px;
  }
}


#btn-container {
  margin-top: 20px;
  margin-bottom: 45px;
}

</style>