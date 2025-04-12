<template>
  <div class="container">
    <header class="header">
      <h1>{{ $t('room_catalog.title') }}</h1>
    </header>
    <section class="catalog">
      <room-list :room-list="roomList" @remove="onRemove" />
    </section>
    <footer-bottom />
  </div>
</template>
<script>
import FooterBottom from '@/components/FooterBottom.vue';
import RoomList from '@/components/RoomList.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'RoomsCatalog',
  components: { RoomList, FooterBottom },
  computed: { ...mapGetters(['roomList']) },
  methods: {
    ...mapActions(['removeRoom']),
    async onRemove(itemId) {
      try {
        await this.removeRoom(itemId);
        this.$notify({
          title: 'Success',
          text: this.$t('room_catalog.removeSuccess'),
          type: 'success',
        });
      } catch (error) {
        this.$notify({
          title: 'Error',
          text: this.$t('room_catalog.removeError'),
          type: 'error',
        });
        console.error('Error removing room:', error);
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
$text-color: #e0e0e0;
$catalog-bg: #252525;
.container {
  margin-top: 80px;
  padding: 0 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .header {
    padding: 20px 0;
    text-align: center;
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      color: $text-color;
      margin: 0;
      font-family: 'Inter', sans-serif;
      letter-spacing: -0.02em;
      transition: color 0.3s ease;
      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }
  }
  .catalog {
    background: $catalog-bg;
    border-radius: 12px;
    padding: 24px;
    flex: 1;
    margin-bottom: 40px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    &:hover {
      transform: translateY(-2px);
    }
  }
}
</style>
