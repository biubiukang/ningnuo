<template>
  <div class="index">
    <div class="title">宁诺大学</div>
    <div>
      <button class="button" @click.stop="start"><span>点击测试</span></button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Index",
  props:{
      title:String,
      context:String,
  },
  methods:{
      start(){
          console.log('start')
        this.$emit('showCityName');
      }
  }
};
</script>
<style lang="scss">
.index {
    padding-top:50px;
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
  .button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
  }
  .button span:after {
    content: "»";
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
  }
  .button:hover span {
    padding-right: 25px;
  }
  .button:hover span:after {
    opacity: 1;
    right: 0;
  }
}
</style>