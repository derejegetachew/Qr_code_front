import "../../../assets/css/ViewAllMerchant.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, ListGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import { currentUser } from "../../../Utils/tokenUtils";

const ViewAllMerchant = () => {
  const user = currentUser();
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30;

  const [tempSearchBranch, setTempSearchBranch] = useState("");
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);

  const [searchBranch, setSearchBranch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get("http://localhost/api/getAllMerchant");
        setMerchants(response.data.data || []);
        console.log("the responseeesssss=========================>", response);
      } catch (error) {
        console.error("Error fetching merchants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, []);

  const formatDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : null;

  const handleSearch = () => {
    setSearchBranch(tempSearchBranch);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  const filteredMerchants = merchants.filter((merchant) => {
    const createdAt = formatDate(merchant.mer_creation_date);
    const matchesBranch = merchant.mer_branch_name
      ?.toLowerCase()
      .includes(searchBranch.toLowerCase());
    const matchesDateRange =
      startDate && endDate
        ? createdAt >= formatDate(startDate) && createdAt <= formatDate(endDate)
        : true;

    return matchesBranch && matchesDateRange;
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

      <div className="d-flex flex-wrap gap-4">
        <Form.Group className="col-md-3">
          <Form.Control
            type="text"
            placeholder="Search by branch..."
            value={tempSearchBranch}
            onChange={(e) => setTempSearchBranch(e.target.value)}
            className="search-input"
            style={{ border: "1px solid #005580" }}
          />
        </Form.Group>

        <Form.Group className="col-md-3">
          <DatePicker
            selected={tempStartDate}
            onChange={(date) => setTempStartDate(date)}
            placeholderText="Start Date"
            className="date-picker-custom form-control"
            dateFormat="yyyy-MM-dd"
          />
        </Form.Group>

        <Form.Group className="col-md-3">
          <DatePicker
            selected={tempEndDate}
            onChange={(date) => setTempEndDate(date)}
            placeholderText="End Date"
            className="date-picker-custom form-control"
            dateFormat="yyyy-MM-dd"
          />
        </Form.Group>

        <Button className="button1" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {searchBranch && (
        <ListGroup horizontal className="mb-3">
          <ListGroup.Item className="branch-count">
            {searchBranch}: {filteredMerchants.length} merchants
          </ListGroup.Item>
        </ListGroup>
      )}

      {loading ? (
        <p className="text-center">Loading merchants...</p>
      ) : filteredMerchants.length === 0 ? (
        <p className="text-center">No matching merchants found</p>
      ) : (
        <>
          <div className="table-container">
            <Table striped bordered hover responsive className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Owner Name</th>
                  <th>Business Name</th>
                  <th>Account</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>City</th>
                  <th>Branch</th>
                  <th>Category Code</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((merchant, index) => (
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
                    <td>{formatDate(merchant.mer_creation_date) || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
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
        </>
      )}
    </Container>
  );
};

export default ViewAllMerchant;
