<template>
  <div>
    <!-- <h1>{{ $store.state.likes }}</h1> -->
    <h1>Post Page</h1>
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Search...">
    </my-input>
    <div class="app__btn">
      <my-button @click="showdialog"> Create Post </my-button>
      <my-select :model-value="selected" @update:model-value="setSelectedSort" :options="sortOptions"> </my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"> </post-form>
    </my-dialog>
    <div class="container">
      <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading">
      </post-list>
      <div v-else>Download...</div>
      <div v-intersection="loadMorePosts" class="observer"></div>
    </div>

    <!-- Pagination -->
    <!-- <div class="page__wrapper">
      <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{
        'current-page': page === pageNumber
      }" @click="changePage(pageNumber)">{{ pageNumber }}</div>
    </div> -->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MyInput from "@/components/UI/MyInput";
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';

export default {
  components: {
    MyInput,
    PostForm,
    PostList,
    MySelect,
    MyButton
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
      removePost: 'post/removePost'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    // removePost(post) {
    //   // this.posts = this.posts.filter((p) => p.id !== post.id);
    //   console.log(post);
    // },

    showdialog() {
      this.dialogVisible = true;
    },
    // Pagination
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },

  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      dialogVisible: state => state.post.dialogVisible,
      selected: state => state.post.selected,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },
  // Pagination
  // watch: {
  //   page() {
  //     this.fetchPosts()
  //   }
  // },
};
</script>

<style>
.app__btn {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid #243B67;
}

.container {
  width: 100%;
  height: 400px;
  border: 8px solid #243B67;
  padding: 14px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  box-shadow: 2px 2px 4px grey;
}

.observer {
  height: 30px;
  background: #243B67;
}
</style>
