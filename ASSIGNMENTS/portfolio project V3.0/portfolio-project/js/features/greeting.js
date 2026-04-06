function initGreeting() {

    const greetingEl = document.getElementById("greeting-text");

    if (!greetingEl) return;

    const hour = new Date().getHours();

    let message = "";

    if (hour < 12) {
        message = "Good Morning";
    } else if (hour < 18) {
        message = "Good Afternoon";
    } else {
        message = "Good Evening";
    }

    greetingEl.textContent = message;

    console.log("Greeting applied:", message);
}