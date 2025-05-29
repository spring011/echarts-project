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
        '<br/>' + // staNum作为站点信息，位于value数组的第三个位置
        '纬度:' +
        params.data.value[1]
      );
      // 注意：原始代码中的'value:[it.lon, it.lat, it.staNum, 333]'中，333的具体意义未说明，
      // 如果333有特定含义且需要展示，请相应地添加到formatter中。
    },
  },
  geo: {
    show: true,
    map: 'china',
    roam: true,
    zoom: 1.2,
    silent: false,

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