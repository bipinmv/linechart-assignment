import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import NoDataToDisplay from "highcharts/modules/no-data-to-display";

NoDataToDisplay(Highcharts);

const LineChart = props => {
  const [chartOption, setChartOption] = useState({
    chart: {
      backgroundColor: "transparent",
      height: props?.height ?? 400
    },
    title: { text: "" },
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false
    },
    lang: {
      noData: "No data to display",
      thousandsSep: "\u002C"
    }
  });

  useEffect(() => {
    setChartData(props);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const setChartData = props => {
    const tooltipFormatter = props.tooltipFormatter;

    const options = {
      chart: {
        type: props.chartType ?? "line",
        backgroundColor: "transparent",
        height: props.height ?? 400,
        width: props.width,
        animation: false
      },
      credits: {
        enabled: false
      },
      accessibility: {
        enabled: false
      },
      title: {
        text: props.title ?? "",
        align: "left",
        style: {
          color: "#FFFFFF",
          fontSize: "12px"
        }
      },
      xAxis: {
        categories: props.xAxisCategories,
        gridLineColor: "transparent",
        gridLineWidth: 0,
        lineColor: "#30334E",
        lineWidth: 1,
        labels: {
          style: {
            color: "#575766"
          }
        },
        title: {
          text: props.xAxisTitle ?? "",
          style: {
            color: "rgb(130, 131, 160, 1)",
            cursor: "default",
            fontSize: " 10px",
            fontWeight: "normal"
          }
        },
        type: props.xAxisType ?? null,
        tickWidth: 0,
        tickInterval: props.xAxisTickInterval
      },
      yAxis: {
        title: {
          enabled: true,
          text: props.yAxisTitle ?? "",
          margin: 30,
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#575766",
            cursor: "default",
          }
        },
        gridLineColor: "rgb(130, 131, 160, 1)",
        gridLineWidth: 0.6,
        gridLineDashStyle: "longdash",
        minorGridLineWidth: 0,
        lineColor: "#30334E",
        lineWidth: 1,
        labels: {
          style: {
            color: "rgb(130, 131, 160, 1)"
          }
        }
      },
      tooltip: {
        formatter() {
          const dataPoint = this;
          if (tooltipFormatter) {
            return tooltipFormatter(dataPoint.point);
          }
          return (
            "<b>" +
            dataPoint.series.name +
            "</b>: <span>" +
            dataPoint.point.y +
            " : " +
            dataPoint.point.category +
            "</span>"
          );
        },
        style: {
          color: "#FFFFFF",
          fontSize: "11px",
          fontWeight: "normal",
          zIndex: 999
        },
        backgroundColor: "rgb(15 ,18 ,38 , 0.9)",
        useHTML: true,
        outside: true
      },
      plotOptions: {
        series: {
          trackByArea: true,
          fillOpacity: 0.1,
          lineColor: props.lineColor,
          lineWidth: 1.5,
          animation: {
            duration: 1000
          },
          marker: {
            fillColor: props.lineColor
          },
          fillColor: false,
          pointInterval: props.pointInterval ?? 1,
          cursor: props.cursor ?? ""
        }
      },
      series: props.seriesData
    };

    setChartOption(options);
  };

  return (
    <HighchartsReact
      options={chartOption}
      highcharts={Highcharts}
      immutable={true}
    />
  );
};

export default LineChart;
