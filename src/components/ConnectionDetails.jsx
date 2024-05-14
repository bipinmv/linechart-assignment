import { useCallback, useEffect, useState } from "react";
import LineChart from "./LineChart";
import { getFormattedDate, getFormattedDatetime } from "../utility/utility";

const ConnectionDetails = ({ filteredData = [] }) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const getParsedData = useCallback(() => {
    // sort the data by time to show in asc order and insert formatted datetime
    const sortedArr = filteredData
      ?.toSorted((a, b) => new Date(a.time) - new Date(b.time))
      .map(obj => ({ ...obj, formattedTime: getFormattedDate(obj.time) }));
    const xAxisCategories = [
      ...new Set(sortedArr.map(obj => obj.formattedTime))
    ];

    const endpointNames = [...new Set(sortedArr.map(obj => obj.endpoint))];
    const seriesData = [];

    endpointNames.forEach(name => {
      const data = {
        name: name,
        data: new Array(xAxisCategories.length)
      };
      sortedArr.forEach((obj) => {
        if (obj.endpoint === name) {
          if (xAxisCategories.indexOf(obj.formattedTime) !== -1) {
            data.data[xAxisCategories.indexOf(obj.formattedTime)] = {
              y: obj.requests,
              custom: {
                formattedTime: getFormattedDatetime(obj.time)
              }
            }
          }
          else {
            data.data[xAxisCategories.indexOf(obj.formattedTime)] = {}
          }
        }
      });
      seriesData.push(data);
    });

    setCategories(xAxisCategories);
    setData(seriesData);
  }, [filteredData]);

  useEffect(() => {
    getParsedData();
  }, [getParsedData]);

  // tooltip formatter for line chart - shows date and no. of requests
  const tooltipFormatter = point =>
    `<b>${point?.series.name}</b><br/>
    <span class="me-2">${point?.options.custom.formattedTime}</span><br/>
    <span>Requests: ${point?.y}</span>`;

  console.log(data);

  return (
    <>
      <div className="mb-3">
        <span className="fw-bold me-3">CONNECTION DETAILS</span>
        <span>{categories.length > 0 && `${categories[0]} - ${categories.at(-1)}`}</span>
      </div>
      <LineChart
        chartType="line"
        xAxisCategories={categories}
        seriesData={data}
        height={400}
        width={800}
        outside={true}
        tooltipFormatter={tooltipFormatter}
        yAxisTitle="Connections"
      />
    </>
  );
};

export default ConnectionDetails;
