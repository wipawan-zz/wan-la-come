const fetch = require("node-fetch");
const DB = require("../db");
const Parser = require("../utililties/Parser");
const DateFormatter = require("../utililties/DateFormatter");

const BASE_URL = "https://www.thaipod101.com/thai-phrases";

async function batchScrape() {
  const words = [];
  let count = 1;

  while (count <= 30) {
    // modify URL path to be MMDDYYYY format
    const date = `12${count < 10 ? "0" + count : count}2019`;
    const response = await fetch(`${BASE_URL}/${date}`);
    const text = await response.text();

    if (text) {
      const word = Parser.parse(text);
      console.log(word);
      words.push(word);
    }

    count++;
  }

  DB.batchWrite(words);
}

async function dailyScrape() {
  try {
    const response = await fetch(`${BASE_URL}/${DateFormatter.getToday()}`);
    const text = await response.text();
    if (text) {
      const word = Parser.parse(text);
      const result = await DB.singleWrite(word);
      return result;
    } else {
      throw new Error("unable to parse empty page");
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  batchScrape,
  dailyScrape,
};
