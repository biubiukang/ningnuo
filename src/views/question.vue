<template>
  <div class="question">
    <!-- <div class="title">{{ title }}</div> -->
    <div class="content">{{ context }}</div>
    <div class="choice">
      <div v-for="(v, index) in Choices" :key="v.label">
        <selectCard
          :context="v.label"
          :value="v.value"
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
  methods: {
    nextPage(index, choice) {
      this.changeCurrentChoice({ index, choice });
      // this.$emit('nextPage')
    },
    ...mapMutations(["changeCurrentChoice"]),
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
.question {
  padding: 12px 16px;
  width: inherit;
  color: #3C2D54;
  position: fixed;
  bottom: 2rem;
  background: url('../assets/img/qblock.png');
  background-size: 100% 100%;
  .content {
    font-size: 20px;
    padding: 5px;
    text-align: left;
  }
  .active {
    color: red;
  }
  .title {
    font-size: 22px;
  }
  .choice {
    
  }
}
</style>