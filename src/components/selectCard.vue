<template>
  <div class="selectCard" @click.stop="next">{{ value }}: {{ context }}</div>
</template>
<script>
export default {
  name: "selectCard",
  props: {
    value: String,
    context: String,
    active: String,
  },
  methods: {
    next() {
      console.log("next");
      this.$emit("nextPage");
    },
  },
};
</script>
<style lang="scss">
.selectCard {
  color: #583e49;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 50px;
  border: 1px solid #523745;
  background: #fbe996;
  box-shadow: 2px 5px 5px #888888;
  margin: 10px;
  text-align: left;
  p {
    font-family: "Audiowide";
    text-align: center;
    color: #00a67c;
    font-size: 16px;
    -webkit-transition: all 1s ease;
    transition: all 1s ease;
  }
}
</style>