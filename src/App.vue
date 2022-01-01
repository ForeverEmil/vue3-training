<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input
    v-model="searchQuery"
    placeholder="Поиск..."
    ></my-input>
    <div class="app__btn">
      <my-button @click="showdialog"> Создать пост </my-button>
      <my-select v-model="selectedSort" :options="sortOptions"> </my-select>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"> </post-form>
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading">
    </post-list>
    <div v-else>Идет Загрузка...</div>
    <div ref="observer" class="observer"></div>
<!--    <div class="page__wrapper">-->
<!--      <div v-for="pageNumber in totalPages"-->
<!--      :key="pageNumber"-->
<!--           class="page"-->
<!--           :class="{-->
<!--        'current-page': page === pageNumber-->
<!--           }"-->
<!--           @click="changePage(pageNumber)"-->
<!--      >{{pageNumber}}</div>-->
<!--    </div>-->
  </div>
</template>

<script>
import PostForm from "./components/PostForm.vue";
import PostList from "./components/PostList.vue";
import axios from "axios";
import MySelect from "./components/UI/MySelect.vue";

export default {
  components: {
    PostForm,
    PostList,
    MySelect,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery:'',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
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
    // changePage(pageNumber){
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts", {
            params:{
              _page: this.page,
              _limit: this.limit,
            }
            }
        );
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
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
            "https://jsonplaceholder.typicode.com/posts", {
              params:{
                _page: this.page,
                _limit: this.limit,
              }
            }
        );
        this.totalPages = Math.ceil(response.headers['x-total-count']/this.limit)
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert("Ошибка");
      }
    },
  },
  mounted() {
    this.fetchPosts();
    this.$refs.observer
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if(entries[0].isIntersecting){
        this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    sortedAndSearchedPosts(){
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch:{
    // page(){
    //   this.fetchPosts()
    // }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.app__btn {
  margin: 15px 0px;
  display: flex;
  justify-content: space-between;
}
.page__wrapper{
  display: flex;
  margin-top: 15px;
}
.page{
  border: 1px solid black;
  padding: 10px;
}
.current-page{
  border: 2px solid teal;
}
.observer{
  height: 30px;
  background: green;
}
</style>
