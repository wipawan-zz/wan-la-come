function getToday() {
  const today = new Date();

  let date = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  // format date
  date = date < 10 ? "0" + date : date;
  // format month
  month = month < 10 ? "0" + month : month;

  return "" + month + date + year;
}

module.exports = {
  getToday,
};
