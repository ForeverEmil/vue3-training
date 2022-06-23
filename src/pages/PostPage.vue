<template>
  <div>
    <h1>Posts Page</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск..."></my-input>
    <div class="app__btn">
      <my-button @click="showdialog"> Craete post </my-button>
      <my-select v-model="selected" :options="sortOptions"> </my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"> </post-form>
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading">
    </post-list>
    <div v-else>Downloading...</div>
    <div ref="observer" class="observer"></div>
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
import MyInput from "@/components/UI/MyInput";
import axios from "axios";
import MySelect from "@/components/UI/MySelect.vue";
import MyButton from "@/components/UI/MyButton.vue";

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
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selected: "",
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
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
    // Pagination
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        alert("Ошибка");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  mounted() {
    this.fetchPosts();
    this.$refs.observer;
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.loadMorePosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      if (this.selected == 'id') {
        return [...this.posts].sort((post1, post2) =>
          post1[this.selected] - post2[this.selected]
        );
      } else {
        return [...this.posts].sort((post1, post2) =>
          post1[this.selected]?.localeCompare(post2[this.selected])
        );
      }
    },
    sortedAndSearchedPosts() {
      if (this.selected == 'title') {
        return this.sortedPosts.filter((post) =>
          post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else if (this.selected == 'body') {
        return this.sortedPosts.filter((post) =>
          post.body.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else if (this.selected == 'id') {
        return this.sortedPosts.filter((post) =>
          JSON.stringify(post.id).includes(this.searchQuery)
        );
      } else {
        return this.sortedPosts
      }
    }
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

.observer {
  height: 25px;
  background: #243B67;
  border-radius: 1rem;
  margin-top: 10px;
}
</style>
