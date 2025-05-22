import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";
import { QRCode } from "react-qrcode-logo";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import axios from "axios";
import {
  generateEMVQRCode,
  createHelloWorldString,
} from "../../../services/qr-generator";
// Adjust the path as needed
const Products = () => {
  console.log("welcome");
  const [accountNumber, setAccountNumber] = useState("");
  const [merchantData, setMerchantData] = useState(null); // Initially null, not "null" (string)
  const [qrCodeData, setQrCodeData] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter Account, Step 2: Display Merchant Info
  const qrCodeRef = useRef();
  const [transactionAmount, setTransactionAmount] = useState("");
  const [storeLabel, setStoreLabel] = useState("");
  // Tip-related state variables
  const [includeTip, setIncludeTip] = useState(false);
  const [tipType, setTipType] = useState("");
  const [tipValue, setTipValue] = useState("");
  // Handle changes in the Include Tip checkbox
  const handleCheckboxChange = (event) => {
    setIncludeTip(event.target.checked);
    if (!event.target.checked) {
      setTipType("");
      setTipValue("");
    }
  };

  // Handle changes in Tip Type radio buttons
  const handleTipTypeChange = (event) => {
    setTipType(event.target.value);
    setTipValue(""); // Reset tip value when changing type
  };

  // Handle changes in Tip Value input
  const handleTipValueChange = (event) => {
    setTipValue(event.target.value);
  };
  const handleGenerate = () => {
    if (!merchantData) {
      setError("Merchant data is missing.");
      return;
    }

    try {
      merchantData.merchantAccountInfo = {
        "00": "AbaYMvbLpXak0m",
        "01": "ABAYETAA",
        "02": merchantData.accountnumber,
      };

      // Set the tip data based on the state
      if (includeTip) {
        merchantData.tip = true;
        merchantData.tipType = tipType;
        merchantData.tipValue = tipValue;
      } else {
        merchantData.tip = false; // Ensure it's not included if the checkbox is not checked
      }

      console.log(merchantData); // Check the merchant data including tip info

      const qrFields = [
        { id: "00", value: "01" }, // Payload Format Indicator
        { id: "01", value: "12" }, // Point of Initiation Method (Dynamic)
        {
          id: "28", // Merchant Account Information
          value: Object.entries(merchantData.merchantAccountInfo || {}).map(
            ([tag, value]) => ({ id: tag, value })
          ),
        },
        { id: "52", value: merchantData.merchantCategoryCode || "5411" },
        { id: "53", value: merchantData.transactionCurrency || "230" },
        { id: "58", value: merchantData.countryCode || "ET" },
        { id: "59", value: merchantData.merchantName || "Unknown Merchant" },
        { id: "60", value: merchantData.merchantCity || "Unknown City" },
      ];

      if (merchantData.transactionAmount) {
        qrFields.push({ id: "54", value: merchantData.transactionAmount });
      }

      if (merchantData.tip) {
        if (merchantData.tipType === "fixed") {
          qrFields.push({ id: "55", value: "02" });
          qrFields.push({ id: "56", value: merchantData.tipValue });
        } else if (merchantData.tipType === "%") {
          qrFields.push({ id: "55", value: "03" });
          qrFields.push({ id: "57", value: merchantData.tipValue });
        } else {
          qrFields.push({ id: "55", value: "01" });
        }
      }

      console.log("QR Fields:", qrFields);

      const qrString = generateEMVQRCode(qrFields);

      console.log("Generated QR String:", qrString);
      setQrCodeData(qrString); // Set QR code data
    } catch (error) {
      setError("Failed to generate QR code.");
    }
  };

  // Download QR code as image
  const handleDownloadImage = async () => {
    if (qrCodeRef.current) {
      const image = await toPng(qrCodeRef.current);
      const link = document.createElement("a");
      link.href = image;
      link.download = "QRCode.png";
      link.click();
    }
  };

  // Download QR code as PDF
  const handleDownloadPDF = async () => {
    if (qrCodeRef.current) {
      const image = await toPng(qrCodeRef.current);
      const pdf = new jsPDF();
      pdf.addImage(image, "PNG", 10, 10, 180, 180);
      pdf.save("QRCode.pdf");
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMerchantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (!accountNumber.trim()) {
      setError("Account number is required.");
      return;
    }

    setError("");

    axios
      .post("http://localhost:5002/api/getaccount", {
        merchantAccount: accountNumber,
      })
      .then((response) => {
        console.log("API Response:", response.data);

        // Ensure `data` exists in the response
        if (response.data?.data) {
          setMerchantData(response.data.data);
          setStep(2); // Proceed to the next step
        } else {
          throw new Error("Invalid response format from the server.");
        }
      })
      .catch((err) => {
        console.error("API Error:", err.response || err);

        // Handle errors and display a meaningful message
        setStep(1);
        setError(
          err.response?.data?.message ||
            "An error occurred. Please try again later."
        );
      });
  };

  return (
    <Container fluid>
      {step === 1 ? (
        <Form>
          <Form.Group controlId="formBankAccount">
            <div className="col-md-3 mb-3">
              <Form.Label
                style={{
                  fontSize: "18px", // Set font size
                  color: "#005580", // Set text color (blue)
                  fontWeight: "bold", // Make the text bold
                  // textTransform: "uppercase", // Convert text to uppercase
                  letterSpacing: "1px", // Add spacing between letters
                  marginBottom: "10px", // Add space below the label
                }}
              >
                Bank Account Number
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ border: "1px solid #005580" }}
              />
            </div>
          </Form.Group>
          <Button
            onClick={handleAccountSubmit}
            style={{ backgroundColor: "#005580", borderColor: "#005580" }}
          >
            Submit
          </Button>
          {error && <p className="text-danger">{error}</p>}
        </Form>
      ) : merchantData ? (
        <Row>
          <Col lg="6">
            <Card>
              <Card.Body>
                <h5
                  className="font-weight-bold mb-3"
                  style={{
                    fontSize: "24px", // Larger font size
                    color: "#005580", // Blue color for the text
                    textTransform: "uppercase", // Uppercase letters
                    letterSpacing: "1px", // Space between letters
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    // Subtle text shadow
                  }}
                >
                  Abay Bank Merchant Information
                </h5>
                <Form className="row g-3">
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-12px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      Merchant Name:
                    </Form.Label>
                    <div
                      style={{
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.merchantName || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-12px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      Merchant Account:
                    </Form.Label>
                    <div
                      style={{
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.accountnumber || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-30px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      MCC:
                    </Form.Label>
                    <div
                      style={{
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.merchantCategoryCode || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>

                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-15px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      Merchant Tin:
                    </Form.Label>
                    <div
                      style={{
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.merchantTin || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>

                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-18px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      Merchant Bank:
                    </Form.Label>
                    <div
                      style={{
                        marginTop: "2px",
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.merchantbank || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-12px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      Transaction Currency:
                    </Form.Label>
                    <div
                      style={{
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.transactionCurrency || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-20px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      Merchant City:
                    </Form.Label>
                    <div
                      style={{
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.merchantCity || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-12px" }}
                  >
                    <Form.Label style={{ marginRight: "10px" }}>
                      Merchant Phone:
                    </Form.Label>
                    <div
                      style={{
                        fontSize: "16px", // Adjust font size
                        color: "#333", // Set text color
                        fontWeight: "bold", // Make the text bold
                        // wordBreak: "break-word", // Ensure long text wraps if needed
                      }}
                    >
                      {merchantData.merchantphone || "N/A"}{" "}
                      {/* Display merchant bank or "N/A" */}
                    </div>
                  </div>

                  {/* <div className="col-md-6 mb-3">
                    <Form.Label>Merchant Phone:</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      value={merchantData.merchantphone || "N/A"}
                    />
                  </div> */}
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-20px" }}
                  >
                    <Form.Label>Transaction Amount:</Form.Label>
                    <Form.Control
                      type="text"
                      name="transactionAmount"
                      value={merchantData.transactionAmount}
                      onChange={handleInputChange} // Update state on user input
                      placeholder="Amount" // Placeholder for guidance
                      style={{ border: "1px solid #005580" }}
                    />
                  </div>
                  <div
                    className="col-md-6 mb-3"
                    style={{ display: "flex", marginTop: "-12px" }}
                  >
                    <Form.Label>Busines Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter store label"
                      value={storeLabel}
                      onChange={(e) => setStoreLabel(e.target.value)}
                      style={{ border: "1px solid #005580" }}
                    />
                  </div>
                  {/* <div className="col-md-6 mb-3">
                    <Form.Label>Transaction Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter transaction amount"
                      value={transactionAmount}
                      onChange={(e) => setTransactionAmount(e.target.value)}
                      style={{ border: "1px solid #005580" }}
                    />
                  </div> */}
                  <div
                    className="col-12"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Form.Check
                      type="checkbox"
                      id="includeTip"
                      label="Include Tip"
                      checked={includeTip}
                      onChange={handleCheckboxChange}
                    />
                  </div>

                  {includeTip && (
                    <div
                      className="col-12"
                      style={{ marginTop: "10px", paddingLeft: "20px" }}
                    >
                      <p>What is the Tip Option?</p>
                      <div>
                        <Form.Check
                          type="radio"
                          id="tipOptional"
                          name="tipType"
                          label="Optional"
                          value="optional"
                          checked={tipType === "optional"}
                          onChange={handleTipTypeChange}
                        />
                        <Form.Check
                          type="radio"
                          id="tipFixed"
                          name="tipType"
                          label="Fixed"
                          value="fixed"
                          checked={tipType === "fixed"}
                          onChange={handleTipTypeChange}
                        />
                        <Form.Check
                          type="radio"
                          id="tipPercentage"
                          name="tipType"
                          label="Percentage"
                          value="%"
                          checked={tipType === "%"}
                          onChange={handleTipTypeChange}
                        />
                      </div>

                      {/* Tip Value Input */}
                      {(tipType === "fixed" || tipType === "%") && (
                        <div
                          className="col-md-6 mb-3"
                          style={{ marginTop: "10px" }}
                        >
                          <Form.Label>Enter Tip Value:</Form.Label>
                          <Form.Control
                            type="text"
                            value={tipValue}
                            onChange={handleTipValueChange}
                            placeholder={
                              tipType === "fixed"
                                ? "Enter fixed amount"
                                : "Enter percentage"
                            }
                            style={{ border: "1px solid #005580" }}
                            required
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <Button
                    style={{
                      backgroundColor: "#005580",
                      borderColor: "#005580",
                      // padding: "10px 30px", // Adjust padding for larger button
                      fontSize: "18px", // Increase font size
                      height: "50px",
                      marginTop: "15px",
                      marginleft: "20px",
                      // Adjust button height
                    }}
                    onClick={handleGenerate}
                    disabled={
                      includeTip &&
                      (tipType === "fixed" || tipType === "%") &&
                      !tipValue
                    }
                  >
                    Generate
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Preview QR Code */}
          <Col lg="6">
            <Card>
              <Card.Body>
                {/* <h5 className="font-weight-bold mb-3">
                  Abay Bank QrCode to pay{" "}
                </h5> */}
                {qrCodeData && (
                  <div
                    ref={qrCodeRef}
                    style={{
                      display: "inline-block",
                      padding: "1px",
                      borderRadius: "10px",
                      backgroundColor: "white",
                      textAlign: "center", // Centering the QR code and its elements
                      width: "60%", // Ensure full width to center content
                      border: "4px solid #005580",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "30px",
                        fontWeight: "bold",
                        color: "#004461", // Dark blue color for "Abay Bank"
                      }}
                    >
                      Abay Bank
                      <br />
                      <span style={{ color: "black", fontSize: "20px" }}>
                        {storeLabel}
                      </span>{" "}
                    </div>

                    <QRCode
                      value={qrCodeData}
                      logoImage="/image/abay-logo.png" // Path to the logo image inside the QR code
                      logoWidth={30}
                      bgColor="#FFFFFF"
                      fgColor="#004461"
                      size={220}
                      // removeQrCodeBehindLogo={true}
                      level="L"
                    />

                    <div
                      style={{
                        marginTop: "10px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "#004461",
                        textDecoration: "underline", // Underline the text
                      }}
                    >
                      SCAN TO PAY
                    </div>

                    <div
                      style={{
                        marginTop: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        // color: "#004461",
                      }}
                    >
                      ለማንኛዉም ጥያቄ ወደ 8834 ነፃ የጥሪ <br />
                      መስመር በመደወል የደንበኞች ግንኙነት <br />
                      ማዕከላችንን ያግኙ
                      <br />
                      {new Date().toLocaleString()}
                    </div>
                  </div>
                )}

                {qrCodeData && (
                  <div className="mt-3">
                    <Button
                      style={{
                        marginRight: "10px",
                        backgroundColor: "#005580",
                      }}
                      onClick={handleDownloadImage}
                    >
                      Download as Image
                    </Button>
                    <Button
                      style={{ backgroundColor: "#005580" }}
                      onClick={handleDownloadPDF}
                    >
                      Download as PDF
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Loading merchant data...</p>
      )}
    </Container>
  );
};

export default Products;
