import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

const ChartPizza = ({ dataChart }) => {
  const chartRef = useRef(null);

  const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8', '#343a40', '#6c757d', '#adb5bd', '#28a745'];

  const options = {
    series: dataChart,
    chart: {
      width: 340,
      height: 400,
      offsetX: -20,
      type: 'pie',
    },
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    responsive: [{
      breakpoint: 280,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        }
      }
    }],
    colors: colors,
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return `Vendas: ${val}`;
        }
      }
    }
  };

  useEffect(() => {
    if (chartRef.current && dataChart && dataChart.length > 0) {
      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [dataChart]); 
  return <div id="chart" ref={chartRef}></div>;
}

export default ChartPizza;
