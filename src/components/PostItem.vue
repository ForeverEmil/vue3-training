<template>
  <div class="post">
    <div>
      <div><strong>ID: </strong>{{ post.id }}</div>
      <div><strong>Name: </strong> {{ post.title }}</div>
      <div><strong>Description: </strong> {{ post.body }}</div>
    </div>
    <div class="post__btn">
      <my-button @click="$router.push(`/posts/${post.id}`)">Open</my-button>
      <my-button @click="$emit('remove', post)">Remove</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removePost() {
      this.$store.commit('removePost', this.post.id)
    },
  }
};
</script>

<style scoped>
.post {
  padding: 15px;
  border-radius: 1rem;
  margin-top: 15px;
  background: #EAEBED;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 2px 2px 4px grey;
}

.post__btn {
  display: flex;
}

.post:hover {
  box-shadow: 3px 3px 5px #243B67;
}
</style>