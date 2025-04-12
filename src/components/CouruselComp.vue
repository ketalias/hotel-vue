<template>
  <div class="carousel-container">
    <div class="swiper" ref="swiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(roomGroup, i) in groupedRooms"
          :key="i"
        >
          <div class="room-group">
            <RoomItem
              v-for="room in roomGroup"
              :key="room.id"
              :itemData="room"
              @delete="deleteRoom(room.id)"
            />
          </div>
        </div>
      </div>
      <!-- Navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <!-- Pagination dots -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import RoomItem from './RoomItem.vue';
import { mapGetters, mapActions } from 'vuex';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  components: {
    RoomItem,
  },
  computed: {
    ...mapGetters(['roomList']),
    groupedRooms() {
      const groupSize = 5;
      return this.roomList.reduce((result, room, index) => {
        const groupIndex = Math.floor(index / groupSize);
        if (!result[groupIndex]) {
          result[groupIndex] = [];
        }
        result[groupIndex].push(room);
        return result;
      }, []);
    },
  },
  methods: {
    ...mapActions(['removeRoom']),
    deleteRoom(roomId) {
      this.removeRoom(roomId);
    },
    showRoomDetail() {
      // Placeholder for future functionality
    },
  },
  mounted() {
    // Initialize Swiper
    new Swiper(this.$refs.swiper, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
      },
    });
  },
};
</script>

<style scoped>
.carousel-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.swiper {
  position: relative;
  background-color: #373737;
  padding: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.room-group {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  max-width: 100%;
  padding: 10px;
  border-radius: 8px;
  background-color: #444;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.swiper-button-prev,
.swiper-button-next {
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 20px;
}

.swiper-pagination-bullet {
  background: #fff;
  opacity: 0.5;
}

.swiper-pagination-bullet-active {
  opacity: 1;
  background: #ff6200;
}

.room-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.room-img:hover {
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .room-group {
    grid-template-columns: 1fr;
  }

  .swiper {
    padding: 10px;
  }
}
</style>
