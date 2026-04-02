function initProjectSearch() {

    const input = document.getElementById("project-search");
    const container = document.getElementById("projects-container");

    if (!input || !container) return;

    input.addEventListener("input", function () {

        const value = input.value.toLowerCase();

        container.innerHTML = "";

        // Filter projects
        const filteredProjects = projectsData.filter(function (project) {

            return (
                project.name.toLowerCase().includes(value) ||
                project.category.toLowerCase().includes(value) ||
                project.description.toLowerCase().includes(value)
            );

        });

        filteredProjects.forEach(function (project) {
            const card = createProjectCard(project);
            container.appendChild(card);
        });

    });

    console.log("Search working");
}