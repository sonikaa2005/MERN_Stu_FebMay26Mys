function handleScrollProgress() {
    const bar = document.getElementById("scroll-progress");

    if (!bar) return;

    const scrollTop = window.scrollY;
    const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    if (totalHeight <= 0) return;

    const percent = (scrollTop / totalHeight) * 100;
    bar.style.width = percent + "%";
}

// SCROLL SPY (ACTIVE NAV)
function handleScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";

    sections.forEach((section) => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (
            window.scrollY >= top &&
            window.scrollY < top + height
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("text-blue-600");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("text-blue-600");
        }
    });
}

// EVENTS
window.addEventListener("scroll", handleScrollProgress);
window.addEventListener("scroll", handleScrollSpy);
