<script lang="ts">
  import { navigate } from "svelte-navigator";
  import Button from "../../components/Button.svelte";
  import Greeting from "./components/Greeting.svelte";
  import Art from "./components/Art.svelte"
</script>

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
    font-size: 1.6rem;
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