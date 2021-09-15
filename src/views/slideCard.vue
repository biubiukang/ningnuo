/* eslint-disable */
<template>
  <div
    @touchstart="playerTouchStart"
    @touchmove="playerTouchMove"
    @touchend="playerTouchEnd"
    @mousedown="playerTouchStart"
    @mousemove="playerTouchMove"
    @mouseup="playerTouchEnd"
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
          :style="[
            { background: `url(${item.url})` },
            { backgroundSize: 'cover' },
          ]"
        > 
           <Index v-if="item.Id==='index'" @showCityName="slideUp"/>
          <Question v-if="item.Id!=='index'" v-bind="item"></Question>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import itemContext from "./itemContext.vue";
import Index from "./index.vue";
import Question from "./question.vue";
// import Q2 from "./q2.vue";
// import Q3 from "./q3.vue";
// import Q4 from "./q4.vue";
// import Q5 from "./q5.vue";
// import Q6 from "./q6.vue";
import  qs from 'qs'
export default {
  components: {
    itemContext,
    Index,
    Question
  },
  data() {
    return {
      cardArrs: [
        {
          text: "card-1",
          zIndex: 10,
          bgColor: "red",
          url: require("../assets/img/index.jpg"),
          scale: 1,
          translateY: 0,
          transitionTime: 1,
          Id: 'index',
          leftChoice:'立马扔掉手机，起床仔细研究',
          rightChoice:'震惊以后以为自己在做梦，继续睡'
        },
        {
          text: "card-2",
          zIndex: 9,
          bgColor: "blue",
          url: require("../assets/img/q1.jpg"),
          scale: 0.9,
          translateY: "9vh",
          transitionTime: 1,
          title:'Q1',
          context:'铃声响起，你觉得脸上痒痒的，好像有猫咪在舔你. 睁开眼睛，发现你的手机长出了舌头！ 你会....',
          leftChoice:'立马扔掉手机，起床仔细研究',
          rightChoice:'震惊以后以为自己在做梦，继续睡'
        },
        {
          text: "card-3",
          zIndex: 8,
          bgColor: "yellow",
          scale: 0.85,
          url: require("../assets/img/q2.jpg"),
          translateY: "14vh",
          transitionTime: 1,
          title:'Q2',
          context:'出门以后,滑轮四周的树居然都变得光秃秃，只有几朵巨大艳丽得花，所有生物得大小彷佛都颠倒了······一直巨大得诺丁鸭朝你走来，你会',
          leftChoice:'觉得很神奇，远远地和它合照就好',
          rightChoice:'好奇的上前，尝试和诺丁鸭搭讪'
        },
        {
          text: "card-4",
          zIndex: 7,
          bgColor: "green",
          url: require("../assets/imgs/q3.jpeg"),
          scale: 0.5,
          translateY: "40vh",
          transitionTime: 1,
          title:'Q3',
          context:'走过诺丁桥，你看到一个美丽得魔女，但她并没有发现你,一个人坐在图书馆门外草坪。你会：',
          leftChoice:'鼓起勇气，尝试向她询问发生了什么',
          rightChoice:'默默走开，等她发现你之前，现自己探索'
        },
        {
          text: "card-5",
          zIndex: 6,
          bgColor: "gray",
          url: require("../assets/img/q4.jpg"),
          scale: 0.5,
          translateY: "40vh",
          transitionTime: 0,
          title:'Q4',
          context:'魔女与你交谈，他告诉你，这个世界所有事物都混乱了，意味着你不再是学生，可以做自己想做的任何事。你会：',
          leftChoice:'感到有点兴奋',
          rightChoice:'感到有点不安'
        },
        {
          text: "card-6",
          zIndex: 5,
          bgColor: "pink",
          url: require("../assets/img/q5.jpg"),
          scale: 0.5,
          translateY: "40vh",
          transitionTime: 0,
          title:'Q5',
          context:'进入了图书馆，发现空气中漂浮着各种各样的人物职业形象气泡，你好奇地伸手触碰，一阵神奇的 力量涌入了你的身体：你拥有了匹配的技能！但同时，一阵困倦感袭来，你会：',
          leftChoice:'还是尽量多触碰几个感兴趣的气泡，这样的机会可不多',
          rightChoice:'还是要谨慎一点，这事不着急，小命更重要'
        },
        {
          text: "card-7",
          zIndex: 4,
          bgColor: "purple",
          scale: 0.5,
          url: require("../assets/img/q6.jpg"),
          translateY: "40vh",
          transitionTime: 0,
          title:'Q6',
          context:'在一个房间内，你看到了一面魔镜。它对你说：你有一次机会，可以在里面看到 10 年后的自己，但 要注意的是：如果你心里不确定自己会变成什么样，可能会被未来吞噬……你选择： 目的：如果后台能看到此选项数据，可以获知大概的职业规划需求 画面：小人站在魔镜前，魔镜闪闪发光，里面有一个模糊的小人影子',
          leftChoice:'已经有模糊的方向，可以一试',
          rightChoice:'没有较确定的猜想，还是不看了'
        },
      ],
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
    // 滑动开始
    playerTouchStart(ev) {
      ev = ev || event;
      this.isClick = true;
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev?.touches?.length === 1) {
        // 记录开始位置
        this.startY = ev.touches[0].clientY;
        console.log("开始触摸-startY", this.startY);
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
        console.log("滑动-disY", this.disY);
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
      console.log(333)
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
      console.log(url)
			var theRequest = new Object(); 
			if (url.indexOf("?") != -1) {
				var str = url.substr(1); 
				strs = str.split("&"); 
				for(var i = 0; i < strs?.length; i ++) {
					theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
				} 
			} 
			return theRequest; 
		} 


  },
  created(){
  //   const url = window.location.href
  //  let data = qs.parse(url.split('?')[1]);
  //  if(!data.code){
  //      window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35a905e0b2b65a65&redirect_uri=http://nz74fmo5uiz3.ngrok2.xiaomiqiu.cn/&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
  //  }
   // window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx35a905e0b2b65a65&redirect_uri=http://nz74fmo5uiz3.ngrok2.xiaomiqiu.cn/&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect"
  }
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
  height: 12rem;
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
    border-radius: 12px;
  }
}
</style>