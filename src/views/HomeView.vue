<template>
  <div class="home-page">
    <header>
      <h1 class="title">{{ $t('hotel_title') }}</h1>
      <router-link to="/catalog">
        <button>{{ $t('book_now') }}</button>
      </router-link>
    </header>
  </div>
  <div class="section" id="appartaments">
    <div class="description">
      <h1>{{ $t('apartments_title') }}</h1>
      <p>{{ $t('apartments_description') }}</p>
    </div>
    <courusel-comp></courusel-comp>
  </div>
  <div class="section" id="location">
    <div class="description">
      <h1>{{ $t('location_title') }}</h1>
      <p>{{ $t('location_description') }}</p>
    </div>
    <div class="map">
      <ul>
        <li>{{ $t('features.excellent_location') }}</li>
        <li>{{ $t('features.free_parking') }}</li>
        <li>{{ $t('features.support_24_7') }}</li>
        <li>{{ $t('features.high_speed_wifi') }}</li>
      </ul>
      <img
        src="https://todocodigo.net/img/626.jpg"
        alt="no-img"
        class="locationImg"
      />
    </div>
  </div>
  <div class="section" id="welcome">
    <h1>{{ $t('reception_message') }}</h1>
    <router-link to="/catalog">
      <button>{{ $t('reserve') }}</button>
    </router-link>
  </div>
  <footer-bottom></footer-bottom>
</template>

<script>
import FooterBottom from '@/components/FooterBottom.vue';
import CouruselComp from '@/components/CouruselComp.vue';
export default {
  components: { FooterBottom, CouruselComp },
  name: 'HomePage',
  methods: {
    exploreMore() {
      alert("Let's explore!");
    },
  },
};
</script>

<style lang="scss" scoped>
.home-page {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 60px;
  height: 80vh;
  background-image: url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?cs=srgb&dl=pexels-pixabay-258154.jpg&fm=jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 0 20px;

  button {
    padding: 1rem 1.5rem;
    border-radius: 5px;
    color: #ffffff;
    background-color: #222222;
    font-size: 1.3rem;
    font-weight: 800;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      background-color: #866119;
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(0.98);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(134, 97, 25, 0.5);
    }
  }
}

.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #222222;
}

#welcome {
  display: flex;
  position: relative;
  background-image: url('https://scdn.aro.ie/Sites/50/imperialhotels2022/uploads/images/FullLengthImages/Large/SB12129735_Bedford_Hotel_Interior__Reception._4500x3000.jpg');
  background-size: cover;
  background-position: center;
  z-index: 1;
  padding: 20px;
  text-align: center;
  h1 {
    display: flex;
    align-items: center;
    text-align: center;
  }
  button {
    padding: 0.8rem 1.2rem;
    border-radius: 5px;
    color: #ffffff;
    background-color: #222222;
    font-size: 1rem;
    font-weight: 800;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease,
      box-shadow 0.2s ease;

    &:hover {
      background-color: #866119;
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: scale(0.98);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(134, 97, 25, 0.5);
    }
  }
}

#welcome::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.lookAll {
  display: flex;
  width: 100%;
  background-color: #353535;
  justify-content: flex-end;
  padding: 10px 20px;

  a {
    color: #ffffff;
    font-size: 1.2rem;
    margin: 10px;
  }
}

.room-list {
  width: 100%;
}

#location {
  ul {
    @media (max-width: 900px) {
      display: none;
    }
  }
}

.map {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
  background-color: #353535;
  img {
    width: 100%;
    max-width: 40vw;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    @media (max-width: 900px) {
      max-width: 70vw;
    }
  }
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 1.7rem;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    &::before {
      content: '✓';
      color: #e3b51f;
      font-weight: bold;
      margin-right: 10px;
    }
  }
}

.description {
  background-color: #272727;
  display: flex;
  width: 100%;
  height: auto;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px;

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 20px;
  }
}

header {
  text-align: center;
  color: #ffffff;
  z-index: 2;
  width: 100%;
  margin-bottom: 30px;
}

.title {
  font-size: 7rem;
  color: #ffffff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;

  @media (min-width: 768px) {
    font-size: 10rem;
  }

  @media (min-width: 1200px) {
    font-size: 15rem;
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
