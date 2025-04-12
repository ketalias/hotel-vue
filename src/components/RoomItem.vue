<template>
  <div class="container">
    <img
      class="room-img"
      :src="itemData.imgUrl"
      :alt="$t('itemCard.roomImageAlt')"
    />
    <div v-if="!redactFormVisible" class="content">
      <h3 class="title">{{ itemData.title }}</h3>
      <p class="price">
        ${{ itemData.price }} {{ $t('itemCard.pricePerNight') }}
      </p>
      <p class="occupancy">
        {{ itemData.maxOccupancy }} {{ $t('itemCard.peopleOccupancy') }}
      </p>
      <div class="actions">
        <button v-if="isAdmin" class="edit-btn" @click.stop="toggleRedactForm">
          {{ $t('itemCard.edit') }}
        </button>
        <button v-if="isAdmin" class="delete-btn" @click.stop="confirmDelete">
          {{ $t('itemCard.delete') }}
        </button>
        <button class="reserve-btn" @click.stop="reserveRoom">
          {{ $t('itemCard.reserve') }}
        </button>
      </div>
    </div>
    <div v-else class="edit-form">
      <div class="form-group">
        <input
          v-model="editedData.title"
          :placeholder="$t('itemCard.editTitlePlaceholder')"
          aria-label="Room title"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="editedData.price"
          type="number"
          :placeholder="$t('itemCard.editPricePlaceholder')"
          aria-label="Room price"
          min="0"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="editedData.imgUrl"
          type="url"
          :placeholder="$t('itemCard.editImgUrlPlaceholder')"
          aria-label="Room image URL"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="editedData.maxOccupancy"
          type="number"
          :placeholder="$t('itemCard.editMaxOccupancyPlaceholder')"
          aria-label="Max occupancy"
          min="1"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="editedData.availability"
          type="text"
          :placeholder="$t('itemCard.editAvailabilityPlaceholder')"
          aria-label="Room availability"
          required
        />
      </div>
      <div class="form-group">
        <textarea
          v-model="editedData.description"
          :placeholder="$t('itemCard.editDescriptionPlaceholder')"
          aria-label="Room description"
          required
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="save-btn" @click="submitRedact">
          {{ $t('itemCard.save') }}
        </button>
        <button class="cancel-btn" @click="toggleRedactForm">
          {{ $t('itemCard.cancel') }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';
export default {
  name: 'RoomItem',
  props: { itemData: { type: Object, required: true } },
  data() {
    return {
      redactFormVisible: false,
      editedData: {
        id: this.itemData.id,
        title: this.itemData.title,
        price: this.itemData.price,
        imgUrl: this.itemData.imgUrl,
        maxOccupancy: this.itemData.maxOccupancy,
        availability: this.itemData.availability,
        description: this.itemData.description,
      },
    };
  },
  methods: {
    ...mapActions(['updateRoom', 'removeRoom']),
    toggleRedactForm() {
      this.redactFormVisible = !this.redactFormVisible;
      if (!this.redactFormVisible) {
        this.editedData = { ...this.itemData };
      }
    },
    async submitRedact() {
      if (this.isValidRoom(this.editedData)) {
        try {
          await this.updateRoom({
            ...this.editedData,
            price: Number(this.editedData.price),
            maxOccupancy: Number(this.editedData.maxOccupancy),
          });
          Swal.fire({
            icon: 'success',
            title: this.$t('itemCard.successTitle'),
            text: this.$t('itemCard.successText'),
            confirmButtonText: this.$t('itemCard.confirmButton'),
          });
          this.toggleRedactForm();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: this.$t('itemCard.errorTitle'),
            text: this.$t('itemCard.errorText'),
            confirmButtonText: this.$t('itemCard.confirmButton'),
          });
          console.error('Error updating room:', error);
        }
      } else {
        Swal.fire({
          icon: 'warning',
          title: this.$t('itemCard.invalidTitle'),
          text: this.$t('itemCard.invalidText'),
          confirmButtonText: this.$t('itemCard.confirmButton'),
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
    reserveRoom() {
      this.$router.push({
        name: 'ReservationPage',
        params: { id: this.itemData.id },
      });
    },
    confirmDelete() {
      Swal.fire({
        title: this.$t('itemCard.deleteConfirmTitle'),
        text: this.$t('itemCard.deleteConfirmText'),
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: this.$t('itemCard.deleteConfirmButton'),
        cancelButtonText: this.$t('itemCard.cancelButton'),
        customClass: {
          confirmButton: 'swal2-confirm custom-confirm',
          cancelButton: 'swal2-cancel custom-cancel',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await this.removeRoom(this.itemData.id);
            Swal.fire({
              icon: 'success',
              title: this.$t('itemCard.deleteSuccessTitle'),
              text: this.$t('itemCard.deleteSuccessText'),
              confirmButtonText: this.$t('itemCard.confirmButton'),
            });
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: this.$t('itemCard.errorTitle'),
              text: this.$t('itemCard.deleteErrorText'),
              confirmButtonText: this.$t('itemCard.confirmButton'),
            });
            console.error('Error deleting room:', error);
          }
        }
      });
    },
  },
  computed: {
    isAdmin() {
      return (
        localStorage.getItem('isAdmin') === 'true' ||
        sessionStorage.getItem('isAdmin') === 'true'
      );
    },
  },
};
</script>
<style lang="scss" scoped>
$primary-bg: #1e1e1e;
$accent-blue: #1e88e5;
$success-green: #987c0d;
$danger-red: #d32f2f;
$text-color: #e0e0e0;
$secondary-text: #b0b0b0;
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  min-width: 280px;
  background: $primary-bg;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  .room-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 16px;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.02);
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .title {
      font-size: 1.4rem;
      font-weight: 600;
      color: $text-color;
      margin-bottom: 12px;
      text-align: center;
      line-height: 1.4;
    }
    .price,
    .occupancy {
      font-size: 1rem;
      color: $secondary-text;
      margin-bottom: 8px;
      text-align: center;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 16px;
      button {
        padding: 10px 20px;
        font-size: 0.95rem;
        font-weight: 500;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
        }
        &.edit-btn {
          background: $accent-blue;
          color: $text-color;
          &:hover {
            background: darken($accent-blue, 10%);
          }
        }
        &.delete-btn {
          background: $danger-red;
          color: $text-color;
          &:hover {
            background: darken($danger-red, 10%);
          }
        }
        &.reserve-btn {
          background: $success-green;
          color: $text-color;
          &:hover {
            background: darken($success-green, 10%);
          }
        }
      }
    }
  }
  .edit-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    .form-group {
      display: flex;
      flex-direction: column;
      input,
      textarea {
        width: 100%;
        padding: 10px 14px;
        font-size: 0.95rem;
        border: 1px solid $secondary-text;
        border-radius: 6px;
        background: #2a2a2a;
        color: $text-color;
        transition: all 0.3s ease;
        &:focus {
          outline: none;
          border-color: $accent-blue;
          box-shadow: 0 0 0 3px rgba($accent-blue, 0.1);
          background: #333333;
        }
      }
      textarea {
        min-height: 100px;
        resize: vertical;
      }
    }
    .form-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      button {
        padding: 10px 20px;
        font-size: 0.95rem;
        font-weight: 500;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }
        &:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
        }
        &.save-btn {
          background: $success-green;
          color: $text-color;
          &:hover {
            background: darken($success-green, 10%);
          }
        }
        &.cancel-btn {
          background: $secondary-text;
          color: $text-color;
          &:hover {
            background: darken($secondary-text, 10%);
          }
        }
      }
    }
  }
}
.swal2-confirm.custom-confirm {
  background: $danger-red;
  color: $text-color;
  border-radius: 8px;
  padding: 10px 20px;
  &:hover {
    background: darken($danger-red, 10%);
  }
}
.swal2-cancel.custom-cancel {
  background: $secondary-text;
  color: $text-color;
  border-radius: 8px;
  padding: 10px 20px;
  &:hover {
    background: darken($secondary-text, 10%);
  }
}
@media (max-width: 600px) {
  .container {
    min-width: 100%;
    padding: 12px;
    .room-img {
      height: 180px;
    }
    .content {
      .title {
        font-size: 1.2rem;
      }
      .price,
      .occupancy {
        font-size: 0.9rem;
      }
      .actions {
        flex-direction: column;
        gap: 10px;
        button {
          width: 100%;
          padding: 12px;
        }
      }
    }
    .edit-form {
      .form-group {
        input,
        textarea {
          font-size: 0.9rem;
          padding: 8px 12px;
        }
      }
      .form-actions {
        flex-direction: column;
        gap: 10px;
        button {
          width: 100%;
          padding: 12px;
        }
      }
    }
  }
}
</style>
