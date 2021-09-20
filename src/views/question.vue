<template>
  <div class="question">
    <!-- <div class="title">{{ title }}</div> -->
    <div class="content">{{ context }}</div>
    <div class="choice">
      <div v-for="(v, index) in Choices" :key="v.label">
        <selectCard
          :context="v.label"
          :value="v.title"
          :class="{ active: getCurrentChoiceByIndex(itemIndex) == v.value }"
          @nextPage="nextPage(itemIndex, v.value)"
        ></selectCard>
      </div>
    </div>
  </div>
</template>
<script>
import selectCard from "../components/selectCard.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "Question",
  components: {
    selectCard,
  },
  computed: {
    ...mapGetters(["getCurrentChoiceByIndex"]),
  },
  mounted() {
  },
  methods: {
    nextPage(index, choice) {
      this.changeCurrentChoice({ index, choice });
      this.$emit('nextPage')
    },
    ...mapMutations(["changeCurrentChoice"]),
  },
  props: {
    title: String,
    context: String,
    Choices: Array,
    itemIndex: Number
  },
};
</script>
<style lang="scss">
.question {
  padding: 16px 24px;
  color: #3C2D54;
  position: fixed;
  left:0;
  bottom: 2rem;
  background: url('../assets/img/qblock.png');
  background-size: 100% 100%;
  .content {
    font-size: 20px;
    padding: 8px;
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