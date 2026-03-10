function tagPassword(password) {

    // Check if input is a string
    if (typeof password !== "string") {
        return "INVALID";
    }

    let Letter = false;
    let Number = false;

    // Scan characters using for loop
    for (let i = 0; i < password.length; i++) {
        let ch = password[i];

        if (ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z') {
            hasLetter = true;
        }

        if (ch >= '0' && ch <= '9') {
            hasNumber = true;
        }
    }

    // Conditions
    if (password.length < 8) {
        return "WEAK";
    }

    if (password.length >= 12 && hasLetter && hasNumber) {
        return "STRONG";
    }

    if (password.length >= 8 && hasLetter && hasNumber) {
        return "MEDIUM";
    }

    return "WEAK";
}


// Test examples
console.log(tagPassword("abc"));           // WEAK
console.log(tagPassword("abc12345"));      // MEDIUM
console.log(tagPassword("abc123456789"));  // STRONG
console.log(tagPassword(12345));           // INVALID