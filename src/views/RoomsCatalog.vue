<template>
  <div class="catalog">
    <room-list :room-list="roomList" @remove="onRemove"> </room-list>
  </div>
</template>

<script>
import RoomList from '@/components/RoomList.vue';

export default {
  name: 'RoomsCatalog',
  components: { RoomList },
  methods: {
    onRemove(itemId) {
      this.roomList = this.roomList.filter((room) => room.id !== itemId);
    },
  },
};
</script>

<style lang="scss" scoped></style>
