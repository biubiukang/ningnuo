<template>
  <transition name="fade">
    <div class="preloader" v-if="showLoading" :style="computeStyle">
      <div class="preloader-progress" v-html="story" @click="close()">
        <!-- <div class="preloader-progress-bar" :style="{ width: loadPercent + '%' }"> -->
        <!-- </div> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "loadingui",
  data() {
    return {
      loadPercent: 0, //进度百分比
      loadS: 0,
      showLoading: false,
      apiFinish: false,
      intervalObj: null,
      callback: null,
      backgroud: null,
      story: "TEST TEXT",
    };
  },
  computed: {
    computeStyle() {
      if(this.backgroud) {
        return [{ background: `url(${this.backgroud}) no-repeat` },
            { backgroundSize: '100% 100%' }
        ];
      }
      return {}
    },
  },
  mounted() {
    if (this.type === "auto") {
      this.startLoadingAuto();
    }
  },
  methods: {
    startLoadingAuto() {
      this.showLoading = true;
      this.apiFinish = false;
      this.loadPercent = 0;
      this.loadS = 0;
      this.intervalObj = setInterval(this.updateLoadPercentAutoMode, 50);
    },

    updateLoadPercentAutoMode() {
      let s = this.loadS;
      let e = 100 - s;
      if (this.apiFinish) {
        s += 3;
      } else {
        s += 0.05 * Math.pow(1 - Math.sqrt(e), 2);
      }
      this.loadPercent = parseInt(s, 10);
      this.loadS = s;
      if (s >= 100) {
        this.showLoading = false;
        clearInterval(this.intervalObj);
        this.finishLoadingAutoMode();
      }
    },

    close() {
      if (this.type === "auto") {
        this.apiFinish = true;
      } else {
        if (this.intervalObj) {
          clearInterval(this.intervalObj);
        }
        this.showLoading = false;
        if (this.callback) {
          this.callback();
        }
      }
    },

    finishLoadingAutoMode() {
      this.showLoading = false;
      if (this.callback) {
        this.callback();
      }
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}

.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* background-color: rgb(23, 24, 24); */
  text-align: center;

  background-image: linear-gradient(90deg, #52b6ec 10%, #19a9d5 90%);
  z-index: 9999;
  transition: opacity 0.2s;
}

.preloader .preloader-progress {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  width: 90vw;
  height: 60vh;
  /* opacity: 0.2; */
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 20px;
  font-weight: normal;
  margin: auto;
  overflow: auto;
  overflow-wrap: break-word;
  /* background-image: url(loading_empty.png); */
}

.preloader .preloader-progress .preloader-progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  min-width: 10px;
  color: white;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 20px;
  font-weight: normal;
  background-size: 300px 120px;
  width: 50%;
}
</style>
