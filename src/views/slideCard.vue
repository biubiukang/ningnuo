/* eslint-disable */
<template>
  <div
    @touchstart.stop="playerTouchStart"
    @touchmove.stop="playerTouchMove"
    @touchend.stop="playerTouchEnd"
    @mousedown.stop="playerTouchStart"
    @mousemove.stop="playerTouchMove"
    @mouseup.stop="playerTouchEnd"
    class="container"
  >
    <div class="card-wrapper">
      <div
        class="card-item"
        v-for="(item, index) in cardArrs"
        :key="index"
        :style="[
          { zIndex: item.zIndex },
          {
            transform: `scale(${item.scale}) translate3d(0px, ${item.translateY}, 0px)`,
          },
          { transition: `transform ${item.transitionTime}s ease 0s` },
        ]"
      >
        <div
          class="item-inner"
          :class="isStart ? 'item-inner-animation' : ''"
          :style="[
            { background: `url(${item.url})` },
            { backgroundSize: 'cover' },
          ]"
        >
        <Question v-bind="item" @nextPage="nextPage"></Question>
        <Index v-if="item.Id === 'profile'" @start="start" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Index from "./index.vue";
import Question from "./question.vue";
import { mapState } from 'vuex'
// import Q2 from "./q2.vue";
// import Q3 from "./q3.vue";
// import Q4 from "./q4.vue";
// import Q5 from "./q5.vue";
// import Q6 from "./q6.vue";
import qs from "qs";
export default {
  components: {
    Index,
    Question,
  },
  computed:{
    ...mapState([
      'cardArrs'
     ]),
  },
  data() {
    return {
      storys: {
        's1': "校园奇妙⽇： 翌⽇，醒来后，你 发现宁诺的校园 ⾥，充斥着不寻常 的⽓氛…… 宁诺居然变成了魔 法学校？",
        's4': "⾛过诺丁桥",
        's7': "正在分析你的校园 魔法⼈格…… xx（昵称）的魔法 职业为xxx 这样的职业仅占宁 诺的 xx%",
      },
      isStart: false,
      isClick: true,
      startY: 0, // 触摸位置
      endY: 0, // 结束位置
      moveY: 0, // 滑动时的位置
      disY: 0, // 移动距离
      slideDistance: 40, // 滑动触发切换还是回位的阀值
      currentIndex: 0, // 当前第一个的 index
      slideDirection: 0, // 滑动方向：0 向下，1 向上
      slideFilishDistance: 300, // 滑动切换动画完成的距离
    };
  },
  methods: {
    start() {
      this.slideUp();
    },
    nextPage() {
      console.log(111);
      this.slideUp();
    },
    // 滑动开始
    playerTouchStart(ev) {
      ev = ev || event;
      this.isClick = true;
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev?.touches?.length === 1) {
        // 记录开始位置
        this.startY = ev.touches[0].clientY;
      }
    },
    // 滑动中
    playerTouchMove(ev) {
      ev = ev || event;
      this.isClick = false;
      if (ev?.touches?.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveY = ev.touches[0].clientY;
        // 起始位置减去实时的滑动的距离,得到手指实时偏移距离
        this.disY = this.startY - this.moveY;
        // 判断滑动方向
        if (this.disY < 0) {
          // 向下滑
          this.slideDirection = 0;
          // 当前上一个变化
          if (this.cardArrs[this.currentIndex - 1]) {
            let item_0 = this.cardArrs[this.currentIndex - 1];
            item_0.translateY = -window.innerHeight - this.disY + "px";
            item_0.transitionTime = 0;
            if (-this.disY <= this.slideFilishDistance) {
              item_0.scale =
                -(0.2 / this.slideFilishDistance) * this.disY + 0.8;
            }
          }
          // 当前第一个变化
          let item_1 = this.cardArrs[this.currentIndex];
          if (-this.disY <= this.slideFilishDistance) {
            item_1.translateY =
              -(9 / this.slideFilishDistance) * this.disY + "vh";
            item_1.transitionTime = 0;
            item_1.scale = (0.1 / this.slideFilishDistance) * this.disY + 1;
          }
          // 当前第二个变化
          if (this.cardArrs[this.currentIndex + 1]) {
            let item_2 = this.cardArrs[this.currentIndex + 1];
            if (-this.disY <= this.slideFilishDistance) {
              item_2.translateY =
                -(5 / this.slideFilishDistance) * this.disY + 9 + "vh";
              item_2.transitionTime = 0;
              item_2.scale =
                (0.05 / this.slideFilishDistance) * this.disY + 0.9;
            }
          }
          // 当前第三个变化
          if (this.cardArrs[this.currentIndex + 2]) {
            let item_3 = this.cardArrs[this.currentIndex + 2];
            if (-this.disY <= this.slideFilishDistance) {
              item_3.translateY =
                -(26 / this.slideFilishDistance) * this.disY + 14 + "vh";
              item_3.transitionTime = 0;
              item_3.scale =
                (0.35 / this.slideFilishDistance) * this.disY + 0.85;
            }
          }
        } else if (this.disY > 0) {
          // 向上滑
          this.slideDirection = 1;
          // 当前第一个变化
          let item_1 = this.cardArrs[this.currentIndex];
          item_1.translateY = -this.disY + "px";
          item_1.transitionTime = 0;
          item_1.scale = 1;
          // 当前第二个变化
          if (this.cardArrs[this.currentIndex + 1]) {
            let item_2 = this.cardArrs[this.currentIndex + 1];
            if (this.disY <= this.slideFilishDistance) {
              item_2.translateY =
                -(9 / this.slideFilishDistance) * this.disY + 9 + "vh";
              item_2.transitionTime = 0;
              item_2.scale = (0.1 / this.slideFilishDistance) * this.disY + 0.9;
            }
          }
          // 当前第三个变化
          if (this.cardArrs[this.currentIndex + 2]) {
            let item_3 = this.cardArrs[this.currentIndex + 2];
            if (this.disY <= this.slideFilishDistance) {
              item_3.translateY =
                -(5 / this.slideFilishDistance) * this.disY + 14 + "vh";
              item_3.transitionTime = 0;
              item_3.scale =
                (0.05 / this.slideFilishDistance) * this.disY + 0.85;
            }
          }
          // 当前第四个变化
          if (this.cardArrs[this.currentIndex + 3]) {
            let item_4 = this.cardArrs[this.currentIndex + 3];
            if (this.disY <= this.slideFilishDistance) {
              item_4.translateY =
                -(26 / this.slideFilishDistance) * this.disY + 40 + "vh";
              item_4.transitionTime = 0;
              item_4.scale =
                (0.35 / this.slideFilishDistance) * this.disY + 0.5;
            }
          }
        }
      }
    },
    // 滑动结束
    playerTouchEnd(ev) {
      ev = ev || event;
      if (ev?.changedTouches?.length === 1) {
        this.endY = ev.changedTouches[0].clientY;
        console.log("滑动结束-endY", this.endY);
        this.disY = this.startY - this.endY;
        if (Math.abs(this.disY) < this.slideDistance) {
          // 滑动距离小于滑动限制的距离,强行回到起点
          this.returnBack();
        } else {
          // 滑动距离大于滑动限制的距离,滑动到最大值
          if (this.slideDirection === 1) {
            this.slideUp();
          } else {
            this.slideDown();
          }
        }
      }

      if ([1, 4, 7].includes(this.currentIndex)) {
        let loadingui = this.$loadingui({
          type: "auto",
          story: this.storys["s" + this.currentIndex],
          callback: () => {
            // eslint-disable-next-line no-console
            console.log("finish");
          },
        });
        let percent = 0;
        let obj = setInterval(() => {
          percent += 3;
          if (percent >= 50) {
            loadingui.close();
            clearInterval(obj);
          }
        }, 200);
      }
    },
    // 回到起点
    returnBack() {
      // 当前第一个变化
      let item_1 = this.cardArrs[this.currentIndex];
      item_1.translateY = 0;
      item_1.transitionTime = 1;
      item_1.scale = 1;
      // 当前第二个变化
      if (this.cardArrs[this.currentIndex + 1]) {
        let item_2 = this.cardArrs[this.currentIndex + 1];
        item_2.translateY = "9vh";
        item_2.transitionTime = 1;
        item_2.scale = 0.9;
      }
      // 当前第三个变化
      if (this.cardArrs[this.currentIndex + 2]) {
        let item_3 = this.cardArrs[this.currentIndex + 2];
        item_3.translateY = "14vh";
        item_3.transitionTime = 1;
        item_3.scale = 0.85;
      }
      // 当前第四个变化
      if (this.cardArrs[this.currentIndex + 3]) {
        let item_4 = this.cardArrs[this.currentIndex + 3];
        item_4.translateY = "40vh";
        item_4.transitionTime = 1;
        item_4.scale = 0.5;
      }
    },
    // 向上滑动切换
    slideUp() {
      console.log(333);
      if (this.currentIndex === this.cardArrs?.length - 1) {
        return this.returnBack();
      }
      // 当前第一个变化
      let item_1 = this.cardArrs[this.currentIndex];
      item_1.translateY = "-160vh";
      item_1.transitionTime = 1;
      item_1.scale = 0.5;
      // 当前第二个变化
      if (this.cardArrs[this.currentIndex + 1]) {
        let item_2 = this.cardArrs[this.currentIndex + 1];
        item_2.translateY = 0;
        item_2.transitionTime = 1;
        item_2.scale = 1;
      }
      // 当前第三个变化
      if (this.cardArrs[this.currentIndex + 2]) {
        let item_3 = this.cardArrs[this.currentIndex + 2];
        item_3.translateY = "9vh";
        item_3.transitionTime = 1;
        item_3.scale = 0.9;
      }
      // 当前第四个变化
      if (this.cardArrs[this.currentIndex + 3]) {
        let item_4 = this.cardArrs[this.currentIndex + 3];
        item_4.translateY = "14vh";
        item_4.transitionTime = 1;
        item_4.scale = 0.85;
      }
      this.currentIndex++;
      if (this.currentIndex > this.cardArrs?.length - 1) {
        this.currentIndex = this.cardArrs?.length - 1;
      }
      console.log("currentIndex---", this.currentIndex);
    },
    // 向下滑动切换
    slideDown() {
      if (this.currentIndex === 0) {
        return this.returnBack();
      }
      // 当前上一个变化
      if (this.cardArrs[this.currentIndex - 1]) {
        let item_0 = this.cardArrs[this.currentIndex - 1];
        item_0.translateY = 0;
        item_0.transitionTime = 0.6;
        item_0.scale = 1;
      }
      // 当前第一个变化
      let item_1 = this.cardArrs[this.currentIndex];
      item_1.translateY = "9vh";
      item_1.transitionTime = 0.6;
      item_1.scale = 0.9;
      // 当前第二个变化
      if (this.cardArrs[this.currentIndex + 1]) {
        let item_2 = this.cardArrs[this.currentIndex + 1];
        item_2.translateY = "14vh";
        item_2.transitionTime = 0.6;
        item_2.scale = 0.85;
      }
      // 当前第三个变化
      if (this.cardArrs[this.currentIndex + 2]) {
        let item_3 = this.cardArrs[this.currentIndex + 2];
        item_3.translateY = "40vh";
        item_3.transitionTime = 0.6;
        item_3.scale = 0.5;
      }
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
      console.log("currentIndex---", this.currentIndex);
    },
    /* 获取url中的参数方法 */
    GetRequest() {
      var url = window.location.href; //获取url中"?"符后的字串
      console.log(url);
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs?.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    },
  },
  created() {
    //   const url = window.location.href
    //  let data = qs.parse(url.split('?')[1]);
    //  if(!data.code){
    //      window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35a905e0b2b65a65&redirect_uri=http://nz74fmo5uiz3.ngrok2.xiaomiqiu.cn/&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
    //  }
    // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35a905e0b2b65a65&redirect_uri=http://nz74fmo5uiz3.ngrok2.xiaomiqiu.cn/&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
  },
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  padding-top: 4px;
}
.card-wrapper {
  position: relative;
  height: calc(65vh + 30px);
}
.card-item {
  position: absolute;
  width: 100%;
  height: 18rem;
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