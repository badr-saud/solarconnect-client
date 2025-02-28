import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const Data = [
  { day: "Mon", download: 20, upload: 10 },
  { day: "Tue", download: 43, upload: 25 },
  { day: "Wed", download: 35, upload: 20 },
  { day: "Thu", download: 25, upload: 15 },
];

const UsageOverTime = () => {
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
          timestamp: new Date(item.timestamp).toLocaleDateString([], {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          }),
          day: weekday[new Date(item.timestamp).getDay()],
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
    <div>
      <p className="title">Data Usage Over Time</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={Data}>
          <XAxis
            dataKey="day"
            stroke="white"
            tickLine={false}
            axisLine={false}
          />
          <YAxis hide />
          <Tooltip />
          <Legend
            iconType="square"
            wrapperStyle={{ color: "white", fontSize: "12px" }}
          />

          <Bar dataKey="upload" fill="lightgray" barSize={30} stackId="a" />
          <Bar dataKey="download" fill="gray" barSize={30} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UsageOverTime;
