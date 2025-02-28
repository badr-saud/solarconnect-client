import axios from "axios";
import "./dataUsage.scss";
import { useEffect, useState } from "react";

const DataUsage = () => {
  const [data, setData] = useState({});

  const getDataUsage = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}data-usage`,
      );
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDataUsage();
  }, []);

  return (
    <div className="data-usage">
      <p className="title">Total Data Usage</p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${data.percentage_used}%` }}>
          <span className="progress-label">{data.percentage_used}%</span>
        </div>
      </div>

      <div className="legend">
        <div className="usage">
          <div className="yellow-box"></div>
          <div className="text">
            <h3>{data.current_usage}GB</h3>
            <p>Current Data Usage</p>
          </div>
        </div>

        <div className="limit">
          <div className="gray-box"></div>
          <div className="text">
            <h3>{data.total_limit}GB</h3>
            <p>Total Data Limit</p>
          </div>
        </div>

      </div>


    </div>
  );
};

export default DataUsage;
