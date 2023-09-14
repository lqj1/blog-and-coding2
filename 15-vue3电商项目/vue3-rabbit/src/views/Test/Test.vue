<template>
  <div class="item-container">
    <div class="item" v-for="n in 5000" :key="n"></div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.item-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 3px solid #f40;
}
.item {
  width: 5px;
  height: 3px;
  background-color: #ccc;
  margin: 2px;
}
</style>