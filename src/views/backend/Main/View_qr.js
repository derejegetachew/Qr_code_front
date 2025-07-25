import "../../../assets/css/ViewAllMerchant.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, Button } from "react-bootstrap";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { currentUser } from "../../../Utils/tokenUtils";
import {BASE_URL} from "../../../Utils/constants";  

const ViewAllMerchant = () => {
  const user = currentUser();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  const [tempSearchName, setTempSearchName] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/getallMerchantQr`
        );

        console.log("Fetched merchant data:", response.data);

        // Adjust depending on your API response structure
        if (response.data && response.data.data) {
          setMerchants(response.data.data);
        } else if (Array.isArray(response.data)) {
          setMerchants(response.data); // fallback in case no wrapper
        } else {
          console.warn("Unexpected response format", response.data);
        }
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
    setCurrentPage(0);
  };

  const filteredMerchants = merchants.filter((merchant) => {
    const name = merchant.name || merchant.mer_owner_name || "";
    return name.toLowerCase().includes(searchName.toLowerCase());
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredMerchants.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Container className="mt-2">
      <h6 className="text-center">
        Total generated QR codes: {merchants.length}
      </h6>

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
      </div>

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
                  <th>Category Code</th>
                  <th>Business Name</th>
                  <th>Account No</th>
                  <th>Phone No</th>
                  <th>City</th>
                  <th>Branch</th>
                  <th>Created By</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No matching merchants found.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((merchant, index) => (
                    <tr key={merchant.MER_IDEN || index}>
                      <td>{offset + index + 1}</td>
                      <td>{merchant.MER_IDEN || "N/A"}</td>
                      <td>{merchant.MER_CODE || "N/A"}</td>
                      <td>
                        {merchant.name || merchant.mer_owner_name || "N/A"}
                      </td>
                      <td>{merchant.ACC_NUMB || "N/A"}</td>
                      <td>{merchant.MOBILE_NUMBER || "N/A"}</td>
                      <td>{merchant.CITY || "N/A"}</td>
                      <td>{merchant.branch || "N/A"}</td>
                      <td>{merchant.createdBy || "N/A"}</td>
                      <td>{formatDate(merchant.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
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
