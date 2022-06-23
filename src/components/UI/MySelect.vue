<template>
  <select v-model="selected" @change="changeOption">
    <option disabled value="">Please select one</option>
    <option value="id">By ID</option>
    <option value="title">By Name</option>
    <option value="body">By Description</option>
    <!-- <option v-for="option in sortOptions" :key="option.value" :value="option.value">
      {{ option.text }}
    </option> -->
  </select>
</template>

<script>
export default {
  name: "my-select",
  data() {
    return {
      selected: '',
    }
  },
  props: {
    // selected: '',
    // // options: {
    // //   type: Array,
    // //   default: () => [],
    // // },
    methods: {
      changeOption(event) {
        this.$emit("update:selected", event.target.value);
      },
    },
  },
};
</script>

<style scoped>
</style>