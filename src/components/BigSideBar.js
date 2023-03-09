import { useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const BigSideBar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${!isSidebarOpen ? "show-sidebar" : ""}`}
      >
        <div className="sidebar-content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSideBar;
