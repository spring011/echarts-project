<template>
  <div class="item">
    <div class="header">
      <n-button strong secondary type="primary" size="small" @click="reset">重置</n-button>
    </div>
    <div class="content">
      <div id="mapChart" ref="mapChart" class="w-full h-full"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Ref, onBeforeUnmount, onMounted, ref } from 'vue';
import { InitChart } from './chart';
import { mapOption } from './option';

let option: any = mapOption;
const mapChart: Ref<HTMLElement | null> = ref(null);
let chart: any = null;

interface SeriesDataItem {
  name: string;
  num?: number;
  value: [number, number, number?, any?];
}
interface MapSeriesItem {
  name: string;
  type: string;
  coordinateSystem: string;
  symbolSize?: number;
  itemStyle: { color: string };
  data: SeriesDataItem[];
}
const series: MapSeriesItem[] = [
  {
    name: '正常',
    type: 'scatter',
    coordinateSystem: 'geo',
    symbolSize: 8,
    itemStyle: {
      color: '#00FF6C',
    },
    data: [
      { name: '散点1', value: [116.52, 40, 1] },
      { name: '散点2', value: [116.52, 40, 1] },
      { name: '散点3', value: [116.52, 40, 1] },
      
    ],
  },
  {
    name: '停运',
    type: 'scatter',
    coordinateSystem: 'geo',
    symbolSize: 8,
    itemStyle: {
      color: '#FF3000',
    },
    data: [
      { name: '散点4', value: [117.52, 36, 1] },
      { name: '散点5', value: [113.52, 22, 1] },
      { name: '散点6', value: [113.52, 24, 42] },
    ],
  },
];
option.series = series;
function reset() {
  chart.restore();
}

onMounted(() => {
  chart = new InitChart();
  chart.init(mapChart.value as HTMLElement, option, true);
  //点击
  chart.bindClick((params: any) => {
     let center = chart.chart.convertFromPixel('geo', [params.event.offsetX, params.event.offsetY]);
     if (center) {
      
      let zoom = localStorage.getItem('mapZoom') || '1.2';
      let zoomSize = Number(zoom) + 1;
      localStorage.setItem('mapZoom',zoomSize+'')
      chart.setOption({
        geo: { zoom: zoomSize, center: center},
      });
     }
  });
});
onBeforeUnmount(() => {
  chart.destoryChart();
});
</script>
<style lang="scss" scoped>
.item {
  background-color: rgba(255,255,255,0.9);
  border-radius: 4px;
  -webkit-border-radius: 4px;
  margin: 10px;
  padding-top:10px;
  box-shadow:  0px 0px 12px rgba(0, 0, 0, .12);
  .header {
    display: flex;
    justify-content: center;
  }
  .content {
    height: 500px;
  }
}
</style>
