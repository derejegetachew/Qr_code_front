import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button, Modal, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { currentUser } from "../../../Utils/tokenUtils";
import { BASE_URL } from "../../../Utils/constants";
import { toast } from "react-toastify";
import "../../../assets/css/ViewAllMerchant.css";

const ViewMerchant = () => {
  const user = currentUser();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [tempSearchName, setTempSearchName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMerchant, setEditMerchant] = useState({
    MER_ID: "",
    MER_BUSINESS_NAME: "",
    MER_CITY: "",
    MER_LOCATION: "",
    MER_PHONE: "",
    MER_EMAIL: "",
  });

  const fetchMerchants = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/getAllMerchant`);
      console.log("Fetched merchants data:", response.data);
      if (response.data && response.data.data) {
        setMerchants(response.data.data);
      } else if (Array.isArray(response.data)) {
        setMerchants(response.data);
      } else {
        setMerchants([]);
      }
    } catch (error) {
      console.error("Error fetching merchants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const formatDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : "N/A";

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
    const account = (merchant.MER_ACCOUNT || "").toLowerCase();
    const owner = (merchant.MER_OWNER_NAME || "").toLowerCase();
    const business = (merchant.MER_BUSINESS_NAME || "").toLowerCase();
    const merId = (merchant.MER_ID || "").toLowerCase();
    const phone = (merchant.MER_PHONE || "").toLowerCase();
    const branch = (merchant.MAKER_BRANCH || "").toLowerCase();

    return (
      account.includes(query) ||
      owner.includes(query) ||
      business.includes(query) ||
      merId.includes(query) ||
      phone.includes(query) ||
      branch.includes(query)
    );
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredMerchants.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getStatus = (merchant) => {
    const val =
      merchant.status !== undefined
        ? merchant.status
        : merchant.STATUS !== undefined
        ? merchant.STATUS
        : merchant.MER_STATUS !== undefined
        ? merchant.MER_STATUS
        : merchant.mer_status;

    if (val === undefined || val === null) return 1;
    if (
      val === 0 ||
      val === "0" ||
      val === false ||
      String(val).toLowerCase() === "disabled" ||
      String(val).toLowerCase() === "inactive"
    ) {
      return 0;
    }
    return 1;
  };

  const handleToggleStatus = async (merchant, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const targetId = merchant.MER_ID ?? merchant.id ?? merchant.ID;
    if (!targetId) {
      toast.error("Merchant ID is missing");
      return;
    }

    const currentStatus = getStatus(merchant);
    const newStatus = currentStatus === 1 ? 0 : 1;
    const confirmMsg =
      newStatus === 0
        ? "Are you sure you want to disable this merchant?"
        : "Are you sure you want to enable this merchant?";

    if (!window.confirm(confirmMsg)) return;

    try {
      console.log(`Sending status update for ${targetId}:`, { status: newStatus });
      const res = await axios.put(`${BASE_URL}/updateMerchantStatus/${targetId}`, {
        status: newStatus,
        STATUS: newStatus,
        mer_status: newStatus,
        MER_STATUS: newStatus,
      });
      console.log("updateMerchantStatus response:", res.data);

      toast.success(
        `Merchant ${newStatus === 1 ? "enabled" : "disabled"} successfully`
      );

      setMerchants((prevMerchants) =>
        prevMerchants.map((m) => {
          const mId = m.MER_ID ?? m.id ?? m.ID;
          if (mId === targetId) {
            return {
              ...m,
              status: newStatus,
              STATUS: newStatus,
              mer_status: newStatus,
              MER_STATUS: newStatus,
            };
          }
          return m;
        })
      );
      setActiveMenu(null);
    } catch (error) {
      console.error("Toggle status error:", error.response || error);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update merchant status on server"
      );
    }
  };

  const handleEdit = (merchant) => {
    setEditMerchant({
      MER_ID: merchant.MER_ID,
      MER_BUSINESS_NAME: merchant.MER_BUSINESS_NAME || "",
      MER_CITY: merchant.MER_CITY || "",
      MER_LOCATION: merchant.MER_LOCATION || "",
      MER_PHONE: merchant.MER_PHONE || "",
      MER_EMAIL: merchant.MER_EMAIL || "",
    });
    setShowEditModal(true);
    setActiveMenu(null);
  };

  const handleSaveEdit = async () => {
    try {
      const user = currentUser();
      const updatedBy = user?.username || user?.id || "unknown";

      await axios.put(`${BASE_URL}/updateMerchant/${editMerchant.MER_ID}`, {
        MER_BUSINESS_NAME: editMerchant.MER_BUSINESS_NAME,
        MER_CITY: editMerchant.MER_CITY,
        MER_LOCATION: editMerchant.MER_LOCATION,
        MER_PHONE: editMerchant.MER_PHONE,
        MER_EMAIL: editMerchant.MER_EMAIL,
        UPDATED_BY: updatedBy,
      });

      toast.success("Merchant updated successfully!");

      setMerchants((prev) =>
        prev.map((m) =>
          m.MER_ID === editMerchant.MER_ID ? { ...m, ...editMerchant } : m
        )
      );

      setShowEditModal(false);
    } catch (error) {
      toast.error("Failed to update merchant");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="merchant-view-wrapper">
      <div className="table-card">
        {/* Table Card Header with Search & Add Merchant Action */}
        <div className="table-card-header">
          <div>
            <h4 className="table-card-title">
              Merchants Directory
              <span className="table-badge-count">
                {filteredMerchants.length} Merchants
              </span>
            </h4>
            <div className="table-card-subtitle">
              Comprehensive list of all registered merchant partners and accounts
            </div>
          </div>

          <div className="table-controls-bar">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="Search by name, account, merchant ID, phone..."
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

            <Link to="/create_merchant">
              <Button className="btn-success-custom">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Merchant
              </Button>
            </Link>
          </div>
        </div>

        {/* Table Body */}
        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center p-5">
            <Spinner animation="border" variant="primary" style={{ color: "#005580" }} />
            <p className="mt-3 text-muted">Loading merchant records...</p>
          </div>
        ) : (
          <>
            <div className="table-container">
              <Table hover responsive className="custom-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Merchant ID</th>
                    <th>Owner Name</th>
                    <th>Business Name</th>
                    <th>Account No</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Maker Branch</th>
                    <th>Merchant Branch</th>
                    <th>Category Code</th>
                    <th>Maker</th>
                    <th>Created At</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="14" className="text-center py-5 text-muted">
                        No matching merchants found.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((merchant, index) => (
                      <tr key={merchant.MER_ID || index}>
                        <td className="text-muted">{offset + index + 1}</td>
                        <td className="fw-bold">{merchant.MER_ID || "N/A"}</td>
                        <td>{merchant.MER_OWNER_NAME || "N/A"}</td>
                        <td className="fw-bold">{merchant.MER_BUSINESS_NAME || "N/A"}</td>
                        <td className="cell-account">{merchant.MER_ACCOUNT || "N/A"}</td>
                        <td>{merchant.MER_PHONE || "N/A"}</td>
                        <td>
                          {merchant.MER_CITY || merchant.MER_LOCATION
                            ? `${merchant.MER_CITY || ""} ${merchant.MER_LOCATION || ""}`.trim()
                            : "N/A"}
                        </td>
                        <td>{merchant.MAKER_BRANCH || "N/A"}</td>
                        <td>{merchant.MER_BRANCH_NAME || "N/A"}</td>
                        <td>{merchant.MER_CATAGORY_CODE || "N/A"}</td>
                        <td>{merchant.CREATED_BY || "N/A"}</td>
                        <td>{formatDate(merchant.MER_CREATION_DATE)}</td>
                        <td className="text-center">
                          <span
                            className={`status-pill ${
                              getStatus(merchant) === 0
                                ? "status-disabled"
                                : "status-enabled"
                            }`}
                          >
                            {getStatus(merchant) === 0 ? "Disabled" : "Active"}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="action-buttons-group">
                            <button
                              type="button"
                              className="btn-action-edit"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEdit(merchant);
                              }}
                              title="Edit merchant details"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                              </svg>
                              Edit
                            </button>

                            <button
                              type="button"
                              className={`btn-action-toggle ${
                                getStatus(merchant) === 0
                                  ? "btn-action-enable"
                                  : "btn-action-disable"
                              }`}
                              onClick={(e) => handleToggleStatus(merchant, e)}
                              title={getStatus(merchant) === 0 ? "Enable merchant" : "Disable merchant"}
                            >
                              {getStatus(merchant) === 0 ? (
                                <>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                  Enable
                                </>
                              ) : (
                                <>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                                  </svg>
                                  Disable
                                </>
                              )}
                            </button>
                          </div>
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
                  <label htmlFor="merchant-page-size">Rows per page:</label>
                  <select
                    id="merchant-page-size"
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

      {/* Edit Merchant Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#005580", fontSize: "18px", fontWeight: "700" }}>
            Edit Merchant #{editMerchant.MER_ID}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="small font-weight-bold">Business Name</Form.Label>
              <Form.Control
                type="text"
                value={editMerchant.MER_BUSINESS_NAME}
                onChange={(e) =>
                  setEditMerchant({
                    ...editMerchant,
                    MER_BUSINESS_NAME: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small font-weight-bold">City</Form.Label>
              <Form.Control
                type="text"
                value={editMerchant.MER_CITY}
                onChange={(e) =>
                  setEditMerchant({
                    ...editMerchant,
                    MER_CITY: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small font-weight-bold">Location</Form.Label>
              <Form.Control
                type="text"
                value={editMerchant.MER_LOCATION}
                onChange={(e) =>
                  setEditMerchant({
                    ...editMerchant,
                    MER_LOCATION: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small font-weight-bold">Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={editMerchant.MER_PHONE}
                onChange={(e) =>
                  setEditMerchant({
                    ...editMerchant,
                    MER_PHONE: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="small font-weight-bold">Email</Form.Label>
              <Form.Control
                type="email"
                value={editMerchant.MER_EMAIL}
                onChange={(e) =>
                  setEditMerchant({
                    ...editMerchant,
                    MER_EMAIL: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            style={{ backgroundColor: "#005580", borderColor: "#005580" }}
            onClick={handleSaveEdit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewMerchant;
