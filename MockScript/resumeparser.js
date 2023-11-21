const fs=require('fs')
const PdfParse = require('pdf-parse')


async function pdftotext(path) {

const pdf=await fs.readFileSync(
    path)

let data=await PdfParse(pdf);

return data.text
}

module.exports=pdftotext;

