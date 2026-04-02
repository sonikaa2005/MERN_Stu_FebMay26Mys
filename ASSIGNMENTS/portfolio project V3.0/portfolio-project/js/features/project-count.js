function updateProjectCountAuto() {

    const countDisplay = document.getElementById("project-count");
    const container = document.getElementById("projects-container");

    if (!countDisplay || !container) return;

    function update() {
        const visibleProjects = container.children.length;

        if (visibleProjects === 0) {
            countDisplay.textContent = "No projects found";
        } else if (visibleProjects === 1) {
            countDisplay.textContent = "1 project found";
        } else {
            countDisplay.textContent = visibleProjects + " projects found";
        }
    }

    // Run initially
    update();

    // Watch for changes in project container (search/filter/render)
    const observer = new MutationObserver(update);

    observer.observe(container, {
        childList: true
    });
}

// Initialize automatically
document.addEventListener("DOMContentLoaded", updateProjectCountAuto);