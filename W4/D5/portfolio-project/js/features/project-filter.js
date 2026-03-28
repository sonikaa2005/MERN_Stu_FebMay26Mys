
function renderFilters() {
    const filterContainer = document.getElementById("project-filters");

    if (!filterContainer) return;

    filterContainer.innerHTML = "";

    const categories = ["All", ...new Set(projectsData.map(p => p.category))];

    categories.forEach(function(cat){

        const btn = document.createElement("button");
        btn.textContent = cat;
        btn.className = "px-4 py-2 bg-gray-200 dark:bg-slate-700 rounded";

        btn.addEventListener("click", function(){

            // active button style
            document.querySelectorAll("#project-filters button")
                .forEach(b => b.classList.remove("bg-indigo-600", "text-white"));

            btn.classList.add("bg-indigo-600", "text-white");

            // clear container
            const container = document.getElementById("projects-container");
            container.innerHTML = "";

            // filter logic
            projectsData.forEach(function(project){

                if(cat === "All" || project.category === cat){

                    // create card (same as your renderProjects)
                    const card = document.createElement("div");
                    card.className =
                        "p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition text-center";

                    const projectName = document.createElement("h3");
                    projectName.className = "text-xl font-bold mb-2 text-gray-900 dark:text-white";
                    projectName.textContent = project.name;

                    const category = document.createElement("p");
                    category.className = "text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2";
                    category.textContent = project.category;

                    const description = document.createElement("p");
                    description.className = "text-sm text-gray-600 dark:text-gray-400 mb-4";
                    description.textContent = project.description;

                    const tech = document.createElement("p");
                    tech.className = "text-sm text-gray-700 dark:text-gray-300 mb-4";
                    tech.textContent = "Tech: " + project.technologies.join(", ");

                    const status = document.createElement("p");
                    status.className = "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4";
                    status.textContent = "Status: " + project.status;

                    const buttonBox = document.createElement("div");
                    buttonBox.className = "flex justify-center gap-4";

                    const liveBtn = document.createElement("a");
                    liveBtn.href = project.liveDemo;
                    liveBtn.textContent = "Live Demo";
                    liveBtn.className =
                        "px-4 py-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-lg text-sm transition";

                    const githubBtn = document.createElement("a");
                    githubBtn.href = project.github;
                    githubBtn.textContent = "GitHub";
                    githubBtn.className =
                        "px-4 py-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg text-sm transition";

                    buttonBox.appendChild(liveBtn);
                    buttonBox.appendChild(githubBtn);

                    card.appendChild(projectName);
                    card.appendChild(category);
                    card.appendChild(description);
                    card.appendChild(tech);
                    card.appendChild(status);
                    card.appendChild(buttonBox);

                    container.appendChild(card);
                }
            });

        });

        filterContainer.appendChild(btn);
    });
}