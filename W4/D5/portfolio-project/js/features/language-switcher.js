// ===== LANGUAGE SYSTEM =====

let currentLang = localStorage.getItem("lang") || "en";

const translations = {
    en: {
        name: "Sonika K",
        role: "Full-Stack developer | MERN enthusiast | Competitive Programmer",

        projectsTitle: "My Projects",
        skillsTitle: "Skills",
        experienceTitle: "Education and Experience",

        viewProjects: "View Projects",
        downloadResume: "Download Resume",
        contact: "Let's talk"
    },

    kn: {
        name: "ಸೋನಿಕಾ ಕೆ",
        role: "ಫುಲ್-ಸ್ಟ್ಯಾಕ್ ಡೆವಲಪರ್ | MERN ಉತ್ಸಾಹಿ | ಸ್ಪರ್ಧಾತ್ಮಕ ಪ್ರೋಗ್ರಾಮರ್",

        projectsTitle: "ನನ್ನ ಪ್ರಾಜೆಕ್ಟ್‌ಗಳು",
        skillsTitle: "ಕೌಶಲ್ಯಗಳು",
        experienceTitle: "ಶಿಕ್ಷಣ ಮತ್ತು ಅನುಭವ",

        viewProjects: "ಪ್ರಾಜೆಕ್ಟ್‌ಗಳನ್ನು ನೋಡಿ",
        downloadResume: "ರೆಸ್ಯೂಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
        contact: "ಸಂಪರ್ಕಿಸಿ"
    }
};

// Apply language to UI
function applyLanguage(){

    const t = translations[currentLang];

    // HERO
    document.querySelector("h1").textContent = t.name;
    document.querySelector(".text-xl").textContent = t.role;

    // BUTTONS
    document.querySelector('a[href="#projects"]').textContent = t.viewProjects;
    document.querySelector('a[href="#resume"]').textContent = t.downloadResume;
    document.querySelector('a[href="#contact"]').textContent = t.contact;

    // SECTION TITLES
    document.querySelector("#projects h2").textContent = t.projectsTitle;
    document.querySelector("#skills h2").textContent = t.skillsTitle;
    document.querySelector("#experience h2").textContent = t.experienceTitle;

    // Button label
    const btn = document.getElementById("lang-toggle");
    if(btn){
        btn.textContent = currentLang.toUpperCase();
    }
}

// Toggle language
function toggleLanguage(){
    currentLang = currentLang === "en" ? "kn" : "en";
    localStorage.setItem("lang", currentLang);
    applyLanguage();
}

// Initialize
document.addEventListener("DOMContentLoaded", function(){

    // attach click
    const btn = document.getElementById("lang-toggle");
    if(btn){
        btn.addEventListener("click", toggleLanguage);
    }

    // apply saved language
    applyLanguage();
});