<template>
  <div class="bucket-container">
    <h1>Ваш Список Бронювань</h1>
    <div v-if="bucket.length > 0" class="bucket-items">
      <div v-for="(room, index) in bucket" :key="index" class="bucket-item">
        <img :src="room.imgUrl" alt="Room Image" class="room-image" />
        <div class="room-details">
          <h2>{{ room.title }}</h2>
          <p>Ціна: {{ room.price }}$ за ніч</p>
          <p>Максимальна кількість осіб: {{ room.maxOccupancy }}</p>
          <p>Ім'я: {{ room.userName }}</p>
          <p>Прізвище: {{ room.userSurname }}</p>
          <button @click="removeRoom(index)" class="remove-button">
            Скасувати
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Список бронювань порожній.</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'BucketPage',
  computed: {
    ...mapGetters(['getBucket']),
    bucket() {
      return this.getBucket;
    },
  },
  methods: {
    ...mapActions(['removeRoomFromBucket']),
    removeRoom(index) {
      this.removeRoomFromBucket(index);
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #ffffff;
$secondary-color: #d40e00;
$text-color: #ffffff;
$background-color: #f9f9f9;
$font-stack: 'Helvetica Neue', Arial, sans-serif;

body {
  font-family: $font-stack;
  background-color: $background-color;
  margin: 0;
  padding: 20px;
}

.bucket-container {
  width: 80%;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 70px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: $primary-color;
  margin-bottom: 20px;
}

.bucket-items {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 15px;
}

.bucket-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 15px;
  transition: background-color 0.3s ease;

  .room-image {
    width: 40%;
    height: auto;
    border-radius: 5px;
    margin-right: 15px;
  }

  .room-details {
    flex-grow: 1;

    h2 {
      font-size: 1.2em;
      color: $text-color;
      margin: 0 0 5px;
    }

    p {
      margin: 5px 0;
      color: $text-color;
    }
  }

  .remove-button {
    background-color: $secondary-color;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: darken($secondary-color, 10%);
    }
  }
}

.bucket-container v-else {
  text-align: center;
  color: $text-color;
  font-size: 1.1em;
}
</style>
