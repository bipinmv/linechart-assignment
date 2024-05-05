import { useEffect, useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown/MultiSelectDropdown";

const FilterContainer = ({ data = [], setFilteredData }) => {
  const [selectedEndPoints, setSelectedEndPoints] = useState([]);
  const endPointsList = [...new Set(data?.map(obj => obj.endpoint))];

  useEffect(() => {
    const filteredData =
      selectedEndPoints.length > 0
        ? data?.filter(obj => selectedEndPoints.includes(obj.endpoint))
        : data;
    setFilteredData?.(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedEndPoints]);

  const onReset = () => {
    setSelectedEndPoints([]);
  }

  return (
    <div className="filter-container mt-3">
      <MultiSelectDropdown
        options={endPointsList}
        title={"Select endpoint"}
        className="mb-5"
        selectedItems={selectedEndPoints}
        setSelectedItems={setSelectedEndPoints}
      />
      <button className="reset-btn" disabled={selectedEndPoints.length === 0} onClick={onReset}>Reset</button>
    </div>
  );
};

export default FilterContainer;
