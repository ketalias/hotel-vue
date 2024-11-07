<template>
  <div class="container">
    <div class="title">
      <h1>{{ $t('room_catalog.title') }}</h1>
    </div>
    <room-filter />
    <div class="catalog">
      <room-list :room-list="roomList" @remove="onRemove"></room-list>
    </div>
  </div>
  <footer-bottom />
</template>

<script>
import FooterBottom from '@/components/FooterBottom.vue';
import RoomList from '@/components/RoomList.vue';
import RoomFilter from '@/components/RoomFilter.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'RoomsCatalog',
  components: { RoomList, FooterBottom, RoomFilter },
  computed: {
    ...mapGetters(['roomList']),
  },
  methods: {
    onRemove(itemId) {
      this.roomList = this.roomList.filter((room) => room.id !== itemId);
    },
  },
  mounted() {
    this.$store.dispatch('fetchRooms');
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 70px;
}

.catalog {
  background-color: #353535;
}

.title {
  height: auto;
  margin-left: 50px;
  align-content: center;
}
</style>
