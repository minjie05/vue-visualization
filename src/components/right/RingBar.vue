<template>
  <div class="h-full w-full pb-4">
    <div>【大区异常处理】</div>
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

const getSeriesData = () => {
  const series = [];

  props.data.abnormals.forEach((item, index) => {
    // 上层
    series.push({
      name: item.name,
      type: "pie", //饼图
      clockWise: false, // 逆时针排列
      hoverAnimation: false, // 不展示隐藏的动画
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"], // 半径依次递减
      center: ["55%", "55%"],
      label: {
        show: false,
      },
      data: [
        // 一个圆由两个环组成
        {
          value: item.value,
          name: item.name,
        },
        {
          value: 1000,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });
    // 底层
    series.push({
      name: item.name,
      type: "pie",
      silent: true, // 不需要有事件
      z: 1, // index
      clockWise: false, // 逆时针排序
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"], // 半径依次递减
      center: ["55%", "55%"],
      label: {
        show: false,
      },
      data: [
        // 只显示四分之三的圆
        {
          value: 7.5,
          itemStyle: {
            color: "rgb(3, 31, 62)",
            borderWidh: 0,
          },
          tooltip: {
            show: false,
            hoverAnimation: false,
          },
        },
        {
          value: 2.5,
          itemStyle: {
            color: "rgb(0,0,0,0)",
            borderWidh: 0,
          },
          tooltip: {
            show: false,
            hoverAnimation: false,
          },
        },
      ],
    });
  });

  return series;
};

const options = ref({
  // 图例配置
  // 就是图上的label
  legend: {
    show: true,
    icon: "circle",
    top: "14%",
    left: "60%",
    data: props.data.abnormals.map((item) => item.name),
    width: -5, // 竖向展示
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 6, // 间距
    textStyle: {
      // 字体
      fontSize: 12,
      lineHeight: 5,
      color: "rgba(255,255,255,0.8)",
    },
  },
  // 提示层
  tooltip: {
    show: true,
    trigger: "item", // 触发器
    formatter: "{a}<br>{b}:{c}({d}%)",
  },
  // Y 轴
  yAxis: {
    type: "category",
    inverse: true,
    axisLine: {
      show: false,
    },
  },
  // X 轴
  xAxis: [
    {
      show: false,
    },
  ],
  // 核心配置
  series: getSeriesData(),
});

console.log("RingBar---props--->", props);
</script>

<style></style>
