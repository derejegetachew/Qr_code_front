import "../../../assets/css/ViewAllMerchant.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { currentUser } from "../../../Utils/tokenUtils";

const ViewAllMerchant = () => {
  const user = currentUser();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const [tempSearchName, setTempSearchName] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8089/api/getAllMerchant"
        );
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
    const matchesName = merchant.mer_owner_name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());
    return matchesName;
  });

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredMerchants.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <Container className="mt-2">
      <h6 className="text-center">Total Merchants: {merchants.length}</h6>

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
                  <th>Email</th>
                  <th>City</th>
                  <th>Branch</th>
                  <th>Category Code</th>
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
                    <tr key={merchant.mer_id || index}>
                      <td>{offset + index + 1}</td>
                      <td>{merchant.mer_id || "N/A"}</td>
                      <td>{merchant.mer_owner_name || "N/A"}</td>
                      <td>{merchant.mer_business_name || "N/A"}</td>
                      <td>{merchant.mer_account || "N/A"}</td>
                      <td>{merchant.mer_phone || "N/A"}</td>
                      <td>{merchant.mer_email || "N/A"}</td>
                      <td>{merchant.mer_city || "N/A"}</td>
                      <td>{merchant.mer_branch_name || "N/A"}</td>
                      <td>{merchant.mer_catagory_code || "N/A"}</td>
                      <td>{formatDate(merchant.mer_creation_date)}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2">
                          Edit
                        </Button>
                      </td>
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
