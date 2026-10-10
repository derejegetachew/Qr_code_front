import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../Utils/constants";
import { currentUser } from "../../../Utils/tokenUtils";

const steps = ["Branch & Account", "Merchant Details"];
const percentages = [66, 100];

const CreateMerchantForm = () => {
  const user = currentUser();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    mer_branch_name: "",
    mer_branch_code: "",
    mer_account: "",
    mer_currency: "",
    mer_owner_name: "",
    mer_business_name: "",
    mer_city: "",
    mer_location: "",
    mer_phone: "",
    mer_email: "",
    MAC_LABE: "",
    mer_catagory_code: "",
    mer_creation_date: new Date().toISOString().split("T")[0],
    mer_id: "",
  });

  const [mccList, setMccList] = useState([]);
  const [accountError, setAccountError] = useState("");
  const [categoryCodeError, setCategoryCodeError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const history = useHistory();
  const [accountDetails, setAccountDetails] = useState({
    branch_name: "",
    branch_code: "",
    owner: "",
    currency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAccount = async () => {
    const acctNo = form.mer_account;
    if (!acctNo) {
      setAccountError("❌ Please enter an account number");
      setTimeout(() => setAccountError(""), 3000);
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/getAccountByNumber/${acctNo}`);
      const acct = res.data?.data ?? {};
      const currency = acct.currency || "";
      const owner = acct.owner || "";
      const branchName = acct.branchName || "";
      const branchCode = acct.branchCode || "";

      if (!currency && !owner) {
        setAccountError("❌ Invalid account number");
        setTimeout(() => setAccountError(""), 3000);
        return;
      }

      setForm((prev) => ({
        ...prev,
        mer_currency: currency,
        mer_owner_name: owner,
        mer_branch_name: branchName,
        mer_branch_code: branchCode,
      }));

      setAccountDetails({
        currency,
        owner,
        branch_name: branchName,
        branch_code: branchCode,
      });

      setIsDialogOpen(true);
    } catch (error) {
      console.error("Error fetching account:", error);
      setAccountError(
        "❌ this Account is inactive or blocked or does not meet eligibility criteria for QR creation."
      );
      setTimeout(() => setAccountError(""), 3000);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/mcc`);
        let list = [];
        if (Array.isArray(res.data)) list = res.data;
        else if (Array.isArray(res.data.mccs)) list = res.data.mccs;
        else if (Array.isArray(res.data.data)) list = res.data.data;

        const opts = list.map((b) => ({
          MAC_IDEN: b.MAC_IDEN || b.mcc_code || "",
          MAC_LABE: b.MAC_LABE || b.mcc_description || "",
        }));
        setMccList(opts);
      } catch (err) {
        console.error("Failed to load MCCs", err);
      }
    })();
  }, []);

  const generateMerchantId = (formData) => {
    if (!formData.mer_catagory_code || !formData.mer_branch_code) return "";
    const rand = String(Math.floor(10000 + Math.random() * 90000));
    return `${formData.mer_branch_code}${formData.mer_catagory_code}${rand}`;
  };
  const handleViewSummary = () => {
    let hasError = false;

    // Phone validation
    if (!form.mer_phone) {
      setPhoneError("❌ Phone number is required");
      setTimeout(() => setPhoneError(""), 3000);
      hasError = true;
    } else if (!/^\d{10}$/.test(form.mer_phone)) {
      setPhoneError("❌ Phone number must be exactly number and 10 digits");
      setTimeout(() => setPhoneError(""), 3000);
      hasError = true;
    } else {
      setPhoneError("");
    }
    if (!form.mer_catagory_code) {
      setCategoryCodeError("❌ Please select a category code");
      setTimeout(() => setCategoryCodeError(""), 3000);
      hasError = true;
    } else {
      setCategoryCodeError("");
    }

    if (!form.mer_business_name) {
      setBusinessNameError("❌ Business name is required");
      setTimeout(() => setBusinessNameError(""), 3000);
      hasError = true;
    } else {
      setBusinessNameError("");
    }

    if (!form.mer_city) {
      setCityError("❌ City is required");
      setTimeout(() => setCityError(""), 3000);
      hasError = true;
    } else {
      setCityError("");
    }

    if (!form.mer_location) {
      setLocationError("❌ Location is required");
      setTimeout(() => setLocationError(""), 3000);
      hasError = true;
    } else {
      setLocationError("");
    }
    if (!form.mer_email) {
      // setEmailError("❌ Email is required");
      // setTimeout(() => setEmailError(""), 3000);
      // hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.mer_email)) {
      setEmailError("❌ Invalid email format");
      setTimeout(() => setEmailError(""), 3000);
      hasError = true;
    } else {
      setEmailError("");
    }

    // Add more validation if needed...
    // e.g., if (!form.business_name) { ... }

    if (!hasError) {
      setShowSummary(true);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      let hasError = false;

      // if (!form.mer_phone) {
      //   setPhoneError("❌ Phone number is required");
      //   setTimeout(() => setPhoneError(""), 3000);
      //   hasError = true;
      // } else {
      //   setPhoneError("");
      // }

      if (!hasError) {
        setForm((prev) => ({
          ...prev,
          mer_id: generateMerchantId(prev),
        }));
        setStep(2);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleMccChange = (_, option) => {
    if (option) {
      setForm((prev) => ({
        ...prev,
        mer_catagory_code: option.MAC_IDEN,
        mer_id: generateMerchantId({
          ...prev,
          mer_catagory_code: option.MAC_IDEN,
        }),
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Include created_by in the payload
      const payload = {
        ...form,
        created_by: user?.username || user?.id || "unknown",
        maker_branch: user?.branch || "unknown",
      };

      const response = await axios.post(`${BASE_URL}/createMerchant`, payload);
      if (response.status === 200 || response.status === 201) {
        toast.success("✅ Merchant created successfully");
        setTimeout(() => {
          history.push("/view_merchant");
        }, 10);
      } else {
        toast.error("⚠️ Failed to create merchant. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("❌ Account number already exists.");
      } else {
        toast.error("❌ Error creating merchant.");
        console.error("Error:", error);
      }
    }
  };

  return (
    <Form className="container mt-4" style={{ maxWidth: 1200 }}>
      {/* Stepper */}
      <div className="stepper d-flex gap-3 mb-3">
        {steps.map((label, idx) => {
          const status =
            idx < step ? "completed" : idx === step ? "current" : "";
          return (
            <div
              key={idx}
              className={`step ${status}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontWeight: status === "current" ? "bold" : "normal",
                color: status === "completed" ? "green" : "black",
              }}
            >
              <div
                style={{
                  borderRadius: "50%",
                  width: 24,
                  height: 24,
                  border: "2px solid",
                  borderColor: status === "completed" ? "green" : "#ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 4,
                  backgroundColor:
                    status === "completed" ? "#d4edda" : "#f8f9fa",
                }}
              >
                {idx < step ? <FaCheckCircle color="green" /> : idx + 1}
              </div>
              <div>{label}</div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: 4,
          background: "#e0e0e0",
          marginBottom: "1rem",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentages[step]}%`,
            background: "#76c7c0",
            transition: "width 0.4s ease",
            borderRadius: 2,
          }}
        />
      </div>

      {/* Step 0: Account Info */}
      {step === 0 && (
        <div className="row gx-3">
          <div className="col-md-4 mb-3">
            <Form.Label>Account Number</Form.Label>
            <div className="input-group">
              <Form.Control
                name="mer_account"
                value={form.mer_account}
                onChange={handleChange}
                placeholder="Enter account number"
                style={{ border: "1px solid #005580" }}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={fetchAccount}
                style={{
                  border: "1px solid #005580",
                  backgroundColor: "#005580",
                  marginLeft: "20px",
                }}
              >
                Search
              </button>
            </div>
            {accountError && (
              <div className="text-danger mt-1">{accountError}</div>
            )}
          </div>

          {/* Account Details Dialog */}
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Account Info</DialogTitle>
            <DialogContent dividers>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>Branch Name</b>
                    </TableCell>
                    <TableCell>{accountDetails.branch_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Branch Code</b>
                    </TableCell>
                    <TableCell>{accountDetails.branch_code}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Owner</b>
                    </TableCell>
                    <TableCell>{accountDetails.owner}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Currency</b>
                    </TableCell>
                    <TableCell>{accountDetails.currency}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </DialogContent>
            <DialogActions>
              <Button
                variant="secondary"
                onClick={() => {
                  setIsDialogOpen(false);
                  setStep(1);
                }}
                style={{ backgroundColor: "#005580" }}
              >
                Next
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}

      {/* Step 1: Merchant Details */}
      {step === 1 && (
        <div className="row gx-3">
          <div className="col-md-4 mb-3">
            <Form.Label>MCC Code</Form.Label>
            <Autocomplete
              options={mccList}
              getOptionLabel={(option) =>
                `${option.MAC_IDEN} - ${option.MAC_LABE}`
              }
              onChange={handleMccChange}
              renderInput={(params) => <TextField {...params} />}
            />
            {categoryCodeError && (
              <div className="text-danger mt-1">{categoryCodeError}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Merchant ID</Form.Label>
            <Form.Control
              name="mer_id"
              value={form.mer_id}
              readOnly
              style={{ border: "1px solid #005580" }}
            />
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              name="mer_business_name"
              value={form.mer_business_name}
              onChange={handleChange}
              style={{ border: "1px solid #005580" }}
            />
            {businessNameError && (
              <div className="text-danger mt-1">{businessNameError}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="mer_city"
              value={form.mer_city}
              onChange={handleChange}
              style={{ border: "1px solid #005580" }}
            />
            {cityError && <div className="text-danger mt-1">{cityError}</div>}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="mer_location"
              value={form.mer_location}
              onChange={handleChange}
              style={{ border: "1px solid #005580" }}
            />
            {locationError && (
              <div className="text-danger mt-1">{locationError}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              name="mer_phone"
              value={form.mer_phone}
              onChange={handleChange}
              style={{ border: "1px solid #005580" }}
            />
            {phoneError && <div className="text-danger mt-1">{phoneError}</div>}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="mer_email"
              value={form.mer_email}
              onChange={handleChange}
              style={{ border: "1px solid #005580" }}
            />
            {emailError && <div className="text-danger mt-1">{emailError}</div>}
          </div>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginTop: "32px",
            }}
          >
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => setStep(0)}
              style={{
                border: "1px solid #6c757d",
                backgroundColor: "#6c757d",
                width: "150px",
                height: "48px",
                fontSize: "14px",
                color: "white",
              }}
            >
              Back
            </Button>

            <Button
              type="button"
              className="btn btn-primary"
              onClick={handleViewSummary}
              style={{
                border: "1px solid #005580",
                backgroundColor: "#005580",
                width: "150px",
                height: "48px",
                fontSize: "14px",
                marginLeft: "350px",
              }}
            >
              View Summary
            </Button>
          </div>

          {/* Summary Dialog */}
          <Dialog
            open={showSummary}
            onClose={() => setShowSummary(false)}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Merchant Summary</DialogTitle>
            <DialogContent dividers>
              <ul className="list-unstyled">
                {Object.entries(form).map(([key, val]) => (
                  <li key={key} style={{ marginBottom: "8px" }}>
                    <b>{key.replace(/mer_/, "").replace(/_/g, " ")}:</b> {val}
                  </li>
                ))}
              </ul>
            </DialogContent>
            <DialogActions>
              <Button
                variant="secondary"
                onClick={() => setShowSummary(false)}
                style={{ border: "1px solid #005580", color: "#005580" }}
              >
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                style={{
                  border: "1px solid #005580",
                  backgroundColor: "#005580",
                  color: "#fff",
                }}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </Form>
  );
};

export default CreateMerchantForm;
