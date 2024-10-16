<template>
  <div class="container">
    <img class="roomimg" :src="itemData.imgUrl" alt="Room Image" />
    <div class="title">{{ itemData.title }}</div>
    <div class="price">{{ itemData.price }}</div>
    <button @click="$emit('delete', itemData.id)">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'RoomItem',
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 40vw;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5; // Light gray background
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px); // Subtle lift on hover
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); // Stronger shadow on hover
  }
}

.roomimg {
  width: 100%;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.price {
  font-size: 1rem;
  color: #888;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #ff5a5f; // Airbnb-like red color
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ff1f24; // Darker red on hover
  }
}
</style>
