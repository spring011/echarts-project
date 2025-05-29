export const mapOption = {
  tooltip: {
    trigger: 'item',
    position: function (point: any[]) {
      // 默认返回值为相对于视图坐标系的绝对像素位置
      return [point[0] + 10, point[1]]; // 在鼠标位置的基础上向右偏移10px
    },
    formatter: function (params: {
      seriesName?:string;
      data: {
        code?:string;
        name?:string;
        value:string[];
      };
    }) {
      return (
        '经度:' +
        params.data.value[0] +
        '<br/>' + 
        '纬度:' +
        params.data.value[1]
      );
    },
  },
  geo: {
    show: true,
    map: 'china',
    roam: true,
    zoom: 1.2,
    silent: false,
    center:[103.823557, 36.058039],

    scaleLimit: {
      min: 1,
      max: 20,
    },
    label: {
      show: false,
      color: '#fff',
    },
    itemStyle: {
      areaColor: '#0197FE',
      borderColor: '#fff',
    },
    emphasis: {
      label: {
        color: '#fff',
      },
      itemStyle: {
        areaColor: '#0FCFFF',
      },
    },
  },
  series: [],
};