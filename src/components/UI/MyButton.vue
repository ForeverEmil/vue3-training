<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "my-button",
};
</script>

<style scoped>
.btn {
  align-self: flex-end;
  padding: 10px 15px;
  position: relative;
  background: none;
  color: #243B67;
  border: 1px solid #243B67;
  margin-right: 8px;
}

.btn::before {
  content: "";
  position: absolute;
  left: 0px;
  bottom: 0;
  top: 0;
  width: 8px;
  height: 100%;
  background: #243B67;
  transition: all 1s;
}

.btn:hover {
  color: white;
  border: 1px solid white;
  background: #243B67;
  box-shadow: 2px 2px 4px #243B67;
}

.btn:hover::before {
  width: 12px;
  background: white;
}
</style>