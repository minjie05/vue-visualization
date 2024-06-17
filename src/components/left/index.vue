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
import RadarBar from "./RadarBar.vue";
import HorizontalBar from "./HorizontalBar.vue";
import Relation from "./Relation.vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const components = shallowRef([
  {
    name: "horizontalBar",
    component: HorizontalBar,
    classStr: "w-full h-full h-1/3 box-border pb-4",
    data: props.data.regionData,
  },
  {
    name: "radarBar",
    component: RadarBar,
    classStr: "w-full h-full h-1/3 box-border pb-4",
    data: props.data.riskData,
  },
  {
    name: "relation",
    component: Relation,
    classStr: "h-1/3",
    data: props.data.relationData,
  },
]);
</script>
<style scoped></style>
