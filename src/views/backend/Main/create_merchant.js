import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../Utils/constants";
import "../../../assets/css/style.css";
const steps = ["Merchant Details", "Summary"];
const percentages = [33, 66];

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

  const [mccList, setMccList] = useState([]);
  const [accountError, setAccountError] = useState("");
  const [categoryCodeError, setCategoryCodeError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAccount = async () => {
    if (!form.mer_account) {
      setAccountError("❌ Please enter an account number");
      setTimeout(() => setAccountError(""), 3000);
      return;
    }
    try {
      const res = await axios.get(
        `${BASE_URL}/getAccountByNumber/${form.mer_account}`
      );
      const data = res.data?.data || res.data || {};
      const currency = data.currency || data.CCY || "";
      const owner = data.account_owner || data.ac_desc || "";

      if (!currency && !owner) {
        throw new Error("Invalid account response");
      }

      setForm((prev) => ({
        ...prev,
        mer_currency: currency,
        mer_owner_name: owner,
      }));
    } catch (err) {
      setAccountError("❌ Merchant account number not found");
      setForm((prev) => ({ ...prev, mer_currency: "", mer_owner_name: "" }));
      setTimeout(() => setAccountError(""), 3000);
    }
  };

  const generateMerchantId = (formData) => {
    if (!formData.mer_catagory_code || !formData.mer_branch_code) return "";
    const rand = String(Math.floor(10000 + Math.random() * 90000));
    return `${formData.mer_branch_code}${formData.mer_catagory_code}${rand}`;
  };

  const handleNext = () => {
    // let hasError = false;

    // if (!form.mer_account) {
    //   setAccountError("❌ Please enter an account number");
    //   setTimeout(() => setAccountError(""), 3000);
    //   hasError = true;
    // }

    // if (!form.mer_catagory_code) {
    //   setCategoryCodeError("❌ Please select a category code");
    //   setTimeout(() => setCategoryCodeError(""), 3000);
    //   hasError = true;
    // }

    // if (!form.mer_business_name) {
    //   setBusinessNameError("❌ Business name is required");
    //   setTimeout(() => setBusinessNameError(""), 3000);
    //   hasError = true;
    // }

    // if (!form.mer_city) {
    //   setCityError("❌ City is required");
    //   setTimeout(() => setCityError(""), 3000);
    //   hasError = true;
    // }

    // if (!form.mer_location) {
    //   setLocationError("❌ Location is required");
    //   setTimeout(() => setLocationError(""), 3000);
    //   hasError = true;
    // }

    // if (!form.mer_phone) {
    //   setPhoneError("❌ Phone number is required");
    //   setTimeout(() => setPhoneError(""), 3000);
    //   hasError = true;
    // }

    // if (hasError) return;

    setForm((prev) => ({ ...prev, mer_id: generateMerchantId(prev) }));
    setStep(1);
  };

  const handlePrev = () => setStep((s) => s - 1);

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
      const res = await axios.post(`${BASE_URL}/createMerchant`, form);
      if (res.status === 200 || res.status === 201) {
        toast.success("✅ Merchant created successfully");
        setTimeout(() => history.push("/view_merchant"), 1000);
      } else {
        toast.error("⚠️ Failed to create merchant. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("❌ Account number already exists.");
      } else {
        toast.error("❌ Error creating merchant.");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${BASE_URL}/mcc`);
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
            <Form.Label>Account Number</Form.Label>
            <div className="input-group">
              <Form.Control
                name="mer_account"
                value={form.mer_account}
                onChange={handleChange}
                placeholder="Enter account number"
              />
              <button className="btn btn-primary" onClick={fetchAccount}>
                Search
              </button>
            </div>
            {accountError && (
              <div className="text-danger mt-1">{accountError}</div>
            )}
          </div>

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
            <Form.Control name="mer_id" value={form.mer_id} readOnly />
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              name="mer_business_name"
              value={form.mer_business_name}
              onChange={handleChange}
              placeholder="Enter business name"
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
              placeholder="Enter city"
            />
            {cityError && <div className="text-danger mt-1">{cityError}</div>}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="mer_location"
              value={form.mer_location}
              onChange={handleChange}
              placeholder="Enter location"
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
              placeholder="Enter phone"
            />
            {phoneError && <div className="text-danger mt-1">{phoneError}</div>}
          </div>

          <div className="col-md-4 mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="mer_email"
              value={form.mer_email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <Button onClick={handleNext}>View Details</Button>
        </div>
      )}

      {/* Step 1 */}
      {step === 1 && (
        <div className="row gx-3">
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
