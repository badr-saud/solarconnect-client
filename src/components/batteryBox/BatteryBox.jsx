import axios from "axios";
import "./batteryBox.scss";
import { PiBatteryVerticalFullFill } from "react-icons/pi";
import { useEffect, useState } from "react";

const BatteryBox = () => {
  const [data, setData] = useState({});

  const getBatteryData = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_API_URL}battery-status`,
      );

      setData({
        percentage: response.data.percentage,
        estimated_time: response.data.estimated_time,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getBatteryData();
  }, []);

  return (
    <div className="battery-box">
      <PiBatteryVerticalFullFill size={55} />
      <div className="text">
        <h3>{data.percentage}%</h3>
        <p>{data.estimated_time}</p>
      </div>
    </div>
  );
};

export default BatteryBox;
