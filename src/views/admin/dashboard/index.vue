<template>
  <div style="padding: 0.5rem">
    <NavCards
      :total="data.cardTotal"
      :value="data.cardValue"  />
    <div class="pie-echart">
      <FlowAnalysis />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from 'vue';
import NavCards from './components/NavCards.vue';
import FlowAnalysis from './components/FlowAnalysis.vue';
import { CardValue } from './components/data';
import { getStatistic } from '@/api/admin/dashboard';
export default defineComponent({
  name: 'Dashboard',
  components: { NavCards, FlowAnalysis },
  props: {
  },
  setup() {
    const data = ref({
      cardValue: {} as CardValue,
      cardTotal: {} as CardValue,
    });
    const handleCard = function () {
      getStatistic().then((res) => {
        data.value.cardValue = res.value;
        data.value.cardTotal = res.total;
      });
    };
    handleCard();
    return {
      data,
      ...toRefs(data),
    };
  }
});
</script>

<style lang="scss" scoped>
.pie-echart{
  margin-top: 10px;
  padding: 6px;
  width: calc(100%);
}
</style>
