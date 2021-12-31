<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <input type="text" v-model.trim="modificatorValue" />
    <my-button @click="showdialog" style="margin: 15px 0px"
      >Создать пост</my-button
    >
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"> </post-form>
    </my-dialog>
    <post-list :posts="posts" @remove="removePost"> </post-list>
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import MyButton from "./components/UI/MyButton.vue";

export default {
  components: {
    PostForm,
    PostList,
    MyButton,
  },
  data() {
    return {
      posts: [
        { id: 1, title: "Javascript", body: "Описание поста" },
        { id: 2, title: "Javascript 2", body: "Описание поста 2" },
        { id: 3, title: "Javascript 3", body: "Описание поста 3" },
        { id: 4, title: "Javascript 4", body: "Описание поста 4" },
      ],
      dialogVisible: false,
      modificatorValue: "",
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showdialog() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scopped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
</style>
