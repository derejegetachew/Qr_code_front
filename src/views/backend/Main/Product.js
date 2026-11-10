import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Spinner, Button, Row, Col } from "react-bootstrap";
import Card from "../../../components/Card";
import { QRCode } from "react-qrcode-logo";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import axios from "axios";
import * as XLSX from "xlsx";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "../../../assets/css/style.css";
import {
  generateEMVQRCode,
  createHelloWorldString,
} from "../../../services/qr-generator";
import log from "../../../middleware/logger";
import { info, error, warn } from "../../../middleware/logger";
import saveMerchantData from "./registerData";
import { currentUser } from "../../../Utils/tokenUtils";
import { BASE_URL } from "../../../Utils/constants";
const Products = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [merchantData, setMerchantData] = useState([]);
  const [qrCodeData, setQrCodeData] = useState([]);
  const [validationError, setError] = useState("");
  const [step, setStep] = useState(1);
  const qrCodeRef = useRef([]);

  const [includeTip, setIncludeTip] = useState([]);

  const [tipType, setTipType] = useState([]);
  const [tipValue, setTipValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [inputMethod, setInputMethod] = useState("manual"); // 'manual' or 'file'

  const user = currentUser();
  if (user) {
    console.log(`Welcome, ${user}!`);
  } else {
    console.log("User is not authenticated or token is invalid.");
  }
  const fullName = user ? `${user.first_name} ${user.middle_name}` : "Guest";
  // const position = user ? user.position : "Unknown Position";
  const user_id = user ? user.userid : "Unknown user_id";
  const branch_id = user ? user.branch_id : "Unknown branch_id:";
  const branch = user ? user.branch : "unknown branch";
  const username = user ? user.username : "Unknown Username";
  const branch_code = user ? user.branch_code : "Unknown Branch Code";
  const getMerchantNameFontSize = (name) => {
    if (!name) return "24px";
    const len = name.trim().length;
    if (len <= 12) return "32px"; // Small name: increase font
    if (len <= 18) return "24px";
    if (len <= 24) return "20px";
    if (len <= 30) return "18px";
    if (len <= 38) return "17px";
    return "16px";                // Large text: decrease font so full name fits
  };

  const handleError = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 6000);
  };
  const handleGenerate = async () => {
    if (!merchantData || merchantData.length === 0) {
      setError("Merchant data is missing.");
      return;
    }

    try {
      const generatedQRCodes = merchantData.map((merchant, index) => {
        merchant.merchantAccountInfo = {
          "00": merchant.MER_IDEN || "00000",
          "01": "ABAYETAA",
          "02": merchant.ACC_NUMB,
        };

        if (includeTip[index]) {
          merchant.tip = true;
          merchant.tipType = tipType;
          merchant.tipValue = tipValue;
        } else {
          merchant.tip = false;
        }

        const qrFields = [
          { id: "00", value: "01" },
          { id: "01", value: "11" },
          {
            id: "28",
            value: Object.entries(merchant.merchantAccountInfo || {}).map(
              ([tag, value]) => ({ id: tag, value }),
            ),
          },
          { id: "52", value: merchant.MER_CODE || "5411" },
          { id: "53", value: merchant.transactionCurrency || "230" },
          { id: "58", value: merchant.countryCode || "ET" },
          { id: "59", value: merchant.MER_NAME || "Unknown Merchant" },
          { id: "60", value: merchant.cITY || "Unknown City" },
        ];

        if (merchant.transactionAmount) {
          qrFields.push({ id: "54", value: merchant.transactionAmount });
        }

        if (merchant.tip) {
          if (merchant.tipType[index] === "fixed") {
            qrFields.push({ id: "55", value: "02" });
            qrFields.push({ id: "56", value: merchant.tipValue[index] });
          } else if (merchant.tipType[index] === "%") {
            qrFields.push({ id: "55", value: "03" });
            qrFields.push({ id: "57", value: merchant.tipValue[index] });
          } else {
            qrFields.push({ id: "55", value: "01" });
          }
        }

        const qrString = generateEMVQRCode(qrFields);
        console.log("Generated QR String:", qrString);

        return qrString;
      });

      setQrCodeData(generatedQRCodes);
      const QRdata = {
        QR: generatedQRCodes,
        user: fullName,
        userid: user_id,
        branch_id: branch_id,
        branch: branch,
        branch_code: branch_code,
        username: username,
      };
      console.log(QRdata);
      await saveMerchantData(QRdata);
    } catch (error) {
      handleError(
        "Failed to generate QR code: this account is not a merchant account number.",
      );
    }
  };
  const createA5ImageBlob = async (qrElement) => {
    const rawImage = await toPng(qrElement, {
      pixelRatio: 4,
      backgroundColor: "#ffffff",
    });

    const canvas = document.createElement("canvas");
    // Standard A5 at 300 DPI (148mm x 210mm)
    canvas.width = 1748;
    canvas.height = 2480;
    const ctx = canvas.getContext("2d");

    // White A5 page
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fixed width of 85mm on a 148mm width page so QR code size remains constant
    const targetWidthPx = (85 / 148) * canvas.width;

    const img = new Image();
    img.src = rawImage;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgRatio = img.width / img.height;
    const drawW = targetWidthPx;
    const drawH = targetWidthPx / imgRatio;

    // Perfectly centered on the A5 page
    const drawX = (canvas.width - drawW) / 2;
    const drawY = (canvas.height - drawH) / 2;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  };

  const handleDownloadAllImages = async () => {
    try {
      const validIndices = [];
      for (let i = 0; i < qrCodeData.length; i++) {
        if (qrCodeRef.current[i]) {
          validIndices.push(i);
        }
      }

      if (validIndices.length === 0) {
        setError("No QR codes to download.");
        return;
      }

      // If single QR code, download directly as an A5 PNG image
      if (validIndices.length === 1) {
        const i = validIndices[0];
        const blob = await createA5ImageBlob(qrCodeRef.current[i]);
        const merchantName = (merchantData[i]?.MER_NAME || `QRCode_${i + 1}`)
          .trim()
          .replace(/[/\\?%*:|"<>]/g, "_");
        saveAs(blob, `${merchantName}.png`);
        return;
      }

      // If multiple QR codes, pack all A5 images into a zip
      const zip = new JSZip();
      for (const i of validIndices) {
        const blob = await createA5ImageBlob(qrCodeRef.current[i]);
        const merchantName = (merchantData[i]?.MER_NAME || `QRCode_${i + 1}`)
          .trim()
          .replace(/[/\\?%*:|"<>]/g, "_");
        zip.file(`${merchantName}.png`, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      const zipName = (merchantData[0]?.MER_NAME || "All_QR_Codes")
        .trim()
        .replace(/[/\\?%*:|"<>]/g, "_");
      saveAs(content, `${zipName}.zip`);
    } catch (error) {
      console.error("Failed to download images:", error);
      setError("Failed to download images. Please try again.");
    }
  };

  const handleDownloadAllPDF = async () => {
    try {
      // Standard A5 portrait PDF (148mm x 210mm) matching handlePrintA5
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 148 mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 210 mm
      const targetWidth = 85; // Fixed 85mm width on A5 sheet so QR code size remains constant

      let pageCount = 0;

      for (let i = 0; i < qrCodeData.length; i++) {
        if (qrCodeRef.current[i]) {
          const image = await toPng(qrCodeRef.current[i], {
            pixelRatio: 4,
            backgroundColor: "#ffffff",
          });

          if (pageCount > 0) {
            pdf.addPage("a5", "portrait");
          }
          pageCount++;

          const imgProps = pdf.getImageProperties(image);
          const imgRatio = imgProps.width / imgProps.height;

          const renderW = targetWidth;
          const renderH = targetWidth / imgRatio;

          // Center in the exact middle of the A5 sheet
          const x = (pageWidth - renderW) / 2;
          const y = (pageHeight - renderH) / 2;

          pdf.addImage(image, "PNG", x, y, renderW, renderH);
        }
      }

      if (pageCount === 0) {
        setError("No QR codes to generate PDF.");
        return;
      }

      const pdfName =
        merchantData.length === 1 && merchantData[0]?.MER_NAME
          ? `${merchantData[0].MER_NAME.trim().replace(/[/\\?%*:|"<>]/g, "_")}.pdf`
          : "All_QR_Codes.pdf";

      pdf.save(pdfName);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      setError("Failed to generate PDF. Please try again.");
    }
  };

  const handlePrintA5 = async () => {
    try {
      const qrImages = [];
      for (let i = 0; i < qrCodeData.length; i++) {
        if (qrCodeRef.current[i]) {
          const image = await toPng(qrCodeRef.current[i], { pixelRatio: 4 });
          qrImages.push(image);
        }
      }

      if (qrImages.length === 0) {
        setError("No QR codes to print.");
        return;
      }

      const printTitle =
        merchantData.length === 1
          ? (merchantData[0]?.MER_NAME || "QRCode").trim()
          : "All_QR_Codes";

      const pagesHtml = qrImages
        .map(
          (src, idx) => `
        <div class="a5-page" ${idx < qrImages.length - 1 ? 'style="page-break-after: always;"' : ""}>
          <img src="${src}" alt="QR Code" class="qr-image" />
        </div>
      `,
        )
        .join("");

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
          ${pagesHtml}
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
      console.error("Failed to print:", error);
      setError("Failed to print. Please try again.");
    }
  };

  const newhandleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...merchantData];
    updatedData[index][name] = value;
    setMerchantData(updatedData);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAccountSubmit = async () => {
    setLoading(true);
    setError("");
    setQrCodeData([]); // Reset QR code so it only appears after clicking "Generate"

    if (inputMethod === "manual" && !accountNumber) {
      setError("Please enter an account number.");
      setLoading(false);
      return;
    }

    if (inputMethod === "file" && !selectedFile) {
      setError("Please upload an Excel file.");
      setLoading(false);
      return;
    }

    let accountNumbers = [];

    if (inputMethod === "manual") {
      accountNumbers = accountNumber.split(",").map((acc) => acc.trim());

      await sendAccountNumbersToAPI(accountNumbers);
    } else if (inputMethod === "file" && selectedFile) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        accountNumbers = json.map((row) => row.AccountNumber);
        await sendAccountNumbersToAPI(accountNumbers);
        setLoading(false);
      };

      reader.onerror = (error) => {
        setError("Error reading the file: " + error.message);
        setLoading(false);
      };

      reader.readAsArrayBuffer(selectedFile);
      return;
    }

    setLoading(false);
  };
  const sendAccountNumbersToAPI = async (accountNumbers) => {
    try {
      const account_list = { accountNumbers: accountNumbers };

      console.log("account number list", account_list);
      const response = await axios.post(`${BASE_URL}/merchant`, account_list);
      if (response.data) {
        const responseData = response.data;
        const successfulResponses = responseData.filter(
          (item) => item.STATUS === "SUCCESS",
        );

        if (successfulResponses.length === 0) {
          setError(
            "all merchant account does not exist at least one valid account required",
          );
          return;
        }

        setMerchantData(successfulResponses);
        setStep(2);
      } else {
        const errorMsg = response.data?.STATUS || "Failed";
        setError(`${errorMsg}: Merchant account does not exist`);
      }
    } catch (err) {
      log.error("API Error:", err);
      setStep(1);
      setError(
        err.message || "An unexpected error occurred. Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep(1);
    setMerchantData([]);
    setQrCodeData([]);
    setError("");
    setTipValue([]);
    setIncludeTip([]);
  };

  const handleIncludeTipChange = (index) => {
    const newIncludeTip = [...includeTip];
    newIncludeTip[index] = !newIncludeTip[index];
    setIncludeTip(newIncludeTip);
  };
  const handleTipTypeChange = (event, index) => {
    const newTipType = [...tipType]; // Create a copy of the current state
    newTipType[index] = event.target.value; // Update the specific index
    setTipType(newTipType); // Set the new state
  };

  const [tipOptions, setTipOptions] = useState([
    { includeTip: false, tipType: null, tipValue: "" }, // Initial item!
    // ... more initial items if needed
  ]);

  const newhandleTipValueChange = (event, index) => {
    const value = event.target.value; // Get the input value
    setTipValue((prevTipValue) => {
      const updatedTipValue = [...prevTipValue]; // Make a copy of the array
      updatedTipValue[index] = value; // Directly set the value at the index
      return updatedTipValue; // Return the updated array
    });
  };

  return (
    <Container fluid>
      {step === 1 ? (
        <Form>
          <Form.Group controlId="formInputMethod">
            <div className="col-md-3 mb-3">
              <Form.Label
                style={{
                  fontSize: "18px",
                  color: "#005580",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Choose Input Method
              </Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Enter Account Number Manually"
                  name="inputMethod"
                  id="manual"
                  checked={inputMethod === "manual"}
                  onChange={() => setInputMethod("manual")}
                />
                <Form.Check
                  type="radio"
                  label="Upload Excel File"
                  name="inputMethod"
                  id="file"
                  checked={inputMethod === "file"}
                  onChange={() => setInputMethod("file")}
                />
              </div>
            </div>
          </Form.Group>

          {inputMethod === "manual" ? (
            <Form.Group controlId="formBankAccount">
              <div className="col-md-3 mb-3">
                <Form.Label
                  style={{
                    fontSize: "18px",
                    color: "#005580",
                    fontWeight: "bold",
                    marginBottom: "10px",
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
          ) : (
            <Form.Group controlId="formFileUpload">
              <div className="col-md-3 mb-3">
                <Form.Label
                  style={{
                    fontSize: "18px",
                    color: "#005580",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  Upload Excel File
                </Form.Label>
                <Form.Control
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  style={{ border: "1px solid #005580" }}
                />
              </div>
            </Form.Group>
          )}

          <Button
            onClick={handleAccountSubmit}
            style={{
              backgroundColor: "#005580",
              borderColor: "#005580",
              fontSize: "18px",
              height: "50px",
              marginTop: "15px",
            }}
            disabled={loading}
          >
            {loading ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                style={{ marginRight: "10px" }}
              />
            ) : null}
            {loading ? "Loading..." : "Submit"}
          </Button>
          {validationError && <p className="text-danger">{validationError}</p>}
        </Form>
      ) : merchantData && merchantData.length > 0 ? (
        <Row>
          <Col lg="6">
            <Card>
              <Card.Body>
                <h5
                  className="font-weight-bold mb-3"
                  style={{
                    fontSize: "15px",
                    color: "#005580",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                  }}
                >
                  Abay Bank Merchant Information
                </h5>
                <Form className="row g-3">
                  {merchantData.map((merchant, index) => (
                    <React.Fragment key={index}>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Merchant Name:{merchant.MER_NAME || "N/A"}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Merchant Account Holder:{merchant.name || "N/A"}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Merchant Account: {merchant.ACC_NUMB || "N/A"}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Merchant ID: {merchant.MER_IDEN || "N/A"}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          MCC: {merchant.MER_CODE || "N/A"}
                        </Form.Label>
                      </div>

                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Tin: {merchant.TIN || "N/A"}
                        </Form.Label>
                      </div>

                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Merchant Bank: {merchant.merchantbank || "ABAYETAA"}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Transaction Currency:{" "}
                          {merchant.transactionCurrency || "ET"}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Merchant City: {merchant.CITY || "Addis Ababa"}{" "}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Mobile Phone: {merchant.MOBILE_NUMBER || "N/A"}
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Label className="label-text">
                          Transaction Amount:
                        </Form.Label>
                      </div>
                      <div className="col-md-6 mb-3">
                        <Form.Control
                          type="number"
                          name="transactionAmount"
                          value={merchant.transactionAmount || ""}
                          onChange={(e) => newhandleInputChange(e, index)}
                          placeholder="Amount"
                          style={{ border: "1px solid #005580" }}
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <div key={index}>
                          <div className="row">
                            <Form.Label>Include Tip</Form.Label>
                            <Form.Check
                              type="checkbox"
                              id={`includeTip-${index}`}
                              checked={includeTip[index] || false}
                              onChange={() => handleIncludeTipChange(index)}
                            />
                          </div>

                          {includeTip[index] && (
                            <div>
                              <p>What is the Tip Option?</p>
                              <div>
                                <div className="row">
                                  <div className="col-md-4 mb-3">
                                    <Form.Check
                                      type="radio"
                                      id={`tipOptional-${index}`}
                                      name={`tipType-${index}`}
                                      label="Optional"
                                      value="optional"
                                      checked={tipType[index] === "optional"}
                                      onChange={(event) =>
                                        handleTipTypeChange(event, index)
                                      }
                                      inline
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <Form.Check
                                      type="radio"
                                      id={`tipFixed-${index}`}
                                      name={`tipType-${index}`}
                                      label="Fixed"
                                      value="fixed"
                                      checked={tipType[index] === "fixed"}
                                      onChange={(event) =>
                                        handleTipTypeChange(event, index)
                                      }
                                      inline
                                    />
                                  </div>
                                  <div className="col-md-4 mb-3">
                                    <Form.Check
                                      type="radio"
                                      id={`tipPercentage-${index}`}
                                      name={`tipType-${index}`}
                                      label="Percentage"
                                      value="%"
                                      checked={tipType[index] === "%"}
                                      onChange={(event) =>
                                        handleTipTypeChange(event, index)
                                      }
                                      inline
                                    />
                                  </div>
                                </div>
                              </div>
                              {(tipType[index] === "fixed" ||
                                tipType[index] === "%") && (
                                  <div className="col-md-6 mb-3">
                                    <Form.Label>Enter Tip Value:</Form.Label>
                                    <Form.Control
                                      type="number"
                                      value={tipValue[index] || ""}
                                      onChange={(event) =>
                                        newhandleTipValueChange(event, index)
                                      }
                                      placeholder={
                                        tipType[index] === "fixed"
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
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  <Button
                    style={{
                      backgroundColor: "#005580",
                      borderColor: "#005580",

                      fontSize: "18px",
                      height: "50px",
                      marginTop: "20px",
                      // marginLeft: "-20px",
                    }}
                    onClick={handleGenerate}
                  >
                    Generate
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#888",
                      borderColor: "#666",
                      fontSize: "18px",
                      height: "50px",
                      marginTop: "20px",
                      marginLeft: "25px",
                    }}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                </Form>
                <p>
                  <i className="text-danger">{validationError}</i>
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col lg="6">
            <Card>
              <Card.Body>
                {qrCodeData && qrCodeData.filter(Boolean).length > 0 ? (
                  qrCodeData.map((qrString, index) => {
                    if (!qrString) return null;
                    return (
                      <Col key={index} md={6} className="mb-3">
                        <div
                          ref={(el) => (qrCodeRef.current[index] = el)}
                          style={{
                            display: "inline-block",
                            width: "340px",
                            backgroundColor: "white",
                            textAlign: "center",
                            padding: "16px",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "center" }}>
                            <QRCode
                              value={qrString}
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
                              marginTop: "26px",
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
                                  merchantData[index]?.MER_NAME,
                                ),
                                whiteSpace: "nowrap",
                                color: "#000000",
                              }}
                            >
                              {merchantData[index]?.MER_NAME || "N/A"}
                            </span>
                            <div style={{ marginTop: "3px" }}>
                              <Form.Label
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                  marginBottom: 0,
                                  color: "#000000"
                                }}
                              >
                                Merchant ID :
                              </Form.Label>{" "}
                              <span
                                style={{ fontWeight: "bold", fontSize: "18px",color: "#000000"}}
                              >
                                {merchantData[index]?.MER_IDEN || "N/A"}
                              </span>
                            </div>
                          </strong>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <div className="text-center py-5 text-muted">
                    <p style={{ fontSize: "15px" }}>
                      Please review the merchant information and click{" "}
                      <strong>"Generate"</strong> to create the QR code.
                    </p>
                    {/* <p style={{ fontSize: "13px", marginTop: "16px" }}>
                      Looking for a previously generated QR code? View & download it anytime in{" "}
                      <Link
                        to="/view_qr"
                        style={{
                          color: "#005580",
                          fontWeight: "700",
                          textDecoration: "underline",
                        }}
                      >
                        Generated QR Codes
                      </Link>
                      .
                    </p> */}
                  </div>
                )}

                {qrCodeData && qrCodeData.filter(Boolean).length > 0 && (
                  <div
                    className="mt-3"
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    <Button
                      style={{
                        backgroundColor: "#005580",
                        borderColor: "#005580",
                        fontWeight: "500",
                      }}
                      onClick={handleDownloadAllImages}
                    >
                      🖼️ Download Image
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#005580",
                        borderColor: "#005580",
                        fontWeight: "500",
                      }}
                      onClick={handleDownloadAllPDF}
                    >
                      📄 Download PDF
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#c8820e",
                        borderColor: "#c8820e",
                        fontWeight: "bold",
                      }}
                      onClick={handlePrintA5}
                    >
                      🖨️ Print
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
