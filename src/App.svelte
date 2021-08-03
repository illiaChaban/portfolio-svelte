<script>
	import { Router, Route } from "svelte-navigator";

	import Home from "./pages/home/Home.svelte";
	import About from "./pages/About.svelte";
	import Skills from "./pages/Skills.svelte";
	import Projects from "./pages/Projects.svelte";
	import Contact from "./pages/Contact.svelte";
  import NotFound from "./pages/NotFound.svelte";

  import CNavIcon from "./components/NavIcon.svelte";
  import Particles from "./components/particles/Particles.svelte";
</script>

<Particles />
<main>
	<Router>

			<div id='menu'>
				<nav id='nav'>
          <CNavIcon
            to="/"
            name="home"
            iconName="fas fa-home"
          />
          <CNavIcon 
            to="about"
            iconName="fas fa-user-circle"
          />
          <CNavIcon
            to="skills"
            iconName="fas fa-cog"
          />
          <CNavIcon
            to="projects"
            iconName="fas fa-laptop-code"
            iconStyle="font-size: 20px;"
          />
          <CNavIcon
            to="contact"
            iconName="fas fa-envelope"
          />
				</nav>
			</div>

		<div id="content">
			<Route path="/"><Home/></Route>
			<Route path="/about"><About/></Route>
			<Route path="/skills"><Skills/></Route>
			<Route path="/projects"><Projects/></Route>
			<Route path="/contact"><Contact/></Route>
      <Route><NotFound/></Route>
		</div>

	</Router>
</main>

<style lang='scss'>

  #menu {
    background: #181818; /* #2f2f2f */
    color: var(--color-subtle);
    width: var(--menu-offset);
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 3;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  #nav {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    text-align: center;
    height: 210px;
    width: 100%;
  }

  #content {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    position: relative;
    padding-left: var(--menu-offset);

    min-height: 100vh;

    display: flex;
    flex-direction: column;
  }

  @media (max-width: 960px) {
    #menu {
        width: 100%;
        height: var(--menu-offset);
        min-height: 0;
        bottom: 0;
        top: auto;
    }
    #nav {
      flex-direction: row;
      min-width: 250px;
      width: 42%;
      overflow: hidden;
      text-align: center;
      height: 60px;
    }

    #content
    {
      padding-left: 0;
      padding-bottom: var(--menu-offset);
    }

  }

  :global(.modern-theme) {

    #menu {
      background: #050215; 
      background: rgba(0,0,0,.4);
      border-right: 1px solid var(--color-subtle);
    }

    @media (max-width: 960px) {
      #menu {
        background: rgba(0,0,0,.8);
        border-right: none;
        border-top: 1px solid var(--color-subtle);
      }
    }
  } 
</style>