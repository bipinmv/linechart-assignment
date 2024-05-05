import { useEffect, useState } from "react";
import DateTimeRangeFilter from "./DateTimeRangeFilter";

const DateFilter = ({ title, setSelectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  const handleDateRangeChange = range => {
    setDateRange(range);
  };

  useEffect(() => {
    setSelectedDate(dateRange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  return (
    <div className="dropdown">
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <i className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</i>
      </div>
      {isOpen && (
        <div className="date-filter">
          <DateTimeRangeFilter onChange={handleDateRangeChange} />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
