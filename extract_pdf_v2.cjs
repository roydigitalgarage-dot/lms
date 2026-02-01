const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function run() {
    try {
        const dataBuffer = fs.readFileSync('4th English-26 (9th Lesson).pdf');
        const uint8Array = new Uint8Array(dataBuffer);
        const parser = new PDFParse(uint8Array);

        console.log("Extracting text object...");
        const textObj = await parser.getText();

        // Save raw object to inspect
        fs.writeFileSync('lesson_raw.json', JSON.stringify(textObj, null, 2));
        console.log("Saved lesson_raw.json");

        // Check text content
        if (textObj.text) {
            console.log("Text found in .text property");
            fs.writeFileSync('lesson_text.txt', textObj.text);
        } else {
            console.log("No .text property. Keys:", Object.keys(textObj));
        }

    } catch (e) {
        console.error("Error:", e);
    }
}
run();
