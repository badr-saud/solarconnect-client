import { useEffect, useState, useCallback } from "react";
import { Wifi, WifiOff } from "lucide-react";
import "./pinger.scss";

const Pinger = ({ ipAddress, onConnectionChange }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkConnection = useCallback(async () => {
    // Don't try to ping if no IP address is provided
    if (!ipAddress) {
      setIsLoading(false);
      setIsOnline(false);
      setError("No IP address provided");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, we would use a ping API endpoint
      // Since direct ping isn't possible from browser JavaScript, we'd typically:
      // 1. Set up a backend endpoint that performs the actual ping
      // 2. Call that endpoint from this component
      // For demo purposes, we're simulating a ping with a fetch request
      // This is NOT an actual ping, just a simulation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(`https://${ipAddress}`, {
        mode: "no-cors",
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      setIsOnline(true);
    } catch (err) {
      console.error("Connection check failed:", err);
      setIsOnline(false);
      setError(err.message || "Connection failed");
    } finally {
      setIsLoading(false);
    }
  }, [ipAddress]);

  useEffect(() => {
    // Initial check
    checkConnection();
    
    // Set up interval to check periodically
    const intervalId = setInterval(checkConnection, 30000);
    
    // Cleanup function
    return () => {
      clearInterval(intervalId);
    };
  }, [checkConnection]); // Only depends on checkConnection which is memoized

  // Report connection status to parent component
  useEffect(() => {
    // When the online status changes, notify the parent
    if (onConnectionChange && !isLoading) {
      onConnectionChange(isOnline);
    }
  }, [isOnline, isLoading, onConnectionChange]);

  const handleRefresh = () => {
    checkConnection();
  };

  return (
    <div className="ping-status__container">
      {isLoading ? (
        <div className="ping-status__icon-container ping-status__icon-container--loading">
          <Wifi className="ping-status__icon ping-status__icon--loading" size={24} />
        </div>
      ) : isOnline ? (
        <div className="ping-status__icon-container ping-status__icon-container--online">
          <Wifi
            className="ping-status__icon ping-status__icon--online"
            size={24}
          />
        </div>
      ) : (
        <div className="ping-status__icon-container ping-status__icon-container--offline">
          <WifiOff
            className="ping-status__icon ping-status__icon--offline"
            size={24}
          />
        </div>
      )}
      <div
        className={`ping-status__status-text ${
          isLoading
            ? "ping-status__status-text--loading"
            : isOnline
              ? "ping-status__status-text--online"
              : "ping-status__status-text--offline"
        }`}
      >
        {isLoading ? "Checking connection..." : isOnline ? "Online" : "Offline"}
      </div>
      {error && <div className="ping-status__error">{error}</div>}
      <button
        onClick={handleRefresh}
        className="ping-status__refresh-button"
        disabled={isLoading}
      >
        Refresh
      </button>
    </div>
  );
};

export default Pinger;
