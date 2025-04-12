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
          <div class="form-group">
            <label for="title">{{ $t('addRoom.form.titleLabel') }}</label>
            <input
              type="text"
              id="title"
              v-model="newRoom.title"
              required
              :placeholder="$t('addRoom.form.titlePlaceholder')"
              aria-label="Room title"
            />
          </div>
          <div class="form-group">
            <label for="price">{{ $t('addRoom.form.priceLabel') }}</label>
            <input
              type="number"
              id="price"
              v-model="newRoom.price"
              required
              :placeholder="$t('addRoom.form.pricePlaceholder')"
              aria-label="Room price"
              min="0"
            />
          </div>
          <div class="form-group">
            <label for="imgUrl">{{ $t('addRoom.form.imgUrlLabel') }}</label>
            <input
              type="url"
              id="imgUrl"
              v-model="newRoom.imgUrl"
              required
              :placeholder="$t('addRoom.form.imgUrlPlaceholder')"
              aria-label="Room image URL"
            />
          </div>
          <div class="form-group">
            <label for="maxOccupancy">{{
              $t('addRoom.form.maxOccupancyLabel')
            }}</label>
            <input
              type="number"
              id="maxOccupancy"
              v-model="newRoom.maxOccupancy"
              required
              :placeholder="$t('addRoom.form.maxOccupancyPlaceholder')"
              aria-label="Max occupancy"
              min="1"
            />
          </div>
          <div class="form-group">
            <label for="availability">{{
              $t('addRoom.form.availabilityLabel')
            }}</label>
            <input
              type="text"
              id="availability"
              v-model="newRoom.availability"
              required
              :placeholder="$t('addRoom.form.availabilityPlaceholder')"
              aria-label="Room availability"
            />
          </div>
          <div class="form-group">
            <label for="description">{{
              $t('addRoom.form.descriptionLabel')
            }}</label>
            <textarea
              id="description"
              v-model="newRoom.description"
              required
              :placeholder="$t('addRoom.form.descriptionPlaceholder')"
              aria-label="Room description"
            ></textarea>
          </div>
          <div class="form-buttons">
            <button type="submit" class="submit-btn">
              {{ $t('addRoom.form.submitButton') }}
            </button>
            <button
              type="button"
              @click="closeDialog"
              class="cancel-btn"
              aria-label="Cancel"
            >
              {{ $t('addRoom.form.cancelButton') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="room-list">
      <room-item v-for="room in sortedRooms" :key="room.id" :item-data="room" />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import RoomItem from './RoomItem.vue';
export default {
  name: 'RoomList',
  data() {
    return {
      showDialog: false,
      newRoom: {
        title: '',
        price: '',
        imgUrl: '',
        maxOccupancy: '',
        availability: '',
        description: '',
      },
    };
  },
  components: { RoomItem },
  computed: {
    ...mapGetters(['sortedRooms']),
    isAdmin() {
      return (
        localStorage.getItem('isAdmin') === 'true' ||
        sessionStorage.getItem('isAdmin') === 'true'
      );
    },
  },
  methods: {
    ...mapActions(['addRoom']),
    handleAddRoom() {
      if (this.isValidRoom(this.newRoom)) {
        this.addRoom({ ...this.newRoom, price: Number(this.newRoom.price) });
        this.newRoom = {
          title: '',
          price: '',
          imgUrl: '',
          maxOccupancy: '',
          availability: '',
          description: '',
        };
        this.closeDialog();
      } else {
        this.$notify({
          title: 'Error',
          text: this.$t('addRoom.form.invalidInput'),
          type: 'error',
        });
      }
    },
    isValidRoom(room) {
      return (
        room.title.trim() &&
        !isNaN(room.price) &&
        room.price >= 0 &&
        room.imgUrl.trim() &&
        !isNaN(room.maxOccupancy) &&
        room.maxOccupancy > 0 &&
        room.availability.trim() &&
        room.description.trim()
      );
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>
<style lang="scss" scoped>
$primary-bg: #1a1a1a;
$accent-blue: #1e88e5;
$success-green: #2e7d32;
$cancel-grey: #757575;
$text-color: #e0e0e0;
$dialog-bg: #ffffff;
.add-room {
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .add-btn {
    padding: 12px 24px;
    background: $accent-blue;
    color: $text-color;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
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
  }
}
.container {
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
    .dialog {
      background: $dialog-bg;
      padding: 24px;
      border-radius: 12px;
      width: min(90%, 400px);
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s ease;
      position: relative;
      h3 {
        margin: 0 0 20px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #212121;
        text-align: center;
      }
      form {
        .form-group {
          margin-bottom: 20px;
          label {
            display: block;
            font-size: 0.95rem;
            font-weight: 500;
            color: #424242;
            margin-bottom: 8px;
          }
          input,
          textarea {
            width: 100%;
            padding: 10px 14px;
            font-size: 1rem;
            border: 1px solid #bdbdbd;
            border-radius: 6px;
            background: #fafafa;
            transition: all 0.3s ease;
            &:focus {
              outline: none;
              border-color: $accent-blue;
              box-shadow: 0 0 0 3px rgba($accent-blue, 0.1);
              background: #ffffff;
            }
          }
          textarea {
            min-height: 100px;
            resize: vertical;
          }
        }
        .form-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 20px;
          .submit-btn,
          .cancel-btn {
            padding: 10px 20px;
            font-size: 1rem;
            font-weight: 500;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .submit-btn {
            background: $success-green;
            color: $text-color;
            &:hover {
              background: darken($success-green, 10%);
              transform: translateY(-2px);
            }
            &:focus {
              outline: none;
              box-shadow: 0 0 0 3px rgba($success-green, 0.3);
            }
          }
          .cancel-btn {
            background: $cancel-grey;
            color: $text-color;
            &:hover {
              background: darken($cancel-grey, 10%);
              transform: translateY(-2px);
            }
            &:focus {
              outline: none;
              box-shadow: 0 0 0 3px rgba($cancel-grey, 0.3);
            }
          }
        }
      }
    }
  }
  .room-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
    padding: 24px;
    background: $primary-bg;
    border-radius: 12px;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
@media (max-width: 600px) {
  .add-room {
    .add-btn {
      padding: 10px 20px;
      font-size: 0.95rem;
    }
  }
  .container {
    .dialog-overlay {
      .dialog {
        width: 95%;
        padding: 20px;
        h3 {
          font-size: 1.3rem;
        }
        form {
          .form-group {
            margin-bottom: 16px;
            label {
              font-size: 0.9rem;
            }
            input,
            textarea {
              font-size: 0.95rem;
              padding: 8px 12px;
            }
          }
          .form-buttons {
            flex-direction: column;
            gap: 10px;
            .submit-btn,
            .cancel-btn {
              width: 100%;
              padding: 12px;
            }
          }
        }
      }
    }
    .room-list {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 20px;
    }
  }
}
</style>
