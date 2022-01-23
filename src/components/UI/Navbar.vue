<template>
<div class="navbar">
  <div @click="$router.push('/')">Vue 3</div>
  <div class="navbar__btns">
    <my-button @click="$router.push('/posts')">Посты</my-button>
    <my-button style="margin-left: 15px" @click="$router.push('/about')">О нас</my-button>
  </div>
</div>
</template>

<script>

export default {
  name: "Navbar",
}
</script>

<style scoped>
.navbar{
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0px 15px;
}
.navbar__btns{
  margin-left: auto;
}
</style>