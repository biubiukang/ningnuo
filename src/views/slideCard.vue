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
        v-for="(item, cindex) in cardArrs"
        :key="cindex"
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
            { background: `url(${item.url}) no-repeat` },
            { backgroundSize: '100% 100%' },
          ]"
        >
          <div v-for="(i, comindex) in item.components" :key="comindex">
            <div
              :style="[
                { background: `url(${i.img}) no-repeat` },
                { backgroundSize: 'contain' },
              ]"
              :class="[i.name]"
              @click="start(i.click2next)"
            ></div>
          </div>
          <Userinfo v-if="item.Id === 'profile'" />
          <transition name="fade">
            <div :class="[come ? 'come' : '']">
              <Question
                v-if="!item.noQ && show"
                v-bind="item"
                v-bind:itemIndex="cindex"
                @nextPage="nextPage"
              ></Question>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Userinfo from "./userinfo.vue";
import Question from "./question.vue";
import { postAnswer } from "@/api/user";
import store from "@/store";
import { Toast } from "vant";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  components: {
    Userinfo,
    Question,
  },
  computed: {
    ...mapState(["cardArrs"]),
    ...mapGetters(["getCurrentChoiceByIndex"]),
  },
  data() {
    return {
      show: false,
      storys: {
        s1: "校园奇妙⽇</br></br></br>翌日，你从睡梦中醒来</br></br>你发现宁诺的校园里</br></br>充斥着不寻常的⽓氛</br></br>宁诺居然变成了</br></br>魔法学院",
        s3: "⾛过诺丁桥",
        end:
          "正在分析你的魔法人格</br>……</br></br>" +
          store.getters.userInfo.nickName +
          "的魔法职业是……</br></br>" +
          Math.round(Math.random() * 20 + 5) +
          "%的UNNCer拥有和你同样的魔法</br></br></br>获取职业卡片保存到相册</br></br>联系魔法教授</br></br>让他帮你寻找同频人吧",
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
    start(flag) {
      if (flag) {
        this.slideUp();
      }
    },
    nextPage() {
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
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 2000);
      if ([1, 3].includes(this.currentIndex)) {
        var _this = this;
        let loadingui = this.$loadingui({
          type: "auto",
          story: this.storys["s" + this.currentIndex],
          callback: () => {
            // eslint-disable-next-line no-console
            if (_this.currentIndex == _this.cardArrs.length - 1) {
              _this.$router.push({
                name: "Result",
                param: {
                  id: "xxx",
                },
              });
            }
          },
        });
        let obj = setInterval(
          () => {
            loadingui.close();
            clearInterval(obj);
          },
          this.currentIndex == 3 ? 1000 : 5000
        );
      }
      if (this.currentIndex == this.cardArrs.length - 1) {
        var _this = this;
        let loadingui = this.$loadingui({
          type: "auto",
          story: this.storys["end"],
          backgroud: require("../assets/img/resultback.jpg"),
          callback: () => {
            // eslint-disable-next-line no-console

            var answer =
              _this.getCurrentChoiceByIndex(2) +
              _this.getCurrentChoiceByIndex(3) +
              _this.getCurrentChoiceByIndex(4) +
              _this.getCurrentChoiceByIndex(5) +
              _this.getCurrentChoiceByIndex(6) +
              _this.getCurrentChoiceByIndex(7);

            postAnswer({
              option: answer,
            })
              .then((res) => {
                Toast.clear();
                const info = res.data;
                if (res.code && res.code !== 200) {
                  Toast({
                    message: res.msg,
                  });
                } else {
                  _this.$router.push({
                    name: "Result",
                    param: {
                      tag: info.myTag,
                    },
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          },
        });
        let obj = setInterval(() => {
          loadingui.close();
          clearInterval(obj);
        }, 5000);
      }
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
      if (
        !this.cardArrs[this.currentIndex - 1].noQ &&
        !this.getCurrentChoiceByIndex(this.currentIndex - 1)
      ) {
        Toast.clear();
        Toast({
          message: "请先回答这道题~",
        });
        this.slideDown();
      }
    },
    // 向下滑动切换
    slideDown() {
      this.show = false;
      setTimeout(() => {
        this.show = true;
      }, 2000);
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
    this.come = false;
    setTimeout(() => {
      // 取消晃动样式
      this.come = true;
    }, 800);
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
  height: 90vh;
}
.ent {
  position: absolute;
  bottom: 5%;
  left: 25%;
  width: 200px;
  height: 240px;
  animation: heartBeat 2s infinite;
}
.come {
  animation: backInRight 3s;
}
.fl1 {
  position: absolute;
  top: 35%;
  left: -6%;
  width: 100px;
  height: 200px;
  animation: swing 3s infinite;
}
.fl2 {
  position: absolute;
  top: 10%;
  right: -10px;
  width: 100px;
  height: 200px;
  animation: swing 2s infinite;
}
.ws {
  position: absolute;
  top: 10%;
  right: 5%;
  width: 200px;
  height: 120px;
  background-size: contain;
  animation: zoomOutLeft 5s infinite;
}
.ws1 {
  position: absolute;
  top: 5%;
  right: 15%;
  width: 200px;
  height: 120px;
  background-size: contain;
  animation: zoomOutLeft 4s infinite;
}
.ws2 {
  position: absolute;
  top: 15%;
  right: -5%;
  width: 120px;
  height: 80px;
  background-size: contain;
  animation: zoomOutLeft 3.5s infinite;
}
.enter {
  position: absolute;
  bottom: 0%;
  right: 20%;
  width: 150px;
  height: 100px;
}
.phone {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 250px;
  height: 150px;
  background-size: contain;
  animation: bounce 3s infinite; /* referring directly to the animation's @keyframe declaration */
}
.monv {
  position: absolute;
  bottom: 0;
  width: 300px;
  height: 500px;
  animation: shakeX 5s infinite;
}
.student {
  position: absolute;
  right: 0;
  width: 100%;
  height: 100vh;
  border-radius: 15px;
  animation: pulse 3s infinite;
}
.F1 {
  width: 160px;
  height: 160px;
  position: absolute;
  right: 0;
  animation: rubberBand 3s infinite;
}
.F2 {
  position: absolute;
  left: 0;
  top: 150px;
  width: 140px;
  height: 140px;
  animation: rubberBand 3s infinite;
}
.F3 {
  position: absolute;
  right: 0;
  top: 200px;
  width: 140px;
  height: 140px;
  animation: headShake 3s infinite;
}
.F4 {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  bottom: 0;
  animation: headShake 3s infinite;
}
.F5 {
  position: absolute;
  right: 50px;
  bottom: 100px;
  width: 120px;
  height: 120px;
  animation: headShake 3s infinite;
}
.F6 {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0px;
  bottom: 0;
  animation: rubberBand 3s infinite;
}
.mojing {
  width: 55%;
  height: 60vh;
  position: absolute;
  bottom: 100px;
  left: 25%;
  animation: flipInY 5s infinite;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
.card-item {
  position: absolute;
  width: 100%;
  height: 100vh;
  text-align: center;
  font-size: 18px;
  border-radius: 5px;
  will-change: transform;
  overflow: hidden;
  .item-inner {
    overflow: hidden;
    box-sizing: border-box;
    width: 95vw;
    height: 100%;
    padding: 0 18px;
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