import { CONNECTION_DATA } from "../constants/data";
import { useState } from "react";
import Filters from "./Filters";
import ConnectionDetails from "./ConnectionDetails";

const Home = () => {
  const [filteredData, setFilteredData] = useState(CONNECTION_DATA);

  return (
    <div className="connection-details">
      <Filters data={CONNECTION_DATA} setFilteredData={setFilteredData} />
      <ConnectionDetails filteredData={filteredData} />
    </div>
  );
};

export default Home;
