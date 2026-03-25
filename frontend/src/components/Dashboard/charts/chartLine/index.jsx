import React, { useRef, useEffect } from 'react';
import ApexCharts from 'apexcharts';

function ChartThree({ dataChart }) {
  console.log("data chart char tone",dataChart)
  const chartRef = useRef(null);

  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];

  const options = {
    series: [{
      name: "Quantidade de Vendas",
      data: dataChart
    }],
    chart: {
      height: 380,
      type: 'line',
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return val
    },
    textAnchor: 'middle',
    distributed: false,
    offsetX: 0,
    offsetY: 0,
    style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: undefined
    },
   
  },
    stroke: {
      curve: 'monotoneCubic',
      colors: '#008FFB',

    },
    title: {
      text: 'Vendas realizadas por mês',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f0f0f2', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    colors: colors
  };

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [dataChart]);

  return <div id="chart" ref={chartRef}></div>;
}

export default ChartThree;
