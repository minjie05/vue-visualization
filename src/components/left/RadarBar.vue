<template>
  <div class="w-full h-full pb-4">
    <div>【云端报警风险】</div>
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
  // 雷达图的坐标系配置
  radar: {
    name: {
      // 坐标系的名字
      textStyle: {
        color: "#05D5FF",
        fontSize: 14,
      },
    },
    shape: "polygon", // 形状
    center: ["50%", "50%"], // 居中的位置
    radius: "80%",
    startAngle: 120, // 起始的角度
    axisLine: {
      lineStyle: {
        color: "rgba(5, 213, 255, 0.8)",
      },
    }, // 轴线
    splitLine: {
      show: true,
      width: 1,
      color: "rgba(5, 213, 255, 0.8)",
    }, // 网格线
    indicator: props.data.risks.map((item) => ({
      name: item.name,
      max: 100,
    })), // 指示器的文字
    splitArea: {
      // 不拆分区域
      show: false,
    },
  },
  // 坐标极点
  polar: {
    center: ["50%", "50%"],
    radius: "0%",
  },
  // 坐标的角度
  angleAxis: {
    min: 0,
    interval: 5, // 分割线的间隔
    clockwise: false, // 刻度增长以逆时针
  },
  // 径向轴
  radiusAxis: {
    min: 0,
    interval: 20, // 分割线的间隔
    splitLine: {
      show: true, // 不展示分割线
    },
  },
  // 图表核心配置
  series: {
    type: "radar", // 雷达图
    symbol: "circle", // 圆形
    symbolSize: 10, // 拐角的大小
    itemStyle: {
      // 每个item的样式
      normal: {
        color: "#05D5FF",
      },
    },
    areaStyle: {
      // 填充区域
      normal: {
        color: "05D5FF",
        opacity: 0.5,
      },
    },
    // 线条的颜色
    lineStyle: {
      width: 2,
      color: "05D5FF",
    },
    // label的样式
    label: {
      normal: {
        show: true,
        color: "#fff",
      },
    },
    // 数据
    data: [
      {
        value: props.data.risks.map((item) => item.value),
      },
    ],
  },
});

console.log("props--->", props.data);
</script>

<style></style>
