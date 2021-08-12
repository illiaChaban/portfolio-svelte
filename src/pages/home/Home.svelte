<script lang="ts">
  import { navigate } from "svelte-navigator";
  import Button from "../../components/Button.svelte";
  import Greeting from "./components/Greeting.svelte";
  import Art from "./components/Art.svelte"

</script>

<!-- <div> -->
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
  
  <Art />
  <!-- <div id='art-container' class='container'>
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
  </div> -->
<!-- </div> -->

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

@media (max-width: 660px) {
  .home-text .text-container {
    margin-top: 70px;
  }
}




#btn-container {
  margin-top: 20px;
  margin-bottom: 45px;
}

</style>