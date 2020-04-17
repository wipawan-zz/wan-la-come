const cheerio = require('cheerio');

function parse(text) {
  const $ = cheerio.load(text, {
    decodeEntities: false,
  });

  const imageUrl = $('.r101-wotd-widget__section--first').children('img').attr('src');

  const audioList = $('.r101-wotd-widget__audio').map(function() {
    return $(this).data('audio')
  });

  const thaiWordsList = $('[lang=th]', '.r101-wotd-widget__word-row').map(function() {
    return $(this).text();
  });

  const romanization = $('.romanization').map(function() {
    return $(this).html().trim()
  });

  const translation = $('.r101-wotd-widget__english').map(function() {
    return $(this).html().trim();
  });

  const wordClass = $('.r101-wotd-widget__class').html().trim();

  const wordInfo = thaiWordsList.toArray().map((element, index) => {
    return {
      word: element,
      translation: translation[index],
      romanization: romanization[index],
      audio: audioList[index]
    };
  });

  return {
    ...wordInfo[0],
    imageUrl,
    class: wordClass,
    examples: wordInfo.slice(1)
  }
}

module.exports = {
  parse
};