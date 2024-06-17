<template>
  <div class="h-full w-full pb-4">
    <div>【服务资源占用比】</div>
    <div ref="target" class="w-full h-full">
      <v-chart ref="chartRef" :option="options" />
    </div>
  </div>
</template>

<script setup>
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
    type: "category",
    data: props.data.servers.map((item) => item.name),
    axisLabel: {
      color: "#9eb1c8", // label颜色
    },
  },
  // y轴展示数据
  yAxis: {
    show: false,
    type: "value",
    max: function (value) {
      // 设置最大值
      return parseInt(value.max * 1.2);
    },
  },
  // 图表绘制位置,对应 上下左右
  grid: {
    top: 16,
    right: 0,
    bottom: 26,
    left: -26,
    containLabel: true, // 计算的时候包含标签
  },
  // 核心配置
  series: [
    {
      type: "bar", // 图表的类型，柱形图
      data: props.data.servers.map((item) => ({
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
        position: "top", // label显示在顶部
        textStyle: {
          color: "#fff",
          // 字体
        },
        formatter: "{c}%", // label数字加上%
      },
    },
  ],
});
console.log("verticalVar--->");
</script>

<style></style>
