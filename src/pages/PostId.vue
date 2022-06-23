<template>
  <div v-if="!isPostLoading">
    <h1>Page of post ID = {{ post.id }}</h1>
    <div><strong>Name: </strong> {{ post.title }}</div>
    <div><strong>Description: </strong> {{ post.body }}</div>
  </div>
  <div v-else>Download...</div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostId",
  data() {
    return {
      isPostLoading: false,
      post: [],

    };
  },
  computed: {
    postId() {
      return parseInt(this.$route.params.id)
    },
  },
  methods: {
    async fetchPost() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${this.postId}`
        );
        this.post = response.data;
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isPostLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPost()
  }
}
</script>

<style scoped>
</style>