function initProjectSorting() {

    const sortSelect = document.getElementById("project-sort");
    const container = document.getElementById("projects-container");

    if (!sortSelect || !container) return;

    sortSelect.addEventListener("change", function () {

        let sortedProjects = [...projectsData]; // copy array

        if (sortSelect.value === "name-asc") {
            sortedProjects.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        }

        else if (sortSelect.value === "name-desc") {
            sortedProjects.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        }

        else if (sortSelect.value === "status") {
            sortedProjects.sort((a, b) =>
                a.status.localeCompare(b.status)
            );
        }

        // clear container
        container.innerHTML = "";

        // re-render projects
        sortedProjects.forEach(function (project) {

            const card = document.createElement("div");
            card.className =
                "p-8 bg-white dark:bg-slate-600 rounded-3xl shadow-lg text-center";

            const name = document.createElement("h3");
            name.className = "text-xl font-bold mb-2";
            name.textContent = project.name;

            const desc = document.createElement("p");
            desc.className = "text-sm";
            desc.textContent = project.description;

            card.appendChild(name);
            card.appendChild(desc);

            container.appendChild(card);
        });

    });
}

// initialize
document.addEventListener("DOMContentLoaded", initProjectSorting);