// SAVE PROJECT
function saveRecentProject(project) {

    let recent = JSON.parse(localStorage.getItem("recentProjects")) || [];

    const exists = recent.some(p => p.name === project.name);

    recent = recent.filter(p => p.name !== project.name);
    recent.unshift(project);

    recent = recent.slice(0, 5);

    localStorage.setItem("recentProjects", JSON.stringify(recent));

    renderRecentProjects();
}


// RENDER RECENT PROJECTS
function renderRecentProjects() {

    const container = document.getElementById("recent-projects");

    if (!container) return;

    const recent = JSON.parse(localStorage.getItem("recentProjects")) || [];

    container.innerHTML = "";

    recent.forEach(function (project) {

        const card = document.createElement("div");

        card.className =
            "p-4 bg-white rounded-xl shadow hover:shadow-md transition";

        card.innerHTML = `
            <h3 class="font-bold text-lg mb-2">${project.name}</h3>
            <p class="text-sm text-gray-600">${project.description.slice(0, 60)}...</p>
        `;

        container.appendChild(card);
    });

    console.log("Recent projects rendered");
}