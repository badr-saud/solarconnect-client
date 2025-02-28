import axios from "axios";
import "./speedHistory.scss";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SpeedHistory = () => {
  const [data, setData] = useState([]);

  const getSpeedHistory = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}speed-history`,
      );

      let formattedData = [];

      if (Array.isArray(response.data)) {
        formattedData = response.data.map((item) => ({
          ...item,
          timestamp: new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            hour12: false,
          }),
        }));
      }

      setData(formattedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSpeedHistory();
  }, []);

  return (
    <div className="speed-history" style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <AreaChart width={500} height={300} data={data}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f9ae14" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#f9ae14" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#424242" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#424242" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis tickLine={false}  dataKey="timestamp" axisLine={false} />
          <YAxis tickLine={false}  type="number" domain={[0, 80]} axisLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="download_speed"
            stroke="#f9ae14"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="upload_speed"
            stroke="#424242"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeedHistory;

//<Line type="monotone" dataKey="download_speed" stroke="#8884d8" />
