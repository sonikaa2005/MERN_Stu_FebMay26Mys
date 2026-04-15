let attempts = 0;

function validateInput(input, callback) {
  if (!input) {
    attempts++;
    if (attempts >= 3) {
      callback("Max attempts reached", null);
    } else {
      callback("Invalid input, try again", null);
    }
  } else {
    attempts = 0;
    callback(null, input);
  }
}

module.exports = validateInput;