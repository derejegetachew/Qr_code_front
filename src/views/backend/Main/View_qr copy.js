import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button, Spinner } from "react-bootstrap";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { currentUser } from "../../../Utils/tokenUtils";
import { BASE_URL } from "../../../Utils/constants";
import { toast } from "react-toastify";
import "../../../assets/css/ViewAllMerchant.css";

const ViewQr = () => {
  const user = currentUser();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [tempSearchName, setTempSearchName] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getallMerchantQr`);
        console.log("Fetched merchant QR data:", response.data);

        if (response.data && response.data.data) {
          setMerchants(response.data.data);
        } else if (Array.isArray(response.data)) {
          setMerchants(response.data);
        } else {
          console.warn("Unexpected response format", response.data);
        }
      } catch (error) {
        console.error("Error fetching merchant QRs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  const formatDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd HH:mm") : "N/A";

  const handleSearch = () => {
    setSearchName(tempSearchName);
    setCurrentPage(0);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const filteredMerchants = merchants.filter((merchant) => {
    const query = searchName.toLowerCase().trim();
    if (!query) return true;
    const account = (merchant.ACC_NUMB || "").toLowerCase();
    const name = (merchant.NAME || "").toLowerCase();
    const merId = (merchant.MER_IDEN || "").toLowerCase();
    const branch = (merchant.BRANCH || "").toLowerCase();
    const maker = (merchant.MAKER_USER_NAME || "").toLowerCase();
    return (
      account.includes(query) ||
      name.includes(query) ||
      merId.includes(query) ||
      branch.includes(query) ||
      maker.includes(query)
    );
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredMerchants.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const confirmMsg =
      newStatus === 1
        ? "Are you sure you want to enable this merchant QR?"
        : "Are you sure you want to disable this merchant QR?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await axios.put(`${BASE_URL}/updateqrgenerateStatus/${id}`, {
        status: newStatus,
      });

      toast.success(
        `Merchant ${newStatus === 1 ? "enabled" : "disabled"} successfully`
      );

      setMerchants((prevMerchants) =>
        prevMerchants.map((merchant) =>
          merchant.id === id ? { ...merchant, status: newStatus } : merchant
        )
      );
    } catch (error) {
      toast.error("Failed to update merchant status");
      console.error("Toggle status error:", error);
    }
  };

  return (
    <div className="merchant-view-wrapper">
      <div className="table-card">
        {/* Header with Title and Search Controls */}
        <div className="table-card-header">
          <div>
            <h4 className="table-card-title">
              Generated QR Codes
              <span className="table-badge-count">
                {filteredMerchants.length} Records
              </span>
            </h4>
            <div className="table-card-subtitle">
              Overview of all generated QR codes and merchant payment endpoints
            </div>
          </div>

          <div className="table-controls-bar">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search by name, account, merchant ID, branch..."
                value={tempSearchName}
                onChange={(e) => setTempSearchName(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>

            <Button
              className="btn-primary-custom"
              onClick={handleSearch}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Search
            </Button>

            {searchName && (
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  setTempSearchName("");
                  setSearchName("");
                  setCurrentPage(0);
                }}
              >
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Content Table */}
        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <Spinner animation="border" variant="primary" style={{ color: "#005580" }} />
            <p className="mt-3 text-muted">Loading generated QR records...</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <Table hover responsive className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Merchant ID</th>
                    <th>Category Code</th>
                    <th>Business Name</th>
                    <th>Account No</th>
                    <th>Phone No</th>
                    <th>Maker Branch</th>
                    <th>Branch Code</th>
                    <th>Maker Username</th>
                    <th>Maker Name</th>
                    <th>Created At</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="12" className="text-center py-5 text-muted">
                        No matching QR records found.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((merchant, index) => (
                      <tr key={merchant.id || merchant.ID || index}>
                        <td className="text-muted">{offset + index + 1}</td>
                        <td className="fw-bold">{merchant.MER_IDEN || "N/A"}</td>
                        <td>{merchant.MER_CODE || "N/A"}</td>
                        <td className="fw-bold">{merchant.NAME || "N/A"}</td>
                        <td className="cell-account">{merchant.ACC_NUMB || "N/A"}</td>
                        <td>{merchant.MOBILE_NUMBER || "N/A"}</td>
                        <td>{merchant.BRANCH || "N/A"}</td>
                        <td>{merchant.MAKER_BRANCH_CODE || "N/A"}</td>
                        <td>{merchant.MAKER_USER_NAME || "N/A"}</td>
                        <td>{merchant.CREATEDBY || "N/A"}</td>
                        <td>{formatDate(merchant.CREATED_AT)}</td>
                        <td className="text-center">
                          <button
                            type="button"
                            className={`status-pill ${
                              merchant.status === 0
                                ? "status-disabled"
                                : "status-enabled"
                            }`}
                            onClick={() =>
                              handleToggleStatus(merchant.id, merchant.status)
                            }
                            title="Click to toggle status"
                          >
                            {merchant.status === 0 ? "Disabled" : "Active"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>

            {/* Footer with counts, page size & pagination */}
            <div className="table-footer-bar">
              <div className="d-flex align-items-center gap-3">
                <span className="table-info-text">
                  Showing {filteredMerchants.length === 0 ? 0 : offset + 1} to{" "}
                  {Math.min(offset + itemsPerPage, filteredMerchants.length)} of{" "}
                  {filteredMerchants.length} entries
                </span>

                <div className="page-size-selector">
                  <label htmlFor="qr-page-size">Rows per page:</label>
                  <select
                    id="qr-page-size"
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(0);
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>

              {filteredMerchants.length > 0 && (
                <ReactPaginate
                  previousLabel={"← Prev"}
                  nextLabel={"Next →"}
                  breakLabel={"..."}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={3}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
                  forcePage={currentPage}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewQr;
