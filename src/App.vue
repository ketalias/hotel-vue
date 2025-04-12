<template>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
    rel="stylesheet"
  />
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
.leaflet-marker-icon {
  background-image: url('https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png');
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #222222;
  overflow-x: hidden;
}

h1 {
  font-family: 'Ubuntu', sans-serif;
  font-size: 4rem;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
}

p {
  font-size: 1.4rem;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  line-height: 1.6;
  max-width: 500px;
  @media (max-width: 1000px) {
    max-width: 90vw;
  }
}

a {
  color: #a9a9a9;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
