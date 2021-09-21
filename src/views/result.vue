<template>
  <div class="index">
    <div class="card-item" :style="[
            { background: `url(${imgurl})` },
            { backgroundSize: '100% 100%' },
          ]">
      
    </div>
  </div>
</template>
<script>
export default {
  name: "Result",
  data() {
    return {
      tagMap: {
        '魔法狂人': '../assets/0916/结果1.jpg',
        '角斗之王': '../assets/0916/结果2.jpg',
        '发明专家': '../assets/0916/结果3.jpg',
        '符咒专家': '../assets/0916/结果4.jpg',
        '学院之星': '../assets/0916/结果5.jpg',
        '外交首席': '../assets/0916/结果6.jpg',
        '魔灵之首': '../assets/0916/结果7.jpg',
        '首席秘书': '../assets/0916/结果8.jpg'
      },
      imgurl: require(tagMap[this.$route.params.myTag])
    };
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