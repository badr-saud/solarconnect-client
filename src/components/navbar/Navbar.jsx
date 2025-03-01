import { useEffect, useState } from "react";
import { IoWifi } from "react-icons/io5";
import { TbSignal5G } from "react-icons/tb";
import { BsEthernet } from "react-icons/bs";
import "./navbar.scss";

const Navbar = () => {
  //const [name, setName] = useState("Taha Al-Saadi");
  const [name, setName] = useState("Ahmed Al Rawahi");
  //const [name, setName] = useState("Saleh Al Rasbi");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDate(new Date()), 1000);
  }, []);

  return (
    <div className="navbar">
      <div className="left">
        <div className="logo">
          <img src="logo.png" alt="" />
        </div>

        <div className="text">
          <h3 className="greet">
            {date.getHours() < 12 ? "Good morning" : "Good evening"}
          </h3>
          <h2 className="name">{name}</h2>
          <p>Manage, mointor, and secure you network</p>
        </div>
      </div>

      <div className="right">
        <div className="connection">
          <div className="icon wifi">
            {/*<IoWifi size={35} />*/}
          </div>

          <div className="hline"></div>

          <div className="icon 5g">
            {/*<TbSignal5G size={35} />*/}
          </div>

          <div className="fibre">
            {/*<BsEthernet size={25} />*/}
            {/*Not connected*/}
          </div>
        </div>

        <div className="dateinfo">
          <p className="date">{date.toLocaleDateString()}</p>
          <p className="time">
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
