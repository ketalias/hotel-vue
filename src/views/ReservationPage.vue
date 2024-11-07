<template>
  <div class="reservation-container">
    <div class="room-details">
      <h1 class="room-title">{{ room.title }}</h1>
      <div class="row">
        <img :src="room.imgUrl" alt="Room Image" class="room-image" />
        <div class="info">
          <p class="room-price">Ціна: {{ room.price }}$ за ніч</p>
          <p class="room-availability">{{ room.availability }}</p>
          <p class="room-occupancy">
            Максимальна кількість осіб: {{ room.maxOccupancy }}
          </p>
          <p class="room-description">{{ room.description }}</p>
        </div>
      </div>
      <div class="date-picker">
        <label for="checkin-date">Дата заїзду:</label>
        <input
          type="date"
          id="checkin-date"
          :value="checkinDate"
          @input="updateCheckinDate($event.target.value)"
        />
        <label for="checkout-date">Дата виїзду:</label>
        <input
          type="date"
          id="checkout-date"
          :value="checkoutDate"
          @input="updateCheckoutDate($event.target.value)"
        />
        <label for="name">Ім'я:</label>
        <input
          type="text"
          id="name"
          v-model="userName"
          placeholder="Введіть ваше ім'я"
        />
        <label for="surname">Прізвище:</label>
        <input
          type="text"
          id="surname"
          v-model="userSurname"
          placeholder="Введіть ваше прізвище"
        />
      </div>
      <button @click="reserveRoom" class="reserve-button">Бронювати</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2';

export default {
  name: 'ReservationPage',
  data() {
    return {
      userName: '',
      userSurname: '',
    };
  },
  computed: {
    ...mapGetters(['getRoomById']),
    room() {
      const roomId = this.$route.params.id;
      const room = this.getRoomById(roomId);
      console.log('Room:', room);
      return room;
    },
  },

  methods: {
    ...mapActions(['addRoomToBucket', 'setCheckinDate', 'setCheckoutDate']),
    updateCheckinDate(date) {
      this.setCheckinDate(date);
    },
    updateCheckoutDate(date) {
      this.setCheckoutDate(date);
    },
    reserveRoom() {
      if (this.room && this.userName && this.userSurname) {
        this.addRoomToBucket({
          ...this.room,
          checkinDate: this.checkinDate,
          checkoutDate: this.checkoutDate,
          userName: this.userName,
          userSurname: this.userSurname,
        });

        Swal.fire({
          title: 'Бронювання успішне!',
          text: `Номер "${this.room.title}" було заброньовано на дати ${this.checkinDate} - ${this.checkoutDate} для ${this.userName} ${this.userSurname}.`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#2ecc71',
        });

        this.updateCheckinDate('');
        this.updateCheckoutDate('');
        this.userName = '';
        this.userSurname = '';
      } else {
        Swal.fire({
          title: 'Помилка!',
          text: "Будь ласка, введіть своє ім'я та прізвище перед бронюванням.",
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    },
  },

  mounted() {
    this.$store.dispatch('fetchRooms');
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #f9f9f9;
$secondary-color: #2ecc71;
$error-color: #e74c3c;
$text-color: #ffffff;
$background-color: #2f2f2f;

body {
  background-color: $background-color;
}

.info {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
}

.row {
  display: flex;
  width: 100vw;
  justify-content: space-evenly;
  align-items: center;
}

.reservation-container {
  margin-top: 70px;
  justify-content: center;
  align-content: center;

  h1 {
    text-align: center;
    color: $primary-color;
  }

  .room-details {
    .room-title {
      font-size: 3.5em;
      color: $text-color;
      margin-bottom: 10px;
    }

    .room-price,
    .room-availability,
    .room-occupancy,
    .room-description {
      margin: 10px 0;
      color: $text-color;

      &.room-price {
        font-weight: bold;
        font-size: 1.2em;
      }
    }

    .room-image {
      width: 50%;
      height: auto;
      border-radius: 5px;
      margin: 15px 0;
    }

    .date-picker {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 20px 0;

      label {
        font-weight: bold;
        margin: 0 10px;
        color: white;
      }

      input[type='date'] {
        padding: 10px;
        color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        transition: border-color 0.3s ease;

        &:focus {
          border-color: #a39b40;
          outline: none;
        }
      }
    }

    .reserve-button {
      display: block;
      justify-self: center;
      padding: 10px 40px;
      background-color: #928c4c;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.1em;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #d1c64c;
      }

      &:disabled {
        background-color: $error-color;
        cursor: not-allowed;
      }
    }
  }

  v-else {
    text-align: center;
    color: $text-color;
    font-size: 1.2em;
  }
}
</style>
