import { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown/MultiSelectDropdown";
import DateFilter from "./DateFilter";

const FilterContainer = ({ data = [], setFilteredData }) => {
  const [selectedEndPoints, setSelectedEndPoints] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const endPointsList = [...new Set(data?.map(obj => obj.endpoint))];

  useEffect(() => {
    let filteredData = [];
    if (
      selectedEndPoints.length > 0 &&
      selectedDate?.startDate &&
      selectedDate?.endDate
    ) {
      filteredData = data?.filter(
        obj =>
          selectedEndPoints.includes(obj.endpoint) &&
          new Date(selectedDate.startDate) <= new Date(obj.time) &&
          new Date(selectedDate.endDate) >= new Date(obj.time)
      );
    } else if (
      selectedEndPoints.length > 0 ||
      (selectedDate?.startDate && selectedDate?.endDate)
    ) {
      filteredData = data?.filter(
        obj =>
          selectedEndPoints.includes(obj.endpoint) ||
          (new Date(selectedDate.startDate) <= new Date(obj.time) &&
            new Date(selectedDate.endDate) >= new Date(obj.time))
      );
    } else {
      filteredData = data;
    }
    setFilteredData?.(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedEndPoints, selectedDate]);

  const onReset = () => {
    setSelectedEndPoints([]);
    setSelectedDate({});
  };

  return (
    <div className="filter-container mt-3 mb-5">
      <MultiSelectDropdown
        options={endPointsList}
        title={"Select endpoint"}
        className="me-3"
        selectedItems={selectedEndPoints}
        setSelectedItems={setSelectedEndPoints}
      />
      <DateFilter
        title="Select a date-time range"
        setSelectedDate={setSelectedDate}
      />
      <button
        className="reset-btn"
        disabled={
          selectedEndPoints.length === 0 &&
          Object.keys(selectedDate).length === 0
        }
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default FilterContainer;
