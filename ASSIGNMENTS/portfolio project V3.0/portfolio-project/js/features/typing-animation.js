function initTypingAnimation() {

    const textElement = document.getElementById("typing-text");

    if (!textElement) return;

    const roles = [
        "Full-Stack Developer",
        "MERN Enthusiast",
        "Competitive Programmer",
        "Frontend Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            textElement.textContent = currentRole.slice(0, charIndex--);
        } else {
            textElement.textContent = currentRole.slice(0, charIndex++);
        }

        // Speed control
        let speed = isDeleting ? 50 : 100;

        // When word completed
        if (!isDeleting && charIndex === currentRole.length) {
            speed = 1500; // pause
            isDeleting = true;
        }

        // When word deleted
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}