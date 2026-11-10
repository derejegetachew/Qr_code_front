import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Table, Form, Button, Spinner, Modal } from "react-bootstrap";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { QRCode } from "react-qrcode-logo";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import { generateEMVQRCode } from "../../../services/qr-generator";
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

  const [selectedMerchant, setSelectedMerchant] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const qrCardRef = useRef(null);

  const getMerchantNameFontSize = (name) => {
    if (!name) return "24px";
    const len = name.trim().length;
    if (len <= 12) return "26px"; // Small name: increase font
    if (len <= 18) return "24px";
    if (len <= 24) return "20px";
    if (len <= 30) return "18px";
    if (len <= 38) return "17px";
    return "16px";
  };

  const getQrString = (merchant) => {
    if (!merchant) return "";
    if (merchant.QR) return merchant.QR;
    if (merchant.QR_CODE) return merchant.QR_CODE;
    if (merchant.qr_code) return merchant.qr_code;
    if (merchant.qr) return merchant.qr;

    try {
      const merchantAccountInfo = {
        "00": merchant.MER_IDEN || "00000",
        "01": "ABAYETAA",
        "02": merchant.ACC_NUMB || "",
      };

      const qrFields = [
        { id: "00", value: "01" },
        { id: "01", value: "11" },
        {
          id: "28",
          value: Object.entries(merchantAccountInfo).map(([tag, value]) => ({
            id: tag,
            value,
          })),
        },
        { id: "52", value: merchant.MER_CODE || "5411" },
        { id: "53", value: merchant.transactionCurrency || "230" },
        { id: "58", value: merchant.countryCode || "ET" },
        { id: "59", value: merchant.NAME || merchant.MER_NAME || "Merchant" },
        { id: "60", value: merchant.CITY || "Addis Ababa" },
      ];

      if (merchant.transactionAmount) {
        qrFields.push({ id: "54", value: merchant.transactionAmount });
      }

      return generateEMVQRCode(qrFields);
    } catch (err) {
      console.error("Error generating QR string:", err);
      return merchant.ACC_NUMB || "";
    }
  };

  const createA5ImageBlob = async (qrElement) => {
    const rawImage = await toPng(qrElement, {
      pixelRatio: 4,
      backgroundColor: "#ffffff",
    });

    const canvas = document.createElement("canvas");
    canvas.width = 1748;
    canvas.height = 2480;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const targetWidthPx = (85 / 148) * canvas.width;

    const img = new Image();
    img.src = rawImage;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgRatio = img.width / img.height;
    const drawW = targetWidthPx;
    const drawH = targetWidthPx / imgRatio;

    const drawX = (canvas.width - drawW) / 2;
    const drawY = (canvas.height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  };

  const handleDownloadImage = async () => {
    if (!qrCardRef.current || !selectedMerchant) return;
    try {
      const blob = await createA5ImageBlob(qrCardRef.current);
      const merchantName = (
        selectedMerchant.NAME ||
        selectedMerchant.MER_NAME ||
        `QRCode_${selectedMerchant.MER_IDEN || "merchant"}`
      )
        .trim()
        .replace(/[/\\?%*:|"<>]/g, "_");
      saveAs(blob, `${merchantName}.png`);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      console.error("Failed to download image:", error);
      toast.error("Failed to download image. Please try again.");
    }
  };

  const handleDownloadPDF = async () => {
    if (!qrCardRef.current || !selectedMerchant) return;
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const targetWidth = 85;

      const image = await toPng(qrCardRef.current, {
        pixelRatio: 4,
        backgroundColor: "#ffffff",
      });

      const imgProps = pdf.getImageProperties(image);
      const imgRatio = imgProps.width / imgProps.height;

      const renderW = targetWidth;
      const renderH = targetWidth / imgRatio;

      const x = (pageWidth - renderW) / 2;
      const y = (pageHeight - renderH) / 2;

      pdf.addImage(image, "PNG", x, y, renderW, renderH);

      const merchantName = (
        selectedMerchant.NAME ||
        selectedMerchant.MER_NAME ||
        `QRCode_${selectedMerchant.MER_IDEN || "merchant"}`
      )
        .trim()
        .replace(/[/\\?%*:|"<>]/g, "_");
      pdf.save(`${merchantName}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const handlePrint = async () => {
    if (!qrCardRef.current || !selectedMerchant) return;
    try {
      const image = await toPng(qrCardRef.current, { pixelRatio: 4 });
      const printTitle = (
        selectedMerchant.NAME ||
        selectedMerchant.MER_NAME ||
        "QRCode"
      ).trim();

      const printWindow = window.open("", "_blank", "width=600,height=850");
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${printTitle}</title>
          <style>
            @page {
              size: A5 portrait;
              margin: 10mm;
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { background: #fff; }
            .a5-page {
              width: 128mm;
              height: 190mm;
              margin: 0 auto;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .qr-image {
              width: 85mm;
              height: auto;
              max-height: 160mm;
              object-fit: contain;
            }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .a5-page { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="a5-page">
            <img src="${image}" alt="QR Code" class="qr-image" />
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); window.close(); }, 500);
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.document.title = printTitle;
    } catch (error) {
      console.error("Failed to print QR:", error);
      toast.error("Failed to print QR code. Please try again.");
    }
  };

  const handleOpenQrModal = (merchant) => {
    setSelectedMerchant(merchant);
    setShowQrModal(true);
  };

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
    const targetId = merchant.id ?? merchant.ID ?? merchant.MER_IDEN ?? merchant.MER_ID;
    if (!targetId) {
      toast.error("QR Record ID is missing");
      return;
    }

    const currentStatus = getStatus(merchant);
    const newStatus = currentStatus === 1 ? 0 : 1;
    const confirmMsg =
      newStatus === 0
        ? "Are you sure you want to disable this merchant QR?"
        : "Are you sure you want to enable this merchant QR?";

    if (!window.confirm(confirmMsg)) return;

    try {
      console.log(`Updating QR status for ${targetId}:`, { status: newStatus });
      const res = await axios.put(`${BASE_URL}/updateqrgenerateStatus/${targetId}`, {
        status: newStatus,
        STATUS: newStatus,
      });
      console.log("updateqrgenerateStatus response:", res.data);

      toast.success(
        `Merchant QR ${newStatus === 1 ? "enabled" : "disabled"} successfully`
      );

      setMerchants((prevMerchants) =>
        prevMerchants.map((m) => {
          const mId = m.id ?? m.ID ?? m.MER_IDEN ?? m.MER_ID;
          if (mId === targetId) {
            return {
              ...m,
              status: newStatus,
              STATUS: newStatus,
            };
          }
          return m;
        })
      );
    } catch (error) {
      console.error("Toggle status error:", error.response || error);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update merchant QR status"
      );
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
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="text-center py-5 text-muted">
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
                          <span
                            className={`status-pill ${getStatus(merchant) === 0
                              ? "status-disabled"
                              : "status-enabled"
                              }`}
                          >
                            {getStatus(merchant) === 0 ? "Disabled" : "Active"}
                          </span>
                        </td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center gap-2">
                            <button
                              type="button"
                              className="btn-action-toggle btn-action-view"
                              onClick={() => handleOpenQrModal(merchant)}
                              title="View & Download QR Code"
                            >
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                              View QR
                            </button>
                            <button
                              type="button"
                              className={`btn-action-toggle ${getStatus(merchant) === 0
                                ? "btn-action-enable"
                                : "btn-action-disable"
                                }`}
                              onClick={(e) => handleToggleStatus(merchant, e)}
                              title={getStatus(merchant) === 0 ? "Enable QR" : "Disable QR"}
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

      {/* View & Download QR Code Modal */}
      <Modal
        show={showQrModal}
        onHide={() => setShowQrModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton style={{ borderBottom: "1px solid #edf2f7" }}>
          <Modal.Title style={{ color: "#004461", fontSize: "18px", fontWeight: "700" }}>
            {selectedMerchant
              ? `${selectedMerchant.NAME || selectedMerchant.MER_NAME || "Merchant"} - QR Code`
              : "QR Code Preview"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f8fafc", padding: "28px" }}>
          {selectedMerchant && (
            <div className="row align-items-center">
              {/* QR Preview Card */}
              <div className="col-md-6 d-flex justify-content-center mb-3 mb-md-0">
                <div
                  ref={qrCardRef}
                  style={{
                    display: "inline-block",
                    width: "340px",
                    backgroundColor: "white",
                    textAlign: "center",
                    padding: "20px 16px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                    border: "1px solid #e2e8f0",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <QRCode
                      value={getQrString(selectedMerchant)}
                      logoImage="/image/abay-logo.png"
                      logoWidth={600}
                      bgColor="#FFFFFF"
                      fgColor="#004461"
                      size={3000}
                      level="L"
                      renderAs="svg"
                      style={{
                        paddingTop: "2px",
                        width: 180,
                        height: 180,
                      }}
                    />
                  </div>
                  <strong
                    style={{
                      display: "block",
                      marginTop: "20px",
                      lineHeight: "1.2",
                      textAlign: "center",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        fontWeight: "bold",
                        fontSize: getMerchantNameFontSize(
                          selectedMerchant.NAME || selectedMerchant.MER_NAME,
                        ),
                        whiteSpace: "nowrap",
                        color: "#000000",
                      }}
                    >
                      {selectedMerchant.NAME ||
                        selectedMerchant.MER_NAME ||
                        "N/A"}
                    </span>
                    <div style={{ marginTop: "6px" }}>
                      <Form.Label
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          marginBottom: 0,
                          color: "#4a5568",
                        }}
                      >
                        Merchant ID :
                      </Form.Label>{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "#004461",
                        }}
                      >
                        {selectedMerchant.MER_IDEN || "N/A"}
                      </span>
                    </div>
                  </strong>
                </div>
              </div>

              {/* Merchant Details Summary */}
              <div className="col-md-6">
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    padding: "20px",
                    border: "1px solid #e2e8f0",
                  }}
                >
                  <h6
                    style={{
                      color: "#004461",
                      fontWeight: "700",
                      marginBottom: "16px",
                      borderBottom: "1px solid #edf2f7",
                      paddingBottom: "8px",
                    }}
                  >
                    Merchant Information
                  </h6>
                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    <strong className="text-muted">Business Name:</strong>{" "}
                    <span className="fw-bold">
                      {selectedMerchant.NAME || "N/A"}
                    </span>
                  </p>
                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    <strong className="text-muted">Account Number:</strong>{" "}
                    <code>{selectedMerchant.ACC_NUMB || "N/A"}</code>
                  </p>
                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    <strong className="text-muted">Merchant ID:</strong>{" "}
                    <span className="fw-bold">
                      {selectedMerchant.MER_IDEN || "N/A"}
                    </span>
                  </p>
                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    <strong className="text-muted">Category (MCC):</strong>{" "}
                    {selectedMerchant.MER_CODE || "5411"}
                  </p>
                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    <strong className="text-muted">Branch:</strong>{" "}
                    {selectedMerchant.BRANCH || "N/A"}
                  </p>
                  <p className="mb-2" style={{ fontSize: "14px" }}>
                    <strong className="text-muted">Phone:</strong>{" "}
                    {selectedMerchant.MOBILE_NUMBER || "N/A"}
                  </p>
                  <p className="mb-0" style={{ fontSize: "14px" }}>
                    <strong className="text-muted">Status:</strong>{" "}
                    <span
                      className={`badge ${getStatus(selectedMerchant) === 0
                        ? "bg-danger"
                        : "bg-success"
                        }`}
                      style={{ color: "#fff" }}
                    >
                      {getStatus(selectedMerchant) === 0
                        ? "Disabled"
                        : "Active"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer
          style={{
            borderTop: "1px solid #edf2f7",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Button
              style={{
                backgroundColor: "#005580",
                borderColor: "#005580",
                fontWeight: "600",
                fontSize: "14px",
              }}
              onClick={handleDownloadImage}
            >
              🖼️ Download Image
            </Button>
            <Button
              style={{
                backgroundColor: "#005580",
                borderColor: "#005580",
                fontWeight: "600",
                fontSize: "14px",
              }}
              onClick={handleDownloadPDF}
            >
              📄 Download PDF
            </Button>
            <Button
              style={{
                backgroundColor: "#c8820e",
                borderColor: "#c8820e",
                fontWeight: "bold",
                fontSize: "14px",
              }}
              onClick={handlePrint}
            >
              🖨️ Print
            </Button>
          </div>
          <Button variant="secondary" onClick={() => setShowQrModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

  );
};

export default ViewQr;
