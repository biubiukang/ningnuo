<template>
  <div class="index">
    <div class="title">{{ title }}</div>
    <div class="content">{{ context }}</div>
    <div class="choice">
      <div v-for="(v, index) in Choices" :key="v.label">
        <selectCard
          :context="v.label"
          :class="{ active: getCurrentChoiceByIndex(index) == v.value }"
          @nextPage="nextPage(index, v.value)"
        ></selectCard>
      </div>
      <!-- <selectCard :context="leftChoice" @nextPage="nextPage"></selectCard>
      <selectCard :context="rightChoice" @nextPage="nextPage"></selectCard> -->
    </div>
  </div>
</template>
<script>
import selectCard from "../components/selectCard.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Index",
  components: {
    selectCard,
  },
  computed: {
    ...mapGetters(["getCurrentChoiceByIndex"]),
  },
  mounted() {
    console.log(this.getCurrentChoiceByIndex(1));
  },
<<<<<<< HEAD
  methods: {
    nextPage(index, choice) {
      this.changeCurrentChoice({ index, choice });
      // this.$emit('nextPage')
    },
    ...mapMutations(["changeCurrentChoice"]),
=======
  methods:{
    start(){
          console.log('start')
        this.$emit('showCityName');
      },
    nextPage(index,choice){
      this.changeCurrentChoice({index,choice})
      this.$emit('nextPage')
    },...mapMutations([
      'changeCurrentChoice'
    ])
>>>>>>> 提交
  },
  props: {
    title: String,
    context: String,
    Choices: Array,
    leftChoice: String,
    rightChoice: String,
  },
};
</script>
<style lang="scss">
.index {
  color: white;
  .content {
    font-size: 20px;
    padding: 5px;
  }
  .active {
    color: red;
  }
  .title {
    font-size: 22px;
  }
  .choice {
    display: flex;
    justify-content: space-around;
  }
}
</style>