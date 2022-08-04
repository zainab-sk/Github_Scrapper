// Importing modules
const PDFDocument = require("pdfkit");
const fs = require("fs");

// Create a document
const doc = new PDFDocument();

// Saving the pdf file in root directory.
doc.pipe(fs.createWriteStream("example.pdf"));

// Adding functionality
doc.fontSize(27).text("This the article for GeeksforGeeks", 100, 100);

// Adding an image in the pdf.

// Apply some transforms and render an SVG path with the
// 'even-odd' fill rule

// Add some text with annotations

// Finalize PDF file
doc.end();
