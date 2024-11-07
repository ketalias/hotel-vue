<template>
  <v-carousel height="550" show-arrows="none" cycle hide-delimiter-background>
    <v-carousel-item v-for="(roomGroup, i) in groupedRooms" :key="i">
      <v-sheet height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="d-flex justify-space-between" style="width: 90%">
            <RoomItem
              v-for="room in roomGroup"
              :key="room.id"
              :itemData="room"
            />
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import RoomItem from './RoomItem.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    RoomItem,
  },
  computed: {
    ...mapGetters(['roomList']),
    groupedRooms() {
      const groupSize = 3;
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
    showRoomDetail() {},
  },
};
</script>

<style>
.v-carousel-item {
  background-color: rgb(65, 65, 65);
  padding: 20px;
}

.v-sheet {
  background-color: rgb(55, 55, 55);
}

.room-img {
  width: 100%;
  height: auto;
}
</style>
