import { createStore } from 'vuex';

export default createStore({
  state: {
    roomList: [
      {
        id: 1,
        title: 'Luxury Suite',
        price: 300,
        imgUrl:
          'https://www.usatoday.com/gcdn/-mm-/05b227ad5b8ad4e9dcb53af4f31d7fbdb7fa901b/c=0-64-2119-1259/local/-/media/USATODAY/USATODAY/2014/08/13/1407953244000-177513283.jpg',
        maxOccupancy: 3,
        availability: 'Available from November 15, 2024',
        description:
          'Experience ultimate comfort in our Luxury Suite, featuring a king-sized bed, a spacious living area, and breathtaking views.',
      },
      {
        id: 2,
        title: 'Standard Room',
        price: 100,
        imgUrl:
          'https://www.hotelmalaysia.com.my/images/Standard%20Room/IMGL6453xxx.jpg',
        maxOccupancy: 2,
        availability: 'Available from November 10, 2024',
        description:
          'Our Standard Room offers a cozy stay with modern amenities, perfect for couples or solo travelers.',
      },
      {
        id: 3,
        title: 'Deluxe Room',
        price: 200,
        imgUrl:
          'https://www.subicbaytravelershotel.com/wp-content/uploads/2020/06/20190603_170950-scaled.jpg',
        maxOccupancy: 3,
        availability: 'Available from November 12, 2024',
        description:
          'Enjoy added space and luxury in our Deluxe Room, complete with upgraded furnishings and a beautiful view.',
      },
      {
        id: 4,
        title: 'Single Room',
        price: 80,
        imgUrl:
          'https://victoriahotel.co.uk/sites/default/files/2022-09/bc-victoria-accom_standard-single-room-301-at-victoria-hotel.jpg',
        maxOccupancy: 1,
        availability: 'Available from November 1, 2024',
        description:
          'Perfect for solo travelers, our Single Room provides all the essentials in a compact space.',
      },
      {
        id: 5,
        title: 'Presidential Suite',
        price: 500,
        imgUrl:
          'https://image-tc.galaxy.tf/wijpeg-2ofe2wg1akyihp1lytvujz7ud/presidential-suite-bedroom_wide.jpg?crop=0%2C100%2C1920%2C1080',
        maxOccupancy: 4,
        availability: 'Available from November 20, 2024',
        description:
          'Indulge in luxury in our Presidential Suite, featuring a separate living area, a dining space, and top-of-the-line amenities.',
      },
      {
        id: 6,
        title: 'Economy Room',
        price: 70,
        imgUrl:
          'https://www.queensangeles.com/media/k2/galleries/219/eco_01.jpg',
        maxOccupancy: 2,
        availability: 'Available from November 5, 2024',
        description:
          'Budget-friendly yet comfortable, our Economy Room is ideal for travelers looking to save without sacrificing quality.',
      },
    ],
    bucket: [],
    searchQuery: '',
    sortOrder: 'asc',
    isAdmin: false,
  },
  getters: {
    isAdmin(state) {
      return state.isAdmin;
    },
    roomList(state) {
      return state.roomList;
    },
    getBucket: (state) => {
      return state.bucket;
    },
    sortedRooms(state) {
      return state.roomList.slice().sort((a, b) => {
        return state.sortOrder === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      });
    },
    getRoomById: (state) => (id) => {
      return state.roomList.find((room) => room.id === id);
    },
  },
  mutations: {
    SET_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    UPDATE_ROOM(state, updatedRoom) {
      const index = state.roomList.findIndex(
        (room) => room.id === updatedRoom.id
      );
      if (index !== -1) {
        state.roomList.splice(index, 1, updatedRoom);
      }
    },
    ADD_ROOM(state, newRoom) {
      state.roomList.push(newRoom);
    },
    REMOVE_ROOM(state, roomId) {
      state.roomList = state.roomList.filter((room) => room.id !== roomId);
    },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order;
    },
    ADD_ROOM_TO_BUCKET(state, room) {
      state.bucket.push(room);
    },
    REMOVE_ROOM_FROM_BUCKET(state, index) {
      state.bucket.splice(index, 1);
    },
    CLEAR_BUCKET(state) {
      state.bucket = [];
    },
  },
  actions: {
    updateRoom({ commit }, updatedRoom) {
      commit('UPDATE_ROOM', updatedRoom);
    },
    addRoomToBucket({ commit }, room) {
      commit('ADD_ROOM_TO_BUCKET', room);
    },
    removeRoomFromBucket({ commit }, index) {
      commit('REMOVE_ROOM_FROM_BUCKET', index);
    },
    clearBucket({ commit }) {
      commit('CLEAR_BUCKET');
    },
    addRoom({ commit, state }, newRoomData) {
      const newRoom = {
        id: state.roomList.length + 1,
        title: newRoomData.title,
        price: newRoomData.price,
        imgUrl: newRoomData.imgUrl,
      };
      commit('ADD_ROOM', newRoom);
    },
    removeRoom({ commit }, roomId) {
      commit('REMOVE_ROOM', roomId);
    },
    setSortOrder({ commit }, order) {
      commit('SET_SORT_ORDER', order);
    },
  },
});
