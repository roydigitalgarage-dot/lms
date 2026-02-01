const fs = require('fs');
const pdfLib = require('pdf-parse');

const PDFParse = pdfLib.PDFParse;

console.log('PDFParse type:', typeof PDFParse);
console.log('PDFParse props:', Object.getOwnPropertyNames(PDFParse));
console.log('PDFParse prototype props:', Object.getOwnPropertyNames(PDFParse.prototype));

// Try to use it
async function run() {
    try {
        const dataBuffer = fs.readFileSync('4th English-26 (9th Lesson).pdf');

        // If it sends a buffer to constructor?
        // Or is it a namespace?

        // Classic usage of old pdf-parse:
        // let data = await pdf(dataBuffer); 

        // But here pdfLib is an object.

        // Try creating instance?
        try {
            const instance = new PDFParse(dataBuffer);
            console.log("Instance created.");
        } catch (e) {
            console.log("Constructor failed:", e.message);
        }

    } catch (e) {
        console.error(e);
    }
}
run();
