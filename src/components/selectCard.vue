<template>
  <div class="selectCard">
    {{context}}
  </div>
</template>
<script>
export default {
  name: "selectCard",
  props:{
      context:String,
  },
};
</script>
<style lang="scss">
.selectCard{
  color:white;
   width: 100px;
   height: 80px;
}

</style>