// const crc32 = require("crc-32"); // Import crc-32 library

// /**
//  * Recursively builds the QR string from the QR fields.
//  * @param {Array} fields - Array of QRField objects
//  * @returns {string} The concatenated QR string
//  */
// function buildQRString(fields) {
//   let qrString = "";
//   for (const field of fields) {
//     const { id, value } = field;
//     if (Array.isArray(value)) {
//       // Handle nested structures recursively
//       const nestedValue = buildQRString(value);
//       qrString += `${id}${nestedValue.length
//         .toString()
//         .padStart(2, "0")}${nestedValue}`;
//     } else {
//       qrString += `${id}${value.length.toString().padStart(2, "0")}${value}`;
//     }
//   }
//   return qrString;
// }

// function createHelloWorldString() {
//   const message = "Hello, World!";
//   return message;
// }


// /**
//  * Calculates the CRC32 checksum for the QR string using the `crc-32` library.
//  * @param {string} qrString - The base QR string (excluding CRC value)
//  * @returns {string} The calculated CRC32 checksum as an 8-character hexadecimal string
//  */
// function calculateCRC(qrString) {
//   // Append "6304" (CRC ID and length) before calculating the checksum
//   const qrWithCRCPlaceholder = qrString + "6304";

//   // Use crc32 from the 'crc-32' library
//   const crcValue = crc32
//     .str(qrWithCRCPlaceholder)
//     .toString(16)
//     .toUpperCase()
//     .padStart(8, "0");

//   return crcValue;
// }

// /**
//  * Generates a complete EMV-compliant QR code string with a CRC32 checksum.
//  * @param {Array} fields - Array of QRField objects defining the QR code structure
//  * @returns {string} The final EMV QR code string
//  */
// function generateEMVQRCode(fields) {
//   console.log("welcome");
//   console.log(fields);

//   // Build the initial QR string from the fields
//   const qrString = buildQRString(fields);

//   // Calculate the CRC32 checksum for the QR string
//   const crcValue = calculateCRC(qrString);

//   // Append the CRC value to the QR string and return
//   return `${qrString}6304${crcValue}`;
// }

// module.exports = {generateEMVQRCode,createHelloWorldString};
 // Ensure the "crc" library is installed via `npm install crc`
 const crc32 = require("crc-32"); // Import crc-32 library
/**
 * Recursively builds the QR string from the QR fields.
 * 
 * @param {Array} fields - Array of QRField objects
 * @returns {string} The concatenated QR string
 */
function buildQRString(fields) {
  return fields.reduce((qrString, field) => {
    const { id, value } = field;

    if (Array.isArray(value)) {
      // Handle nested structures recursively
      const nestedValue = buildQRString(value);
      qrString += `${id}${nestedValue.length.toString().padStart(2, "0")}${nestedValue}`;
    } else {
      qrString += `${id}${value.length.toString().padStart(2, "0")}${value}`;
    }

    return qrString;
  }, "");
}

/**
 * Calculates the CRC16 checksum for the QR string.
 * @param {string} qrString - The base QR string (excluding CRC value)
 * @returns {string} The calculated CRC16 checksum as a 4-character hexadecimal string
 */
function calculateCRC(qrString) {
  const qrWithCRCPlaceholder = qrString + "6304";
  const polynomial = 0x1021;
  let crc = 0xFFFF;

  for (let i = 0; i < qrWithCRCPlaceholder.length; i++) {
    crc ^= qrWithCRCPlaceholder.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc <<= 1;
      }
    }

    crc &= 0xFFFF; // Ensure CRC remains a 16-bit value
  }

  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Generates a complete EMV-compliant QR code string with a CRC16 checksum.
 * @param {Array} fields - Array of QRField objects defining the QR code structure
 * @returns {string} The final EMV QR code string
 */
function generateEMVQRCode(fields) {
  // Step 1: Build the QR string from the provided fields
  const qrString = buildQRString(fields);

  // Step 2: Calculate the CRC16 checksum for the QR string
  const crcValue = calculateCRC(qrString);

  // Step 3: Append the CRC field (ID "63", length "04") and checksum value
  return `${qrString}6304${crcValue}`;
}

export { generateEMVQRCode };
