import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import {MdRouter } from "react-icons/md"
import "./menu.scss";

const Menu = () => {
  return (
    <div className="menu">
      <Link className="listItem" to="/">
        <IoHome />
        <span>Home</span>
      </Link>
      <a
        className="listItem"
        href="http://192.168.100.1/"
        rel="noopener noreferrer" // Security best practice for external links
        target="_blank"
      >
        <MdRouter />
        <span>Router Page</span>
      </a>
      {/*<Link className="listItem" to="/">
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
        <span>WiFi Settings</span>
      </Link>
      <Link className="listItem" to="/">
        <IoIosSettings />
        <span>Advanced Settings</span>
      </Link>
      <Link className="listItem" to="/">
        <LuLogs />
        <span>Logs</span>
      </Link>*/}
    </div>
  );
};

export default Menu;
