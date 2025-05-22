import React from "react";
import { Navbar, Nav, Dropdown, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { currentUser } from "../../../../Utils/tokenUtils";
import ChangeMode from "../../../Change-Mode";

// Get user info from the currentUser function

const HeaderStyle1 = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    history.push("/auth/sign-in");
  };

  const toggleSidebar = () => {
    document.body.classList.toggle("sidebar-main");
  };

  const user = currentUser();
  const fullName = user ? `${user.first_name} ${user.middle_name}` : "Guest";
  const position = user ? user.position : "Unknown Position";
  return (
    <div className="iq-top-navbar">
      <Navbar expand="lg" className="navbar-light  " style={{ width: "100%" }}>
        <div className="d-flex align-items-center w-100">
          <div className="side-menu-bt-sidebar p-" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-secondary wrapper-menu"
              width="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <span className="text-primary font-weight-bold mx-auto">
            <h5> QR Code Generating System</h5>
          </span>
          <ChangeMode />
        </div>

        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ml-auto align-items-center">
            {user && (
              <Dropdown alignRight>
                <Dropdown.Toggle
                  variant="link"
                  className="text-secondary"
                  id="profile-dropdown"
                >
                  <i className="fas fa-user-circle fa-lg"></i> Profile
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right shadow-sm">
                  <Dropdown.Item disabled>
                    <strong>{fullName}</strong>
                  </Dropdown.Item>
                  <Dropdown.Item disabled>
                    <small>{position}</small>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={handleLogout}
                    className="text-center text-white bg-primary rounded"
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default HeaderStyle1;
