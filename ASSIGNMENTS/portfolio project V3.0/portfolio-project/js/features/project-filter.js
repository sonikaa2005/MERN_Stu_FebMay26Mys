function renderFilters() {

    const filterContainer = document.getElementById("project-filters");
    const container = document.getElementById("projects-container");

    if (!filterContainer || !container) return;

    filterContainer.innerHTML = "";

    const categories = ["All", ...new Set(projectsData.map(p => p.category))];

    categories.forEach(function (cat) {

        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className = "px-4 py-2 bg-gray-200 rounded";

        btn.addEventListener("click", function () {

            // Active button style
            document.querySelectorAll("#project-filters button")
                .forEach(b => b.classList.remove("bg-indigo-600", "text-white"));

            btn.classList.add("bg-indigo-600", "text-white");

            // Clear container
            container.innerHTML = "";

            // Filter logic
            const filteredProjects = projectsData.filter(function (project) {
                return cat === "All" || project.category === cat;
            });

            filteredProjects.forEach(function (project) {
                const card = createProjectCard(project);
                container.appendChild(card);
            });

        });

        filterContainer.appendChild(btn);
    });
}