const { decodeEMVQRCode } = require('../services/qrDecodService');
const { generateEMVQRCode } = require('../services/generateQRCode');
const { validateEmvQrCode } = require('../services/validateEmvQrCode');
const logger = require('../utils/logger');

// Controller Functions
const getQrCode = async (req, res) => {
  logger.info('Processing request for /getQrcode');
  res.status(200).json({ success: true, message: 'Hello from the API!' });
};

const generateQrCodestring = async (req, res) => {
  logger.info("Processing request for /generate Qrcode");

  // Extract values from request body
  const {
    merchantAccountInfo, // { [tag: string]: string }
    merchantCategoryCode, // string
    transactionCurrency, // string
    transactionAmount, // string (optional)
    countryCode, // string
    merchantName, // string
    merchantCity, // string
  } = req.body;

  try {
    // Prepare the QR fields dynamically based on the provided input
    const qrFields = [
      { id: "00", value: "01" }, // Payload Format Indicator
      { id: "01", value: "12" }, // Point of Initiation Method (Dynamic)
      {
        id: "28", // Merchant Account Information
        value: Object.entries(merchantAccountInfo).map(([tag, id]) => ({
          id: tag,
          value: id,
        })),
      },
      { id: "52", value: merchantCategoryCode }, // Merchant Category Code
      { id: "53", value: transactionCurrency }, // Transaction Currency
      { id: "58", value: countryCode }, // Country Code
      { id: "59", value: merchantName }, // Merchant Name
      { id: "60", value: merchantCity }, // Merchant City
    ];

    // Conditionally add the transactionAmount if provided
    if (transactionAmount) {
      qrFields.push({ id: "54", value: transactionAmount }); // Transaction Amount
    }
    
    // Generate the QR code string
    const qrString = generateEMVQRCode(qrFields);
    
    // Send the QR code string as a response
    res.status(200).json({ success: true, qrCode: qrString });
  } catch (error) {
    logger.error(`Error generating QR code: ${error}`);
    res.status(500).json({ success: false, message: "Failed to generate QR code" });
  }
};

const getQrCodeValue = async (req, res) => {
  try {
    const qrCodeString = req.body.qrCode;
    logger.info(qrCodeString);

    // Validate QR code string format
    if (!qrCodeString || typeof qrCodeString !== 'string') {
      logger.error('Invalid QR code string received');
      res.status(400).json({ success: false, message: 'Invalid QR code string' });
      return;
    }

    // Step 1: Check for valid EMV QR structure
    const isValidEmvQr = validateEmvQrCode(qrCodeString);
    if (!isValidEmvQr) {
      logger.error('Invalid EMV QR code format');
      res.status(400).json({ success: false, message: 'Invalid EMV QR code format' });
      return;
    }

    logger.info('Valid EMV QR code received for processing');

    // Step 2: Decode the QR code string
    const result = decodeEMVQRCode(qrCodeString);

    logger.info('QR code processed successfully');
    res.status(200).json({
      success: true,
      message: 'QR code successfully processed',
      data: result,
    });
  } catch (error) {
    logger.error('Error processing QR code:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing the QR code',
    });
  }
};


// Export controller functions
module.exports = {
  getQrCode,
  generateQrCodestring,
  getQrCodeValue,
};
