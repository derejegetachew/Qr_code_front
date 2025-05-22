import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Accordion, Button } from "react-bootstrap";
import Scrollbar from "smooth-scrollbar";
import { connect } from "react-redux";
import { getDarkMode } from "../../../../store/mode";
import { currentUser } from "../../../../Utils/tokenUtils";
import { isAllowedBarances } from "../../../../Utils/constants";
//img
import logo from "../../../../../src/assets/images/abay_logo.png";

function mapStateToProps(state) {
  return {
    darkMode: getDarkMode(state),
  };
}

const minisidbar = () => {
  document.body.classList.toggle("sidebar-main");
};

const SidebarStyle = (props) => {
  //location
  let location = useLocation();

  const urlParams = new URLSearchParams(window.location.search);
  const sidebar = urlParams.get("sidebar");
  var variant = "";
  if (sidebar !== null) {
    variant = "";
    switch (sidebar) {
      case "0":
        variant = "sidebar-dark";
        break;
      case "1":
        variant = "sidebar-light";
        break;
      default:
        variant = "";
        break;
    }
  }

  useEffect(() => {
    const scrollbarInstance = Scrollbar.init(
      document.querySelector("#my-scrollbar")
    );

    // Cleanup on unmount
    return () => {
      scrollbarInstance.destroy();
    };
  }, []);
  const exists = isAllowedBarances();
  return (
    <>
      <div
        className={`iq-sidebar sidebar-default ${variant} col-md-4`}
        style={{ backgroundColor: "#005580" }}
      >
        <div className="iq-sidebar-logo d-flex align-items-end justify-content-between">
          <Link to="/" className="header-logo">
            <img
              src={logo}
              className={`img-fluid rounded-normal light-logo ${
                props.darkMode ? "d-none" : ""
              }`}
              alt="logo"
            />
            <span>QRCG</span>
          </Link>
          <div className="side-menu-bt-sidebar-1">
            <svg
              onClick={minisidbar}
              xmlns="http://www.w3.org/2000/svg"
              className="text-light wrapper-menu"
              width="30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        <div className="data-scrollbar" data-scroll="1" id="my-scrollbar">
          <nav className="iq-sidebar-menu">
            <Accordion as="ul" id="iq-sidebar-toggle" className="side-menu">
              <li className="px-3 pt-3 pb-2 ">
                <span className="text-uppercase small font-weight-bold">
                  Application
                </span>
              </li>

              {/* <li
                className={`${
                  location.pathname === "/View_Branch_merchants" ? "active" : ""
                }  sidebar-layout`}
              >
                <Link to="/View_Branch_merchants" className="svg-icon">
                  <i className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </i>
                  <span className="ml-2">Merchants</span>
                </Link>
              </li> */}
              <li
                className={`${
                  location.pathname === "/create_merchant" ? "active" : ""
                }  sidebar-layout`}
              >
                <Link to="/create_merchant" className="svg-icon">
                  <i className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </i>
                  <span className="ml-2">create Merchant</span>
                </Link>
              </li>

              <li
                className={`${
                  location.pathname === "/product" ? "active" : ""
                }  sidebar-layout`}
              >
                <Link to="/product" className="svg-icon">
                  <i className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </i>
                  <span className="ml-2">Generate QR</span>
                </Link>
              </li>
              {exists && (
                <li
                  className={`${
                    location.pathname === "/Branch_performance" ? "active" : ""
                  }  sidebar-layout`}
                >
                  <Link to="/Branch_performance" className="svg-icon">
                    <i className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </i>
                    <span className="ml-2">Branch Performance</span>
                  </Link>
                </li>
              )}
            </Accordion>
          </nav>
          <div className="pt-5 pb-5"></div>
        </div>
      </div>
    </>
  );
};

export default connect(mapStateToProps)(SidebarStyle);
