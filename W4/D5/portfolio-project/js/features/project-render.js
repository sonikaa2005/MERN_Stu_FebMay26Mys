function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");

    if (!projectsContainer) {
        console.log("Projects container not found");
        return;
    }

    projectsContainer.innerHTML = "";

    projectsData.forEach(function (project) {

        // Create project card
        const card = document.createElement("div");
        card.className =
            "p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition text-center";

        // Project Name
        const projectName = document.createElement("h3");
        projectName.className = "text-xl font-bold mb-2 text-gray-900 dark:text-white";
        projectName.textContent = project.name;

        // Category
        const category = document.createElement("p");
        category.className = "text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2";
        category.textContent = project.category;

        // Description
        const description = document.createElement("p");
        description.className = "text-sm text-gray-600 dark:text-gray-400 mb-4";
        description.textContent = project.description;

        // Technologies
        const tech = document.createElement("p");
        tech.className = "text-sm text-gray-700 dark:text-gray-300 mb-4";
        tech.textContent = "Tech: " + project.technologies.join(", ");

        // Status
        const status = document.createElement("p");
        status.className = "text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4";
        status.textContent = "Status: " + project.status;

        // Button container
        const buttonBox = document.createElement("div");
        buttonBox.className = "flex justify-center gap-4";

        // Live Demo Button
        const liveBtn = document.createElement("a");
        liveBtn.href = project.liveDemo;
        liveBtn.textContent = "Live Demo";
        liveBtn.className =
            "px-4 py-2 bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white rounded-lg text-sm transition";

        // GitHub Button
        const githubBtn = document.createElement("a");
        githubBtn.href = project.github;
        githubBtn.textContent = "GitHub";
        githubBtn.className =
            "px-4 py-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg text-sm transition";

        // Add buttons
        buttonBox.appendChild(liveBtn);
        buttonBox.appendChild(githubBtn);

        // Append elements to card
        card.appendChild(projectName);
        card.appendChild(category);
        card.appendChild(description);
        card.appendChild(tech);
        card.appendChild(status);
        card.appendChild(buttonBox);

        // Add card to container
        projectsContainer.appendChild(card);
    });

    console.log("Projects rendered successfully");
}