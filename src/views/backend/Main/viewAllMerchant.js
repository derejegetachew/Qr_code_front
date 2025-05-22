import "../../../assets/css/ViewAllMerchant.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Form, ListGroup, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns"; // Date formatting
import ReactPaginate from "react-paginate";
import { currentUser } from "../../../Utils/tokenUtils";
const ViewAllMerchant = () => {
  const user = currentUser();
  console.log(user.branch_id);
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 30; // Number of items per page
  // Temporary search values before applying filter
  const [tempSearchBranch, setTempSearchBranch] = useState("");
  //   const [tempSearchDate, setTempSearchDate] = useState(null);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);

  // Actual search values used for filtering
  const [searchBranch, setSearchBranch] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await axios.get(
          "http://10.1.85.10:8089/api/getMerchant"
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

  // Format date to YYYY-MM-DD
  const formatDate = (date) =>
    date ? format(new Date(date), "yyyy-MM-dd") : null;

  // Apply search when the "Search" button is clicked
  const handleSearch = () => {
    setSearchBranch(tempSearchBranch);
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  };

  // Filter merchants based on applied search criteria
  const filteredMerchants = merchants.filter((merchant) => {
    const merchantDate = formatDate(merchant.createdAt);

    const matchesBranch = merchant.branch
      ?.toLowerCase()
      .includes(searchBranch.toLowerCase());
    const matchesSingleDate = searchDate
      ? merchantDate === formatDate(searchDate)
      : true;
    const matchesDateRange =
      startDate && endDate
        ? merchantDate >= formatDate(startDate) &&
          merchantDate <= formatDate(endDate)
        : true;

    return matchesBranch && matchesSingleDate && matchesDateRange;
  });

  // Count of merchants
  const totalMerchantsCount = merchants.length;
  const branchCounts = searchBranch ? filteredMerchants.length : null;
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredMerchants.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredMerchants.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  return (
    <Container className="mt-2">
      {/* <h5 className="text-center my-4">All Merchant Data</h5> */}

      {/* Total Merchants Count */}
      <h6 className="text-center">Total Merchants: {totalMerchantsCount}</h6>

      {/* Search Fields */}
      <div className="d-flex flex-wrap gap-4">
        {/* Search by Branch */}
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

        {/* Search by Single Date */}
        {/* <Form.Group className="col-md-3">
          <DatePicker
            selected={tempSearchDate}
            onChange={(date) => setTempSearchDate(date)}
            placeholderText="Search by Date"
            className="form-control"
            dateFormat="yyyy-MM-dd"
          />
        </Form.Group> */}

        {/* Search by Date Range */}
        <Form.Group className="col-md-3">
          <DatePicker
            selected={tempStartDate}
            onChange={(date) => setTempStartDate(date)}
            placeholderText="Start Date"
            className="date-picker-custom"
            dateFormat="yyyy-MM-dd"
            style={{ border: "1px solid #005580" }}
          />
        </Form.Group>

        <Form.Group className="col-md-3">
          <DatePicker
            selected={tempEndDate}
            onChange={(date) => setTempEndDate(date)}
            placeholderText="End Date"
            className="date-picker-custom"
            dateFormat="yyyy-MM-dd"
            style={{ border: "1px solid #005580" }}
          />
        </Form.Group>

        {/* Search Button */}
        <Button className="button1" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Display branch count if search is performed */}
      {searchBranch && branchCounts !== null && (
        <ListGroup horizontal className="mb-3">
          <ListGroup.Item className="branch-count">
            {searchBranch}: {branchCounts} merchants
          </ListGroup.Item>
        </ListGroup>
      )}

      {/* Table Display */}
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
                  <th>Merchant Name</th>
                  <th>Account Number</th>
                  <th>Merchant Code</th>
                  <th>Mobile Number</th>
                  <th>City</th>
                  <th>Branch</th>
                  <th>Created By</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((merchant, index) => (
                  <tr key={merchant.id || index}>
                    <td>{offset + index + 1}</td>
                    <td>{merchant.name || "Unknown"}</td>
                    <td className="text-center">
                      {merchant.ACC_NUMB || "N/A"}
                    </td>
                    <td className="text-center">
                      {merchant.MER_CODE || "N/A"}
                    </td>
                    <td className="text-center">
                      {merchant.MOBILE_NUMBER || "N/A"}
                    </td>
                    <td>{merchant.CITY || "N/A"}</td>
                    <td>{merchant.branch || "N/A"}</td>
                    <td>{merchant.createdBy || "N/A"}</td>
                    <td>
                      {merchant.createdAt
                        ? formatDate(merchant.createdAt)
                        : "N/A"}
                    </td>
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
