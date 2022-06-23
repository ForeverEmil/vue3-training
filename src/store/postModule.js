import axios from "axios";
export const postModule = {
    state: () => ({
        posts: [],
        isPostsLoading: false,
        selected: "",
        searchQuery: "",
        page: 1,
        limit: 10,
        totalPages: 0,
    }),
    getters: {
        sortedPosts(state) {
            if (state.selected === 'id') {
                return [...state.posts].sort((post1, post2) =>
                    post1[state.selected] - post2[state.selected]
                );
            } else {
                return [...state.posts].sort((post1, post2) => post1[state.selected]?.localeCompare(post2[state.selected]));
            }
        },
        sortedAndSearchedPosts(state, getters) {
            if (state.selected === 'title') {
                return getters.sortedPosts.filter((post) =>
                    post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            } else if (state.selected === 'body') {
                return getters.sortedPosts.filter((post) =>
                    post.body.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            } else if (state.selected === 'id') {
                return getters.sortedPosts.filter((post) =>
                    JSON.stringify(post.id).includes(state.searchQuery)
                );
            } else {
                return getters.sortedPosts
            }
        },
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setPostsLoadig(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selected) {
            state.selected = selected;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setTotalPages(state, totalPages) {
            state.totalPages = totalPages;
        },
        removePost(state, payload) {
            state.posts = state.posts.filter((post) => post.id !== payload.id);
        }


    },
    actions: {
        removePost: async (context, payload) => {
            context.commit('removePost', payload);
        },
        async fetchPosts({ state, commit }) {
            try {
                commit('setPostsLoadig', true);
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        },
                    }
                );
                commit('setTotalPages', Math.ceil(response.headers["x-total-count"] / state.limit));
                commit('setPosts', response.data)
            } catch (e) {
                console.log(e);
            } finally {
                commit('setPostsLoadig', false);
            }
        },
        async loadMorePosts({ state, commit }) {
            try {
                commit('setPage', state.page + 1)
                const response = await axios.get(
                    "https://jsonplaceholder.typicode.com/posts",
                    {
                        params: {
                            _page: state.page,
                            _limit: state.limit,
                        },
                    }
                );
                commit('setTotalPages', Math.ceil(
                    response.headers["x-total-count"] / state.limit
                ))
                commit('setPosts', [...state.posts, ...response.data])

            } catch (e) {
                console.log(e);
            }
        },

    },
    namespaced: true
}