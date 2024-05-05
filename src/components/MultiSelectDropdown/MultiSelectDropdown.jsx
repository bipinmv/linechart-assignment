import { useEffect, useState } from "react";
import "../MultiSelectDropdown/MultiSelectDropdown.css";

const MultiSelectDropdown = ({
  options,
  selectedItems,
  setSelectedItems,
  title,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = option => {
    if (selectedItems.includes(option)) {
      setSelectedItems(selectedItems.filter(item => item !== option));
    } else {
      setSelectedItems([...selectedItems, option]);
    }
  };

  useEffect(() => {
    setSelectedItems(selectedItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return (
    <div className={`dropdown ${className || ""}`}>
      <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <i className={`arrow ${isOpen ? "open" : ""}`}>&#9660;</i>
      </div>
      {isOpen && (
        <div className="options">
          {options?.map(value => (
            <label key={value} className="option">
              {value}
              <input
                type="checkbox"
                checked={selectedItems.includes(value)}
                onChange={() => toggleOption(value)}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
