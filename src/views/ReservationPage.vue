<template>
  <div class="reservation-container">
    <header class="header">
      <h1>{{ $t('reservation.title') }}</h1>
    </header>
    <section class="room-details" v-if="room">
      <h2 class="room-title">{{ room.title }}</h2>
      <div class="room-content">
        <img
          :src="room.imgUrl"
          :alt="$t('itemCard.roomImageAlt')"
          class="room-image"
        />
        <div class="info">
          <p class="room-price">
            {{ $t('reservation.price') }}: ${{ room.price }}
            {{ $t('itemCard.pricePerNight') }}
          </p>
          <p class="room-availability">
            {{ $t('reservation.availability') }}: {{ room.availability }}
          </p>
          <p class="room-occupancy">
            {{ $t('reservation.maxOccupancy') }}: {{ room.maxOccupancy }}
            {{ $t('itemCard.peopleOccupancy') }}
          </p>
          <p class="room-description">{{ room.description }}</p>
        </div>
      </div>
      <form class="reservation-form" @submit.prevent="reserveRoom">
        <div class="form-group">
          <label for="checkin-date">{{ $t('reservation.checkinDate') }}</label>
          <input
            type="date"
            id="checkin-date"
            :value="checkinDate"
            @input="updateCheckinDate($event.target.value)"
            :min="today"
            required
            :aria-label="$t('reservation.checkinDate')"
          />
        </div>
        <div class="form-group">
          <label for="checkout-date">{{
            $t('reservation.checkoutDate')
          }}</label>
          <input
            type="date"
            id="checkout-date"
            :value="checkoutDate"
            @input="updateCheckoutDate($event.target.value)"
            :min="minCheckoutDate"
            required
            :aria-label="$t('reservation.checkoutDate')"
          />
        </div>
        <div class="form-group">
          <label for="name">{{ $t('reservation.name') }}</label>
          <input
            type="text"
            id="name"
            v-model="userName"
            :placeholder="$t('reservation.namePlaceholder')"
            required
            :aria-label="$t('reservation.name')"
          />
        </div>
        <div class="form-group">
          <label for="surname">{{ $t('reservation.surname') }}</label>
          <input
            type="text"
            id="surname"
            v-model="userSurname"
            :placeholder="$t('reservation.surnamePlaceholder')"
            required
            :aria-label="$t('reservation.surname')"
          />
        </div>
        <button
          type="submit"
          class="reserve-button"
          :aria-label="$t('itemCard.reserve')"
        >
          {{ $t('itemCard.reserve') }}
        </button>
      </form>
    </section>
    <div v-else class="empty-state">
      <p>{{ $t('reservation.noRoomMessage') }}</p>
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
$primary-bg: #1a1a1a;
$accent-blue: #1e88e5;
$text-color: #e0e0e0;
$secondary-text: #b0b0b0;
$card-bg: #252525;
.reservation-container {
  margin-top: 80px;
  padding: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: $primary-bg;
  .header {
    text-align: center;
    margin-bottom: 32px;
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: $text-color;
      margin: 0;
      font-family: 'Inter', sans-serif;
      letter-spacing: -0.02em;
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
  }
  .room-details {
    background: $card-bg;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.5s ease;
    .room-title {
      font-size: 2.2rem;
      font-weight: 600;
      color: $text-color;
      text-align: center;
      margin-bottom: 24px;
      @media (max-width: 768px) {
        font-size: 1.8rem;
      }
    }
    .room-content {
      display: flex;
      gap: 24px;
      margin-bottom: 32px;
      .room-image {
        width: 50%;
        height: 300px;
        object-fit: cover;
        border-radius: 10px;
        transition: transform 0.3s ease;
        &:hover {
          transform: scale(1.02);
        }
        @media (max-width: 768px) {
          width: 100%;
          height: 200px;
        }
      }
      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        .room-price,
        .room-availability,
        .room-occupancy,
        .room-description {
          font-size: 1.1rem;
          color: $secondary-text;
          margin: 0;
          line-height: 1.6;
          &.room-price {
            font-weight: 600;
            color: $text-color;
          }
          &.room-description {
            font-style: italic;
          }
          @media (max-width: 768px) {
            font-size: 1rem;
          }
        }
      }
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    .reservation-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
      .form-group {
        display: flex;
        flex-direction: column;
        label {
          font-size: 1rem;
          font-weight: 500;
          color: $text-color;
          margin-bottom: 8px;
        }
        input {
          padding: 12px 16px;
          font-size: 1rem;
          border: 1px solid $secondary-text;
          border-radius: 8px;
          background: #333333;
          color: $text-color;
          transition: all 0.3s ease;
          &:focus {
            outline: none;
            border-color: $accent-blue;
            box-shadow: 0 0 0 3px rgba($accent-blue, 0.1);
            background: #3a3a3a;
          }
        }
      }
      .reserve-button {
        grid-column: span 2;
        padding: 12px 24px;
        font-size: 1rem;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        background: $accent-blue;
        color: $text-color;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          background: darken($accent-blue, 10%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba($accent-blue, 0.3);
        }
        &:active {
          transform: scale(0.98);
        }
        &:disabled {
          background: $secondary-text;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        @media (max-width: 768px) {
          grid-column: span 1;
        }
      }
      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }
    }
  }
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    background: $card-bg;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      font-size: 1.2rem;
      color: $secondary-text;
      margin: 0;
      @media (max-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }
}
@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
