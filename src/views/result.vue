<template>
  <div class="index">
    <div class="card-item" :style="computeStyle"></div>
    <div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
  computed: {
    computeStyle() {
      console.log(this.$route.params.tag);
      var img = [
       "assets/img/tag/1.jpg",
       "assets/img/tag/2.jpg",
       "assets/img/tag/3.jpg",
       "assets/img/tag/4.jpg",
       "assets/img/tag/5.jpg",
       "assets/img/tag/6.jpg",
       "assets/img/tag/7.jpg",
       "assets/img/tag/8.jpg",
      ][this.$route.params.tag];
      return [
        {
          background: `url("${require('@/' + img)}") no-repeat`,
        },
        { backgroundSize: "100% 100%" },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.card-wrapper {
  position: relative;
  height: calc(65vh + 30px);
}
.card-item {
  position: absolute;
  width: 100%;
  height: 100vh;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  will-change: transform;
  .item-inner {
    width: 90vw;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0 4px 12px 1px rgba(57, 57, 57, 0.14);
    position: relative;
    border-radius: 15px;
  }
  .item-inner-animation {
    animation: mymove 3s ease;
    -webkit-animation: mymove 3s linear;
  }
  @keyframes mymove {
    0% {
      transform: scale(1); /*开始为原始大小*/
    }

    25% {
      transform: scale(1.1); /*放大1.1倍*/
    }

    50% {
      transform: scale(1.2);
    }

    75% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1.4);
    }
  }
}
</style>