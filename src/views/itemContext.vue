<template>
  <div><slot ></slot>
    点点滴滴
  </div>
</template>
<script>
export default {
  name: "itemContext",
  props:{
    item
  },
  created(){
    console.log(item)
  }
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>