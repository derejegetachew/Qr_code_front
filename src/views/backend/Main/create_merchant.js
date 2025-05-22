import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import "../../../assets/css/style.css";

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
    mer_catagory_code: "",
    mer_creation_date: new Date().toISOString().split("T")[0],
    mer_id: "",
  });
  const [branches, setBranches] = useState([]);
  const [mccList, setMccList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const searchBranches = async (query) => {
    if (!query) return setBranches([]);
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8089/api/getAllBranch?query=${query}`
      );
      setBranches(res.data || []);
      console.log(
        "Branches:is ddddddddddddddddddddddddddddddddddddddddddddddddddd",
        res.data
      );
      const match = res.data.find((b) => b.branch_name === query);
      if (match) {
        setForm((p) => ({
          ...p,
          mer_branch_name: match.branch_name,
          mer_branch_code: match.branch_code,
        }));
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccount = async () => {
    if (!form.mer_account) return;
    try {
      const { data } = await axios.get(
        `/api/merchant/getAccountByNumber/${form.mer_account}`
      );
      setForm((p) => ({
        ...p,
        mer_currency: data.currency || "",
        mer_owner_name: data.account_owner || "",
      }));
    } catch {}
  };

  const searchMcc = async (query) => {
    if (!query) return setMccList([]);
    try {
      const { data } = await axios.get(
        `/api/merchant/getMccByCode?code=${query}`
      );
      setMccList(data);
    } catch {}
  };

  const generateMerchantId = () => {
    if (!form.mer_catagory_code || !form.mer_branch_code) return "";
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `${form.mer_catagory_code}${form.mer_branch_code}${rand}`;
  };

  const handleNext = () => {
    if (step === 1) {
      setForm((p) => ({ ...p, mer_id: generateMerchantId() }));
    }
    if (step < steps.length - 1) setStep((s) => s + 1);
  };
  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/merchant/createMerchant", form);
      alert("Merchant created successfully");
    } catch {
      alert("Error creating merchant");
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
            <Form.Control
              type="text"
              name="mer_branch_name"
              value={form.mer_branch_name}
              onChange={handleChange}
              onBlur={(e) => searchBranches(e.target.value)}
              list="branchList"
              placeholder="Enter branch name"
              style={{ border: "1px solid #005580" }}
              autoComplete="off"
            />
            <datalist id="branchList">
              {branches.map((b) => (
                <option key={b.branch_code} value={b.branch_name} />
              ))}
            </datalist>
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
            <Form.Control
              type="text"
              name="mer_account"
              value={form.mer_account}
              onChange={handleChange}
              onBlur={fetchAccount}
              placeholder="Enter account number"
              style={{ border: "1px solid #005580" }}
            />
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
            <Form.Control
              name="mer_catagory_code"
              value={form.mer_catagory_code}
              onChange={handleChange}
              onBlur={(e) => searchMcc(e.target.value)}
              list="mccList"
              placeholder="Enter MCC code"
              style={{ border: "1px solid #005580" }}
              autoComplete="off"
            />
            <datalist id="mccList">
              {mccList.map((mcc) => (
                <option key={mcc.code} value={mcc.code}>
                  {mcc.label}
                </option>
              ))}
            </datalist>
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
