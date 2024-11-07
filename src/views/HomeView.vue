<template>
  <div class="home-page">
    <header>
      <h1>Kilikia Hotel</h1>
      <button @click="exploreMore">Бронюйте Одразу!</button>
    </header>
  </div>
  <div class="section" id="appartaments">
    <h2>Апартаменти</h2>
    <p>
      Наш готель пропонує широкий вибір апартаментів, від стандартних номерів до
      люксів, щоб забезпечити комфорт кожного гостя.
    </p>
    <room-item v-for="room in rooms" :key="room.id" :room="room"></room-item>
  </div>

  <div class="section" id="location">
    <h2>Локація</h2>
    <img src="" alt="" class="locationImg" />
  </div>

  <div class="section" id="welcome">
    <h2>Наша рецепція завжди рада допомогти</h2>
  </div>

  <footer-comp />
</template>

<script>
import FooterComp from '@/components/FooterComp.vue';
import RoomItem from '@/components/RoomItem.vue';

export default {
  components: { FooterComp, RoomItem },
  name: 'HomePage',
  data() {
    return {
      rooms: [
        { id: 1, name: 'Standard Room' },
        { id: 2, name: 'Suite' },
      ],
    };
  },

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
</style>
