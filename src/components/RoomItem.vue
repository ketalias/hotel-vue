<template>
  <div class="container">
    <img
      class="room-img"
      :src="itemData.imgUrl"
      :alt="$t('itemCard.roomImageAlt')"
    />

    <div v-if="!redactFormVisible">
      <div class="title">{{ itemData.title }}</div>
      <div class="price">
        {{ itemData.price }}$ {{ $t('itemCard.pricePerNight') }}
      </div>
      <div class="price">
        {{ itemData.maxOccupancy }} {{ $t('itemCard.peopleOccupancy') }}
      </div>

      <button v-if="isAdmin" class="edit" @click.stop="toggleRedactForm">
        {{ $t('itemCard.edit') }}
      </button>
      <button v-if="isAdmin" class="delete" @click.stop="confirmDelete">
        {{ $t('itemCard.delete') }}
      </button>

      <button class="reserve" @click.stop="reserveRoom">
        {{ $t('itemCard.reserve') }}
      </button>
    </div>

    <div v-else class="edit-form">
      <input
        v-model="editedData.title"
        :placeholder="$t('itemCard.editTitlePlaceholder')"
      />
      <input
        v-model="editedData.price"
        type="number"
        :placeholder="$t('itemCard.editPricePlaceholder')"
      />
      <button @click="submitRedact">{{ $t('itemCard.save') }}</button>
      <button @click="toggleRedactForm">{{ $t('itemCard.cancel') }}</button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import { mapActions } from 'vuex';

export default {
  name: 'RoomItem',
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      redactFormVisible: false,
      editedData: { ...this.itemData },
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
      try {
        await this.updateRoom(this.editedData);
        Swal.fire({
          icon: 'success',
          title: 'Успіх!',
          text: 'Дані про номер оновлено успішно.',
          confirmButtonText: 'ОК',
        });
        this.toggleRedactForm();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Помилка',
          text: 'Не вдалося оновити дані про номер. Спробуйте ще раз.',
          confirmButtonText: 'ОК',
        });
        console.error('Error updating room:', error);
      }
    },
    reserveRoom() {
      this.$router.push({
        name: 'ReservationPage',
        params: { id: this.itemData.id },
      });
    },
    confirmDelete() {
      Swal.fire({
        title: 'Ви впевнені?',
        text: 'Цей процес не можна скасувати!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Так, видалити!',
        cancelButtonText: 'Скасувати',
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
              title: 'Видалено!',
              text: 'Номер було успішно видалено.',
              confirmButtonText: 'ОК',
            });
          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Помилка',
              text: 'Не вдалося видалити номер. Спробуйте ще раз.',
              confirmButtonText: 'ОК',
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
.container {
  display: flex;
  width: 25%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1d1d1d;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
}

.room-img {
  width: 100%;
  height: 70%;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
}

.title {
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #d5d5d5;
  text-align: center;
}

.price {
  display: flex;
  width: 100%;
  justify-content: center;
  align-content: center;
  text-align: center;
  font-size: 1rem;
  color: #888;
  margin-bottom: 20px;
}

button {
  top: 0;
  left: 0;
  z-index: 0;
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
    background-color: #b88517;
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

.custom-confirm {
  background-color: #d33;
  color: white;
}

.custom-cancel {
  background-color: #ccc;
  color: black;
}

.custom-confirm:hover {
  background-color: #c00;
}

.custom-cancel:hover {
  background-color: #aaa;
}
</style>
