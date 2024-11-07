import { createStore } from 'vuex';
import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const store = createStore({
  state() {
    return {
      roomList: [],
      bucket: [],
      searchQuery: '',
      sortOrder: 'asc',
      isAdmin: false,
      checkinDate: '',
      checkoutDate: '',
    };
  },
  getters: {
    isAdmin(state) {
      return state.isAdmin;
    },
    roomList(state) {
      return state.roomList;
    },
    getBucket(state) {
      return state.bucket;
    },
    sortedRooms(state) {
      return state.roomList
        .slice()
        .sort((a, b) =>
          state.sortOrder === 'asc' ? a.price - b.price : b.price - a.price
        );
    },
    getRoomById: (state) => (id) =>
      state.roomList.find((room) => room.id === id),
    checkinDate: (state) => state.checkinDate,
    checkoutDate: (state) => state.checkoutDate,
  },
  mutations: {
    SET_ADMIN(state, isAdmin) {
      state.isAdmin = isAdmin;
    },
    SET_ROOM_LIST(state, rooms) {
      state.roomList = rooms;
    },
    SET_SORT_ORDER(state, order) {
      state.sortOrder = order;
    },
    ADD_ROOM_TO_BUCKET(state, room) {
      if (!state.bucket.some((item) => item.id === room.id)) {
        state.bucket.push(room);
      }
    },
    REMOVE_ROOM_FROM_BUCKET(state, index) {
      state.bucket.splice(index, 1);
    },
    CLEAR_BUCKET(state) {
      state.bucket = [];
    },
    REMOVE_ROOM(state, roomId) {
      const index = state.roomList.findIndex((room) => room.id === roomId);
      if (index !== -1) {
        state.roomList.splice(index, 1);
      }
    },
    UPDATE_ROOM(state, updatedRoom) {
      const index = state.roomList.findIndex(
        (room) => room.id === updatedRoom.id
      );
      if (index !== -1) {
        state.roomList.splice(index, 1, updatedRoom);
      }
    },
  },
  actions: {
    async fetchRooms({ commit }) {
      try {
        const roomList = [];
        const querySnapshot = await getDocs(collection(db, 'roomsCollection'));
        querySnapshot.forEach((doc) => {
          roomList.push({ id: doc.id, ...doc.data() });
        });
        console.log('Fetched Rooms:', roomList);
        commit('SET_ROOM_LIST', roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    },

    async addRoom({ dispatch }, newRoomData) {
      try {
        await addDoc(collection(db, 'roomsCollection'), newRoomData);
        dispatch('fetchRooms');
      } catch (error) {
        console.error('Error adding room: ', error);
      }
    },
    async updateRoom({ commit }, updatedRoom) {
      try {
        await updateDoc(
          doc(db, 'roomsCollection', updatedRoom.id),
          updatedRoom
        );

        commit('UPDATE_ROOM', updatedRoom);
      } catch (error) {
        console.error('Error updating room: ', error);
      }
    },
    async removeRoom({ commit }, roomId) {
      try {
        await deleteDoc(doc(db, 'roomsCollection', roomId));

        commit('REMOVE_ROOM', roomId);
      } catch (error) {
        console.error('Error deleting room: ', error);
      }
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
    setSortOrder({ commit }, order) {
      commit('SET_SORT_ORDER', order);
    },
  },
});

export default store;
