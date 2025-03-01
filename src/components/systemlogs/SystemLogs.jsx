import axios from "axios";
import { useEffect, useState } from "react";
import "./systemLog.scss"

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);

  const getSystemLogs = async () => {
    try {
      const response = await axios(`${import.meta.env.VITE_API_URL}logs`);
      console.log(response.data);

      // Ensure response.data is an array before setting the state
      if (Array.isArray(response.data)) {
        setLogs(response.data);
      } else {
        console.error("Expected an array but received:", response.data);
      }
    } catch (e) {
      console.error("Error fetching system logs:", e);
    }
  };

  useEffect(() => {
    getSystemLogs();
  }, []);

  return (
    <div className="system-logs">
      <table>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Mac Address</th>
            <th>IP Address</th>
            <th>Device Type</th>
            <th>Log Time</th>
            <th>Data Usage</th>
          </tr>
        </thead>
        <tbody>
          {/* Ensure that logs is an array before calling .map */}
          {Array.isArray(logs) && logs.length > 0 ? (
            logs.map((item, index) => (
              <tr key={index}>
                <td>{item.device_name}</td>
                <td>{item.mac_address}</td>
                <td>{item.ip_address}</td>
                <td>{item.device_type}</td>
                <td>{item.log_time}</td>
                <td>{item.data_usage}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No logs available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SystemLogs;
