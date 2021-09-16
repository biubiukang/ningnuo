<template>
    <div class="preloader" v-if="showLoading">
        <div class="preloader-progress">
            <div class="preloader-progress-bar" :style="{ width: loadPercent + '%' }">
                {{ story }}
            </div>
        </div>
    </div>
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
                story: 'TEST TEXT'
            }
        },
        mounted() {
            if (this.type === 'auto') {
                this.startLoadingAuto()
            }
        },
        methods: {
            startLoadingAuto() {
                this.showLoading = true
                this.apiFinish = false
                this.loadPercent = 0
                this.loadS = 0
                this.intervalObj = setInterval(this.updateLoadPercentAutoMode, 50)
            },

            updateLoadPercentAutoMode() {
                let s = this.loadS
                let e = 100 - s;
                if (this.apiFinish) {
                    s += 3
                } else {
                    s += .05 * Math.pow(1 - Math.sqrt(e), 2)
                }
                this.loadPercent = parseInt(s, 10)
                this.loadS = s
                if (s >= 100) {
                    this.showLoading = false
                    clearInterval(this.intervalObj)
                    this.finishLoadingAutoMode()
                }
            },

            close() {
                if (this.type === 'auto') {
                    this.apiFinish = true
                } else {
                    if (this.intervalObj) {
                        clearInterval(this.intervalObj)
                    }
                    this.showLoading = false
                    if (this.callback) {
                        this.callback()
                    }
                }
            },

            finishLoadingAutoMode() {
                this.showLoading = false
                if (this.callback) {
                    this.callback()
                }
            },
        }
    }
</script>

<style scoped>

    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(23, 24, 24, 0.95);

        /* background-image: linear-gradient(90deg,#52b6ec 10%,#19a9d5 90%); */
        z-index: 9999;
        transition: opacity .65s;
    }

    .preloader .preloader-progress {
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        width: 300px;
        height: 120px;
        /* opacity: 0.2; */
        color: white;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 20px;
        font-weight: normal;
        background-size: 300px 120px;
        width: 50%;
    }
</style>
