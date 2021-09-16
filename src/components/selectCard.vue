<template>
  <div class="selectCard" @click.stop="next">
    {{context}}
  </div>
</template>
<script>
export default {
  name: "selectCard",
  props:{
      context:String,
      active:String
  },
  methods:{
    next() {
      console.log('next')
      this.$emit('nextPage')
    }
  }
};
</script>
<style lang="scss">
.selectCard{
  margin-top:200px;
  color:white;
  max-width: 120px;
  p {
    font-family: 'Audiowide';
    text-align: center;
    color: #00a67c;
    font-size: 16px;
    -webkit-transition: all 1s ease;
            transition: all 1s ease;
}
// p:hover {
//     color: #fff;
//     -webkit-animation: Glow 1s ease infinite alternate;
//             animation: Glow 1s ease infinite alternate;

// }
// @-webkit-keyframes Glow {
//     from {
//         text-shadow: 0 0 10px #fff,
//                      0 0 20px #fff,
//                      0 0 30px #fff,
//                      0 0 40px #00a67c,
//                      0 0 70px #00a67c,
//                      0 0 80px #00a67c,
//                      0 0 100px #00a67c,
//                      0 0 150px #00a67c;
//     }
//     to {
//         text-shadow: 0 0 5px #fff,
//                      0 0 10px #fff,
//                      0 0 15px #fff,
//                      0 0 20px #00a67c,
//                      0 0 35px #00a67c,
//                      0 0 40px #00a67c,
//                      0 0 50px #00a67c,
//                      0 0 75px #00a67c;
//     }
// }
// @keyframes Glow {
//     from {
//         text-shadow: 0 0 10px #fff,
//                      0 0 20px #fff,
//                      0 0 30px #fff,
//                      0 0 40px #00a67c,
//                      0 0 70px #00a67c,
//                      0 0 80px #00a67c,
//                      0 0 100px #00a67c,
//                      0 0 150px #00a67c;
//     }
//     to {
//         text-shadow: 0 0 5px #fff,
//                      0 0 10px #fff,
//                      0 0 15px #fff,
//                      0 0 20px #00a67c,
//                      0 0 35px #00a67c,
//                      0 0 40px #00a67c,
//                      0 0 50px #00a67c,
//                      0 0 75px #00a67c;
//     }
// }
}

</style>