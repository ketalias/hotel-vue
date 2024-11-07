<template>
  <div class="add-room">
    <button
      v-if="isAdmin"
      @click="showDialog = true"
      class="add-btn"
      aria-label="Add Room"
    >
      {{ $t('addRoom.addRoomBtn') }}
    </button>
  </div>

  <div class="container">
    <div v-if="showDialog" class="dialog-overlay" @click="closeDialog">
      <div class="dialog" @click.stop>
        <h3>{{ $t('addRoom.form.titleLabel') }}</h3>
        <form @submit.prevent="handleAddRoom">
          <div>
            <label for="title">{{ $t('addRoom.form.titleLabel') }}</label>
            <input
              type="text"
              id="title"
              v-model="newRoom.title"
              required
              placeholder="Room title"
              aria-label="Room title"
            />
          </div>
          <div>
            <label for="price">{{ $t('addRoom.form.priceLabel') }}</label>
            <input
              type="number"
              id="price"
              v-model="newRoom.price"
              required
              placeholder="Price"
              aria-label="Room price"
            />
          </div>
          <div>
            <label for="imgUrl">{{ $t('addRoom.form.imgUrlLabel') }}</label>
            <input
              type="url"
              id="imgUrl"
              v-model="newRoom.imgUrl"
              required
              placeholder="Image URL"
              aria-label="Room image URL"
            />
          </div>
          <div class="form-buttons">
            <button type="submit" class="submit-btn">
              {{ $t('addRoom.form.submitButton') }}
            </button>
          </div>
        </form>
        <button
          @click="closeDialog"
          class="close-btn"
          aria-label="Close dialog"
        >
          {{ $t('addRoom.form.closeButton') }}
        </button>
      </div>
    </div>

    <div class="room-list">
      <room-item v-for="room in sortedRooms" :key="room.id" :item-data="room" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RoomItem from './RoomItem.vue';
import { mapActions } from 'vuex';

export default {
  name: 'RoomList',
  data() {
    return {
      showDialog: false,
      newRoom: {
        title: '',
        price: '',
        imgUrl: '',
      },
    };
  },

  components: {
    RoomItem,
  },

  computed: {
    ...mapGetters(['sortedRooms']),
  },

  methods: {
    ...mapActions(['addRoom']), // Add room action

    handleAddRoom() {
      if (this.isValidRoom(this.newRoom)) {
        this.addRoom(this.newRoom); // Call action to add room
        this.newRoom = { title: '', price: '', imgUrl: '' }; // Clear form fields
        this.closeDialog();
      } else {
        alert('Please provide valid inputs for all fields.');
      }
    },

    isValidRoom(room) {
      return (
        room.title.trim() &&
        !isNaN(room.price) &&
        room.price > 0 &&
        room.imgUrl.trim()
      );
    },

    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.room-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 20px;
  padding: 20px;
  background-color: #353535;
}

.add-room {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.add-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-btn:hover {
  background-color: #0056b3;
}

.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.dialog {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

form div {
  margin-bottom: 15px;
}

form input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.form-buttons {
  display: flex;
  justify-content: center;
}

.submit-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
