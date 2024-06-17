<template>
  <div class="h-full w-full">
    <div>【关键词条】</div>
    <div ref="target" class="w-full h-full">
      <v-chart ref="chartRef" :option="options" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import "echarts-wordcloud";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
/**
 * 生成随机色值
 */
const randomRGB = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgb(${r}, ${g}, ${b})`;
};

const options = ref({
  series: [
    {
      // 类型
      type: "wordCloud",
      // 数据映射文本的大小范围
      sizeRange: [8, 46],
      // 文字旋转范围
      rotationRange: [0, 0],
      // 单词之间的间距
      gridSize: 0,
      // 渲染动画
      layoutAnimation: true,
      // 字体
      textStyle: {
        // 随机色值
        color: randomRGB,
      },
      // 高亮字体
      emphasis: {
        textStyle: {
          fontWeight: "bold",
          color: "#000",
        },
      },
      // 数据
      data: props.data.datas,
    },
  ],
});

console.log("wordCloud--->", props.data);
</script>

<style lang="scss" scoped></style>
