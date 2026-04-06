function createProjectCard(project) {

    const card = document.createElement("div");
    card.className =
        "p-8 bg-white rounded-3xl shadow-lg text-center";

    const name = document.createElement("h3");
    name.className = "text-xl font-bold mb-2";
    name.textContent = project.name;

    let isExpanded = false;

    const desc = document.createElement("p");
    desc.className = "text-sm mb-2";
    desc.textContent = project.description.slice(0, 50) + "...";

    const btn = document.createElement("button");
    btn.className = "text-blue-600 text-sm font-semibold";
    btn.textContent = "View More";

    btn.addEventListener("click", function () {

        if (isExpanded) {
            desc.textContent = project.description.slice(0, 50) + "...";
            btn.textContent = "View More";
        } else {
            desc.textContent = project.description;
            btn.textContent = "View Less";
        }

        isExpanded = !isExpanded;
    });

    card.appendChild(name);
    card.appendChild(desc);
    card.appendChild(btn);

    card.addEventListener("click", function () {
        saveRecentProject(project);
    });

    return card;
}

// Render function
function renderProjects() {

    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    projectsData.forEach(function (project) {

        const card = createProjectCard(project); // 
        container.appendChild(card);

    });
    console.log("Projects rendered successfully");
}