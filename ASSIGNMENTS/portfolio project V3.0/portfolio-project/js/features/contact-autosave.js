function initContactAutoSave() {

    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");

    if (!nameInput || !emailInput) {
        console.log("Contact inputs not found");
        return;
    }

    // 🔹 Load saved data on page load
    const savedData = localStorage.getItem("contactForm");

    if (savedData) {
        const parsedData = JSON.parse(savedData);

        nameInput.value = parsedData.name || "";
        emailInput.value = parsedData.email || "";
    }

    // 🔹 Save on input
    function saveData() {

        const data = {
            name: nameInput.value,
            email: emailInput.value
        };

        localStorage.setItem("contactForm", JSON.stringify(data));
    }

    nameInput.addEventListener("input", saveData);
    emailInput.addEventListener("input", saveData);

    console.log("Auto-save working");
}