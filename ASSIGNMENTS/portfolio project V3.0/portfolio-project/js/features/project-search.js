function initProjectSearch() {

    const input = document.getElementById("project-search");

    if (!input) {
        console.log("Search input not found");
        return;
    }

    input.addEventListener("input", function () {

        const value = input.value.toLowerCase();

        const container = document.getElementById("projects-container");
        container.innerHTML = "";

        projectsData.forEach(function (project) {

            if (
                project.name.toLowerCase().includes(value) ||
                project.category.toLowerCase().includes(value) ||
                project.description.toLowerCase().includes(value)
            ) {

                // recreate card (same style as your project render)
                const card = document.createElement("div");
                card.className =
                    "p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-lg text-center";

                const name = document.createElement("h3");
                name.className = "text-xl font-bold mb-2";
                name.textContent = project.name;

                const desc = document.createElement("p");
                desc.className = "text-sm";
                desc.textContent = project.description;

                card.appendChild(name);
                card.appendChild(desc);

                container.appendChild(card);
            }
        });

    });

    console.log("Search working");
}