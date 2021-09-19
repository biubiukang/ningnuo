<template>
  <div class="indexStart">
    <div class="title">1.姓名<br>2.性别<br>3.学院<br>4.专业<br>5.电话<br>6.微信<br>7.理想职业是什么</div>
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
.indexStart {
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