<template>
  <div class="w-full h-full pb-4">
    <div>【大区数据信息】</div>
    <div ref="target" class="w-full h-full">
      <v-chart ref="chartRef" :option="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const options = ref({
  // x轴展示数据
  // x轴作为数据展示
  xAxis: {
    show: false,
    type: "value",
    max: function (value) {
      // 设置最大值
      return parseInt(value.max * 1.2);
    },
  },
  // y轴展示数据
  yAxis: {
    type: "category",
    data: props.data.regions.map((item) => item.name),
    inverse: true, // 反向展示
    axisLine: {
      show: false, // y轴也不展示轴线
    },
    axisTick: {
      show: false, // 不展示刻度
    },
    axisLabel: {
      color: "#9eb1c8", // label颜色
    },
  },
  // 图表绘制位置,对应 上下左右
  grid: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    containLabel: true, // 计算的时候包含标签
  },
  // 核心配置
  series: [
    {
      type: "bar", // 图表的类型，柱形图
      data: props.data.regions.map((item) => ({
        name: item.name,
        value: item.value,
      })),
      showBackground: true, // 展示每条柱的背景
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)", // 每条柱的背景色
      },
      itemStyle: {
        // 每个轴的样式
        color: "#479AD3",
        barBorderRadius: 5, // 轴的圆角
        shadowColor: "rgba(0,0,0,0.3)", // 阴影
        shadowBlur: 5,
      },
      barWidth: 12, // 每个轴的宽度
      label: {
        // 每个轴右边的lable样式
        show: true,
        position: "right",
        textStyle: {
          color: "#fff",
          // 字体
        },
      },
    },
  ],
});

console.log("props---", props);
</script>

<style></style>
