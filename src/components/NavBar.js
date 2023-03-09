import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, logoutUser } from "../features/user/userSlice";

const NavBar = () => {
  const { user } = useSelector((store) => store.user);
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const toggleLogout = () => {
    setShowLogout((prevState) => !prevState);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggle}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={toggleLogout}>
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={`dropdown ${showLogout ? "show-dropdown" : ""}`}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={logoutHandler}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;
