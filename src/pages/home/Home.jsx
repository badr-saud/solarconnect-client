import { FaSolarPanel } from "react-icons/fa6";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import DataUsage from "../../components/datausage/DataUsage";
import GaugeChart from "../../components/gaugeChart/GaugeChart";
import BatteryBox from "../../components/batteryBox/BatteryBox";
import SpeedHistory from "../../components/speedhistory/SpeedHistory";
import UsageOverTime from "../../components/usageOverTime/UsageOverTime";
import SystemLogs from "../../components/systemlogs/SystemLogs";
import Pinger from "../../components/pinger/Pinger";
import LightPercentage from "../../components/lightpercentage/LightPercentage";

const URL = `${import.meta.env.VITE_API_URL}`;

const Home = () => {
  const [status, setStatus] = useState("");
  const [lightLevel, setLightLevel] = useState();
  const [speed, setSpeed] = useState({});
  const [ipAddress, setIpAddress] = useState("8.8.8.8");
  const [inputValue, setInputValue] = useState("8.8.8.8");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(false);

  async function getLightStatus() {
    try {
      const response = await axios.get(`${URL}light-status`);
      console.log(response.data);
      setStatus(response.data.status);
      setLightLevel(response.data.percentage);
    } catch (e) {
      console.log(e);
    }
  }

  const getSpeedData = async () => {
    try {
      const response = await axios.get(`${URL}speed`);
      setSpeed({
        upload: response.data.upload,
        download: response.data.download,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLightStatus();
    getSpeedData();
  }, []);

  // Show success popup when connection is established
  useEffect(() => {
    if (connectionStatus) {
      setShowSuccessPopup(true);

      // Hide popup after 3 seconds
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [connectionStatus]);

  const handleIpSubmit = (e) => {
    e.preventDefault();

    // Basic IP validation
    const ipRegex =
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    // Domain name format validation (basic)
    const domainRegex =
      /^([a-zA-Z0-9]([a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;

    if (ipRegex.test(inputValue) || domainRegex.test(inputValue)) {
      setIpAddress(inputValue);
    } else {
      alert("Please enter a valid IP address or domain name");
    }
  };

  // Function to handle connection status update from Pinger
  const handleConnectionUpdate = (isConnected) => {
    setConnectionStatus(isConnected);
  };

  return (
    <div className="home">
      {showSuccessPopup && (
        <div className="connection-popup">
          <div className="connection-popup__content">
            <div className="connection-popup__icon">✅</div>
            <div className="connection-popup__message">
              Successfully connected to {ipAddress}
            </div>
            <button
              className="connection-popup__close"
              onClick={() => setShowSuccessPopup(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="box box8">
        <div className="ping-status__title">Connection Status</div>
        <div className="ping-status__ip-address">{ipAddress}</div>
        <form onSubmit={handleIpSubmit} className="ping-status__ip-form">
          <input
            className="ping-status__ip-input"
            placeholder="Enter IP address or domain"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="ping-status__ip-submit">
            Check
          </button>
        </form>
        <Pinger
          ipAddress={ipAddress}
          onConnectionChange={handleConnectionUpdate}
        />
      </div>

      <div className="box box1">
        <FaSolarPanel size={55} />
        <LightPercentage />
      </div>
      {/*<div className="box box2">
       <DataUsage />
      </div>*/}
      <div className="box box3">
        <p className="title">Current Internet Speed</p>
        <div className="container">
          <div className="upload-speed">
            <GaugeChart
              value={speed.upload}
              label="Upload speed"
              color="#f9ae14"
            />
            <div></div>
            <p>Upload Speed</p>
          </div>
          <div className="download-speed">
            <GaugeChart
              value={speed.download}
              label="Download speed"
              color="#f9ae14"
            />
            <div></div>
            <p>Download Speed</p>
          </div>
        </div>
      </div>
      <div className="box box4">
        <UsageOverTime />
      </div>
      <div className="box box5">
        <SpeedHistory />
      </div>
      <div className="box box6">
        <SystemLogs />
      </div>
      <div className="box box7">
        <BatteryBox />
      </div>
    </div>
  );
};

export default Home;
