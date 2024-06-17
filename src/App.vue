<template>
  <div
    class="bg-[url('assets/imgs/bg.jpg')] bg-cover bg-center h-screen text-white p-5 flex overflow-hidden"
    v-if="data"
  >
    <!--左-->
    <div class="flex-1 mr-5 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <Left :data="data" />
      <!--横向柱状图-->
      <!--雷达图-->
      <!--关系图-->
    </div>
    <!--中-->
    <div class="w-1/2 mr-5 flex flex-col">
      <!--数据总览图-->
      <TotalData
        class="bg-opacity-50 bg-slate-800 p-3"
        :data="data.totalData"
      />
      <!--地图可视化-->
      <MapChart
        class="bg-opacity-50 bg-slate-800 p-3 mt-2 flex-1"
        :data="data.mapData"
      />
    </div>
    <!--右-->
    <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
      <Right :data="data" />
      <!--竖向柱状图-->
      <!--环型图-->
      <!--文档云图-->
    </div>
  </div>
</template>

<script setup>
import TotalData from "@/components/center/TotalData.vue";
import MapChart from "@/components/center/MapChart.vue";
import Left from "@/components/left/index.vue";
import Right from "@/components/right/index.vue";
import { ref } from "vue";

import { getVisualization } from "./api/visualization";

const data = ref(null);
const loadData = async () => {
  data.value = await getVisualization();
};

setInterval(() => {
  loadData();
}, 3000);
</script>

<style scoped></style>
