<template>
  <div class="contain">
    <label for="sortOrder">{{ $t('sort.label') }}</label>
    <select id="sortOrder" @change="updateSortOrder" v-model="sortOrder">
      <option value="asc">{{ $t('sort.ascending') }}</option>
      <option value="desc">{{ $t('sort.descending') }}</option>
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      sortOrder: 'asc',
    };
  },

  computed: {
    ...mapGetters(['sortedRooms']),
  },
  methods: {
    ...mapActions(['setSortOrder']),

    updateSortOrder(event) {
      this.sortOrder = event.target.value;
      this.setSortOrder(this.sortOrder);
    },
  },
};
</script>

<style lang="scss" scoped>
.contain {
  display: flex;
  height: auto;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
  padding: 5px;
  border-radius: 10px;
  background-color: #343434;

  label {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #ffffff;
  }

  select {
    padding: 10px;
    color: #ffffff;
    background-color: #1e1e1e;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #ffbb00;
    }

    option {
      padding: 10px;
    }
  }
}
</style>
