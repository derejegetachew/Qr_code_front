import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import "../../../assets/css/style.css";
import { grcodeapi } from "../../../services/qrcodeApi";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { escapeSelector } from "jquery";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom"; // At the top of your component
const steps = ["Branch & Account", "Merchant Details", "Summary"];
const percentages = [33, 66, 100];

const CreateMerchantForm = () => {
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
  const [branches, setBranches] = useState([]);
  const [mccList, setMccList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [accountError, setAccountError] = useState("");
  const [merchantSeq, setMerchantSeq] = useState(1);
  const [branchCodeError, setBranchCodeError] = useState("");
  const [currencyError, setCurrencyError] = useState("");
  const [ownerNameError, setOwnerNameError] = useState("");
  const [categoryCodeError, setCategoryCodeError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [creationDateError, setCreationDateError] = useState("");
  const history = useHistory();
  // const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8089/api/getAllBranch");
        console.log("💾 raw response:", res.data);

        // 1) Figure out where the array lives:
        //    a) If res.data is already an array, use that.
        //    b) Else if res.data.branches is an array, use that.
        //    c) Else if res.data.data is an array, use that.
        //    d) Otherwise fall back to an empty list.
        let list = [];
        if (Array.isArray(res.data)) {
          list = res.data;
        } else if (Array.isArray(res.data.branches)) {
          list = res.data.branches;
        } else if (Array.isArray(res.data.data)) {
          list = res.data.data;
        } else {
          console.warn("getAllBranch returned unexpected shape:", res.data);
        }

        // 2) Now map safely
        const opts = list.map((b) => ({
          code: b.branch_code || b.branch_code,
          name: b.branch_name || b.name,
        }));

        console.log("🌿 normalized branchOptions:", opts);
        setBranchOptions(opts);
      } catch (err) {
        console.error("Failed to load branches", err);
      }
    })();
  }, []);

  const fetchAccount = async () => {
    const acctNo = form.mer_account;
    if (!acctNo) {
      setAccountError("❌ Please enter an account number");
      setTimeout(() => setAccountError(""), 3000);
      setForm((prev) => ({ ...prev, mer_currency: "", mer_owner_name: "" }));
      return;
    }
    try {
      // 1) Fetch from your exact endpoint
      const res = await axios.get(
        `http://localhost:8089/api/getAccountByNumber/${acctNo}`
      );
      console.log("🔍 raw account response:", res.data);

      // 2) Normalize to one object `acct`
      let acct = {};
      // (a) If res.data itself has the keys
      if (
        res.data &&
        (res.data.currency !== undefined || res.data.CCY !== undefined)
      ) {
        acct = res.data;
      }
      // (b) Or if it’s nested under .data
      else if (
        res.data &&
        typeof res.data.data === "object" &&
        (res.data.data.currency !== undefined ||
          res.data.data.CCY !== undefined)
      ) {
        acct = res.data.data;
      }
      // (c) Or nested under .account
      else if (
        res.data &&
        typeof res.data.account === "object" &&
        (res.data.account.currency !== undefined ||
          res.data.account.CCY !== undefined)
      ) {
        acct = res.data.account;
      } else {
        console.warn("Unexpected shape for account response:", res.data);
      }

      // 3) Pull out the two fields, with fallbacks
      const currency = acct.currency ?? acct.CCY ?? "";
      const owner = acct.account_owner ?? acct.ac_desc ?? "";
      if (!currency && !owner) {
        setAccountError("❌ Invalid account number");
        setForm((prev) => ({ ...prev, mer_currency: "", mer_owner_name: "" }));
        setTimeout(() => setAccountError(""), 3000);
        return;
      }
      // 4) Update your form
      setForm((prev) => ({
        ...prev,
        mer_currency: currency,
        mer_owner_name: owner,
      }));
    } catch (error) {
      console.error("Error fetching account:", error);
      // Optionally clear fields on error:
      setAccountError("❌ merchant account number is  not found");
      setForm((prev) => ({ ...prev, mer_currency: "", mer_owner_name: "" }));
      setTimeout(() => setAccountError(""), 3000);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://localhost:8089/api/mcc");
        console.log("💾 raw MCC response:", res.data);

        let list = [];
        if (Array.isArray(res.data)) {
          list = res.data;
        } else if (Array.isArray(res.data.mccs)) {
          list = res.data.mccs;
        } else if (Array.isArray(res.data.data)) {
          list = res.data.data;
        } else {
          console.warn("getMcc returned unexpected shape:", res.data);
        }

        const opts = list.map((b) => ({
          MAC_IDEN: b.MAC_IDEN || b.mcc_code || "",
          MAC_LABE: b.MAC_LABE || b.mcc_description || "",
        }));

        console.log("🌿 normalized MCC list:", opts);
        setMccList(opts);
        console.log("✅ Final MCC list set:", opts);
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

  // const handleNext = () => {
  //   if (step === 1) {
  //     setForm((p) => ({ ...p, mer_id: generateMerchantId(p) }));
  //   }
  //   if (step < steps.length - 1) setStep((s) => s + 1);
  // };

  const handleNext = () => {
    if (step === 0) {
      let hasError = false;

      if (!form.mer_branch_code) {
        setBranchCodeError("❌ Please select a branch code");
        setTimeout(() => setBranchCodeError(""), 3000);
        hasError = true;
      }

      if (!form.mer_account) {
        setAccountError("❌ Please enter an account number");
        setTimeout(() => setAccountError(""), 3000);
        setForm((prev) => ({
          ...prev,
          mer_currency: "",
          mer_owner_name: "",
        }));
        hasError = true;
      } else {
        setAccountError("");
      }

      if (!form.mer_currency) {
        setCurrencyError("❌ Currency is required");
        setTimeout(() => setCurrencyError(""), 3000);
        hasError = true;
      } else {
        setCurrencyError("");
      }

      if (!form.mer_owner_name) {
        setOwnerNameError("❌ Owner name is required");
        setTimeout(() => setOwnerNameError(""), 3000);
        hasError = true;
      } else {
        setOwnerNameError("");
      }

      if (!form.mer_catagory_code) {
        setCategoryCodeError("❌ Please select a category code");
        setTimeout(() => setCategoryCodeError(""), 3000);
        hasError = true;
      } else {
        setCategoryCodeError("");
      }

      if (hasError) return;

      setStep((s) => s + 1);
    } else if (step === 1) {
      let hasError = false;

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

      if (!form.mer_phone) {
        setPhoneError("❌ Phone number is required");
        setTimeout(() => setPhoneError(""), 3000);
        hasError = true;
      } else {
        setPhoneError("");
      }

      // if (!form.mer_email.includes("@")) {
      //   setEmailError("Invalid email format");
      // } else {
      //   const regex = /^\S+@\S+\.\S+$/;
      //   if (!regex.test(form.mer_email)) {
      //     setEmailError("Invalid email format");
      //     hasError = true;
      //   } else {
      //     setEmailError("");
      //   }
      // }

      if (!form.mer_creation_date) {
        setCreationDateError("❌ Creation date is required");
        setTimeout(() => setCreationDateError(""), 3000);
        hasError = true;
      }

      if (hasError) return;
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleBranchChange = (_, option) => {
    if (option) {
      const newForm = {
        ...form,
        mer_branch_name: option.name,
        mer_branch_code: option.code,
      };
      newForm.mer_id = generateMerchantId(newForm);
      setForm(newForm);
    } else {
      setForm((p) => ({
        ...p,
        mer_branch_name: "",
        mer_branch_code: "",
        mer_id: "",
      }));
    }
  };

  const handleMccChange = (_, option) => {
    if (option) {
      const newForm = {
        ...form,
        mer_catagory_code: option.MAC_IDEN,
      };
      newForm.mer_id = generateMerchantId(newForm);
      setForm(newForm);
    } else {
      setForm((p) => ({ ...p, mer_catagory_code: "", mer_id: "" }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8089/api/createMerchant",
        form
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("✅ Merchant created successfully");
        setTimeout(() => {
          history.push("/view_merchant"); // Adjust the route as needed
        }, 1000);
      } else if (response.status === 400) {
      } else {
        toast.error("⚠️ Failed to create merchant. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("❌ Account number already exists.");
      } else {
        console.error("Error creating merchant:", error);
        toast.error(
          "❌ Error creating merchant. Please check the console for details."
        );
      }
    }
  };

  useEffect(() => {
    if (step > 1) {
      setForm((p) => ({ ...p, mer_id: generateMerchantId() }));
    }
  }, [form.mer_catagory_code, form.mer_branch_code]);

  return (
    <Form className="container mt-4" style={{ maxWidth: 1200 }}>
      {/* Stepper */}
      <div className="stepper">
        {steps.map((label, idx) => {
          const status =
            idx < step ? "completed" : idx === step ? "current" : "";
          return (
            <div key={idx} className={`step ${status}`}>
              <div className="step-indicator">
                {idx < step ? <FaCheckCircle /> : idx + 1}
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
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${percentages[step]}%`,
            background: "#76c7c0",
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Step 0 */}
      {step === 0 && (
        <div className="row gx-3">
          <div className="col-md-4 mb-3">
            <Form.Label>Branch Name</Form.Label>
            <Form.Group className="mb-3">
              <Autocomplete
                options={branchOptions}
                getOptionLabel={(opt) => opt.name}
                onChange={handleBranchChange}
                value={
                  form.mer_branch_code
                    ? { code: form.mer_branch_code, name: form.mer_branch_name }
                    : null
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select or type branch"
                    variant="outlined"
                    size="small"
                  />
                )}
                isOptionEqualToValue={(opt, val) => opt.code === val.code}
              />
            </Form.Group>
            {branchCodeError && (
              <div
                className="text-danger mt-1"
                style={{ fontSize: "0.875rem" }}
              >
                {branchCodeError}
              </div>
            )}
          </div>
          <div className="col-md-4 mb-3">
            <Form.Label>Branch Code</Form.Label>
            <Form.Control
              type="text"
              name="mer_branch_code"
              value={form.mer_branch_code}
              readOnly
              style={{ border: "1px solid #005580" }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <Form.Label>Account Number</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
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
              <div
                className="text-danger mt-1"
                style={{ fontSize: "0.875rem" }}
              >
                {accountError}
              </div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Control
              type="text"
              name="mer_currency"
              value={form.mer_currency}
              disabled
              style={{ border: "1px solid #005580" }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <Form.Label>Owner</Form.Label>
            <Form.Control
              type="text"
              name="mer_owner_name"
              value={form.mer_owner_name}
              disabled
              style={{ border: "1px solid #005580" }}
            />
          </div>
          <div className="col-md-4 mb-3">
            <Form.Label>MCC Code</Form.Label>
            <Form.Group className="mb-3">
              <Autocomplete
                options={mccList}
                getOptionLabel={(option) =>
                  `${option.MAC_IDEN} - ${option.MAC_LABE}`
                }
                filterOptions={(options, { inputValue }) =>
                  options.filter(
                    (opt) =>
                      opt.MAC_IDEN.toLowerCase().includes(
                        inputValue.toLowerCase()
                      ) ||
                      opt.MAC_LABE.toLowerCase().includes(
                        inputValue.toLowerCase()
                      )
                  )
                }
                onChange={handleMccChange}
                renderInput={(params) => <TextField {...params} label="" />}
                isOptionEqualToValue={(option, value) =>
                  option.MAC_IDEN === value.MAC_IDEN
                }
              />
            </Form.Group>
            {categoryCodeError && (
              <div
                className="text-danger mt-1"
                style={{ fontSize: "0.875rem" }}
              >
                {categoryCodeError}
              </div>
            )}
          </div>

          <div className="col-12 text-end">
            <Button onClick={handleNext}>Next</Button>
          </div>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="row gx-3 justify-content-center">
          <div className="col-md-12">
            <div className="row gx-3">
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
                  placeholder="Enter business name"
                  style={{ border: "1px solid #005580" }}
                />
                {businessNameError && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {businessNameError}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="mer_city"
                  value={form.mer_city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  style={{ border: "1px solid #005580" }}
                />
                {cityError && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {cityError}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="mer_location"
                  value={form.mer_location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  style={{ border: "1px solid #005580" }}
                />
                {locationError && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {locationError}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="mer_phone"
                  value={form.mer_phone}
                  onChange={handleChange}
                  placeholder="Enter phone"
                  style={{ border: "1px solid #005580" }}
                />
                {phoneError && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {phoneError}
                  </div>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="mer_email"
                  value={form.mer_email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  style={{ border: "1px solid #005580" }}
                />
                {/* {emailError && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {emailError}
                  </div>
                )} */}
              </div>
              <div className="col-md-4 mb-3">
                <Form.Label>Creation Date</Form.Label>
                <Form.Control
                  type="date"
                  name="mer_creation_date"
                  value={form.mer_creation_date}
                  onChange={handleChange}
                  style={{ border: "1px solid #005580" }}
                />
                {creationDateError && (
                  <div
                    className="text-danger mt-1"
                    style={{ fontSize: "0.875rem" }}
                  >
                    {creationDateError}
                  </div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handlePrev}>
                Back
              </Button>
              <Button onClick={handleNext}>Next</Button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="row gx-3 justify-content-left">
          <div className="col-md-6">
            <h5>Summary</h5>
            <ul className="list-unstyled">
              {Object.entries(form).map(([key, val]) => (
                <li key={key}>
                  <b>{key.replace(/mer_/, "").replace(/_/g, " ")}:</b> {val}
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handlePrev}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Create Merchant</Button>
            </div>
          </div>
        </div>
      )}
    </Form>
  );
};

export default CreateMerchantForm;
