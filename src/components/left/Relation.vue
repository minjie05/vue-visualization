<template>
  <div class="w-full h-full">
    <div>【数据传递信息】</div>
    <div ref="target" class="w-full h-full">
      <v-chart ref="chartRef" :option="options" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const options = ref({
  xAxis: {
    show: false,
    type: "value",
  }, // x轴
  yAxis: {
    show: false,
    type: "value",
  }, // y轴
  series: [
    {
      type: "graph",
      layout: "none", // 布局类型
      coordinateSystem: "cartesian2d", // 使用二维直角坐标系
      symbolSize: 26, // 节点大小
      z: 3, // z-index
      edgeLabel: {
        // 线条的标签文字
        normal: {
          show: true,
          color: "#fff",
          textStyle: {
            fontSize: 14,
          },
          formatter: function (params) {
            return params.data.speed;
          },
        },
      },
      // 大圆点下面的label
      label: {
        normal: {
          show: true,
          position: "bottom",
          color: "#5E5E5E",
        },
      },
      // 边两端的标记类型
      edgeSymbol: ["none", "arrow"],
      edgeSymbolSize: 8,
      // data 有三种类型 id是0说明是中心点
      data: props.data.relations.map((item) => {
        // 非中心点
        if (item.id !== 0) {
          return {
            name: item.name,
            category: 0,
            active: true,
            speed: `${item.speed}kb/s`,
            value: item.value,
          };
        } else {
          // 中心点
          return {
            name: item.name,
            value: item.value,
            symbolSize: 100, // 中心点尺寸大
            itemStyle: {
              normal: {
                color: {
                  colorStops: [
                    {
                      offset: 0,
                      color: "#157eff",
                    },
                    {
                      offset: 1,
                      color: "#35c2ff",
                    },
                  ],
                },
              },
            },
            label: {
              normal: {
                fontSize: 14,
              },
            },
          };
        }
      }),
      links: props.data.relations.map((item, index) => ({
        source: item.source, // 起点
        target: item.target, // 终点
        speed: `${item.speed}kb/s`, // 线上的数字
        lineStyle: {
          normal: {
            color: "#12b5d0",
            curveness: 0.2, // 曲线率
          },
        }, // 线的样式
        label: {
          show: true,
          position: "middle",
          offset: [10, 0], // 向右偏移
        },
      })),
    },
    {
      // 带有起点和终点信息的线数据的绘制
      type: "lines",
      coordinateSystem: "cartesian2d", // 坐标系
      z: 1,
      effect: {
        // 线特效
        show: true,
        smooth: false,
        trailLength: 0,
        symbol: "arrow",
        color: "rgba(55, 155, 255, 0.6)",
        symbolSize: 12,
      },
      lineStyle: {
        // 线的样式
        normal: {
          curveness: 0.2,
        },
      },
      // 线的数据级，前后线需要重合。数据固定
      data: [
        [{ coord: [0, 300] }, { coord: [50, 200] }],
        [{ coord: [0, 100] }, { coord: [50, 200] }],
        [{ coord: [50, 200] }, { coord: [100, 100] }],
        [{ coord: [50, 200] }, { coord: [100, 300] }],
      ],
    },
  ], // 配置几种不同的图表
});
</script>

<style></style>
