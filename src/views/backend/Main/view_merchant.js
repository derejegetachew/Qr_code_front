import "../../../assets/css/ViewAllMerchant.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { currentUser } from "../../../Utils/tokenUtils";
import { BASE_URL } from "../../../Utils/constants";
import { toast } from "react-toastify";
import "../../../assets/css/ViewAllMerchant.css";
import "../../../assets/css/style.css";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
const ViewAllMerchant = () => {
  const user = currentUser();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const [tempSearchName, setTempSearchName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMerchant, setEditMerchant] = useState({
    MER_ID: "",
    MER_BUSINESS_NAME: "",
    MER_PHONE: "",
    MER_EMAIL: "",
  });

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getAllMerchant`);
        setMerchants(response.data.data);
      } catch (error) {
        console.error("Error fetching merchants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  const formatDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : "N/A";

  const handleSearch = () => {
    setSearchName(tempSearchName);
    setCurrentPage(0); // Reset to first page on new search
  };

  const filteredMerchants = merchants.filter((merchant) => {
    const matchesName = merchant.MER_ACCOUNT?.toLowerCase().includes(
      searchName.toLowerCase()
    );
    return matchesName;
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredMerchants.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  const handleToggleStatus = async (MER_ID, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const confirmMsg =
      newStatus === 1
        ? "Are you sure you want to disable this merchant?"
        : "Are you sure you want to enable this merchant?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await axios.put(`${BASE_URL}/updateMerchantStatus/${MER_ID}`, {
        status: newStatus,
      });

      toast.success(
        `Merchant ${newStatus === 1 ? "enabled" : "disabled"} successfully`
      );

      // ✅ Update UI state
      setMerchants((prevMerchants) =>
        prevMerchants.map((merchant) =>
          merchant.MER_ID === MER_ID
            ? { ...merchant, status: newStatus }
            : merchant
        )
      );
    } catch (error) {
      toast.error("Failed to update merchant status");
      console.error("Toggle status error:", error);
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
  };

  const handleSaveEdit = async () => {
    try {
      const user = currentUser(); // 👈 get current logged-in user
      const updatedBy = user?.username || user?.id || "unknown";

      await axios.put(`${BASE_URL}/updateMerchant/${editMerchant.MER_ID}`, {
        MER_BUSINESS_NAME: editMerchant.MER_BUSINESS_NAME,
        MER_CITY: editMerchant.MER_CITY,
        MER_LOCATION: editMerchant.MER_LOCATION,
        MER_PHONE: editMerchant.MER_PHONE,
        MER_EMAIL: editMerchant.MER_EMAIL,
        UPDATED_BY: updatedBy, // 👈 send updater name
      });

      toast.success("Merchant updated successfully!");

      // Update local state
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

  // const handleEdit = (merchant) => {
  //   alert(`Editing merchant: ${merchant.MER_BUSINESS_NAME}`);
  //   // TODO: open edit modal or navigate to edit page
  // };

  const handleDelete = async (MER_ID) => {
    if (!window.confirm("Are you sure you want to delete this merchant?"))
      return;

    try {
      await axios.delete(`${BASE_URL}/deleteMerchant/${MER_ID}`);
      toast.success("Merchant deleted successfully");

      // Update UI
      setMerchants((prev) =>
        prev.filter((merchant) => merchant.MER_ID !== MER_ID)
      );
    } catch (error) {
      toast.error("Failed to delete merchant");
      console.error("Delete error:", error);
    }
  };
  const menuItemStyle = {
    padding: "0px 0px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "background 0.2s",
  };

  return (
    <Container className="mt-2">
      {/* <h6 className="text-center">Total Merchants: {merchants.length}</h6> */}

      <div className="d-flex align-items-center mb-2">
        <Form.Group
          className="me-2 mb-0"
          style={{ flexGrow: 1, maxWidth: "300px" }}
        >
          <Form.Control
            type="text"
            placeholder="Search by owner name..."
            value={tempSearchName}
            onChange={(e) => setTempSearchName(e.target.value)}
            className="search-input"
            style={{ border: "1px solid #005580" }}
          />
        </Form.Group>

        <Button
          className="btn btn-success"
          onClick={handleSearch}
          style={{
            whiteSpace: "nowrap",
            border: "1px solid #005580",
            backgroundColor: "#005580",
            marginLeft: "10px",
          }}
        >
          Search
        </Button>

        <Link to="/create_merchant">
          <Button
            className="btn btn-success"
            style={{
              whiteSpace: "nowrap",
              border: "1px solid #005580",
              backgroundColor: "#228B22",
              marginLeft: "580px",
              marginTop: "-100px",
              marginBottom: "-50px",
              paddingLeft: "20px",
              marginRight: "20px",
            }}
          >
            Add Merchant
          </Button>
        </Link>
      </div>

      {/* {searchName && (
        <ListGroup horizontal className="mb-3">
          <ListGroup.Item className="branch-count">
            Results for "{searchName}": {filteredMerchants.length} merchants
          </ListGroup.Item>
        </ListGroup>
      )} */}

      {loading ? (
        <p className="text-center">Loading merchants...</p>
      ) : (
        <>
          <div className="table-container">
            <Table striped bordered hover responsive className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Merchant_ID</th>
                  <th>Owner Name</th>
                  <th>Business Name</th>
                  <th>Account</th>
                  <th>Phone</th>
                  {/* <th>Email</th> */}
                  <th>Maker Branch</th>
                  <th>Merchant Branch</th>
                  <th>Category Code</th>
                  <th>Maker UserName</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center">
                      No matching merchants found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((merchant, index) => (
                    <tr key={merchant.MER_ID || index}>
                      <td>{offset + index + 1}</td>
                      <td>{merchant.MER_ID || "N/A"}</td>
                      <td>{merchant.MER_OWNER_NAME || "N/A"}</td>
                      <td>{merchant.MER_BUSINESS_NAME || "N/A"}</td>
                      <td>{merchant.MER_ACCOUNT || "N/A"}</td>
                      <td>{merchant.MER_PHONE || "N/A"}</td>
                      {/* <td>{merchant.MER_EMAIL || "N/A"}</td> */}
                      <td>{merchant.MAKER_BRANCH || "N/A"}</td>
                      <td>{merchant.MER_BRANCH_NAME || "N/A"}</td>
                      <td>{merchant.MER_CATAGORY_CODE || "N/A"}</td>
                      <td>{merchant.CREATED_BY || "N/A"}</td>
                      <td>{formatDate(merchant.MER_CREATION_DATE)}</td>
                      {/* <td>
                        <Button
                          type="button"
                          size="sm"
                          className="me-2"
                          variant={merchant.status == 0 ? "danger" : "success"}
                          onClick={() =>
                            handleToggleStatus(merchant.MER_ID, merchant.status)
                          }
                        >
                          {merchant.status == 0 ? "Disabled" : "Enabled"}
                        </Button>
                      </td> */}
                      <td
                        style={{
                          position: "relative",
                          textAlign: "right",
                          verticalAlign: "middle",
                        }}
                      >
                        {/* Three Dots Icon */}
                        <div
                          onClick={() =>
                            setActiveMenu(
                              merchant.MER_ID === activeMenu
                                ? null
                                : merchant.MER_ID
                            )
                          }
                          style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            userSelect: "none",
                            padding: "4px",
                            lineHeight: "1",
                          }}
                        >
                          ⋮
                        </div>

                        {/* Popup Menu */}
                        {activeMenu === merchant.MER_ID && (
                          <div
                            style={{
                              position: "absolute",
                              top: "2px",
                              right: "0",
                              background: "#fff",
                              boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                              zIndex: 9999,
                              borderRadius: "6px",
                              padding: "3px 0",
                              minWidth: "100px",
                              fontSize: "13px",
                              overflow: "visible", // ensures nothing gets cut off
                            }}
                          >
                            <div
                              onClick={() => handleEdit(merchant)}
                              style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.background = "#f5f5f5")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.background = "transparent")
                              }
                            >
                              ✏️ Edit
                            </div>

                            <div
                              onClick={() =>
                                handleToggleStatus(
                                  merchant.MER_ID,
                                  merchant.status
                                )
                              }
                              style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.background = "#f5f5f5")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.background = "transparent")
                              }
                            >
                              {merchant.status === 0
                                ? "✅ Enable"
                                : "🚫 Disable"}
                            </div>

                            {/* <div
                              onClick={() => handleDelete(merchant.MER_ID)}
                              style={{
                                padding: "5px 0px",
                                cursor: "pointer",
                                color: "red",
                                whiteSpace: "nowrap",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) =>
                                (e.target.style.background = "#ffeaea")
                              }
                              onMouseLeave={(e) =>
                                (e.target.style.background = "transparent")
                              }
                            >
                              🗑️ Delete
                            </div> */}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            {/* Edit Modal */}
            {showEditModal && (
              <div
                className="modal fade show"
                style={{
                  display: "block",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 1050,
                }}
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Edit Merchant</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowEditModal(false)}
                      ></button>
                    </div>

                    <div className="modal-body">
                      <Form>
                        <Form.Group className="mb-3">
                          <Form.Label>Business Name:</Form.Label>
                          <Form.Control
                            type="text"
                            value={editMerchant.MER_BUSINESS_NAME}
                            onChange={(e) =>
                              setEditMerchant({
                                ...editMerchant,
                                MER_BUSINESS_NAME: e.target.value,
                              })
                            }
                            style={{ borderColor: "#005580" }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            value={editMerchant.MER_CITY}
                            onChange={(e) =>
                              setEditMerchant({
                                ...editMerchant,
                                MER_CITY: e.target.value,
                              })
                            }
                            style={{ borderColor: "#005580" }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Location</Form.Label>
                          <Form.Control
                            type="text"
                            value={editMerchant.MER_LOCATION}
                            onChange={(e) =>
                              setEditMerchant({
                                ...editMerchant,
                                MER_LOCATION: e.target.value,
                              })
                            }
                            style={{ borderColor: "#005580" }}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone Number</Form.Label>
                          <Form.Control
                            type="text"
                            value={editMerchant.MER_PHONE}
                            onChange={(e) =>
                              setEditMerchant({
                                ...editMerchant,
                                MER_PHONE: e.target.value,
                              })
                            }
                            style={{ borderColor: "#005580" }}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={editMerchant.MER_EMAIL}
                            onChange={(e) =>
                              setEditMerchant({
                                ...editMerchant,
                                MER_EMAIL: e.target.value,
                              })
                            }
                            style={{ borderColor: "#005580" }}
                          />
                        </Form.Group>
                      </Form>
                    </div>

                    <div className="modal-footer">
                      <Button
                        variant="secondary"
                        onClick={() => setShowEditModal(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={handleSaveEdit}
                        style={{
                          backgroundColor: "#005580",
                          borderColor: "#005580",
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {filteredMerchants.length > 0 && (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default ViewAllMerchant;
