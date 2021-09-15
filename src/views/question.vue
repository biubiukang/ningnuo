<template>
  <div class="index">
    <div class="title">{{title}}</div>
     <div class="content">{{context}}</div>
     <div class="choice">
       <selectCard :context="leftChoice"></selectCard>
      <selectCard :context="rightChoice"></selectCard>
     </div>
     
  </div>
</template>
<script>
import selectCard from '../components/selectCard.vue'
export default {
  name: "Index",
  components:{
    selectCard
  },
  props:{
      title:String,
      context:String,
      leftChoice:String,
      rightChoice:String
  },
};
</script>
<style lang="scss">
.index{
  color:white;
   .content{
     padding: 5px;
 }
 .choice{
   display: flex;
   justify-content: space-around;
 }
}

</style>