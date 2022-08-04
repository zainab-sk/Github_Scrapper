let url = "https://github.com/topics";
const cheerio = require("cheerio");
const request = require("request");
const gIssue = require("./issue");
const fs = require("fs");

const path = require("path");

request(url, cb);
function cb(error, response, html) {
  if (error) {
    console.log(error);
  } else {
    extractLinks(html);
  }
}
//Main 3 random repos extraction
function extractLinks(html) {
  $ = cheerio.load(html);
  let topicRow = $(".container-lg > ul.d-flex >li");
  for (let i = 0; i < topicRow.length; i++) {
    let nxtPgLinkElem = $(topicRow[i]).find("a");
    let topicNameElem = $(nxtPgLinkElem).find("p.lh-condensed");
    let topicName = $(topicNameElem).text().trim();
    // console.log(topicName);
    createDirectory(topicName);
    let nxtPgLink = "https://github.com" + $(nxtPgLinkElem).attr("href");
    // console.log(nxtPgLink);
    getLink(nxtPgLink, "repo", topicName);
  }
}
function getLink(url, status, topicName, baseDir) {
  request(url, cb);
  function cb(error, response, html) {
    if (error) {
      console.log(error);
    } else {
      if (status === "repo") {
        extractAllRepoLinks(html, topicName);
      } else {
        extractIssue(html, baseDir);
      }
    }
  }
}
//Get Each topic first 8 repo
function extractAllRepoLinks(html, topicName) {
  $ = cheerio.load(html);
  let repoElem = $("a.text-bold.wb-break-word");
  for (let i = 0; i < 8; i++) {
    let repoLink = "https://github.com" + $(repoElem[i]).attr("href");
    let repoName = $(repoElem[i]).text().trim();
    repoName = repoName + ".pdf";
    let baseDir = path.join(__dirname, `${topicName}`, `${repoName}`);
    // console.log(baseDir);
    // console.log(repoName);
    getLink(repoLink, "issue", ...[,], baseDir);
    // console.log(repoLink);
  }
}
// Get all issueLink of 8 repos
function extractIssue(html, baseDir) {
  $ = cheerio.load(html);

  let issueTabElem = $(".UnderlineNav-body a.UnderlineNav-item");
  let issueTabLink = "https://github.com" + $(issueTabElem[1]).attr("href");
  //   console.log(baseDir);

  gIssue.gIssue(issueTabLink, baseDir);
}
function createDirectory(topicName) {
  if (fs.existsSync(topicName) === false) {
    fs.mkdirSync(topicName);
  }
}
