// let url = "https://github.com/babel/babel/issues";
const PDFDocument = require("pdfkit");

const cheerio = require("cheerio");
const fs = require("fs");
const request = require("request");
function getIssue(url, baseDir) {
  request(url, cb);
  function cb(error, response, html) {
    if (error) {
      console.log(error);
    } else {
      extractAllIssue(html, baseDir);
    }
  }
}
function extractAllIssue(html, baseDir) {
  $ = cheerio.load(html);
  let topicRow = $(".Box-row div.flex-auto>.v-align-middle");
  let jsonData = [];
  for (let i = 0; i < topicRow.length; i++) {
    let issueElemLink = "https://github.com" + $(topicRow[i]).attr("href");
    jsonData.push(issueElemLink);
  }
  let jsonStringData = JSON.stringify(jsonData);
  //   console.log(jsonStringData);
  // console.log(baseDir);
  const doc = new PDFDocument();

  doc.pipe(fs.createWriteStream(baseDir));
  doc.fontSize(27).text(jsonStringData, 20, 20);
  doc.end();
  // fs.writeFileSync(`${baseDir}`, jsonStringData);
}
module.exports = {
  gIssue: getIssue,
};
