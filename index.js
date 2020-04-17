const DB = require("./db");
const scraper = require("./workers/Scraper");
/**
 * HTTP Cloud Function.
 * This function is exported by index.js, and is executed when
 * you make an HTTP request to the deployed function's endpoint.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.getWord = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  const mock = {
    data: {
      audio: "https://d1pra95f92lrn3.cloudfront.net/audio/320392.mp3",
      class: "noun",
      imageUrl: "https://d1pra95f92lrn3.cloudfront.net/media/thumb/9437_fit160.jpg",
      romanization: "nǎng-sǔue",
      translation: "book",
      word: "หนังสือ",
      examples: []
    }
  }

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  } else {
    try {
      const data = await DB.randomRead();
      // const data = await Promise.resolve(mock);
      return res.status(200).send(data);
    } catch (err) {
      return res.status(404).send(err);
    }
  }
};

exports.dailyScraper = async (event, context) => {
  const pubsubMessage = event.data;
  console.log(Buffer.from(pubsubMessage, "base64").toString());
  try {
    const response = await scraper.dailyScrape();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};
