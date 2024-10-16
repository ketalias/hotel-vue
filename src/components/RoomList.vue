<template>
  <div class="room-list">
    <room-item
      v-for="room in roomList"
      :key="room.id"
      :item-data="room"
      @delete="$emit('remove', $event)"
    >
    </room-item>
  </div>
</template>

<script>
import RoomItem from './RoomItem.vue';
export default {
  name: 'RoomList',
  components: {
    RoomItem,
  },
  data() {
    return {
      roomList: [
        {
          id: 1,
          title: 'Luxury Suite',
          price: '$300 per night',
          imgUrl:
            'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg',
        },
        {
          id: 2,
          title: 'Standard Room',
          price: '$100 per night',
          imgUrl:
            'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg',
        },
        {
          id: 3,
          title: 'Deluxe Room',
          price: '$200 per night',
          imgUrl:
            'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg',
        },
        {
          id: 4,
          title: 'Single Room',
          price: '$80 per night',
          imgUrl:
            'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg',
        },
        {
          id: 5,
          title: 'Presidential Suite',
          price: '$500 per night',
          imgUrl:
            'https://cdn.loewshotels.com/loewshotels.com-2466770763/cms/cache/v2/5f5a6e0d12749.jpg/1920x1080/fit/80/86e685af18659ee9ecca35c465603812.jpg',
        },
      ],
    };
  },
  methods: {
    removeRoom(roomId) {
      this.roomList = this.roomList.filter((room) => room.id !== roomId);
    },
  },
};
</script>

<style lang="scss" scoped>
.room-list {
  display: flex;
  flex-wrap: wrap; /* Allows items to wrap onto the next line */
  justify-content: space-between; /* Spaces items evenly */
  gap: 20px; /* Adds space between room items */
  padding: 20px;
  background-color: #f9f9f9;
}
</style>
