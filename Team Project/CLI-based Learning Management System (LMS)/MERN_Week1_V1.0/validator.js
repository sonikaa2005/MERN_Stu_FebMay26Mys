function validateChoice(input, callback) {
  if (!input || isNaN(input)) {
    return callback("Invalid input", null);
  }
  callback(null, Number(input));
}

module.exports = { validateChoice };