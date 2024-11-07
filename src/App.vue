<template>
  <div id="app">
    <header>
      <h1>Room Booking</h1>
      <button @click="toggleAdmin">
        {{ isAdmin ? 'Switch to User View' : 'Switch to Admin View' }}
      </button>
    </header>
    <RoomList />
    <Bucket />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RoomList from './components/RoomList.vue';
import Bucket from './components/BucketComp.vue';

export default {
  name: 'App',
  components: {
    RoomList,
    Bucket,
  },
  computed: {
    ...mapGetters(['isAdmin']),
  },
  methods: {
    ...mapActions(['setAdmin']),
    toggleAdmin() {
      this.setAdmin(!this.isAdmin);
    },
  },
};
</script>

<style>
/* Add some basic styling */
</style>
