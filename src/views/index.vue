<template>
  <div class="index">
    <div class="title">Demo</div>
    <div>
      <button class="button" @click.stop="start"><span>开始测试</span></button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  props: {
    title: String,
    context: String,
  },
  methods:{
      start(){
        console.log('start')
        this.$emit('start');
      }
  }
};
</script>
<style lang="scss">
.index {
  padding-top: 50px;
  .title {
    color: white;
  }
  .button {
    display: inline-block;
    border-radius: 4px;
    background-color: #f4511e;
    border: none;
    color: #ffffff;
    text-align: center;
    font-size: 28px;
    padding: 10px;
    width: 200px;
    transition: all 0.5s;
    cursor: pointer;
    vertical-align: middle;
    margin-top: 250px;
  }
}
</style>