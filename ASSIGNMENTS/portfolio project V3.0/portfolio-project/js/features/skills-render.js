function renderSkills() {

    const container = document.getElementById("skills-container");
    if (!container) return;

    container.innerHTML = "";

    const categories = [...new Set(skillsData.map(skill => skill.category))];

    categories.forEach(function (category) {

        // CARD
        const section = document.createElement("div");
        section.className =
            "bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300 border border-gray-100";

        // TITLE
        const title = document.createElement("h3");
        title.className = "text-xl font-bold mb-4 text-blue-600";
        title.textContent = category;

        section.appendChild(title);

        // WRAPPER
        const wrapper = document.createElement("div");
        wrapper.className = "flex flex-wrap gap-3";

        const filteredSkills = skillsData.filter(skill => skill.category === category);

        filteredSkills.forEach(function (skill) {

            const item = document.createElement("span");

            item.className =
                "bg-blue-300 text-purple-700 px-4 py-1 rounded-full text-sm font-medium hover:bg-indigo-100 hover:scale-105 transition";

            item.textContent = skill.name;

            wrapper.appendChild(item);
        });

        section.appendChild(wrapper);
        container.appendChild(section);
    });

    console.log("Skills rendered successfully");
}