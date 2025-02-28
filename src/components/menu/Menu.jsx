import { Link } from "react-router-dom"
import { IoHome } from "react-icons/io5";
import { FaEthernet } from "react-icons/fa";
import { FaSimCard } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import { PiWifiHighFill } from "react-icons/pi";
import { IoIosSettings } from "react-icons/io";
import { LuLogs } from "react-icons/lu";
import "./menu.scss"

const Menu = () => {
  return (
    <div className="menu">
      <Link className="listItem" to="/">
        <IoHome />
        <span>Home</span>
      </Link>
      <Link className="listItem" to="/">
        <FaEthernet />
        <span>Ethernet Settings</span>
      </Link>
      <Link className="listItem" to="/">
        <FaSimCard />
        <span>SIM Settings</span>
      </Link>
      <Link className="listItem" to="/">
        <FaCircleInfo />
        <span>System Info.</span>
      </Link>
      <Link className="listItem" to="/">
        <PiWifiHighFill />
        <span>WiFi Settings</span>
      </Link>
      <Link className="listItem" to="/">
        <IoIosSettings />
        <span>Advanced Settings</span>
      </Link>
      <Link className="listItem" to="/">
        <LuLogs />
        <span>Logs</span>
      </Link>
    </div>
  )
}

export default Menu
