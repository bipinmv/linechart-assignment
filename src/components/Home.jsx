import LineChart from "./LineChart";
import { CONNECTION_DATA } from "../constants/data";
import { getFormattedDate, getFormattedDatetime } from "../utility/utility";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getParsedData();
  }, []);

  const getParsedData = () => {
    // sort the data by time to show in asc order and insert formatted datetime
    const sortedArr = CONNECTION_DATA.toSorted(
      (a, b) => new Date(a.time) - new Date(b.time)
    ).map(obj => ({ ...obj, formattedTime: getFormattedDate(obj.time) }));
    const xAxisCategories = [
      ...new Set(sortedArr.map(obj => obj.formattedTime))
    ];
    const endpointNames = [...new Set(sortedArr.map(obj => obj.endpoint))];

    const seriesData = [];

    endpointNames.forEach(name => {
      const data = {
        name: "",
        data: [],
        custom: {
          tooltipTime: ""
        }
      };
      sortedArr.forEach(obj => {
        if (obj.endpoint === name) {
          data.data.push(obj.requests);
          data.name = obj.endpoint;
          data.custom.tooltipTime = getFormattedDatetime(obj.time);
        }
      });
      seriesData.push(data);
    });

    setCategories(xAxisCategories);
    setData(seriesData);
  };

  // tooltip formatter for line chart - shows date and value
  const tooltipFormatter = point =>
    `<b>${point?.series.name}</b><br/>
    <span class="me-2">${point?.series.options.custom.tooltipTime}</span><br/>
    <span>Requests: ${point?.y}</span>`;

  return (
    <div className="line-chart-container flex-column">
      <div className="mb-3">
        <span className="text-start fw-bold me-2">CONNECTION DETAILS</span>
        <span>{`${categories[0]} - ${categories[1]}`}</span>
      </div>
      <div className="">
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
      </div>
    </div>
  );
};

export default Home;
