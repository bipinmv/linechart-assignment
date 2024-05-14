import { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown/MultiSelectDropdown";
import DateFilter from "./DateFilter";

const FilterContainer = ({ data = [], setFilteredData }) => {
  const [selectedEndPoints, setSelectedEndPoints] = useState([]);
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedSpecial, setSelectedSpecial] = useState([]);
  const endPointsList = [...new Set(data?.map(obj => obj.endpoint))];

  useEffect(() => {
    let filteredData = data;
    if (selectedEndPoints.length > 0 || (selectedDate?.startDate && selectedDate?.endDate) || selectedSpecial.length > 0) {
      if (selectedEndPoints.length > 0) {
        filteredData = filteredData?.filter(obj =>
          selectedEndPoints.includes(obj.endpoint)
        );
      }
      if (selectedDate?.startDate && selectedDate?.endDate) {
        filteredData = filteredData?.filter(
          obj =>
            new Date(selectedDate.startDate) <= new Date(obj.time) &&
            new Date(selectedDate.endDate) >= new Date(obj.time)
        );
      }
      if (selectedSpecial.length > 0) {
        filteredData = filteredData?.filter(obj => obj.special);
      }
    }
    else {
      filteredData = data;
    }
    setFilteredData?.(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedEndPoints, selectedDate, selectedSpecial]);

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
      <MultiSelectDropdown
        options={["special"]}
        title={"Select special endpoint"}
        className="me-3"
        selectedItems={selectedSpecial}
        setSelectedItems={setSelectedSpecial}
      />
      <DateFilter
        title="Select a date-time range"
        setSelectedDate={setSelectedDate}
      />
      <button
        className="reset-btn"
        disabled={
          selectedEndPoints.length === 0 &&
          Object.keys(selectedDate).length === 0 &&
          selectedSpecial.length === 0
        }
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

export default FilterContainer;
