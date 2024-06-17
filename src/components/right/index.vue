<template>
  <div class="h-1/3 box-border">
    <component
      v-for="item in components"
      :key="item.name"
      :is="item.component"
      :name="item.name"
      :classStr="item.classStr"
      :data="item.data"
    >
    </component>
  </div>
</template>
<script setup>
import { shallowRef } from "vue";
import VerticalBar from "./VerticalBar.vue";
import RingBar from "./RingBar.vue";
import WordCloud from "./WordCloud.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const components = shallowRef([
  {
    name: "verticalBar",
    component: VerticalBar,
    data: props.data.serverData,
  },
  {
    name: "ringBar",
    component: RingBar,
    data: props.data.abnormalData,
  },
  {
    name: "wordCloud",
    component: WordCloud,
    data: props.data.wordCloudData,
  },
]);
</script>
<style scoped></style>
