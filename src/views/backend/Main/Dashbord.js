import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import * as XLSX from "xlsx";
import axios from "axios";
import { currentUser } from "../../../Utils/tokenUtils";
import { BASE_URL } from "../../../Utils/constants";
import "../../../assets/css/MerchantQrDashboard.css";

const MONTH_NAMES = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Dashbord = () => {
  // Authentication & Current User
  const user = currentUser();
  const currentUsername = user?.username || user?.id || "unknown";
  const currentBranch = user?.branch || "unknown";

  const userIsManagerOriginal = Boolean(
    user?.is_manager ||
    user?.role?.toLowerCase?.().includes("manager") ||
    user?.position?.toLowerCase?.().includes("manager") ||
    user?.Group?.Manager ||
    user?.Group?.ADMIN ||
    user?.Group?.QR?.toLowerCase?.().includes("manager")
  );

  // Role toggle: default to manager so all makers can be tested, but allows switching to maker view
  const [roleMode, setRoleMode] = useState(
    userIsManagerOriginal ? "manager" : "manager"
  );
  const isManager = roleMode === "manager";

  // Live Backend Data States
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [rawMerchants, setRawMerchants] = useState([]);
  const [rawQrs, setRawQrs] = useState([]);

  // Active Tab: "makers" (Employee / Maker Performance) vs "details" (Detailed Records)
  const [activeTab, setActiveTab] = useState("makers");

  // Filter States: Month, Year, Maker Username
  const currentYearStr = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYearStr);
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedMaker, setSelectedMaker] = useState("ALL");

  // Search & Pagination
  const [tableSearch, setTableSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Keep Maker filter locked if in Maker role
  useEffect(() => {
    if (!isManager) {
      setSelectedMaker(currentUsername);
    } else {
      setSelectedMaker("ALL");
    }
  }, [isManager, currentUsername]);

  // Fetch Live Data from Backend API
  const fetchLiveApiData = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const [merchantsRes, qrsRes] = await Promise.all([
        axios.get(`${BASE_URL}/getAllMerchant`),
        axios.get(`${BASE_URL}/getallMerchantQr`),
      ]);

      const mData =
        merchantsRes.data?.data ||
        (Array.isArray(merchantsRes.data) ? merchantsRes.data : []);
      const qData =
        qrsRes.data?.data ||
        (Array.isArray(qrsRes.data) ? qrsRes.data : []);

      setRawMerchants(mData);
      setRawQrs(qData);
    } catch (err) {
      console.error("Error fetching live merchant / QR API data:", err);
      setErrorMsg(
        err.response?.data?.message ||
          "Failed to load records from backend API. Please verify the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveApiData();
  }, []);

  // Helper to extract maker username from merchant creation records (payload: created_by: user?.username || user?.id || "unknown")
  const getMerchantMaker = (m) => {
    return (
      m.created_by ||
      m.CREATED_BY ||
      m.maker_username ||
      m.MAKER_USER_NAME ||
      m.username ||
      "unknown"
    ).trim();
  };

  // Helper to extract maker branch from merchant creation records (payload: maker_branch: user?.branch || "unknown")
  const getMerchantBranch = (m) => {
    return (
      m.maker_branch ||
      m.MAKER_BRANCH ||
      m.branch ||
      "unknown"
    ).trim();
  };

  // Helper to extract maker username from QR generation records (payload: username: username)
  const getQrMaker = (q) => {
    return (
      q.username ||
      q.USERNAME ||
      q.MAKER_USER_NAME ||
      q.maker_user_name ||
      q.created_by ||
      q.CREATED_BY ||
      "unknown"
    ).trim();
  };

  // Helper to extract branch from QR generation records
  const getQrBranch = (q) => {
    return (
      q.branch ||
      q.BRANCH ||
      q.maker_branch ||
      q.MAKER_BRANCH ||
      q.MAKER_BRANCH_CODE ||
      "unknown"
    ).trim();
  };

  // Date parsing helper
  const parseRecordDate = (dateVal) => {
    if (!dateVal) return null;
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return null;
    return d;
  };

  const formatDateDisplay = (dateVal) => {
    const d = parseRecordDate(dateVal);
    if (!d) return "N/A";
    return d.toISOString().substring(0, 10);
  };

  // Match record against selected Year and Month
  const matchesDateFilter = (dateVal) => {
    const d = parseRecordDate(dateVal);
    if (!d) {
      // If no date is present on the record, include if viewing "All Months"
      return selectedMonth === "All Months";
    }

    const rYear = d.getFullYear().toString();
    if (selectedYear !== "ALL" && rYear !== selectedYear) {
      return false;
    }

    if (selectedMonth !== "All Months") {
      const targetMonthIndex = MONTH_NAMES.indexOf(selectedMonth) - 1; // 0 to 11
      if (d.getMonth() !== targetMonthIndex) {
        return false;
      }
    }

    return true;
  };

  // Extract all distinct Maker usernames from live records
  const allAvailableMakers = useMemo(() => {
    const set = new Set();
    rawMerchants.forEach((m) => {
      const u = getMerchantMaker(m);
      if (u && u !== "unknown" && u !== "Unknown Maker") set.add(u);
    });
    rawQrs.forEach((q) => {
      const u = getQrMaker(q);
      if (u && u !== "unknown" && u !== "Unknown Maker") set.add(u);
    });
    if (currentUsername && currentUsername !== "unknown") set.add(currentUsername);
    return Array.from(set).sort();
  }, [rawMerchants, rawQrs, currentUsername]);

  // Extract distinct Years from live records
  const availableYears = useMemo(() => {
    const set = new Set(["2027","2026", "2025", "2024"]);
    rawMerchants.forEach((m) => {
      const d = parseRecordDate(m.MER_CREATION_DATE || m.createdAt);
      if (d) set.add(d.getFullYear().toString());
    });
    rawQrs.forEach((q) => {
      const d = parseRecordDate(q.CREATED_AT || q.createdAt);
      if (d) set.add(d.getFullYear().toString());
    });
    return Array.from(set).sort().reverse();
  }, [rawMerchants, rawQrs]);

  // Effective Maker Filter: for Maker, lock to current user; for Manager, use selected maker
  const effectiveMakerFilter = isManager ? selectedMaker : currentUsername;

  // 1. Filtered Live Merchant Creations
  const filteredMerchants = useMemo(() => {
    return rawMerchants.filter((m) => {
      // Date filter
      if (!matchesDateFilter(m.MER_CREATION_DATE || m.createdAt || m.created_at)) {
        return false;
      }

      // Maker filter
      const maker = getMerchantMaker(m);
      if (effectiveMakerFilter !== "ALL") {
        if (maker.toLowerCase() !== effectiveMakerFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [rawMerchants, selectedYear, selectedMonth, effectiveMakerFilter]);

  // 2. Filtered Live QR Generations
  const filteredQrs = useMemo(() => {
    return rawQrs.filter((q) => {
      // Date filter
      if (!matchesDateFilter(q.CREATED_AT || q.createdAt || q.created_at)) {
        return false;
      }

      // Maker filter
      const maker = getQrMaker(q);
      if (effectiveMakerFilter !== "ALL") {
        if (maker.toLowerCase() !== effectiveMakerFilter.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [rawQrs, selectedYear, selectedMonth, effectiveMakerFilter]);

  // 3. Employee / Maker Performance Breakdown (Aggregation per maker)
  const makerPerformanceList = useMemo(() => {
    const map = {};

    // First, if a specific maker is selected, seed that maker
    if (effectiveMakerFilter !== "ALL") {
      map[effectiveMakerFilter] = {
        makerUsername: effectiveMakerFilter,
        branch: currentBranch || "unknown",
        merchantsCreated: 0,
        qrGenerated: 0,
      };
    }

    // Tally merchants created by maker in the filtered period
    filteredMerchants.forEach((m) => {
      const maker = getMerchantMaker(m);
      const branch = getMerchantBranch(m);
      if (!map[maker]) {
        map[maker] = {
          makerUsername: maker,
          branch: branch,
          merchantsCreated: 0,
          qrGenerated: 0,
        };
      }
      map[maker].merchantsCreated += 1;
      if (branch !== "unknown") map[maker].branch = branch;
    });

    // Tally QR codes generated by maker in the filtered period
    filteredQrs.forEach((q) => {
      const maker = getQrMaker(q);
      const branch = getQrBranch(q);
      if (!map[maker]) {
        map[maker] = {
          makerUsername: maker,
          branch: branch,
          merchantsCreated: 0,
          qrGenerated: 0,
        };
      }
      map[maker].qrGenerated += 1;
      if (branch !== "unknown") map[maker].branch = branch;
    });

    const list = Object.values(map).map((item) => {
      const rate =
        item.merchantsCreated > 0
          ? ((item.qrGenerated / item.merchantsCreated) * 100).toFixed(1)
          : item.qrGenerated > 0
          ? "100.0"
          : "0.0";

      return {
        ...item,
        qrRate: parseFloat(rate),
      };
    });

    // Sort descending by created merchants and generated QRs
    list.sort((a, b) => b.merchantsCreated - a.merchantsCreated || b.qrGenerated - a.qrGenerated);

    return list;
  }, [filteredMerchants, filteredQrs, effectiveMakerFilter]);

  // Overall KPI Metrics for the Selected Filter Configuration
  const totalMerchantsCreated = filteredMerchants.length;
  const totalQrsGenerated = filteredQrs.length;
  const activeMakersCount = makerPerformanceList.length;
  const overallQrRate =
    totalMerchantsCreated > 0
      ? ((totalQrsGenerated / totalMerchantsCreated) * 100).toFixed(1)
      : totalQrsGenerated > 0
      ? "100.0"
      : "0.0";

  // Reset Filters to default
  const handleResetFilters = () => {
    setSelectedYear(currentYearStr);
    setSelectedMonth("All Months");
    setSelectedMaker(isManager ? "ALL" : currentUsername);
    setCurrentPage(1);
    setTableSearch("");
  };

  // Detailed Transaction Records List
  const detailedTransactions = useMemo(() => {
    const list = [];

    // Map QR codes by account number to link QR status
    const qrAccountSet = new Set(
      rawQrs.map((q) => (q.ACC_NUMB || q.account || "").trim()).filter(Boolean)
    );

    filteredMerchants.forEach((m, idx) => {
      const acc = (m.MER_ACCOUNT || m.account || "").trim();
      const hasQr = qrAccountSet.has(acc);
      list.push({
        id: `M-${idx + 1}`,
        recordType: "Merchant Created",
        merId: m.MER_ID || m.mer_id || "N/A",
        accountNumber: acc || "N/A",
        name: m.MER_BUSINESS_NAME || m.MER_OWNER_NAME || "N/A",
        maker: getMerchantMaker(m),
        branch: getMerchantBranch(m),
        date: formatDateDisplay(m.MER_CREATION_DATE || m.createdAt),
        qrStatus: hasQr ? "Generated" : "Pending QR",
        status: m.STATUS === 0 || m.status === 0 ? "Disabled" : "Active",
      });
    });

    return list;
  }, [filteredMerchants, rawQrs]);

  // Search in Detailed Table
  const searchFilteredTable = useMemo(() => {
    const query = tableSearch.toLowerCase().trim();
    if (!query) return detailedTransactions;
    return detailedTransactions.filter(
      (r) =>
        r.name.toLowerCase().includes(query) ||
        r.accountNumber.toLowerCase().includes(query) ||
        r.maker.toLowerCase().includes(query) ||
        r.branch.toLowerCase().includes(query) ||
        r.merId.toLowerCase().includes(query)
    );
  }, [detailedTransactions, tableSearch]);

  const totalPages = Math.ceil(searchFilteredTable.length / itemsPerPage) || 1;
  const paginatedTableItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return searchFilteredTable.slice(start, start + itemsPerPage);
  }, [searchFilteredTable, currentPage, itemsPerPage]);

  // Export to Excel
  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Maker (Employee) Performance
    const perfSheetData = makerPerformanceList.map((item, index) => ({
      Rank: index + 1,
      "Maker Username": item.makerUsername,
      Branch: item.branch,
      "Total Merchants Created": item.merchantsCreated,
      "Total QR Codes Generated": item.qrGenerated,
      "QR Generation Rate (%)": `${item.qrRate}%`,
    }));
    const perfSheet = XLSX.utils.json_to_sheet(perfSheetData);
    XLSX.utils.book_append_sheet(workbook, perfSheet, "Maker_Performance");

    // Sheet 2: Merchant & QR Detailed Records
    const detailSheetData = searchFilteredTable.map((r, index) => ({
      "S/N": index + 1,
      "Record Type": r.recordType,
      "Merchant ID": r.merId,
      "Account Number": r.accountNumber,
      "Business Name": r.name,
      "Maker Username": r.maker,
      Branch: r.branch,
      Date: r.date,
      "QR Status": r.qrStatus,
      Status: r.status,
    }));
    const detailSheet = XLSX.utils.json_to_sheet(detailSheetData);
    XLSX.utils.book_append_sheet(workbook, detailSheet, "Detailed_Records");

    const makerSlug = effectiveMakerFilter === "ALL" ? "All_Makers" : effectiveMakerFilter;
    const periodSlug = `${selectedMonth}_${selectedYear}`;
    XLSX.writeFile(workbook, `Merchant_QR_Report_${makerSlug}_${periodSlug}.xlsx`);
  };

  const periodDisplay = `${selectedMonth === "All Months" ? "Entire Year" : selectedMonth} ${selectedYear}`;

  return (
    <div className="dashboard-container">
      {/* 1. Header Section */}
      <div className="dashboard-header">
        <div className="dashboard-title-area">
          <h1 className="dashboard-main-title">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#005580"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Merchant QR Dashboard
          </h1>
          <div className="dashboard-reporting-period">
            <span>Reporting period:</span>
            <span className="period-highlight-pill">{periodDisplay}</span>
            <span className="live-status-pill ml-2">
              <span className="live-pulse-dot"></span>
              Live Backend API
            </span>
          </div>
        </div>

        {/* Header Action Buttons & Role Switcher */}
        <div className="dashboard-header-actions">
          {/* Access Badge */}
          <div className={`role-badge ${isManager ? "manager" : "maker"}`}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isManager ? "#2e7d32" : "#e65100",
                display: "inline-block",
              }}
            ></span>
            {isManager
              ? "Manager Access (All Makers Visibility)"
              : `Maker View (${currentUsername})`}
          </div>

          {/* Test toggle between Manager and Maker */}
          <button
            className="role-toggle-btn"
            onClick={() => setRoleMode(isManager ? "maker" : "manager")}
            title="Toggle between Manager and Maker view to test scoping"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            Switch to {isManager ? "Maker View" : "Manager View"}
          </button>

          {/* Refresh live data */}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={fetchLiveApiData}
            disabled={loading}
            className="d-flex align-items-center gap-1 font-weight-bold"
            style={{ borderRadius: "6px" }}
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            )}
            Sync API Data
          </Button>

          {/* Export Excel */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportExcel}
            className="d-flex align-items-center gap-1 font-weight-bold"
            style={{ borderRadius: "6px" }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export Excel
          </Button>
        </div>
      </div>

      {/* Error alert if API fails */}
      {errorMsg && (
        <Alert variant="danger" className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Backend API Error:</strong> {errorMsg}
          </div>
          <Button variant="danger" size="sm" onClick={fetchLiveApiData}>
            Retry Connection
          </Button>
        </Alert>
      )}

      {/* 2. Top Summary KPI Cards (Based on selected Month, Year, and Maker) */}
      <div className="kpi-grid">
        {/* Total Merchants Created */}
        <div className="kpi-card merchants">
          <div className="kpi-top-row">
            <div className="kpi-icon-wrap">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 14 15 14 15 22"></polyline>
              </svg>
            </div>
            <span className="kpi-trend positive">Backend Data</span>
          </div>
          <div className="kpi-number">
            {loading ? <Spinner animation="border" size="sm" /> : totalMerchantsCreated.toLocaleString()}
          </div>
          <div className="kpi-label">Total Merchants Created</div>
          <div className="kpi-footnote">
            {effectiveMakerFilter === "ALL"
              ? "All makers combined"
              : `Created by ${effectiveMakerFilter}`}
          </div>
        </div>

        {/* Total QR Codes Generated */}
        <div className="kpi-card qr">
          <div className="kpi-top-row">
            <div className="kpi-icon-wrap">
              <svg
                width="22"
                height="22"
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
            </div>
            <span className="kpi-trend positive">Backend Data</span>
          </div>
          <div className="kpi-number">
            {loading ? <Spinner animation="border" size="sm" /> : totalQrsGenerated.toLocaleString()}
          </div>
          <div className="kpi-label">Total Generated QR Codes</div>
          <div className="kpi-footnote">
            {effectiveMakerFilter === "ALL"
              ? "All makers combined"
              : `Generated by ${effectiveMakerFilter}`}
          </div>
        </div>

        {/* QR Generation Rate */}
        <div className="kpi-card rate">
          <div className="kpi-top-row">
            <div className="kpi-icon-wrap">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <span className="kpi-trend positive" style={{ background: "#f3e5f5", color: "#6a1b9a" }}>
              Conversion
            </span>
          </div>
          <div className="kpi-number">
            {loading ? <Spinner animation="border" size="sm" /> : `${overallQrRate}%`}
          </div>
          <div className="kpi-label">QR Generation Rate</div>
          <div className="kpi-footnote">Generated QRs / Created Merchants</div>
        </div>

        {/* Active Makers */}
        <div className="kpi-card makers">
          <div className="kpi-top-row">
            <div className="kpi-icon-wrap">
              <svg
                width="22"
                height="22"
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
            </div>
            <span className="kpi-trend positive" style={{ background: "#fff3e0", color: "#e65100" }}>
              Employees
            </span>
          </div>
          <div className="kpi-number">
            {loading ? <Spinner animation="border" size="sm" /> : activeMakersCount}
          </div>
          <div className="kpi-label">Makers Active</div>
          <div className="kpi-footnote">
            {effectiveMakerFilter === "ALL" ? "Total active makers" : "Single Maker Profile"}
          </div>
        </div>
      </div>

      {/* 3. Filter Configuration Card: Manager selects Month, Year, Maker Username */}
      <div className="filter-card">
        <div className="filter-card-header">
          <div>
            <h2 className="filter-title">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
              </svg>
              Filter Reports by Maker, Month & Year
            </h2>
            <p className="filter-subtitle">
              Select Year, Month, and Maker Username to view real-time merchant creation and QR generation reports.
            </p>
          </div>
          <Button
            variant="link"
            size="sm"
            onClick={handleResetFilters}
            style={{ color: "#005580", textDecoration: "none", fontWeight: "600" }}
          >
            Reset Filters
          </Button>
        </div>

        <div className="filter-card-body">
          <Row>
            {/* Year Selector */}
            <Col md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="font-weight-bold text-secondary" style={{ fontSize: "13px" }}>
                  Year
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedYear}
                  onChange={(e) => {
                    setSelectedYear(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ height: "42px", borderRadius: "8px", fontWeight: "500" }}
                >
                  {availableYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            {/* Month Selector */}
            <Col md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="font-weight-bold text-secondary" style={{ fontSize: "13px" }}>
                  Month
                </Form.Label>
                <Form.Control
                  as="select"
                  value={selectedMonth}
                  onChange={(e) => {
                    setSelectedMonth(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ height: "42px", borderRadius: "8px", fontWeight: "500" }}
                >
                  {MONTH_NAMES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            {/* Maker Username Selector */}
            <Col md="4" className="mb-3">
              <Form.Group>
                <Form.Label className="font-weight-bold text-secondary d-flex align-items-center" style={{ fontSize: "13px" }}>
                  Maker Username
                  {!isManager && (
                    <span className="maker-restricted-badge">
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      Maker view (locked)
                    </span>
                  )}
                </Form.Label>

                {isManager ? (
                  <Form.Control
                    as="select"
                    value={selectedMaker}
                    onChange={(e) => {
                      setSelectedMaker(e.target.value);
                      setCurrentPage(1);
                    }}
                    style={{ height: "42px", borderRadius: "8px", fontWeight: "500" }}
                  >
                    <option value="ALL">All makers (manager only)</option>
                    {allAvailableMakers.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type="text"
                    value={currentUsername}
                    disabled
                    readOnly
                    style={{
                      height: "42px",
                      borderRadius: "8px",
                      backgroundColor: "#f1f5f9",
                      color: "#475569",
                      cursor: "not-allowed",
                      fontWeight: "600",
                    }}
                  />
                )}
                <Form.Text className="text-muted" style={{ fontSize: "11px" }}>
                  {isManager
                    ? "Managers can select any maker username or view all makers combined."
                    : "Makers are restricted to their own submitted records."}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </div>
      </div>

      {/* 4. Tab Navigation: Maker Performance Breakdown vs Detailed Records */}
      <div className="dashboard-tabs">
        <button
          className={`dashboard-tab-btn ${activeTab === "makers" ? "active" : ""}`}
          onClick={() => setActiveTab("makers")}
        >
          <svg
            width="17"
            height="17"
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
          Employee (Maker) Creation & QR Generation Breakdown
          <span className="dashboard-tab-badge">
            {makerPerformanceList.length} Makers
          </span>
        </button>

        <button
          className={`dashboard-tab-btn ${activeTab === "details" ? "active" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
          Detailed Merchant Records
          <span className="dashboard-tab-badge">
            {detailedTransactions.length} Records
          </span>
        </button>
      </div>

      {/* 5. TAB 1: MAKER CREATION & QR GENERATION BREAKDOWN TABLE */}
      {activeTab === "makers" && (
        <div className="performance-card">
          <div className="performance-card-header">
            <div>
              <h3 className="performance-card-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#005580"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <polyline points="16 11 18 13 22 9"></polyline>
                </svg>
                Maker Employee Performance ({periodDisplay})
              </h3>
              <span className="report-table-subtitle">
                Total merchant created and total generated QR code for each maker based on live backend data.
              </span>
            </div>
          </div>

          <div className="table-responsive">
            <Table className="report-custom-table mb-0" hover>
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>Rank</th>
                  <th>Maker Username</th>
                  <th>Branch</th>
                  <th className="text-center">Total Merchants Created</th>
                  <th className="text-center">Total Generated QR Codes</th>
                  <th style={{ minWidth: "180px" }}>QR Generation Rate</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      <Spinner animation="border" size="sm" className="mr-2" />
                      Loading live maker performance from backend...
                    </td>
                  </tr>
                ) : makerPerformanceList.length > 0 ? (
                  makerPerformanceList.map((item, index) => {
                    let rankClass = "rank-normal";
                    if (index === 0) rankClass = "rank-gold";
                    else if (index === 1) rankClass = "rank-silver";
                    else if (index === 2) rankClass = "rank-bronze";

                    const rateFillClass =
                      item.qrRate >= 80
                        ? "high"
                        : item.qrRate >= 50
                        ? "medium"
                        : "low";

                    return (
                      <tr key={item.makerUsername}>
                        <td>
                          <span className={`performance-rank-badge ${rankClass}`}>
                            {index + 1}
                          </span>
                        </td>
                        <td>
                          <strong style={{ color: "#005580", fontSize: "14px" }}>
                            {item.makerUsername}
                          </strong>
                          {!isManager && (
                            <Badge variant="info" className="ml-2">
                              Your Profile
                            </Badge>
                          )}
                        </td>
                        <td style={{ color: "#475569" }}>{item.branch}</td>
                        <td
                          className="text-center font-weight-bold"
                          style={{ fontSize: "15px", color: "#005580" }}
                        >
                          {item.merchantsCreated.toLocaleString()}
                        </td>
                        <td
                          className="text-center font-weight-bold"
                          style={{ fontSize: "15px", color: "#2e7d32" }}
                        >
                          {item.qrGenerated.toLocaleString()}
                        </td>
                        <td>
                          <div className="d-flex justify-content-between align-items-center">
                            <span style={{ fontWeight: 700, fontSize: "13px" }}>
                              {item.qrRate}%
                            </span>
                            <span style={{ fontSize: "11px", color: "#64748b" }}>
                              {item.qrGenerated} of {item.merchantsCreated}
                            </span>
                          </div>
                          <div className="rate-bar-container">
                            <div
                              className={`rate-bar-fill ${rateFillClass}`}
                              style={{
                                width: `${Math.min(item.qrRate, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="text-center">
                          <span
                            className={`status-pill ${
                              item.qrRate >= 80
                                ? "rate-high"
                                : item.qrRate >= 50
                                ? "rate-medium"
                                : "rate-low"
                            }`}
                          >
                            {item.qrRate >= 80
                              ? "Excellent"
                              : item.qrRate >= 50
                              ? "Good"
                              : "Pending QRs"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-5 text-muted">
                      No records found in backend API for the selected month, year, or maker username.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {/* 6. TAB 2: DETAILED RECORDS */}
      {activeTab === "details" && (
        <div className="report-table-card">
          <div className="report-table-header">
            <div className="report-table-title-area">
              <h3 className="report-table-title">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#005580"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
                Detailed Records ({searchFilteredTable.length} Records)
              </h3>
              <span className="report-table-subtitle">
                Filtered by: Maker: {effectiveMakerFilter === "ALL" ? "All Makers" : effectiveMakerFilter} | Period: {periodDisplay}
              </span>
            </div>

            {/* Search & Rows per page */}
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div style={{ position: "relative" }}>
                <Form.Control
                  type="text"
                  placeholder="Search records..."
                  size="sm"
                  value={tableSearch}
                  onChange={(e) => {
                    setTableSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    borderRadius: "6px",
                    paddingLeft: "30px",
                    width: "200px",
                  }}
                />
                <svg
                  style={{
                    position: "absolute",
                    left: "9px",
                    top: "9px",
                    color: "#94a3b8",
                  }}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              <select
                className="form-control form-control-sm"
                style={{ width: "95px", borderRadius: "6px" }}
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={10}>10 rows</option>
                <option value={25}>25 rows</option>
                <option value={50}>50 rows</option>
              </select>
            </div>
          </div>

          <div className="table-responsive">
            <Table className="report-custom-table mb-0" hover>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Merchant ID</th>
                  <th>Account Number</th>
                  <th>Merchant Name</th>
                  <th>Maker Username</th>
                  <th>Branch</th>
                  <th>Date</th>
                  <th>QR Generation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
                      <Spinner animation="border" size="sm" className="mr-2" />
                      Loading records...
                    </td>
                  </tr>
                ) : paginatedTableItems.length > 0 ? (
                  paginatedTableItems.map((record, index) => {
                    const serialNumber =
                      (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <tr key={record.id || index}>
                        <td style={{ fontWeight: 600, color: "#64748b" }}>
                          {serialNumber}
                        </td>
                        <td>
                          <span
                            style={{
                              fontFamily: "monospace",
                              fontWeight: 600,
                              color: "#005580",
                            }}
                          >
                            {record.merId}
                          </span>
                        </td>
                        <td>
                          <span style={{ fontFamily: "monospace", color: "#334155" }}>
                            {record.accountNumber}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600 }}>{record.name}</td>
                        <td>
                          <span
                            style={{
                              background: "#e2e8f0",
                              color: "#1e293b",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                          >
                            {record.maker}
                          </span>
                        </td>
                        <td style={{ color: "#475569" }}>{record.branch}</td>
                        <td style={{ color: "#64748b", fontSize: "12px" }}>
                          {record.date || "N/A"}
                        </td>
                        <td>
                          {record.qrStatus === "Generated" ? (
                            <span className="status-pill generated">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Generated
                            </span>
                          ) : (
                            <span className="status-pill pending">
                              Pending QR
                            </span>
                          )}
                        </td>
                        <td>
                          <span
                            style={{
                              display: "inline-block",
                              width: "8px",
                              height: "8px",
                              borderRadius: "50%",
                              backgroundColor:
                                record.status === "Active" ? "#22c55e" : "#ef4444",
                              marginRight: "6px",
                            }}
                          ></span>
                          {record.status}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-5 text-muted">
                      No records found matching the selected filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          <div
            className="d-flex justify-content-between align-items-center p-3 border-top"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <span style={{ fontSize: "13px", color: "#64748b" }}>
              Showing{" "}
              {searchFilteredTable.length === 0
                ? 0
                : (currentPage - 1) * itemsPerPage + 1}{" "}
              to{" "}
              {Math.min(currentPage * itemsPerPage, searchFilteredTable.length)} of{" "}
              {searchFilteredTable.length} records
            </span>

            <div className="d-flex align-items-center gap-1">
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                style={{ borderRadius: "6px" }}
              >
                Previous
              </Button>
              <span
                className="px-3"
                style={{ fontSize: "13px", fontWeight: "600", color: "#334155" }}
              >
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline-secondary"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                style={{ borderRadius: "6px" }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashbord;
