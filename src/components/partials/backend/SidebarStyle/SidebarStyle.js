import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Scrollbar from "smooth-scrollbar";
import logo from "../../../../../src/assets/images/abay_logo.png";

const SidebarStyle = () => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();

  // Keep both main menus open by default so sub-menus are readily accessible
  const [activeSubMenu, setActiveSubMenu] = useState({
    merchants: true,
    qr: true,
  });

  // Ensure active category is automatically expanded when on relevant routes
  useEffect(() => {
    if (path.includes("merchant")) {
      setActiveSubMenu((prev) => ({ ...prev, merchants: true }));
    }
    if (path.includes("qr") || path.includes("product")) {
      setActiveSubMenu((prev) => ({ ...prev, qr: true }));
    }
  }, [path]);

  useEffect(() => {
    const scrollElem = document.querySelector("#my-scrollbar");
    let scrollbarInstance = null;
    if (scrollElem) {
      scrollbarInstance = Scrollbar.init(scrollElem);
    }
    return () => {
      if (scrollbarInstance) {
        scrollbarInstance.destroy();
      }
    };
  }, []);

  const toggleSubMenu = (menu) => {
    setActiveSubMenu((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const isMerchantActive =
    path === "/view_merchant" ||
    path === "/create_merchant" ||
    path === "/view_branch_merchants";

  const isQrActive =
    path === "/product" ||
    path === "/view_qr";

  return (
    <div
      className="iq-sidebar sidebar-default"
      style={{
        backgroundColor: "#005580",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <div className="iq-sidebar-logo d-flex align-items-center justify-content-between px-3 py-3 border-bottom border-light-white">
        <Link to="/" className="header-logo d-flex align-items-center text-decoration-none">
          <img
            src={logo}
            className="img-fluid rounded-normal light-logo mr-2"
            alt="logo"
            style={{ maxHeight: "36px" }}
          />
          <span style={{ color: "#ffffff", fontWeight: "bold", fontSize: "18px", letterSpacing: "0.5px" }}>
            QRCG
          </span>
        </Link>
      </div>

      <div className="data-scrollbar" data-scroll="1" id="my-scrollbar" style={{ height: "calc(100vh - 75px)" }}>
        <nav className="iq-sidebar-menu pt-2">
          <ul className="side-menu list-unstyled mb-0 px-2">
            {/* Dashboard */}
            <li className="mb-1">
              <Link
                to="/"
                className="d-flex align-items-center px-3 py-2 rounded text-white"
                style={{
                  backgroundColor:
                    path === "/" || path === "/layout1" || path === "/dashboard"
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                  fontWeight:
                    path === "/" || path === "/layout1" || path === "/dashboard"
                      ? "600"
                      : "400",
                  textDecoration: "none",
                  transition: "background-color 0.2s ease",
                }}
              >
                <svg
                  className="mr-3"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Merchant QR Dashboard</span>
              </Link>
            </li>

            {/* Menu Section Header */}
            <li className="px-3 pt-3 pb-1">
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Main Menu
              </span>
            </li>

            {/* Merchants Main Menu */}
            <li className="mb-1">
              <div
                onClick={() => toggleSubMenu("merchants")}
                className="text-white d-flex justify-content-between align-items-center px-3 py-2 rounded"
                style={{
                  backgroundColor: isMerchantActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                  fontWeight: isMerchantActive ? "600" : "500",
                  userSelect: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
              >
                <span className="d-flex align-items-center">
                  <svg
                    className="mr-3"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Merchants</span>
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: activeSubMenu["merchants"] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {activeSubMenu["merchants"] && (
                <ul className="list-unstyled pl-3 pr-1 pt-1 pb-1 mb-0">
                  <li className="mb-1">
                    <Link
                      to="/view_merchant"
                      className="d-flex align-items-center px-3 py-2 rounded text-white"
                      style={{
                        backgroundColor: path === "/view_merchant" ? "rgba(255, 255, 255, 0.22)" : "transparent",
                        fontWeight: path === "/view_merchant" ? "600" : "400",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <svg
                        className="mr-2"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>View Merchant</span>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to="/create_merchant"
                      className="d-flex align-items-center px-3 py-2 rounded text-white"
                      style={{
                        backgroundColor: path === "/create_merchant" ? "rgba(255, 255, 255, 0.22)" : "transparent",
                        fontWeight: path === "/create_merchant" ? "600" : "400",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <svg
                        className="mr-2"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Create Merchant</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* QR Generation Main Menu */}
            <li className="mb-1">
              <div
                onClick={() => toggleSubMenu("qr")}
                className="text-white d-flex justify-content-between align-items-center px-3 py-2 rounded"
                style={{
                  backgroundColor: isQrActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                  fontWeight: isQrActive ? "600" : "500",
                  userSelect: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
              >
                <span className="d-flex align-items-center">
                  <svg
                    className="mr-3"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7"></rect>
                    <rect x="14" y="3" width="7" height="7"></rect>
                    <rect x="14" y="14" width="7" height="7"></rect>
                    <rect x="3" y="14" width="7" height="7"></rect>
                  </svg>
                  <span>QR Generation</span>
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: activeSubMenu["qr"] ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.25s ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {activeSubMenu["qr"] && (
                <ul className="list-unstyled pl-3 pr-1 pt-1 pb-1 mb-0">
                  <li className="mb-1">
                    <Link
                      to="/product"
                      className="d-flex align-items-center px-3 py-2 rounded text-white"
                      style={{
                        backgroundColor: path === "/product" ? "rgba(255, 255, 255, 0.22)" : "transparent",
                        fontWeight: path === "/product" ? "600" : "400",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <svg
                        className="mr-2"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                      <span>Generate QR</span>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      to="/view_qr"
                      className="d-flex align-items-center px-3 py-2 rounded text-white"
                      style={{
                        backgroundColor: path === "/view_qr" ? "rgba(255, 255, 255, 0.22)" : "transparent",
                        fontWeight: path === "/view_qr" ? "600" : "400",
                        fontSize: "14px",
                        textDecoration: "none",
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <svg
                        className="mr-2"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      <span>View Generated QR</span>
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
