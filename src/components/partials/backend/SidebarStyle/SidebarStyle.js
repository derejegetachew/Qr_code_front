import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";
import logo from "../../../../../src/assets/images/abay_logo.png";

const SidebarStyle = () => {
  const location = useLocation();
  const [activeSubMenu, setActiveSubMenu] = useState({});

  useEffect(() => {
    const scrollbarInstance = Scrollbar.init(
      document.querySelector("#my-scrollbar")
    );
    return () => {
      scrollbarInstance.destroy();
    };
  }, []);

  const toggleSubMenu = (menu) => {
    setActiveSubMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div
      className="iq-sidebar sidebar-default col-md-4"
      style={{ backgroundColor: "#005580" }}
    >
      <div className="iq-sidebar-logo d-flex align-items-end justify-content-between">
        <Link to="/" className="header-logo">
          <img
            src={logo}
            className="img-fluid rounded-normal light-logo"
            alt="logo"
          />
          <span>QRCG</span>
        </Link>
      </div>

      <div className="data-scrollbar" data-scroll="1" id="my-scrollbar">
        <nav className="iq-sidebar-menu">
          <ul className="side-menu list-unstyled">
            {/* Main Menu Title */}
            <li className="px-3 pt-3 pb-2">
              <span className="text-uppercase small font-weight-bold text-white">
                Main Menu
              </span>
            </li>

            {/* Merchants Section */}
            <li>
              <div
                onClick={() => toggleSubMenu("merchants")}
                className="text-white cursor-pointer d-flex justify-content-between align-items-center px-3 py-2"
              >
                <span className="d-flex align-items-center">
                  <svg
                    className="mr-2"
                    width="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 10h18M3 6h18M3 14h18M3 18h18" />
                  </svg>
                  Merchants
                </span>
                <svg
                  width="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {activeSubMenu["merchants"] && (
                <ul className="pl-4">
                  <li
                    className={`${
                      location.pathname === "/create_merchant" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/create_merchant"
                      className="text-white d-flex align-items-center"
                    >
                      <svg
                        className="mr-2"
                        width="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Create Merchant
                    </Link>
                  </li>
                  <li
                    className={`${
                      location.pathname === "/view_merchant" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/view_merchant"
                      className="text-white d-flex align-items-center"
                    >
                      <svg
                        className="mr-2"
                        width="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 4h18v16H3z" />
                        <path d="M8 9h8v6H8z" />
                      </svg>
                      View Merchant
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* QR Generation Section */}
            <li className="mt-2">
              <div
                onClick={() => toggleSubMenu("qr")}
                className="text-white cursor-pointer d-flex justify-content-between align-items-center px-3 py-2"
              >
                <span className="d-flex align-items-center">
                  <svg
                    className="mr-2"
                    width="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                  </svg>
                  QR Generation
                </span>
                <svg
                  width="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {activeSubMenu["qr"] && (
                <ul className="pl-4">
                  <li
                    className={`${
                      location.pathname === "/product" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/product"
                      className="text-white d-flex align-items-center"
                    >
                      <svg
                        className="mr-2"
                        width="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                      Generate QR
                    </Link>
                  </li>
                  <li
                    className={`${
                      location.pathname === "/view_qr" ? "active" : ""
                    }`}
                  >
                    <Link
                      to="/view_qr"
                      className="text-white d-flex align-items-center"
                    >
                      <svg
                        className="mr-2"
                        width="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <path d="M9 9h6v6H9z" />
                      </svg>
                      View Generated QR
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarStyle;
