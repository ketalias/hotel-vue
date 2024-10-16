<template>
  <div class="home-page">
    <header>
      <h1>Kilikia Hotel</h1>
      <button @click="exploreMore">Бронюйте Одразу!</button>
    </header>
  </div>
  <div class="section" id="section2">
    <h1>Explore Our Dining</h1>
    <p>
      some adittional text some adittional text some adittional text some
      adittional text some adittional text some adittional text
    </p>
  </div>
  <div class="section" id="section3">
    <h1>Explore Our Dining</h1>
    <img
      src="https://image-tc.galaxy.tf/wijpeg-ay9bwdfei91yjxj1hhwg7e09e/promo1.jpg?width=1920"
      alt="no img"
    />
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    exploreMore() {
      alert("Let's explore!");
    },
  },
};
</script>

<style scoped>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg'); /* Replace with your image URL */
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.home-page h1 {
  font-size: 12rem;
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100svh;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

#section2 {
  flex-direction: row;
  justify-content: space-around;
  background-image: url('https://images.unsplash.com/photo-1473958828028-53df95f0b5ed?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
}

#section2 h1 {
  width: 40vw;
  background-color: rgb(0 0 0/0.5);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

#section2 p {
  background-color: rgb(0 0 0/0.5);
  padding: 20px;
  border-radius: 10px;
  width: 40vw;
}

#section3 {
  background-color: #262626;
  text-align: center;
  padding: 50px 0;
  justify-content: space-evenly;
}

#section3 h1 {
  color: #ffffff;
  margin-bottom: 20px;
}

#section3 img {
  width: 55vw;
  border: 5px solid #ffffff;
  border-radius: 10px;
  transition: transform 1.5s ease, box-shadow 0.5s ease;
}

#section3 img:hover {
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
  transform: scale(1.3);
}

header {
  text-align: center;
  color: white;
  z-index: 2;
}

h1 {
  font-size: 7rem;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

p {
  font-size: 3rem;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
}

button {
  width: 300px;
  height: 60px;
  border-radius: 30px;
  font-size: 1.5rem;
  background-color: #353535;
  opacity: 90%;
  border: none;
  color: white;
  cursor: pointer;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  font-weight: bolder;
}

button:hover {
  background-color: #2f3cc3;
  opacity: 100%;
  transform: translateY(-5px);
  box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
