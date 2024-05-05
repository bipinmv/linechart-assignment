import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateTimeRangeFilter = ({ onChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = date => {
    setStartDate(date);
    onChange({ startDate: date, endDate });
  };

  const handleEndDateChange = date => {
    setEndDate(date);
    onChange({ startDate, endDate: date });
  };

  return (
    <div className="d-flex ">
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        showTimeSelect
        allowSameDay
        dateFormat={'MM/dd/yyyy HH:mm'}
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        className="ml-2"
        showTimeSelect
        allowSameDay
        dateFormat={'MM/dd/yyyy HH:mm'}
      />
    </div>
  );
};

export default DateTimeRangeFilter;
