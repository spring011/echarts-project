import * as echarts from 'echarts';
import chinaMap from './china.json';
/**
 *判断对象是否是一个纯粹的对象
 */
export function isPlainObject(obj: any) {
  return typeof obj === 'object' && Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 *深度合并多个对象的方法
 */
export function deepAssign(target: any, source: any) {
  if (isPlainObject(source)) {
    if (!isPlainObject(target)) {
      target = {};
    }
    for (let s in source) {
      if (s === '__proto__' || target === source[s]) {
        continue;
      }
      if (isPlainObject(source[s])) {
        target[s] = deepAssign(target[s], source[s]);
      } else {
        target[s] = source[s];
      }
    }
    return target;
  }
}

export class InitChart {
  chart: echarts.ECharts | null = null;
  option: any = null;
  clock: any = null;
  init(chartDom: HTMLElement, option: any, isMap: boolean = false) {
    this.chart = echarts.init(chartDom);

    isMap && echarts.registerMap('china', chinaMap as any);
    this.setOption(option);
    this.bindEvent();
  }

  destoryChart() {
    this.destoryEvent();
    this.chart && this.chart.dispose();
    this.chart = null;
  }

  setOption(option: any) {
    this.chart && this.chart.setOption(option);
    this.option = option;
  }
  restore() {//重置原来的状态
    let option = {
      geo: {zoom: 1.2,center:[103.823557, 36.058039]}
    }
    this.chart && this.chart.setOption(option);
  }

  resize() {
    this.clock = setTimeout(() => {
      clearTimeout(this.clock);
      this.chart && this.chart.resize();
    }, 300);
  }

  bindEvent() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  destoryEvent() {
    window.removeEventListener('resize', this.resize.bind(this));
  }

  bindClick(callback?: (event: echarts.ECElementEvent) => void) {
    this.chart?.on('click', (event) => {
      callback && callback(event);
    });
  }
}
